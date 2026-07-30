'use strict'

const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const { createStrapi } = require('@strapi/strapi')

const root = path.resolve(__dirname, '../../..')
const manifestPath = path.resolve(root, 'scripts/migration/content-manifest.json')
const publicRoot = path.resolve(root, 'public')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const mimeByExtension = {
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}
let strapi

function uploadName(sourcePath) {
  const digest = crypto.createHash('sha1').update(sourcePath).digest('hex').slice(0, 10)
  return `${digest}-${path.basename(sourcePath)}`
}

async function ensureUpload(media) {
  const sourcePath = media?.sourcePath
  if (!sourcePath) return null
  const name = uploadName(sourcePath)
  const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { name } })
  if (existing) return existing.id

  const absolutePath = media.sourceFile
    ? path.resolve(root, decodeURIComponent(media.sourceFile))
    : sourcePath.startsWith('/src/')
      ? path.resolve(root, sourcePath.slice(1))
      : path.resolve(publicRoot, decodeURIComponent(sourcePath.replace(/^\/+/, '')))
  if (!fs.existsSync(absolutePath)) throw new Error(`媒体源文件不存在: ${sourcePath}`)

  const extension = path.extname(absolutePath).toLowerCase()
  const stats = fs.statSync(absolutePath)
  const mime = mimeByExtension[extension] || 'application/octet-stream'
  const [file] = await strapi.plugin('upload').service('upload').upload({
    data: {
      fileInfo: {
        name,
        alternativeText: media.alt || path.parse(sourcePath).name,
        caption: '',
      },
    },
    files: {
      filepath: absolutePath,
      originalFileName: name,
      originalFilename: name,
      mimetype: mime,
      type: mime,
      size: stats.size,
    },
  })
  return file.id
}

function presentationSpec(items) {
  return new Map(items.map((item) => [
    item.slug,
    {
      heroPath: item.hero?.desktopMedia?.sourcePath || item.hero?.mobileMedia?.sourcePath || null,
      gallery: item.sections?.find((section) => (
        section.__component === 'content.media-gallery'
        && section.variant === 'three-view'
      )) || null,
    },
  ]))
}

async function deleteMediaItems(trx, itemIds) {
  if (!itemIds.length) return
  await trx('files_related_mph')
    .whereIn('related_id', itemIds)
    .where({ related_type: 'shared.media-item' })
    .delete()
  await trx('components_shared_media_items').whereIn('id', itemIds).delete()
}

async function deleteGalleries(trx, galleryIds) {
  if (!galleryIds.length) return 0
  const itemLinks = await trx('components_content_media_galleries_cmps')
    .select('id', 'cmp_id')
    .whereIn('entity_id', galleryIds)
    .where({ component_type: 'shared.media-item', field: 'items' })
  await trx('components_content_media_galleries_cmps')
    .whereIn('id', itemLinks.map((item) => item.id))
    .delete()
  await deleteMediaItems(trx, itemLinks.map((item) => item.cmp_id))
  await trx('components_content_media_galleries').whereIn('id', galleryIds).delete()
  return itemLinks.length
}

async function alignCollection(trx, config, specs, fileBySourcePath) {
  const records = await trx(config.entityTable).select('id', 'slug')
  let heroVersions = 0
  let galleryVersions = 0
  let galleryItems = 0
  let galleriesRemoved = 0
  let galleryItemsRemoved = 0

  for (const record of records) {
    const spec = specs.get(record.slug)
    if (!spec) throw new Error(`清单缺少 ${config.label}: ${record.slug}`)
    if (!spec.heroPath) throw new Error(`${config.label}缺少 Hero 配置: ${record.slug}`)
    const heroFileId = fileBySourcePath.get(spec.heroPath)
    if (!heroFileId) throw new Error(`媒体库缺少 Hero 文件: ${record.slug} -> ${spec.heroPath}`)

    const heroLink = await trx(config.linkTable)
      .select('cmp_id')
      .where({
        entity_id: record.id,
        component_type: 'shared.page-hero',
        field: 'hero',
      })
      .first()
    if (!heroLink) throw new Error(`${config.label}缺少 Hero 组件: ${record.slug}#${record.id}`)

    await trx('files_related_mph')
      .where({
        related_id: heroLink.cmp_id,
        related_type: 'shared.page-hero',
      })
      .whereIn('field', ['desktopMedia', 'mobileMedia'])
      .delete()
    await trx('files_related_mph').insert([
      {
        file_id: heroFileId,
        related_id: heroLink.cmp_id,
        related_type: 'shared.page-hero',
        field: 'desktopMedia',
        order: 1,
      },
      {
        file_id: heroFileId,
        related_id: heroLink.cmp_id,
        related_type: 'shared.page-hero',
        field: 'mobileMedia',
        order: 1,
      },
    ])
    heroVersions += 1

    const galleryLinks = await trx(config.linkTable)
      .select('id', 'cmp_id', 'order')
      .where({
        entity_id: record.id,
        component_type: 'content.media-gallery',
        field: 'sections',
      })
      .orderBy('order', 'asc')

    if (!spec.gallery) {
      if (galleryLinks.length) {
        await trx(config.linkTable).whereIn('id', galleryLinks.map((item) => item.id)).delete()
        galleriesRemoved += galleryLinks.length
        galleryItemsRemoved += await deleteGalleries(trx, galleryLinks.map((item) => item.cmp_id))
      }
      continue
    }
    if (!galleryLinks.length) throw new Error(`${config.label}缺少三视图候选画廊: ${record.slug}#${record.id}`)

    const primary = galleryLinks[0]
    const extraGalleryIds = galleryLinks.slice(1).map((item) => item.cmp_id)
    const allGalleryIds = galleryLinks.map((item) => item.cmp_id)
    const itemLinks = await trx('components_content_media_galleries_cmps as link')
      .join('components_shared_media_items as item', 'item.id', 'link.cmp_id')
      .select('link.id', 'link.entity_id', 'link.cmp_id', 'item.source_path')
      .whereIn('link.entity_id', allGalleryIds)
      .where({
        'link.component_type': 'shared.media-item',
        'link.field': 'items',
      })
    const expectedItems = spec.gallery.items || []
    const expectedPaths = new Set(expectedItems.map((item) => item.sourcePath))
    const keptItemIds = []

    for (const [index, expected] of expectedItems.entries()) {
      let itemLink = itemLinks.find((item) => item.source_path === expected.sourcePath)
      if (!itemLink) {
        const inserted = await trx('components_shared_media_items').insert({
          source_path: expected.sourcePath,
          label: expected.label,
          alt: expected.alt,
          role: 'gallery',
          image_fit: 'contain',
          image_position: 'center',
          aspect_variant: 'auto',
        })
        const itemId = typeof inserted[0] === 'object' ? inserted[0].id : inserted[0]
        const [nestedLinkId] = await trx('components_content_media_galleries_cmps').insert({
          entity_id: primary.cmp_id,
          cmp_id: itemId,
          component_type: 'shared.media-item',
          field: 'items',
          order: index + 1,
        })
        await trx('files_related_mph').insert({
          file_id: fileBySourcePath.get(expected.sourcePath),
          related_id: itemId,
          related_type: 'shared.media-item',
          field: 'media',
          order: 1,
        })
        itemLink = {
          id: typeof nestedLinkId === 'object' ? nestedLinkId.id : nestedLinkId,
          entity_id: primary.cmp_id,
          cmp_id: itemId,
          source_path: expected.sourcePath,
        }
      }
      keptItemIds.push(itemLink.cmp_id)
      await trx('components_content_media_galleries_cmps')
        .where({ id: itemLink.id })
        .update({ entity_id: primary.cmp_id, order: index + 1 })
      await trx('components_shared_media_items')
        .where({ id: itemLink.cmp_id })
        .update({
          label: expected.label,
          alt: expected.alt,
          role: 'gallery',
          image_fit: 'contain',
          image_position: 'center',
          aspect_variant: 'auto',
        })
    }

    const removedItemLinks = itemLinks.filter((item) => !expectedPaths.has(item.source_path))
    if (removedItemLinks.length) {
      await trx('components_content_media_galleries_cmps')
        .whereIn('id', removedItemLinks.map((item) => item.id))
        .delete()
      await deleteMediaItems(trx, removedItemLinks.map((item) => item.cmp_id))
      galleryItemsRemoved += removedItemLinks.length
    }

    await trx('components_content_media_galleries')
      .where({ id: primary.cmp_id })
      .update({
        internal_name: '三视图',
        title: '三视图',
        variant: 'three-view',
        layout_variant: spec.gallery.layoutVariant || 'three-column',
        visible: true,
      })

    if (extraGalleryIds.length) {
      await trx(config.linkTable)
        .whereIn('id', galleryLinks.slice(1).map((item) => item.id))
        .delete()
      galleriesRemoved += extraGalleryIds.length
      galleryItemsRemoved += await deleteGalleries(trx, extraGalleryIds)
    }

    galleryVersions += 1
    galleryItems += keptItemIds.length
  }

  return {
    heroVersions,
    galleryVersions,
    galleryItems,
    galleriesRemoved,
    galleryItemsRemoved,
  }
}

async function main() {
  const appDir = path.resolve(root, 'apps/cms')
  strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'
  const db = strapi.db.connection
  const specs = [
    ...manifest.products.map((item) => item.hero?.desktopMedia || item.hero?.mobileMedia),
    ...manifest.solutions.map((item) => item.hero?.desktopMedia || item.hero?.mobileMedia),
    ...manifest.products.flatMap((item) => (
      item.sections?.find((section) => section.variant === 'three-view')?.items || []
    )),
    ...manifest.solutions.flatMap((item) => (
      item.sections?.find((section) => section.variant === 'three-view')?.items || []
    )),
  ].filter((item) => item?.sourcePath)
  const uniqueMedia = [...new Map(specs.map((item) => [item.sourcePath, item])).values()]
  const fileBySourcePath = new Map()
  for (const media of uniqueMedia) {
    fileBySourcePath.set(media.sourcePath, await ensureUpload(media))
  }

  const result = await db.transaction(async (trx) => {
    const products = await alignCollection(
      trx,
      {
        label: '产品',
        entityTable: 'hongyun_products',
        linkTable: 'hongyun_products_cmps',
      },
      presentationSpec(manifest.products),
      fileBySourcePath,
    )
    const solutions = await alignCollection(
      trx,
      {
        label: '行业方案',
        entityTable: 'hongyun_solutions',
        linkTable: 'hongyun_solutions_cmps',
      },
      presentationSpec(manifest.solutions),
      fileBySourcePath,
    )
    return { products, solutions }
  })

  console.log(JSON.stringify(result, null, 2))
}

main()
  .catch((error) => {
    console.error('产品/行业方案 Hero 与三视图对齐失败:')
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    if (strapi) await strapi.destroy().catch(() => {})
  })
