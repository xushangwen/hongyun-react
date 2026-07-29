'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { createStrapi } = require('@strapi/strapi')

const root = path.resolve(__dirname, '../../..')
const manifest = JSON.parse(fs.readFileSync(
  path.resolve(root, 'scripts/migration/content-manifest.json'),
  'utf8',
))

function iconMap() {
  const map = new Map()
  for (const entry of [...manifest.products, ...manifest.solutions]) {
    for (const section of entry.sections || []) {
      if (section.__component !== 'content.feature-grid') continue
      for (const item of section.items || []) {
        if (item.title && item.iconKey) map.set(item.title, item.iconKey)
      }
    }
  }
  return map
}

async function uploadIcon(strapi, iconKey) {
  const sourcePath = path.resolve(root, `public/assets/icons/cms/${iconKey}.svg`)
  if (!fs.existsSync(sourcePath)) throw new Error(`缺少图标源文件: ${sourcePath}`)
  const name = `cms-feature-${iconKey}.svg`
  const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { name } })
  if (existing) return existing
  const stats = fs.statSync(sourcePath)
  const [file] = await strapi.plugin('upload').service('upload').upload({
    data: {
      fileInfo: {
        name,
        alternativeText: `产品特点图标 ${iconKey}`,
        caption: '',
      },
    },
    files: {
      filepath: sourcePath,
      originalFileName: name,
      originalFilename: name,
      mimetype: 'image/svg+xml',
      type: 'image/svg+xml',
      size: stats.size,
    },
  })
  return file
}

async function main() {
  const appDir = path.resolve(root, 'apps/cms')
  const strapi = await createStrapi({ appDir, distDir: appDir }).load()
  try {
    const icons = iconMap()
    let updated = 0
    let mediaLinked = 0
    for (const [title, iconKey] of icons) {
      const count = await strapi.db.connection('components_shared_feature_items')
        .where({ title })
        .where((builder) => builder
          .whereNull('icon_key')
          .orWhere('icon_key', '')
          .orWhere('icon_key', 'like', 'Icon%'))
        .update({ icon_key: iconKey })
      updated += count
    }
    for (const iconKey of new Set(icons.values())) {
      const file = await uploadIcon(strapi, iconKey)
      const items = await strapi.db.connection('components_shared_feature_items')
        .select('id')
        .where({ icon_key: iconKey })
      for (const item of items) {
        const existing = await strapi.db.connection('files_related_mph').where({
          related_id: item.id,
          related_type: 'shared.feature-item',
          field: 'iconMedia',
        }).first()
        if (existing) continue
        await strapi.db.connection('files_related_mph').insert({
          file_id: file.id,
          related_id: item.id,
          related_type: 'shared.feature-item',
          field: 'iconMedia',
          order: 1,
        })
        mediaLinked += 1
      }
    }
    console.log(`✓ 图标键更新 ${updated} 项，图标媒体关联 ${mediaLinked} 项；现有文字和自定义媒体未改动`)
  } finally {
    await strapi.destroy()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
