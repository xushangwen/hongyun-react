'use strict'

const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const { createStrapi } = require('@strapi/strapi')

const root = path.resolve(__dirname, '../../..')
const manifest = JSON.parse(fs.readFileSync(
  path.resolve(root, 'scripts/migration/content-manifest.json'),
  'utf8',
))
const publicRoot = path.resolve(root, 'public')
const mimeByExtension = {
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}
let strapi

function uploadName(sourcePath) {
  const digest = crypto.createHash('sha1').update(sourcePath).digest('hex').slice(0, 10)
  return `${digest}-${path.basename(sourcePath)}`
}

async function ensureUpload(sourcePath, alt) {
  if (!sourcePath) return null
  const name = uploadName(sourcePath)
  const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { name } })
  if (existing) return existing.id
  const absolutePath = sourcePath.startsWith('/src/')
    ? path.resolve(root, sourcePath.slice(1))
    : path.resolve(publicRoot, sourcePath.replace(/^\/+/, ''))
  if (!fs.existsSync(absolutePath)) throw new Error(`媒体源文件不存在: ${sourcePath}`)
  const extension = path.extname(absolutePath).toLowerCase()
  const mime = mimeByExtension[extension] || 'application/octet-stream'
  const stats = fs.statSync(absolutePath)
  const [file] = await strapi.plugin('upload').service('upload').upload({
    data: {
      fileInfo: {
        name,
        alternativeText: alt || path.parse(sourcePath).name,
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

async function ensureAutoProductionCase() {
  const spec = manifest.cases.find((item) => item.legacyKey === 'case:auto-production-shenglong-project')
  if (!spec) throw new Error('清单缺少盛龙项目案例')
  const existing = await strapi.documents('api::case-study.case-study').findMany({
    filters: { legacyKey: spec.legacyKey },
    locale: 'zh',
    limit: 1,
  })
  if (existing[0]) return { created: false, documentId: existing[0].documentId }

  const solution = await strapi.documents('api::solution.solution').findMany({
    filters: { legacyKey: 'solution:auto-production' },
    locale: 'zh',
    limit: 1,
  })
  if (!solution[0]) throw new Error('CMS 缺少全自动生产系统')

  const sourceSection = spec.sections[0]
  const videoId = await ensureUpload(sourceSection.video.sourcePath, sourceSection.video.alt)
  const posterId = await ensureUpload(sourceSection.poster.sourcePath, sourceSection.poster.alt)
  const created = await strapi.documents('api::case-study.case-study').create({
    locale: 'zh',
    status: 'published',
    data: {
      title: spec.title,
      slug: spec.slug,
      caseType: spec.caseType,
      summary: spec.summary,
      confidentialityLevel: spec.confidentialityLevel,
      legacyKey: spec.legacyKey,
      relatedSolutions: { connect: [solution[0].documentId] },
      sections: [{
        __component: 'content.video',
        internalName: sourceSection.internalName,
        visible: true,
        title: sourceSection.title,
        video: {
          label: sourceSection.video.label,
          media: videoId,
          alt: sourceSection.video.alt,
          role: 'video',
          sourcePath: sourceSection.video.sourcePath,
        },
        poster: {
          label: sourceSection.poster.label,
          media: posterId,
          alt: sourceSection.poster.alt,
          role: 'cover',
          sourcePath: sourceSection.poster.sourcePath,
        },
      }],
    },
  })
  return { created: true, documentId: created.documentId }
}

async function main() {
  const appDir = path.resolve(root, 'apps/cms')
  strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'

  const coverIds = new Map()
  for (const solution of manifest.solutions) {
    coverIds.set(solution.slug, await ensureUpload(solution.coverPath, solution.name))
  }
  const caseResult = await ensureAutoProductionCase()
  const db = strapi.db.connection

  const result = await db.transaction(async (trx) => {
    let summariesUpdated = 0
    let coversUpdated = 0
    let caseListsCreated = 0

    for (const solution of manifest.solutions) {
      const rows = await trx('hongyun_solutions').select('id', 'summary').where({ slug: solution.slug })
      for (const row of rows) {
        if (!String(row.summary || '').trim() && solution.summary) {
          await trx('hongyun_solutions').where({ id: row.id }).update({
            summary: solution.summary,
            updated_at: new Date(),
          })
          summariesUpdated += 1
        }

        const coverId = coverIds.get(solution.slug)
        if (coverId) {
          const existingCover = await trx('files_related_mph').where({
            related_id: row.id,
            related_type: 'api::solution.solution',
            field: 'cover',
          }).first()
          if (!existingCover) {
            await trx('files_related_mph').insert({
              file_id: coverId,
              related_id: row.id,
              related_type: 'api::solution.solution',
              field: 'cover',
              order: 1,
            })
            coversUpdated += 1
          }
        }
      }
    }

    const autoCaseSection = manifest.solutions
      .find((item) => item.slug === 'auto-production')
      ?.sections.find((section) => section.__component === 'content.case-list')
    if (!autoCaseSection) throw new Error('清单缺少全自动生产系统案例列表')

    const autoRows = await trx('hongyun_solutions').select('id').where({ slug: 'auto-production' })
    for (const row of autoRows) {
      const existing = await trx('hongyun_solutions_cmps').where({
        entity_id: row.id,
        component_type: 'content.case-list',
        field: 'sections',
      }).first()
      if (existing) continue
      const inserted = await trx('components_content_case_lists').insert({
        internal_name: autoCaseSection.internalName,
        visible: true,
        title: autoCaseSection.title,
        case_keys: JSON.stringify(autoCaseSection.caseKeys),
        layout_variant: autoCaseSection.layoutVariant,
      })
      const componentId = typeof inserted[0] === 'object' ? inserted[0].id : inserted[0]
      const maxOrder = await trx('hongyun_solutions_cmps')
        .where({ entity_id: row.id, field: 'sections' })
        .max({ value: 'order' })
        .first()
      await trx('hongyun_solutions_cmps').insert({
        entity_id: row.id,
        cmp_id: componentId,
        component_type: 'content.case-list',
        field: 'sections',
        order: Number(maxOrder?.value || 0) + 1,
      })
      caseListsCreated += 1
    }

    return {
      summariesUpdated,
      coversUpdated,
      caseListsCreated,
      autoProductionCaseCreated: caseResult.created,
    }
  })

  console.log(JSON.stringify(result, null, 2))
}

main()
  .catch((error) => {
    console.error('行业方案上线内容补齐失败:')
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    if (strapi) await strapi.destroy().catch(() => {})
  })
