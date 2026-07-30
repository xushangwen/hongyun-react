'use strict'

const { createHmac, randomUUID } = require('node:crypto')
const { errors } = require('@strapi/utils')
const { configureComponentItemEditors } = require('./component-editor-config')
const { ApplicationError } = errors

const PUBLICLY_BLOCKED_PREFIXES = [
  'api::contact-submission.contact-submission.',
  'api::resume-submission.resume-submission.',
  'api::access-audit-log.access-audit-log.',
]

const PUBLIC_CONTENT_MODELS = [
  'api::about-page.about-page',
  'api::article.article',
  'api::article-category.article-category',
  'api::case-chapter.case-chapter',
  'api::case-study.case-study',
  'api::contact-page.contact-page',
  'api::form-setting.form-setting',
  'api::global-presence.global-presence',
  'api::home-page.home-page',
  'api::industry.industry',
  'api::navigation.navigation',
  'api::partner.partner',
  'api::product.product',
  'api::product-category.product-category',
  'api::product-family.product-family',
  'api::product-group.product-group',
  'api::product-placement.product-placement',
  'api::site-setting.site-setting',
  'api::solution.solution',
  'api::solution-equipment.solution-equipment',
  'api::technical-dataset.technical-dataset',
  'api::url-alias.url-alias',
]

async function notifyBff(strapi, action, event) {
  const url = process.env.BFF_WEBHOOK_URL
  const secret = process.env.CMS_WEBHOOK_SECRET
  if (!url || !secret) return
  const timestamp = Date.now().toString()
  const body = JSON.stringify({
    action,
    model: event.model?.uid,
    documentId: event.result?.documentId,
  })
  const signature = createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex')
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-cms-timestamp': timestamp,
        'x-cms-signature': signature,
      },
      body,
      signal: AbortSignal.timeout(3000),
    })
    if (!response.ok) strapi.log.warn(`[cms-webhook] BFF 返回 ${response.status}`)
  } catch (error) {
    strapi.log.warn(`[cms-webhook] 通知失败: ${error.message}`)
  }
}

function normalizeDatasetJson(data) {
  if (!data) return
  for (const key of ['columns', 'rows', 'headerGroups', 'chartConfig']) {
    if (!(key in data) || typeof data[key] !== 'string') continue
    const source = data[key].trim()
    if (!source && ['headerGroups', 'chartConfig'].includes(key)) {
      data[key] = null
      continue
    }
    try {
      data[key] = JSON.parse(source)
    } catch {
      throw new ApplicationError(`技术数据集 ${key} 必须是有效 JSON`)
    }
  }
}

function valueType(value) {
  if (Array.isArray(value)) return '数组'
  if (value === null) return 'null'
  return typeof value === 'object' ? '对象' : typeof value
}

function assertDataset(data) {
  if (!data || !('kind' in data || 'columns' in data || 'rows' in data || 'chartConfig' in data)) return
  normalizeDatasetJson(data)
  const columns = data.columns
  const rows = data.rows
  if (!Array.isArray(columns) || !Array.isArray(rows)) {
    throw new ApplicationError(
      `技术数据集 columns 与 rows 必须是数组（当前 columns: ${valueType(columns)}，rows: ${valueType(rows)}）`,
    )
  }
  const ids = columns.map((column) => column?.id)
  if (ids.some((id) => typeof id !== 'string' || !id)) {
    throw new ApplicationError('技术数据集每一列都必须有非空字符串 id')
  }
  if (new Set(ids).size !== ids.length) {
    throw new ApplicationError('技术数据集列 id 不能重复')
  }
  const allowed = new Set(ids)
  for (const [rowIndex, row] of rows.entries()) {
    if (!row || typeof row !== 'object' || Array.isArray(row)) {
      throw new ApplicationError(`技术数据集第 ${rowIndex + 1} 行格式无效`)
    }
    const invalid = Object.keys(row).filter((key) => !allowed.has(key) && !['id', 'group', 'rowSpan'].includes(key))
    if (invalid.length) {
      throw new ApplicationError(`技术数据集第 ${rowIndex + 1} 行引用未知列: ${invalid.join(', ')}`)
    }
  }
  if (data.kind === 'chart-data' && data.chartConfig) {
    const series = data.chartConfig.series
    if (!Array.isArray(series) || series.some((item) => !Array.isArray(item?.data))) {
      throw new ApplicationError('图表数据集 chartConfig.series 格式无效')
    }
  }
}

function prepareDatasetCreate(data) {
  if (!data) return
  if (!data.kind) data.kind = 'spec-table'
  if (!data.schemaVersion) data.schemaVersion = 1
  if (!data.version) data.version = 1
  if (!data.legacyKey) data.legacyKey = `shared:dataset:${randomUUID()}`
  assertDataset(data)
}

async function assertDatasetUpdate(strapi, event) {
  const data = event.params.data
  if (!data || !['kind', 'columns', 'rows', 'chartConfig'].some((key) => key in data)) return
  normalizeDatasetJson(data)
  const existing = await strapi.db.query('api::technical-dataset.technical-dataset').findOne({
    where: event.params.where,
    select: ['kind', 'columns', 'rows', 'chartConfig'],
  })
  assertDataset({ ...existing, ...data })
}

function assertInlineDataTables(data) {
  if (!Array.isArray(data?.sections)) return
  for (const section of data.sections) {
    if (section?.__component !== 'content.data-table') continue
    const hasInlineData = section.columns != null || section.rows != null
    if (!hasInlineData && section.datasetKey) continue
    if (!hasInlineData) {
      throw new ApplicationError(`数据表“${section.title || '未命名'}”尚未填写表格内容`)
    }
    assertDataset({
      kind: 'spec-table',
      columns: section.columns,
      rows: section.rows,
    })
  }
}

function assertUrlAlias(data) {
  if (!data || !('path' in data || 'targetType' in data || 'localeCode' in data)) return
  if (typeof data.path !== 'string' || !data.path.startsWith('/') || data.path.includes('?') || data.path.includes('#')) {
    throw new ApplicationError('URL 别名必须是以 / 开头且不含查询参数或锚点的站内完整路径')
  }
  if (!['zh', 'en'].includes(data.localeCode)) {
    throw new ApplicationError('URL 别名 localeCode 只允许 zh 或 en')
  }
  const expectedKey = `${data.localeCode}:${data.path}`
  if (data.uniqueKey !== expectedKey) {
    data.uniqueKey = expectedKey
  }
  const relationNames = ['product', 'solution', 'article'].filter((key) => data[key]?.connect?.length || data[key])
  if (data.targetType === 'page') {
    if (!data.pageKey || relationNames.length) throw new ApplicationError('页面别名必须且只能填写 pageKey')
  } else if (relationNames.length > 1 || (relationNames.length === 1 && relationNames[0] !== data.targetType)) {
    throw new ApplicationError('URL 别名目标关系与 targetType 不一致')
  }
}

async function ensureLocale(strapi, locale) {
  const service = strapi.plugin('i18n').service('locales')
  const existing = await service.findByCode(locale.code)
  if (!existing) {
    await service.create(locale)
  }
  if (locale.isDefault) {
    await service.setDefaultLocale({ code: locale.code })
  }
}

async function lockPublicRole(strapi) {
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } })
  if (!publicRole) return
  const permissions = await strapi.query('plugin::users-permissions.permission').findMany({
    where: { role: publicRole.id },
  })
  for (const permission of permissions) {
    if (!permission.action?.startsWith('api::')) continue
    await strapi.query('plugin::users-permissions.permission').delete({ where: { id: permission.id } })
  }
  strapi.log.info('[bootstrap] Public Role 已收紧：前台只能通过 BFF Token 访问 CMS')
}

module.exports = {
  register({ strapi }) {
    strapi.customFields.register({
      name: 'structured-json',
      type: 'json',
      inputSize: {
        default: 12,
        isResizable: false,
      },
    })
    strapi.customFields.register({
      name: 'legacy-path',
      type: 'string',
      inputSize: {
        default: 12,
        isResizable: false,
      },
    })
    strapi.db.lifecycles.subscribe({
      models: ['api::technical-dataset.technical-dataset'],
      beforeCreate(event) { prepareDatasetCreate(event.params.data) },
      async beforeUpdate(event) { await assertDatasetUpdate(strapi, event) },
    })
    strapi.db.lifecycles.subscribe({
      models: ['api::product.product', 'api::solution.solution'],
      beforeCreate(event) { assertInlineDataTables(event.params.data) },
      beforeUpdate(event) { assertInlineDataTables(event.params.data) },
    })
    strapi.db.lifecycles.subscribe({
      models: ['api::url-alias.url-alias'],
      beforeCreate(event) { assertUrlAlias(event.params.data) },
      beforeUpdate(event) { assertUrlAlias(event.params.data) },
    })
    strapi.db.lifecycles.subscribe({
      models: PUBLIC_CONTENT_MODELS,
      afterCreate(event) { void notifyBff(strapi, 'create', event) },
      afterUpdate(event) { void notifyBff(strapi, 'update', event) },
      afterDelete(event) { void notifyBff(strapi, 'delete', event) },
    })
  },

  async bootstrap({ strapi }) {
    await ensureLocale(strapi, { code: 'zh', name: '中文 (zh)', isDefault: true })
    await ensureLocale(strapi, { code: 'en', name: 'English (en)', isDefault: false })
    await configureComponentItemEditors(strapi)
    await lockPublicRole(strapi)
  },
}
