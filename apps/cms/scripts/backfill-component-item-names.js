'use strict'

const path = require('node:path')
const { createStrapi } = require('@strapi/strapi')

const root = path.resolve(__dirname, '../../..')
const roleNames = {
  cover: '封面图',
  hero: '首屏图',
  'three-view': '三视图',
  gallery: '展示图',
  case: '案例图',
  diagram: '示意图',
  chart: '图表',
  video: '视频',
  other: '媒体',
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function mediaPurpose(sourcePath, role) {
  const filename = path.basename(clean(sourcePath), path.extname(clean(sourcePath))).toLowerCase()
  const threeView = filename.match(/(?:^|[-_])tv[-_]?([1-3])(?:$|[-_])/)
  if (threeView) return `三视图 ${threeView[1]}`
  if (/(?:^|[-_])(hero|banner)(?:$|[-_])/.test(filename)) return '首屏图'
  if (/(?:^|[-_])cover(?:$|[-_])/.test(filename)) return '封面图'
  if (/main-product|(?:^|[-_])main(?:$|[-_])/.test(filename)) return '产品主图'
  if (/(?:^|[-_])case(?:$|[-_])/.test(filename)) {
    if (/equipment/.test(filename)) return '案例设备图'
    if (/site/.test(filename)) return '案例现场图'
    if (/full/.test(filename)) return '案例全景图'
    return '案例图'
  }
  if (/equipment/.test(filename)) return '设备图'
  if (/system/.test(filename)) return '系统图'
  if (/process|flow/.test(filename)) return '工艺流程图'
  if (/diagram|scheme/.test(filename)) return '示意图'
  if (/chart|curve|graph/.test(filename)) return '图表'
  return roleNames[role] || '媒体'
}

function buildMediaLabel(item) {
  const caption = clean(item.caption)
  if (caption) return caption.slice(0, 80)
  const subject = clean(item.alt)
  const purpose = mediaPurpose(item.source_path, item.role)
  return subject ? `${subject} · ${purpose}` : purpose
}

let strapi

async function main() {
  const appDir = path.resolve(root, 'apps/cms')
  strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'
  const db = strapi.db.connection

  const result = await db.transaction(async (trx) => {
    const mediaItems = await trx('components_shared_media_items')
      .select('id', 'label', 'alt', 'caption', 'source_path', 'role')
    let mediaNamesBackfilled = 0

    for (const item of mediaItems) {
      if (clean(item.label)) continue
      await trx('components_shared_media_items')
        .where({ id: item.id })
        .update({ label: buildMediaLabel(item) })
      mediaNamesBackfilled += 1
    }

    const textItems = await trx('components_shared_text_items')
      .select('id', 'text', 'title', 'label', 'value')
    let textNamesBackfilled = 0

    for (const item of textItems) {
      if (clean(item.text)) continue
      const text = clean(item.title) || clean(item.label) || clean(item.value)
      if (!text) continue
      await trx('components_shared_text_items')
        .where({ id: item.id })
        .update({ text })
      textNamesBackfilled += 1
    }

    return {
      mediaNamesBackfilled,
      textNamesBackfilled,
    }
  })

  console.log(JSON.stringify(result, null, 2))
}

main()
  .catch((error) => {
    console.error('Item 语义名称回填失败:')
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    if (strapi) await strapi.destroy().catch(() => {})
  })
