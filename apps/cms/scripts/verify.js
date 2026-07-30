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
  'api::case-study.case-study': 5,
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
const allowAdditionalRecords = new Set([
  'api::technical-dataset.technical-dataset',
])

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

async function verifyInlineDataTables(strapi) {
  const connection = strapi.db.connection
  const componentIds = new Set()
  for (const linkTable of ['hongyun_products_cmps', 'hongyun_solutions_cmps']) {
    const links = await connection(linkTable)
      .select('cmp_id')
      .where({ component_type: 'content.data-table', field: 'sections' })
    for (const link of links) componentIds.add(link.cmp_id)
  }
  const [{ total, complete }] = await connection('components_content_data_tables')
    .whereIn('id', [...componentIds])
    .count({ total: '*' })
    .count({ complete: connection.raw('CASE WHEN columns IS NOT NULL AND rows IS NOT NULL THEN 1 END') })
  const passed = Number(total) === Number(complete)
  console.log(`${passed ? '✓' : '✗'} 产品/解决方案内嵌数据表: ${complete}/${total}`)
  return passed
}

async function verifyDetailPresentation(strapi) {
  const connection = strapi.db.connection
  const configs = [
    {
      label: '产品',
      entityTable: 'hongyun_products',
      linkTable: 'hongyun_products_cmps',
      items: manifest.products,
    },
    {
      label: '行业方案',
      entityTable: 'hongyun_solutions',
      linkTable: 'hongyun_solutions_cmps',
      items: manifest.solutions,
    },
  ]
  let versions = 0
  let complete = 0

  for (const config of configs) {
    const expectedBySlug = new Map(config.items.map((item) => [
      item.slug,
      item.sections?.find((section) => section.variant === 'three-view') || null,
    ]))
    const records = await connection(config.entityTable).select('id', 'slug')
    for (const record of records) {
      versions += 1
      const hero = await connection(`${config.linkTable} as link`)
        .join('files_related_mph as relation', function joinHeroMedia() {
          this.on('relation.related_id', '=', 'link.cmp_id')
            .andOnVal('relation.related_type', '=', 'shared.page-hero')
        })
        .where({
          'link.entity_id': record.id,
          'link.component_type': 'shared.page-hero',
          'link.field': 'hero',
        })
        .whereIn('relation.field', ['desktopMedia', 'mobileMedia'])
        .countDistinct({ count: 'relation.field' })
        .first()
      const galleryLinks = await connection(config.linkTable)
        .select('cmp_id')
        .where({
          entity_id: record.id,
          component_type: 'content.media-gallery',
          field: 'sections',
        })
      const expectedGallery = expectedBySlug.get(record.slug)
      let galleryComplete = galleryLinks.length === (expectedGallery ? 1 : 0)
      if (galleryComplete && expectedGallery) {
        const gallery = await connection('components_content_media_galleries')
          .select('variant')
          .where({ id: galleryLinks[0].cmp_id })
          .first()
        const items = await connection('components_content_media_galleries_cmps as link')
          .join('components_shared_media_items as item', 'item.id', 'link.cmp_id')
          .select('item.source_path')
          .where({
            'link.entity_id': galleryLinks[0].cmp_id,
            'link.component_type': 'shared.media-item',
            'link.field': 'items',
          })
          .orderBy('link.order', 'asc')
        galleryComplete = gallery?.variant === 'three-view'
          && JSON.stringify(items.map((item) => item.source_path))
            === JSON.stringify(expectedGallery.items.map((item) => item.sourcePath))
      }
      if (Number(hero?.count) === 2 && galleryComplete) complete += 1
    }
    console.log(`✓ ${config.label} Hero/三视图版本: ${records.length}`)
  }

  const passed = complete === versions
  console.log(`${passed ? '✓' : '✗'} 产品/行业方案 Hero 与三视图对齐: ${complete}/${versions}`)
  return passed
}

async function verifySolutionEquipment(strapi) {
  const connection = strapi.db.connection
  const expectedBySlug = new Map(manifest.solutions.map((solution) => [
    solution.slug,
    solution.sections?.find((section) => section.__component === 'content.equipment-grid') || null,
  ]))
  const solutions = await connection('hongyun_solutions').select('id', 'slug')
  let complete = 0

  for (const solution of solutions) {
    const expectedSection = expectedBySlug.get(solution.slug)
    const gridLinks = await connection('hongyun_solutions_cmps')
      .select('cmp_id')
      .where({
        entity_id: solution.id,
        component_type: 'content.equipment-grid',
        field: 'sections',
      })
    let valid = gridLinks.length === (expectedSection ? 1 : 0)
    if (valid && expectedSection) {
      const grid = await connection('components_content_equipment_grids')
        .select('layout_variant')
        .where({ id: gridLinks[0].cmp_id })
        .first()
      const items = await connection('components_content_equipment_grids_cmps as link')
        .join('components_shared_equipment_items as item', 'item.id', 'link.cmp_id')
        .leftJoin('files_related_mph as relation', function joinEquipmentImage() {
          this.on('relation.related_id', '=', 'item.id')
            .andOnVal('relation.related_type', '=', 'shared.equipment-item')
            .andOnVal('relation.field', '=', 'image')
        })
        .select('item.name', 'item.feature_content', 'relation.file_id')
        .where({
          'link.entity_id': gridLinks[0].cmp_id,
          'link.component_type': 'shared.equipment-item',
          'link.field': 'items',
        })
        .orderBy('link.order', 'asc')
      valid = grid?.layout_variant === expectedSection.layoutVariant
        && items.every((item) => item.file_id)
        && JSON.stringify(items.map((item) => item.name))
          === JSON.stringify(expectedSection.items.map((item) => item.name))
        && items.every((item, index) => {
          const actual = typeof item.feature_content === 'string'
            ? JSON.parse(item.feature_content)
            : item.feature_content
          return JSON.stringify(actual || [])
            === JSON.stringify(expectedSection.items[index].featureContent || [])
        })
    }
    if (valid) complete += 1
  }

  const passed = complete === solutions.length
  console.log(`${passed ? '✓' : '✗'} 行业方案核心设备对齐: ${complete}/${solutions.length}`)
  return passed
}

async function verifyProductCatalogRelations(strapi) {
  const products = await strapi.documents('api::product.product').findMany({
    locale: 'zh',
    status: 'published',
    limit: 100,
    populate: ['categories', 'groups'],
  })
  const expectedByProduct = new Map(manifest.products.map((product) => {
    const placements = manifest.placements.filter(
      (placement) => placement.productKey === product.legacyKey,
    )
    return [product.legacyKey, {
      categories: [...new Set(placements.map((placement) => placement.categoryKey))].sort(),
      groups: [...new Set(placements.map((placement) => placement.groupKey).filter(Boolean))].sort(),
    }]
  }))
  let complete = 0
  for (const product of products) {
    const expectedRelations = expectedByProduct.get(product.legacyKey)
    const categories = (product.categories ?? []).map((item) => item.legacyKey).sort()
    const groups = (product.groups ?? []).map((item) => item.legacyKey).sort()
    if (expectedRelations
      && JSON.stringify(categories) === JSON.stringify(expectedRelations.categories)
      && JSON.stringify(groups) === JSON.stringify(expectedRelations.groups)) {
      complete += 1
    }
  }
  const passed = complete === manifest.products.length
  console.log(`${passed ? '✓' : '✗'} 产品中心行业/系统关系: ${complete}/${manifest.products.length}`)
  return passed
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
    const complete = allowAdditionalRecords.has(uid)
      ? records.length >= expectedCount
      : records.length === expectedCount
    const status = complete ? '✓' : '✗'
    const expectation = allowAdditionalRecords.has(uid) ? `≥${expectedCount}` : expectedCount
    console.log(`${status} ${uid}: ${records.length}/${expectation}`)
    if (!complete) failed = true
  }
  for (const uid of expectedSingles) {
    const record = await strapi.documents(uid).findFirst({ locale: 'zh' })
    console.log(`${record ? '✓' : '✗'} ${uid}: ${record ? '已同步' : '缺失'}`)
    if (!record) failed = true
  }
  const home = await strapi.documents('api::home-page.home-page').findFirst({
    locale: 'zh',
    status: 'published',
    populate: [
      'heroSlides',
      'newsSection',
      'aboutSection',
      'researchSection',
      'partnerSection',
      'contactSection',
    ],
  })
  const homeModules = [
    home?.heroSlides?.length,
    home?.newsSection,
    home?.aboutSection,
    home?.researchSection,
    home?.partnerSection,
    home?.contactSection,
  ]
  const homeComplete = homeModules.every(Boolean)
  console.log(`${homeComplete ? '✓' : '✗'} 首页六类模块结构: ${homeComplete ? '完整' : '缺失'}`)
  if (!homeComplete) failed = true
  const site = await strapi.documents('api::site-setting.site-setting').findFirst({ locale: 'zh' })
  const siteComplete = Boolean(site?.phone && site?.email)
  console.log(`${siteComplete ? '✓' : '✗'} 站点商务电话与邮箱: ${siteComplete ? '已配置' : '缺失'}`)
  if (!siteComplete) failed = true
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
  if (!await verifyInlineDataTables(strapi)) failed = true
  if (!await verifyDetailPresentation(strapi)) failed = true
  if (!await verifySolutionEquipment(strapi)) failed = true
  if (!await verifyProductCatalogRelations(strapi)) failed = true
  await strapi.destroy()
  if (failed) process.exitCode = 1
  else console.log('✅ CMS 数据完整性验证通过')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
