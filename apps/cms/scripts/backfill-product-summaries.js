'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { createStrapi } = require('@strapi/strapi')

const root = path.resolve(__dirname, '../../..')
const manifestPath = path.resolve(root, 'scripts/migration/content-manifest.json')
const productUid = 'api::product.product'
let strapi

async function main() {
  if (!fs.existsSync(manifestPath)) {
    throw new Error('缺少 content-manifest.json，请先运行 pnpm cms:manifest')
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const summaries = new Map(
    manifest.products
      .filter((item) => typeof item.summary === 'string' && item.summary.trim())
      .map((item) => [item.legacyKey, item.summary.trim()]),
  )

  const appDir = path.resolve(root, 'apps/cms')
  strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'

  let updated = 0
  let skippedExisting = 0
  let skippedMissingSource = 0

  for (const item of manifest.products) {
    const summary = summaries.get(item.legacyKey)
    if (!summary) {
      skippedMissingSource += 1
      continue
    }

    const [document] = await strapi.documents(productUid).findMany({
      filters: { legacyKey: item.legacyKey },
      locale: 'zh',
      status: 'draft',
      limit: 1,
    })
    if (!document) throw new Error(`CMS 缺少产品: ${item.legacyKey}`)
    if (typeof document.summary === 'string' && document.summary.trim()) {
      skippedExisting += 1
      continue
    }

    await strapi.documents(productUid).update({
      documentId: document.documentId,
      locale: 'zh',
      status: 'published',
      data: { summary },
    })
    updated += 1
  }

  console.log(JSON.stringify({ updated, skippedExisting, skippedMissingSource }, null, 2))
}

main()
  .catch((error) => {
    console.error('产品介绍回填失败:')
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    if (strapi) await strapi.destroy().catch(() => {})
  })
