'use strict'

const path = require('node:path')
const { createStrapi } = require('@strapi/strapi')

const root = path.resolve(__dirname, '../../..')
const productSlugs = {
  'dual-planetary-mixer': [
    ['/assets/images/solutions/pd-pulping/main-product-tv2.webp', '正视图'],
    ['/assets/images/solutions/pd-pulping/main-product-tv1.webp', '侧视图'],
  ],
  'dual-planetary-mixer-mid': [
    ['/assets/images/products/pd-mixer/dual-planetary-mixer-mid-tv2.webp', '正视图'],
    ['/assets/images/products/pd-mixer/dual-planetary-mixer-mid-tv1.webp', '侧视图'],
  ],
  'dual-planetary-mixer-lab': [
    ['/assets/images/products/pd-mixer/dual-planetary-mixer-lab-tv1.webp', '正视图'],
    ['/assets/images/products/pd-mixer/dual-planetary-mixer-lab-tv2.webp', '侧视图'],
  ],
}
const heroMediaNamePattern = '%hero-bg-new%'
let strapi

async function main() {
  const appDir = path.resolve(root, 'apps/cms')
  strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'
  const db = strapi.db.connection

  const result = await db.transaction(async (trx) => {
    const products = await trx('hongyun_products').select('id', 'slug')
    const productIds = products.map((item) => item.id)
    const richTextLinks = await trx('hongyun_products_cmps')
      .select('id', 'cmp_id')
      .whereIn('entity_id', productIds)
      .where({ component_type: 'content.rich-text', field: 'sections' })

    if (richTextLinks.length) {
      await trx('hongyun_products_cmps')
        .whereIn('id', richTextLinks.map((item) => item.id))
        .delete()
      await trx('components_content_rich_texts')
        .whereIn('id', richTextLinks.map((item) => item.cmp_id))
        .delete()
    }

    let galleriesUpdated = 0
    let galleryItemsKept = 0
    let galleryItemsUnlinked = 0
    let heroMediaLinksCreated = 0
    const heroMedia = await trx('files')
      .select('id')
      .where('name', 'like', heroMediaNamePattern)
      .first()
    if (!heroMedia) throw new Error('媒体库缺少双行星 Hero 背景图')

    for (const [slug, configuredViews] of Object.entries(productSlugs)) {
      const matchingProducts = products.filter((item) => item.slug === slug)
      for (const product of matchingProducts) {
        const [heroLink] = await trx('hongyun_products_cmps')
          .select('cmp_id')
          .where({
            entity_id: product.id,
            component_type: 'shared.page-hero',
            field: 'hero',
          })
          .limit(1)
        if (!heroLink) throw new Error(`产品缺少 Hero: ${slug}#${product.id}`)
        for (const field of ['desktopMedia', 'mobileMedia']) {
          const existingHeroMedia = await trx('files_related_mph')
            .select('id')
            .where({
              related_id: heroLink.cmp_id,
              related_type: 'shared.page-hero',
              field,
            })
            .first()
          if (!existingHeroMedia) {
            await trx('files_related_mph').insert({
              file_id: heroMedia.id,
              related_id: heroLink.cmp_id,
              related_type: 'shared.page-hero',
              field,
              order: 1,
            })
            heroMediaLinksCreated += 1
          }
        }

        const [galleryLink] = await trx('hongyun_products_cmps')
          .select('cmp_id')
          .where({
            entity_id: product.id,
            component_type: 'content.media-gallery',
            field: 'sections',
          })
          .orderBy('order', 'asc')
          .limit(1)
        if (!galleryLink) throw new Error(`产品缺少媒体画廊: ${slug}#${product.id}`)

        await trx('components_content_media_galleries')
          .where({ id: galleryLink.cmp_id })
          .update({
            internal_name: '产品三视图',
            title: '三视图',
            variant: 'three-view',
            layout_variant: 'three-column',
            visible: true,
          })

        const itemLinks = await trx('components_content_media_galleries_cmps as link')
          .join('components_shared_media_items as item', 'item.id', 'link.cmp_id')
          .select('link.id', 'link.cmp_id', 'item.source_path')
          .where({
            'link.entity_id': galleryLink.cmp_id,
            'link.component_type': 'shared.media-item',
            'link.field': 'items',
          })
        const viewByPath = new Map(configuredViews)
        const keptLinks = itemLinks.filter((item) => viewByPath.has(item.source_path))
        const removedLinks = itemLinks.filter((item) => !viewByPath.has(item.source_path))
        if (keptLinks.length !== configuredViews.length) {
          throw new Error(`三视图数量不匹配: ${slug}#${product.id}`)
        }

        if (removedLinks.length) {
          await trx('components_content_media_galleries_cmps')
            .whereIn('id', removedLinks.map((item) => item.id))
            .delete()
        }
        for (const [index, [sourcePath, label]] of configuredViews.entries()) {
          const itemLink = keptLinks.find((item) => item.source_path === sourcePath)
          await trx('components_content_media_galleries_cmps')
            .where({ id: itemLink.id })
            .update({ order: index + 1 })
          await trx('components_shared_media_items')
            .where({ id: itemLink.cmp_id })
            .update({ label, role: 'gallery' })
        }

        galleriesUpdated += 1
        galleryItemsKept += keptLinks.length
        galleryItemsUnlinked += removedLinks.length
      }
    }

    return {
      richTextBlocksRemoved: richTextLinks.length,
      galleriesUpdated,
      galleryItemsKept,
      galleryItemsUnlinked,
      heroMediaLinksCreated,
    }
  })

  console.log(JSON.stringify(result, null, 2))
}

main()
  .catch((error) => {
    console.error('产品内容块整理失败:')
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    if (strapi) await strapi.destroy().catch(() => {})
  })
