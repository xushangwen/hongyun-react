'use strict'

const path = require('node:path')
const { createStrapi } = require('@strapi/strapi')
const manifest = require(path.resolve(__dirname, '../../../scripts/migration/content-manifest.json'))

const expected = {
  'api::product-category.product-category': 4,
  'api::product-group.product-group': 6,
  'api::product.product': 28,
  'api::product-placement.product-placement': 30,
  'api::product-family.product-family': 1,
  'api::industry.industry': 3,
  'api::solution.solution': 7,
  'api::article-category.article-category': 3,
  'api::article.article': 6,
  'api::case-study.case-study': 4,
  'api::case-chapter.case-chapter': 5,
  'api::technical-dataset.technical-dataset': manifest.technicalDatasets.length,
  'api::partner.partner': 71,
  'api::global-presence.global-presence': 48,
  'api::url-alias.url-alias': 42,
}
const published = new Set([
  'api::product.product',
  'api::product-family.product-family',
  'api::industry.industry',
  'api::solution.solution',
  'api::article.article',
  'api::case-study.case-study',
  'api::case-chapter.case-chapter',
  'api::technical-dataset.technical-dataset',
])
const expectedSingles = [
  'api::site-setting.site-setting',
  'api::home-page.home-page',
  'api::about-page.about-page',
  'api::contact-page.contact-page',
  'api::navigation.navigation',
  'api::form-setting.form-setting',
]

async function verifyMigratedMedia(strapi, table, relatedType, field) {
  const connection = strapi.db.connection
  const [{ count: pathCount }] = await connection(table)
    .whereNotNull('source_path')
    .whereNot('source_path', '')
    .count({ count: '*' })
  const [{ count: linkedCount }] = await connection(`${table} as component`)
    .leftJoin('files_related_mph as relation', function joinRelation() {
      this.on('relation.related_id', '=', 'component.id')
        .andOnVal('relation.related_type', '=', relatedType)
        .andOnVal('relation.field', '=', field)
    })
    .whereNotNull('component.source_path')
    .whereNot('component.source_path', '')
    .whereNotNull('relation.file_id')
    .count({ count: '*' })
  const complete = Number(linkedCount) === Number(pathCount)
  console.log(`${complete ? '✓' : '✗'} ${relatedType}.${field} 媒体关联: ${linkedCount}/${pathCount}`)
  return complete
}

async function main() {
  const appDir = path.resolve(__dirname, '..')
  const strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'
  let failed = false
  for (const [uid, expectedCount] of Object.entries(expected)) {
    const records = await strapi.documents(uid).findMany({
      locale: 'zh',
      ...(published.has(uid) ? { status: 'published' } : {}),
      limit: 1000,
    })
    const status = records.length === expectedCount ? '✓' : '✗'
    console.log(`${status} ${uid}: ${records.length}/${expectedCount}`)
    if (records.length !== expectedCount) failed = true
  }
  for (const uid of expectedSingles) {
    const record = await strapi.documents(uid).findFirst({ locale: 'zh' })
    console.log(`${record ? '✓' : '✗'} ${uid}: ${record ? '已同步' : '缺失'}`)
    if (!record) failed = true
  }
  const englishProducts = await strapi.documents('api::product.product').findMany({
    locale: 'en',
    status: 'published',
    limit: 1,
  })
  console.log(`${englishProducts.length === 0 ? '✓' : '✗'} 英文产品保持未发布: ${englishProducts.length}`)
  if (englishProducts.length) failed = true
  const mediaCount = await strapi.db.query('plugin::upload.file').count()
  console.log(`${mediaCount > 0 ? '✓' : '✗'} 媒体库: ${mediaCount}`)
  if (!mediaCount) failed = true
  const migratedMediaChecks = await Promise.all([
    verifyMigratedMedia(strapi, 'components_shared_media_items', 'shared.media-item', 'media'),
    verifyMigratedMedia(strapi, 'components_article_images', 'article.image', 'image'),
  ])
  if (migratedMediaChecks.some((complete) => !complete)) failed = true
  await strapi.destroy()
  if (failed) process.exitCode = 1
  else console.log('✅ CMS 数据完整性验证通过')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
