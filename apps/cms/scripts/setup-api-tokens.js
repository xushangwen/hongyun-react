'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { createStrapi } = require('@strapi/strapi')

const root = path.resolve(__dirname, '../../..')
const apiEnvFile = path.resolve(root, 'apps/api/.env')
let strapi

function setEnvValue(source, key, value) {
  const line = `${key}=${value}`
  const pattern = new RegExp(`^${key}=.*$`, 'm')
  return pattern.test(source) ? source.replace(pattern, line) : `${source.trimEnd()}\n${line}\n`
}

async function ensureToken({ name, description, type, permissions }) {
  const service = strapi.service('admin::api-token-content-api')
  const existing = await strapi.db.query('admin::api-token').findOne({ where: { name } })
  if (existing) {
    const encryption = strapi.service('admin::encryption')
    return encryption.decrypt(existing.encryptedKey)
  }
  const created = await service.create({
    kind: 'content-api',
    name,
    description,
    type,
    permissions,
    lifespan: null,
  })
  return created.accessKey
}

async function main() {
  const appDir = path.resolve(root, 'apps/cms')
  strapi = await createStrapi({ appDir, distDir: appDir }).load()
  strapi.log.level = 'error'
  const readToken = await ensureToken({
    name: 'hongyun-bff-read',
    description: 'BFF 只读内容 Token',
    type: 'read-only',
    permissions: [],
  })
  const writeToken = await ensureToken({
    name: 'hongyun-bff-form-write',
    description: 'BFF 联系与简历表单 create-only Token',
    type: 'custom',
    permissions: [
      'api::contact-submission.contact-submission.create',
      'api::resume-submission.resume-submission.create',
      'api::access-audit-log.access-audit-log.create',
    ],
  })
  let env = fs.readFileSync(apiEnvFile, 'utf8')
  env = setEnvValue(env, 'NITRO_STRAPI_READ_TOKEN', readToken)
  env = setEnvValue(env, 'NITRO_STRAPI_WRITE_TOKEN', writeToken)
  fs.writeFileSync(apiEnvFile, env, { mode: 0o600 })
  await strapi.destroy()
  strapi = null
  console.log('✅ BFF 读 Token 与表单 create-only Token 已生成并写入 apps/api/.env')
}

main().catch(async (error) => {
  console.error(error)
  if (strapi) await strapi.destroy().catch(() => {})
  process.exitCode = 1
})
