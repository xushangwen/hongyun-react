'use strict'

const path = require('node:path')
const fs = require('node:fs/promises')
const { execFile } = require('node:child_process')
const { promisify } = require('node:util')
const { createStrapi } = require('@strapi/strapi')

const run = promisify(execFile)
let strapi

async function main() {
  const appDir = path.resolve(__dirname, '..')
  const privateRoot = path.resolve(appDir, process.env.PRIVATE_UPLOAD_DIR || '../api/.private-uploads')
  const scanner = process.env.CLAMSCAN_BIN || 'clamscan'
  strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'
  const records = await strapi.documents('api::resume-submission.resume-submission').findMany({
    filters: { scanStatus: { $in: ['pending', 'error'] }, status: { $ne: 'deleted' } },
    limit: 100,
  })
  for (const record of records) {
    const file = path.resolve(privateRoot, record.privateFileKey)
    if (!file.startsWith(`${privateRoot}/`)) continue
    let scanStatus = 'error'
    let status = record.status
    try {
      await fs.access(file)
      await run(scanner, ['--no-summary', file], { timeout: 120_000, maxBuffer: 1024 * 1024 })
      scanStatus = 'clean'
    } catch (error) {
      if (error.code === 1) {
        scanStatus = 'blocked'
        status = 'deleted'
        await fs.unlink(file).catch(() => {})
      } else {
        console.warn(`  ! 简历扫描器不可用或执行失败: ${record.documentId}`)
      }
    }
    await strapi.documents('api::resume-submission.resume-submission').update({
      documentId: record.documentId,
      data: { scanStatus, status },
    })
  }
  await strapi.destroy()
  strapi = null
  console.log(`✅ 简历扫描处理完成: ${records.length} 条`)
}

main().catch(async (error) => {
  console.error(error)
  if (strapi) await strapi.destroy().catch(() => {})
  process.exitCode = 1
})
