import { randomBytes } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const targets = [
  {
    file: resolve(root, 'apps/cms/.env'),
    content: () => {
      const secret = () => randomBytes(32).toString('base64url')
      return [
        'HOST=127.0.0.1',
        'PORT=1337',
        'PUBLIC_URL=http://127.0.0.1:1337',
        'IS_PROXIED=false',
        'CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3001,http://127.0.0.1:3001',
        `APP_KEYS=${secret()},${secret()},${secret()},${secret()}`,
        `API_TOKEN_SALT=${secret()}`,
        `ADMIN_JWT_SECRET=${secret()}`,
        `TRANSFER_TOKEN_SALT=${secret()}`,
        `JWT_SECRET=${secret()}`,
        `ENCRYPTION_KEY=${secret()}`,
        'DATABASE_CLIENT=sqlite',
        'DATABASE_FILENAME=.tmp/data.db',
        'PRIVATE_UPLOAD_DIR=../api/.private-uploads',
        'CLAMSCAN_BIN=clamscan',
        'CMS_ADMIN_EMAIL=admin@hongyun.local',
        `CMS_ADMIN_PASSWORD=Hy-${secret().slice(0, 20)}!`,
      ].join('\n')
    },
  },
  {
    file: resolve(root, 'apps/api/.env'),
    content: () => [
      'NITRO_HOST=127.0.0.1',
      'NITRO_PORT=3001',
      'NITRO_STRAPI_URL=http://127.0.0.1:1337',
      'NITRO_STRAPI_PUBLIC_URL=http://127.0.0.1:1337',
      'NITRO_STRAPI_READ_TOKEN=',
      'NITRO_STRAPI_WRITE_TOKEN=',
      `NITRO_CMS_WEBHOOK_SECRET=${randomBytes(32).toString('base64url')}`,
      `NITRO_FORM_ENCRYPTION_KEY=${randomBytes(32).toString('hex')}`,
      'NITRO_PRIVATE_UPLOAD_DIR=.private-uploads',
      'NITRO_RESUME_RETENTION_DAYS=180',
      `NITRO_RECRUITER_TOKEN=${randomBytes(32).toString('base64url')}`,
    ].join('\n'),
  },
]

for (const target of targets) {
  if (existsSync(target.file)) {
    if (target.file.endsWith('apps/cms/.env')) {
      let current = readFileSync(target.file, 'utf8')
      if (!current.includes('CMS_ADMIN_EMAIL=')) {
        const password = `Hy-${randomBytes(15).toString('base64url')}!`
        current = `${current.trimEnd()}\nCMS_ADMIN_EMAIL=admin@hongyun.local\nCMS_ADMIN_PASSWORD=${password}\n`
      }
      if (!current.includes('PRIVATE_UPLOAD_DIR=')) current = `${current.trimEnd()}\nPRIVATE_UPLOAD_DIR=../api/.private-uploads\n`
      if (!current.includes('CLAMSCAN_BIN=')) current = `${current.trimEnd()}\nCLAMSCAN_BIN=clamscan\n`
      writeFileSync(target.file, current, { mode: 0o600 })
      console.log(`updated ${target.file}`)
    }
    if (target.file.endsWith('apps/api/.env')) {
      let current = readFileSync(target.file, 'utf8')
      const readValue = (key) => current.match(new RegExp(`^${key}=(.*)$`, 'm'))?.[1] ?? ''
      const ensure = (key, value) => {
        if (!current.includes(`${key}=`)) current = `${current.trimEnd()}\n${key}=${value}\n`
      }
      ensure('NITRO_STRAPI_URL', readValue('STRAPI_URL') || 'http://127.0.0.1:1337')
      ensure('NITRO_STRAPI_PUBLIC_URL', readValue('STRAPI_PUBLIC_URL') || 'http://127.0.0.1:1337')
      ensure('NITRO_CMS_WEBHOOK_SECRET', readValue('CMS_WEBHOOK_SECRET') || randomBytes(32).toString('base64url'))
      ensure('NITRO_FORM_ENCRYPTION_KEY', readValue('FORM_ENCRYPTION_KEY') || randomBytes(32).toString('hex'))
      ensure('NITRO_PRIVATE_UPLOAD_DIR', readValue('PRIVATE_UPLOAD_DIR') || '.private-uploads')
      ensure('NITRO_RESUME_RETENTION_DAYS', readValue('RESUME_RETENTION_DAYS') || '180')
      ensure('NITRO_RECRUITER_TOKEN', readValue('RECRUITER_TOKEN') || randomBytes(32).toString('base64url'))
      writeFileSync(target.file, current, { mode: 0o600 })
      console.log(`updated ${target.file}`)
    }
    continue
  }
  mkdirSync(dirname(target.file), { recursive: true })
  writeFileSync(target.file, `${target.content()}\n`, { mode: 0o600 })
  console.log(`created ${target.file}`)
}

const apiEnvFile = resolve(root, 'apps/api/.env')
const cmsEnvFile = resolve(root, 'apps/cms/.env')
let apiEnv = readFileSync(apiEnvFile, 'utf8')
let cmsEnv = readFileSync(cmsEnvFile, 'utf8')
const envValue = (content, key) => content.match(new RegExp(`^${key}=(.*)$`, 'm'))?.[1] ?? ''
const setEnvValue = (content, key, value) => {
  if (new RegExp(`^${key}=`, 'm').test(content)) {
    return content.replace(new RegExp(`^${key}=.*$`, 'm'), `${key}=${value}`)
  }
  return `${content.trimEnd()}\n${key}=${value}\n`
}
let webhookSecret = envValue(apiEnv, 'NITRO_CMS_WEBHOOK_SECRET')
if (!webhookSecret) {
  webhookSecret = randomBytes(32).toString('base64url')
  apiEnv = setEnvValue(apiEnv, 'NITRO_CMS_WEBHOOK_SECRET', webhookSecret)
  writeFileSync(apiEnvFile, apiEnv, { mode: 0o600 })
}
cmsEnv = setEnvValue(cmsEnv, 'BFF_WEBHOOK_URL', 'http://127.0.0.1:3001/api/cms/webhook')
cmsEnv = setEnvValue(cmsEnv, 'CMS_WEBHOOK_SECRET', webhookSecret)
writeFileSync(cmsEnvFile, cmsEnv, { mode: 0o600 })
console.log(`synchronized CMS webhook configuration`)
