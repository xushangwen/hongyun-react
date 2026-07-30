'use strict'

const path = require('node:path')
const { createStrapi } = require('@strapi/strapi')

const root = path.resolve(__dirname, '../../..')
const columnLabels = {
  model: '型号',
  liftType: '升降方式',
  workVol: '工作容积（L）',
  designVol: '设计容积（L）',
  tankDim: '料缸尺寸（mm）',
  mixerMotor: '搅拌电机功率（kW）',
  revSpeed: '公转速度（rpm）',
  ownSpeed: '自转速度（rpm）',
  dissolverKW: '分散功率（kW）',
  dissolverType: '分散电机',
  dissolverRPM: '分散转速（rpm）',
  dissolverLinear: '分散线速度（m/s）',
  weight: '重量',
  dimension: '外形尺寸',
  vol: '容积（L）',
  id: '内径（mm）',
  h: '高度（mm）',
  len: '长度（mm）',
  ratio: '长径比',
  kw: '电机功率（kW）',
  rpm: '转速（rpm）',
  v: '线速度（m/s）',
  gap: '间距（mm）',
  mixKw: '搅拌功率（kW）',
  mixRpm: '搅拌转速（rpm）',
  slurryV: '浆料线速度（m/s）',
  dispKw: '分散功率（kW）',
  rotorDia: '转子直径（mm）',
  dispRpm: '分散转速（rpm）',
  lineV: '线速度（m/s）',
  scrapeKw: '刮壁功率（kW）',
  scrapeRpm: '刮壁转速（rpm）',
  sideKw: '侧分散功率（kW）',
  sideRpm: '侧分散转速（rpm）',
  sideV: '侧分散线速度（m/s）',
  output: '产量',
  cycleTime: '循环时间',
  processTime: '处理时间',
  batch: '批次',
  flow: '流量',
  flowRate: '流量',
  batchVol: '批次容积',
  motorKW: '电机功率（kW）',
  linearSpeed: '线速度（m/s）',
  motor: '电机功率',
  diameter: '直径',
  speed: '速度',
  title: '名称',
  desc: '说明',
}

function readableColumns(value) {
  const columns = typeof value === 'string' ? JSON.parse(value) : value
  return columns.map((column) => ({
    ...column,
    label: !column.label || column.label === column.id
      ? columnLabels[column.id] || column.id
      : column.label,
  }))
}

function readableTitle(title, datasetKey) {
  const baseTitle = String(title || '').split(' · ')[0].replace(/(型号参数|产品特点|核心设备|数据表)$/, '')
  if (datasetKey.endsWith(':modelParams') || datasetKey.endsWith(':allModels')) {
    return `${baseTitle}型号参数`
  }
  if (datasetKey.endsWith(':features')) return `${baseTitle}产品特点`
  if (datasetKey.endsWith(':coreEquipment')) return `${baseTitle}核心设备`
  return `${baseTitle}数据表`
}

let strapi

async function main() {
  const appDir = path.resolve(root, 'apps/cms')
  strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'
  const db = strapi.db.connection

  const result = await db.transaction(async (trx) => {
    const componentIds = new Set()
    for (const linkTable of ['hongyun_products_cmps', 'hongyun_solutions_cmps']) {
      const links = await trx(linkTable)
        .select('cmp_id')
        .where({ component_type: 'content.data-table', field: 'sections' })
      for (const link of links) componentIds.add(link.cmp_id)
    }

    const sections = await trx('components_content_data_tables')
      .select('id', 'title', 'dataset_key')
      .whereIn('id', [...componentIds])
    let migrated = 0
    const normalizedDatasets = new Set()
    const missing = []

    for (const section of sections) {
      const dataset = await trx('hongyun_technical_datasets')
        .select('title', 'columns', 'header_groups', 'rows', 'unit_notes')
        .where({ legacy_key: section.dataset_key })
        .orderByRaw('published_at IS NULL DESC')
        .first()
      if (!dataset) {
        missing.push(section.dataset_key)
        continue
      }

      const title = readableTitle(dataset.title || section.title, section.dataset_key)
      await trx('components_content_data_tables')
        .where({ id: section.id })
        .update({
          title,
          columns: JSON.stringify(readableColumns(dataset.columns)),
          header_groups: dataset.header_groups,
          rows: dataset.rows,
          unit_notes: dataset.unit_notes,
        })
      if (!normalizedDatasets.has(section.dataset_key)) {
        await trx('hongyun_technical_datasets')
          .where({ legacy_key: section.dataset_key })
          .update({ title })
        normalizedDatasets.add(section.dataset_key)
      }
      migrated += 1
    }

    if (missing.length) {
      throw new Error(`以下数据表未找到旧数据集：${[...new Set(missing)].join('、')}`)
    }

    return {
      migratedComponentVersions: migrated,
      logicalTables: migrated / 2,
      normalizedDatasetTitles: normalizedDatasets.size,
    }
  })

  console.log(JSON.stringify(result, null, 2))
}

main()
  .catch((error) => {
    console.error('产品/解决方案数据表内嵌迁移失败:')
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    if (strapi) await strapi.destroy().catch(() => {})
  })
