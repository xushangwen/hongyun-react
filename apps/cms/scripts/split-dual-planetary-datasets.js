'use strict'

const path = require('node:path')
const { createStrapi } = require('@strapi/strapi')

const uid = 'api::technical-dataset.technical-dataset'
const definitions = [
  {
    legacyKey: 'dual-planetary-mixer:dataset:allModels',
    title: '生产型双行星动力混合机 · 型号参数',
    expectedRows: 9,
    includes: (designVolume) => designVolume > 287,
  },
  {
    legacyKey: 'dual-planetary-mixer-mid:dataset:allModels',
    title: '中试型双行星动力混合机 · 型号参数',
    expectedRows: 3,
    includes: (designVolume) => designVolume > 43 && designVolume <= 287,
  },
  {
    legacyKey: 'dual-planetary-mixer-lab:dataset:allModels',
    title: '实验型双行星动力混合机 · 型号参数',
    expectedRows: 8,
    includes: (designVolume) => designVolume <= 43,
  },
]

async function main() {
  const appDir = path.resolve(__dirname, '..')
  const strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'

  try {
    const sourceRecords = await strapi.documents(uid).findMany({
      locale: 'zh',
      filters: {
        legacyKey: {
          $in: definitions.map((definition) => definition.legacyKey),
        },
      },
      limit: definitions.length,
    })
    const allRows = [...new Map(
      sourceRecords
        .flatMap((record) => record.rows || [])
        .map((row) => [row.model, row]),
    ).values()]

    if (allRows.length !== 20) {
      throw new Error(`预期读取 20 个完整型号，实际为 ${allRows.length} 个`)
    }

    for (const definition of definitions) {
      const existing = sourceRecords.find((record) => record.legacyKey === definition.legacyKey)
      if (!existing) throw new Error(`缺少数据集 ${definition.legacyKey}`)

      const rows = allRows.filter((row) => {
        const designVolume = Number.parseFloat(row.designVol)
        return Number.isFinite(designVolume) && definition.includes(designVolume)
      })
      if (rows.length !== definition.expectedRows) {
        throw new Error(`${definition.title} 预期 ${definition.expectedRows} 行，实际 ${rows.length} 行`)
      }

      await strapi.documents(uid).update({
        documentId: existing.documentId,
        locale: 'zh',
        status: 'published',
        data: {
          title: definition.title,
          rows,
          sourceChecksum: null,
        },
      })
      await strapi.db.query('content.data-table').updateMany({
        where: { datasetKey: definition.legacyKey },
        data: {
          internalName: definition.title,
          title: definition.title,
        },
      })
      console.log(`✓ ${definition.title}: ${rows.length} 行`)
    }
  } finally {
    await strapi.destroy()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
