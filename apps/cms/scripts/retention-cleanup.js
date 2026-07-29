'use strict'

const path = require('node:path')
const fs = require('node:fs/promises')
const { createStrapi } = require('@strapi/strapi')

let strapi

async function main() {
  const appDir = path.resolve(__dirname, '..')
  const privateRoot = path.resolve(appDir, process.env.PRIVATE_UPLOAD_DIR || '../api/.private-uploads')
  const now = new Date().toISOString()
  strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'

  const resumes = await strapi.documents('api::resume-submission.resume-submission').findMany({
    filters: {
      $or: [
        { expiresAt: { $lt: now }, retainedUntil: { $null: true } },
        { retainedUntil: { $lt: now } },
      ],
    },
    limit: 1000,
  })
  for (const record of resumes) {
    const file = path.resolve(privateRoot, record.privateFileKey)
    if (file.startsWith(`${privateRoot}/`)) await fs.unlink(file).catch(() => {})
    await strapi.documents('api::access-audit-log.access-audit-log').create({
      data: {
        actor: 'retention-worker',
        action: 'delete',
        targetType: 'resume',
        targetDocumentId: record.documentId,
        reason: 'retention expired',
        occurredAt: now,
      },
    })
    await strapi.documents('api::resume-submission.resume-submission').delete({
      documentId: record.documentId,
    })
  }

  const contacts = await strapi.documents('api::contact-submission.contact-submission').findMany({
    filters: { expiresAt: { $lt: now } },
    limit: 1000,
  })
  for (const record of contacts) {
    await strapi.documents('api::access-audit-log.access-audit-log').create({
      data: {
        actor: 'retention-worker',
        action: 'delete',
        targetType: 'contact',
        targetDocumentId: record.documentId,
        reason: 'retention expired',
        occurredAt: now,
      },
    })
    await strapi.documents('api::contact-submission.contact-submission').delete({
      documentId: record.documentId,
    })
  }
  await strapi.destroy()
  strapi = null
  console.log(`✅ 保存期限清理完成: 简历 ${resumes.length} / 联系记录 ${contacts.length}`)
}

main().catch(async (error) => {
  console.error(error)
  if (strapi) await strapi.destroy().catch(() => {})
  process.exitCode = 1
})
