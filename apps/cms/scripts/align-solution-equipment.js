'use strict'

const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const { createStrapi } = require('@strapi/strapi')

const root = path.resolve(__dirname, '../../..')
const publicRoot = path.resolve(root, 'public')
const manifest = JSON.parse(fs.readFileSync(
  path.resolve(root, 'scripts/migration/content-manifest.json'),
  'utf8',
))
const mimeByExtension = {
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
}
let strapi

function uploadName(sourcePath) {
  const digest = crypto.createHash('sha1').update(sourcePath).digest('hex').slice(0, 10)
  return `${digest}-${path.basename(sourcePath)}`
}

async function ensureUpload(media) {
  const sourcePath = media?.sourcePath
  const name = uploadName(sourcePath)
  const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { name } })
  if (existing) return existing.id
  const absolutePath = media.sourceFile
    ? path.resolve(root, decodeURIComponent(media.sourceFile))
    : path.resolve(publicRoot, decodeURIComponent(sourcePath.replace(/^\/+/, '')))
  if (!fs.existsSync(absolutePath)) throw new Error(`核心设备图片不存在: ${sourcePath}`)
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

function insertedId(result) {
  return typeof result[0] === 'object' ? result[0].id : result[0]
}

async function deleteEquipmentGrid(trx, gridId) {
  const itemLinks = await trx('components_content_equipment_grids_cmps')
    .select('id', 'cmp_id')
    .where({
      entity_id: gridId,
      component_type: 'shared.equipment-item',
      field: 'items',
    })
  const itemIds = itemLinks.map((item) => item.cmp_id)
  if (itemIds.length) {
    const textLinks = await trx('components_shared_equipment_items_cmps')
      .select('id', 'cmp_id')
      .whereIn('entity_id', itemIds)
    await trx('components_shared_equipment_items_cmps')
      .whereIn('id', textLinks.map((item) => item.id))
      .delete()
    await trx('components_shared_text_items')
      .whereIn('id', textLinks.map((item) => item.cmp_id))
      .delete()
    await trx('files_related_mph')
      .whereIn('related_id', itemIds)
      .where({ related_type: 'shared.equipment-item', field: 'image' })
      .delete()
    await trx('components_shared_equipment_items').whereIn('id', itemIds).delete()
  }
  await trx('components_content_equipment_grids_cmps')
    .whereIn('id', itemLinks.map((item) => item.id))
    .delete()
  await trx('components_content_equipment_grids').where({ id: gridId }).delete()
}

async function addTextItems(trx, equipmentId, field, items) {
  for (const [index, item] of items.entries()) {
    const textId = insertedId(await trx('components_shared_text_items').insert({
      text: item.text || '',
      title: item.title || '',
      label: item.label || '',
      value: item.value || '',
      order: item.order ?? index,
    }))
    await trx('components_shared_equipment_items_cmps').insert({
      entity_id: equipmentId,
      cmp_id: textId,
      component_type: 'shared.text-item',
      field,
      order: index + 1,
    })
  }
}

async function main() {
  const appDir = path.resolve(root, 'apps/cms')
  strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'

  const specs = new Map()
  const fileBySourcePath = new Map()
  for (const solution of manifest.solutions) {
    const section = solution.sections?.find((item) => item.__component === 'content.equipment-grid') || null
    specs.set(solution.slug, section)
    for (const item of section?.items || []) {
      fileBySourcePath.set(item.image.sourcePath, await ensureUpload(item.image))
    }
  }

  const result = await strapi.db.connection.transaction(async (trx) => {
    const solutions = await trx('hongyun_solutions').select('id', 'slug')
    let gridVersions = 0
    let equipmentItems = 0
    let removedLegacyBlocks = 0
    let removedRichTextBlocks = 0

    for (const solution of solutions) {
      const section = specs.get(solution.slug)
      const currentGridLinks = await trx('hongyun_solutions_cmps')
        .select('id', 'cmp_id')
        .where({
          entity_id: solution.id,
          component_type: 'content.equipment-grid',
          field: 'sections',
        })
      if (currentGridLinks.length) {
        await trx('hongyun_solutions_cmps')
          .whereIn('id', currentGridLinks.map((item) => item.id))
          .delete()
        for (const link of currentGridLinks) await deleteEquipmentGrid(trx, link.cmp_id)
      }

      const richTextLinks = await trx('hongyun_solutions_cmps')
        .select('id', 'cmp_id')
        .where({
          entity_id: solution.id,
          component_type: 'content.rich-text',
          field: 'sections',
        })
      if (richTextLinks.length) {
        await trx('hongyun_solutions_cmps')
          .whereIn('id', richTextLinks.map((item) => item.id))
          .delete()
        await trx('components_content_rich_texts')
          .whereIn('id', richTextLinks.map((item) => item.cmp_id))
          .delete()
        removedRichTextBlocks += richTextLinks.length
      }

      const legacyTableLinks = await trx('hongyun_solutions_cmps as link')
        .join('components_content_data_tables as table', 'table.id', 'link.cmp_id')
        .select('link.id', 'link.cmp_id')
        .where({
          'link.entity_id': solution.id,
          'link.component_type': 'content.data-table',
          'link.field': 'sections',
        })
        .where((builder) => {
          builder.where('table.dataset_key', 'like', '%:features')
            .orWhere('table.dataset_key', 'like', '%:coreEquipment')
        })
      if (legacyTableLinks.length) {
        await trx('hongyun_solutions_cmps')
          .whereIn('id', legacyTableLinks.map((item) => item.id))
          .delete()
        await trx('components_content_data_tables')
          .whereIn('id', legacyTableLinks.map((item) => item.cmp_id))
          .delete()
        removedLegacyBlocks += legacyTableLinks.length
      }

      if (section?.items?.length) {
        const gridId = insertedId(await trx('components_content_equipment_grids').insert({
          internal_name: '核心设备',
          visible: true,
          title: section.title || '核心设备',
          equipment_keys: JSON.stringify([]),
          layout_variant: section.layoutVariant || 'detailed',
        }))
        await trx('hongyun_solutions_cmps').insert({
          entity_id: solution.id,
          cmp_id: gridId,
          component_type: 'content.equipment-grid',
          field: 'sections',
          order: 30,
        })

        for (const [index, item] of section.items.entries()) {
          const equipmentId = insertedId(await trx('components_shared_equipment_items').insert({
            name: item.name,
            alt: item.alt || item.name,
            feature_content: JSON.stringify(item.featureContent || []),
            image_fit: item.imageFit || 'contain',
            image_position: item.imagePosition || 'center',
          }))
          await trx('components_content_equipment_grids_cmps').insert({
            entity_id: gridId,
            cmp_id: equipmentId,
            component_type: 'shared.equipment-item',
            field: 'items',
            order: index + 1,
          })
          await trx('files_related_mph').insert({
            file_id: fileBySourcePath.get(item.image.sourcePath),
            related_id: equipmentId,
            related_type: 'shared.equipment-item',
            field: 'image',
            order: 1,
          })
          await addTextItems(trx, equipmentId, 'features', item.features || [])
          await addTextItems(trx, equipmentId, 'paragraphs', item.paragraphs || [])
          equipmentItems += 1
        }
        gridVersions += 1
      }

      const links = await trx('hongyun_solutions_cmps')
        .select('id', 'component_type', 'order')
        .where({ entity_id: solution.id, field: 'sections' })
      const priority = {
        'content.media-gallery': 10,
        'content.feature-grid': 20,
        'content.equipment-grid': 30,
        'content.data-table': 40,
        'special.renderer': 50,
        'content.case-list': 60,
      }
      const sorted = links.sort((a, b) => (
        (priority[a.component_type] || 70) - (priority[b.component_type] || 70)
        || a.order - b.order
      ))
      for (const [index, link] of sorted.entries()) {
        await trx('hongyun_solutions_cmps').where({ id: link.id }).update({ order: index + 1 })
      }
    }

    return {
      solutionVersions: solutions.length,
      gridVersions,
      logicalGrids: gridVersions / 2,
      equipmentItems,
      logicalEquipmentItems: equipmentItems / 2,
      removedLegacyBlocks,
      removedRichTextBlocks,
    }
  })

  console.log(JSON.stringify(result, null, 2))
}

main()
  .catch((error) => {
    console.error('行业方案核心设备对齐失败:')
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    if (strapi) await strapi.destroy().catch(() => {})
  })
