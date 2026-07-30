'use strict'

const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const { createStrapi } = require('@strapi/strapi')

const root = path.resolve(__dirname, '../../..')
const manifestPath = path.resolve(root, 'scripts/migration/content-manifest.json')
const publicRoot = path.resolve(root, 'public')
const syncExisting = process.argv.includes('--sync-existing')
const syncContact = process.argv.includes('--sync-contact')
process.env.CMS_SKIP_PRODUCT_LABEL_SYNC = 'true'
if (syncExisting && process.env.MIGRATION_ALLOW_OVERWRITE !== 'true') {
  throw new Error('拒绝覆盖后台现有内容。仅在确认重置迁移数据时设置 MIGRATION_ALLOW_OVERWRITE=true。')
}
let strapi

const draftAndPublish = new Set([
  'api::product.product',
  'api::product-family.product-family',
  'api::industry.industry',
  'api::solution.solution',
  'api::article.article',
  'api::case-study.case-study',
  'api::case-chapter.case-chapter',
  'api::technical-dataset.technical-dataset',
  'api::home-page.home-page',
  'api::about-page.about-page',
  'api::contact-page.contact-page',
])

const mimeByExtension = {
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
}

function sourceFile(sourcePath, explicitFile) {
  if (explicitFile) return path.resolve(root, decodeURIComponent(explicitFile))
  if (sourcePath.startsWith('/src/')) return path.resolve(root, sourcePath.slice(1))
  return path.resolve(publicRoot, decodeURIComponent(sourcePath.replace(/^\/+/, '')))
}

function uploadName(sourcePath) {
  const digest = crypto.createHash('sha1').update(sourcePath).digest('hex').slice(0, 10)
  return `${digest}-${path.basename(sourcePath)}`
}

const uploadedBySource = new Map()

async function upload(sourcePath, explicitFile, alt = '') {
  if (!sourcePath) return null
  if (uploadedBySource.has(sourcePath)) return uploadedBySource.get(sourcePath)
  const absolutePath = sourceFile(sourcePath, explicitFile)
  if (!fs.existsSync(absolutePath)) {
    console.warn(`  ! 媒体源缺失: ${sourcePath}`)
    uploadedBySource.set(sourcePath, null)
    return null
  }
  const name = uploadName(sourcePath)
  const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { name } })
  if (existing) {
    uploadedBySource.set(sourcePath, existing.id)
    return existing.id
  }
  const extension = path.extname(absolutePath).toLowerCase()
  const stats = fs.statSync(absolutePath)
  const [file] = await strapi.plugin('upload').service('upload').upload({
    data: {
      fileInfo: {
        name,
        alternativeText: alt || path.parse(sourcePath).name,
        caption: '',
      },
    },
    files: {
      filepath: absolutePath,
      originalFileName: name,
      originalFilename: name,
      mimetype: mimeByExtension[extension] || 'application/octet-stream',
      type: mimeByExtension[extension] || 'application/octet-stream',
      size: stats.size,
    },
  })
  uploadedBySource.set(sourcePath, file.id)
  return file.id
}

async function hydrate(value) {
  if (Array.isArray(value)) return Promise.all(value.map(hydrate))
  if (!value || typeof value !== 'object') return value
  if (value.__media === true && typeof value.sourcePath === 'string') {
    return upload(value.sourcePath, value.sourceFile, value.alt)
  }
  const output = {}
  for (const [key, item] of Object.entries(value)) {
    if (key === 'sourceFile') continue
    output[key] = await hydrate(item)
  }
  if (typeof value.sourcePath === 'string') {
    const fileId = await upload(value.sourcePath, value.sourceFile, value.alt)
    if (value.__component === 'article.image') output.image = fileId
    else output.media = fileId
  }
  return output
}

async function findByLegacyKey(uid, legacyKey) {
  const query = { filters: { legacyKey }, locale: 'zh', limit: 1 }
  const draft = await strapi.documents(uid).findMany(query)
  if (draft[0]) return draft[0]
  if (draftAndPublish.has(uid)) {
    const published = await strapi.documents(uid).findMany({ ...query, status: 'published' })
    return published[0] || null
  }
  return null
}

async function upsert(uid, legacyKey, data, { force = syncExisting } = {}) {
  const hydrated = await hydrate(data)
  const existing = await findByLegacyKey(uid, legacyKey)
  const status = draftAndPublish.has(uid) ? 'published' : undefined
  if (existing && !force) return existing
  if (existing) {
    return strapi.documents(uid).update({
      documentId: existing.documentId,
      locale: 'zh',
      ...(status ? { status } : {}),
      data: hydrated,
    })
  }
  return strapi.documents(uid).create({
    locale: 'zh',
    ...(status ? { status } : {}),
    data: hydrated,
  })
}

async function upsertSingle(uid, data, { force = syncExisting, fillMissingFields = [] } = {}) {
  const existing = await strapi.documents(uid).findFirst({ locale: 'zh' })
  const status = draftAndPublish.has(uid) ? 'published' : undefined
  if (existing && !force && !fillMissingFields.length) return existing
  if (existing && !force) {
    const missingData = Object.fromEntries(
      fillMissingFields
        .filter((field) => existing[field] == null
          || (Array.isArray(existing[field]) && existing[field].length === 0))
        .map((field) => [field, data[field]]),
    )
    if (!Object.keys(missingData).length) return existing
    let updated = existing
    for (const [field, value] of Object.entries(missingData)) {
      const hydratedField = await hydrate({ [field]: value })
      try {
        updated = await strapi.documents(uid).update({
          documentId: existing.documentId,
          locale: 'zh',
          ...(status ? { status } : {}),
          data: hydratedField,
        })
      } catch (error) {
        error.message = `补齐 ${uid}.${field} 失败: ${error.message}`
        throw error
      }
    }
    return updated
  }
  const hydrated = await hydrate(data)
  if (existing) {
    return strapi.documents(uid).update({
      documentId: existing.documentId,
      locale: 'zh',
      ...(status ? { status } : {}),
      data: hydrated,
    })
  }
  return strapi.documents(uid).create({
    locale: 'zh',
    ...(status ? { status } : {}),
    data: hydrated,
  })
}

const connectOne = (documentId) => documentId ? { connect: [documentId] } : null
const connectMany = (documentIds) => ({ connect: documentIds.filter(Boolean) })

async function ensureAdmin() {
  const email = process.env.CMS_ADMIN_EMAIL
  const password = process.env.CMS_ADMIN_PASSWORD
  if (!email || !password) return
  const existing = await strapi.db.query('admin::user').findOne({ where: { email } })
  if (existing) return
  const role = await strapi.db.query('admin::role').findOne({ where: { code: 'strapi-super-admin' } })
  if (!role) throw new Error('Strapi super admin role 不存在')
  await strapi.admin.services.user.create({
    email,
    firstname: 'Hongyun',
    lastname: 'Administrator',
    password,
    isActive: true,
    roles: [role.id],
  })
  console.log(`  + 本地管理员 ${email}`)
}

async function main() {
  if (!fs.existsSync(manifestPath)) {
    throw new Error('缺少 content-manifest.json，请先运行 pnpm cms:manifest')
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const appDir = path.resolve(root, 'apps/cms')
  strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'

  console.log('初始化管理员与中文内容…')
  await ensureAdmin()

  const categoryIds = new Map()
  for (const item of manifest.categories) {
    const cover = item.coverPath ? await upload(item.coverPath, null, item.name) : null
    const doc = await upsert('api::product-category.product-category', item.legacyKey, {
      ...item, ...(cover ? { cover } : {}),
    })
    categoryIds.set(item.legacyKey, doc.documentId)
  }

  const industryIds = new Map()
  for (const item of manifest.industries) {
    const doc = await upsert('api::industry.industry', item.legacyKey, item)
    industryIds.set(item.legacyKey, doc.documentId)
  }

  const articleCategoryIds = new Map()
  for (const item of manifest.articleCategories) {
    const doc = await upsert('api::article-category.article-category', item.legacyKey, item)
    articleCategoryIds.set(item.legacyKey, doc.documentId)
  }

  const datasetIds = new Map()
  for (const item of manifest.technicalDatasets) {
    const doc = await upsert('api::technical-dataset.technical-dataset', item.legacyKey, item)
    datasetIds.set(item.legacyKey, doc.documentId)
  }

  const familyIds = new Map()
  for (const item of manifest.productFamilies) {
    const { productKeys: _productKeys, ...data } = item
    const doc = await upsert('api::product-family.product-family', item.legacyKey, data)
    familyIds.set(item.legacyKey, doc.documentId)
  }

  const productIds = new Map()
  for (const item of manifest.products) {
    const { coverPath, sourceFiles: _sourceFiles, familyKey, ...data } = item
    const cover = await upload(coverPath, null, item.name)
    const doc = await upsert('api::product.product', item.legacyKey, {
      ...data,
      ...(cover ? { cover } : {}),
      family: connectOne(familyIds.get(familyKey)),
    })
    productIds.set(item.legacyKey, doc.documentId)
  }

  const solutionIds = new Map()
  for (const item of manifest.solutions) {
    const { industryKey, sourceFiles: _sourceFiles, coverPath, ...data } = item
    const cover = await upload(coverPath, null, item.name)
    const doc = await upsert('api::solution.solution', item.legacyKey, {
      ...data,
      ...(cover ? { cover } : {}),
      industry: connectOne(industryIds.get(industryKey)),
    })
    solutionIds.set(item.legacyKey, doc.documentId)
  }

  const groupIds = new Map()
  for (const item of manifest.groups) {
    const { categoryKey, ...data } = item
    const doc = await upsert('api::product-group.product-group', item.legacyKey, {
      ...data,
      category: connectOne(categoryIds.get(categoryKey)),
    })
    groupIds.set(item.legacyKey, doc.documentId)
  }

  for (const item of manifest.products) {
    const documentId = productIds.get(item.legacyKey)
    if (!documentId) continue
    const existing = await strapi.documents('api::product.product').findOne({
      documentId,
      locale: 'zh',
      status: 'published',
      populate: ['categories', 'groups'],
    })
    if (existing?.catalogRelationsInitialized) continue
    const productPlacements = manifest.placements.filter(
      (placement) => placement.productKey === item.legacyKey,
    )
    const categoryDocumentIds = [...new Set(
      productPlacements.map((placement) => categoryIds.get(placement.categoryKey)).filter(Boolean),
    )]
    const groupDocumentIds = [...new Set(
      productPlacements.map((placement) => groupIds.get(placement.groupKey)).filter(Boolean),
    )]
    await strapi.documents('api::product.product').update({
      documentId,
      locale: 'zh',
      status: 'published',
      data: {
        categories: connectMany(categoryDocumentIds),
        groups: connectMany(groupDocumentIds),
        catalogRelationsInitialized: true,
      },
    })
  }

  for (const item of manifest.placements) {
    const { productKey, categoryKey, groupKey, coverPath, ...data } = item
    const coverOverride = await upload(coverPath, null, item.displayNameOverride)
    await upsert('api::product-placement.product-placement', item.legacyKey, {
      ...data,
      product: connectOne(productIds.get(productKey)),
      category: connectOne(categoryIds.get(categoryKey)),
      group: connectOne(groupIds.get(groupKey)),
      ...(coverOverride ? { coverOverride } : {}),
    })
  }

  const caseIds = new Map()
  for (const item of manifest.cases) {
    const { relatedProductKeys, relatedSolutionKeys, ...data } = item
    const doc = await upsert('api::case-study.case-study', item.legacyKey, {
      ...data,
      relatedProducts: connectMany(relatedProductKeys.map((key) => productIds.get(key))),
      relatedSolutions: connectMany(relatedSolutionKeys.map((key) => solutionIds.get(key))),
    })
    caseIds.set(item.legacyKey, doc.documentId)
  }

  for (const item of manifest.caseChapters) {
    const { caseKey, ...data } = item
    await upsert('api::case-chapter.case-chapter', item.legacyKey, {
      ...data,
      caseStudy: connectOne(caseIds.get(caseKey)),
    })
  }

  const articleIds = new Map()
  for (const item of manifest.articles) {
    const { categoryKey, coverPath, ...data } = item
    const cover = await upload(coverPath, null, item.title)
    const doc = await upsert('api::article.article', item.legacyKey, {
      ...data,
      category: connectOne(articleCategoryIds.get(categoryKey)),
      ...(cover ? { cover } : {}),
    })
    articleIds.set(item.legacyKey, doc.documentId)
  }

  for (const item of manifest.aliases) {
    const targetDocumentId =
      item.targetType === 'product' ? productIds.get(item.targetKey)
        : item.targetType === 'solution' ? solutionIds.get(item.targetKey)
          : item.targetType === 'article' ? articleIds.get(item.targetKey)
            : null
    await upsert('api::url-alias.url-alias', item.uniqueKey, {
      ...item,
      [item.targetType]: connectOne(targetDocumentId),
    }, { force: true })
  }

  for (const item of manifest.partners) {
    const { logoPath, group: _group, ...data } = item
    const logo = await upload(logoPath, null, item.name)
    await upsert('api::partner.partner', item.legacyKey, {
      ...data,
      website: '',
      ...(logo ? { logo } : {}),
    })
  }

  for (const item of manifest.globalPresences) {
    await upsert('api::global-presence.global-presence', item.legacyKey, item)
  }

  await upsertSingle('api::site-setting.site-setting', manifest.singleTypes.siteSetting, {
    fillMissingFields: ['headerLogo', 'footerLogo', 'email', 'copyright'],
  })
  await upsertSingle('api::home-page.home-page', manifest.singleTypes.homePage, {
    fillMissingFields: [
      'heroSlides',
      'newsSection',
      'aboutSection',
      'researchSection',
      'partnerSection',
      'contactSection',
    ],
  })
  await upsertSingle('api::about-page.about-page', manifest.singleTypes.aboutPage)
  await upsertSingle('api::contact-page.contact-page', manifest.singleTypes.contactPage, {
    force: syncExisting || syncContact,
  })
  await upsertSingle('api::navigation.navigation', manifest.singleTypes.navigation)
  await upsertSingle('api::form-setting.form-setting', manifest.singleTypes.formSetting)

  await strapi.destroy()
  strapi = null
  console.log(`✅ 中文内容同步完成；媒体 ${uploadedBySource.size} 项`)
}

main().catch(async (error) => {
  console.error('CMS 内容同步失败:')
  console.dir(error, { depth: 10 })
  if (strapi) await strapi.destroy().catch(() => {})
  process.exitCode = 1
})
