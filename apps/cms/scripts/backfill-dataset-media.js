'use strict'

const crypto = require('node:crypto')
const path = require('node:path')
const { createStrapi } = require('@strapi/strapi')

const MEDIA_FIELD = /^(img|src|icon|video|poster|image|logo|media)$/i
const apply = process.argv.includes('--apply')

function uploadName(sourcePath) {
  const digest = crypto.createHash('sha1').update(sourcePath).digest('hex').slice(0, 10)
  return `${digest}-${path.basename(sourcePath)}`
}

async function main() {
  const appDir = path.resolve(__dirname, '..')
  const strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'

  try {
    const records = await strapi.documents('api::technical-dataset.technical-dataset').findMany({
      locale: 'zh',
      limit: 1000,
    })
    let datasetCount = 0
    let referenceCount = 0

    for (const record of records) {
      const rows = typeof record.rows === 'string' ? JSON.parse(record.rows) : record.rows
      if (!Array.isArray(rows)) continue
      let changed = false
      const nextRows = []

      for (const row of rows) {
        const nextRow = { ...row }
        for (const [key, value] of Object.entries(row || {})) {
          if (!MEDIA_FIELD.test(key) || typeof value !== 'string' || !value.startsWith('/assets/')) continue
          const file = await strapi.db.query('plugin::upload.file').findOne({
            where: { name: uploadName(value) },
          })
          if (!file?.url) throw new Error(`${record.legacyKey}: 媒体库缺少 ${value}`)
          nextRow[key] = file.url
          changed = true
          referenceCount += 1
        }
        nextRows.push(nextRow)
      }

      if (!changed) continue
      datasetCount += 1
      console.log(`${apply ? '更新' : '待更新'} ${record.legacyKey}`)
      if (apply) {
        await strapi.documents('api::technical-dataset.technical-dataset').update({
          documentId: record.documentId,
          locale: 'zh',
          status: 'published',
          data: { rows: nextRows },
        })
      }
    }

    console.log(`${apply ? '已完成' : '预检查'}: ${datasetCount} 个数据集，${referenceCount} 处媒体引用`)
    if (!apply && datasetCount) console.log('确认无误后使用 --apply 执行。')
  } finally {
    await strapi.destroy()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
