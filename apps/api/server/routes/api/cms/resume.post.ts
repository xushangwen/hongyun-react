import { mkdir, unlink, writeFile } from 'node:fs/promises'
import { randomBytes } from 'node:crypto'
import { extname, resolve } from 'node:path'
import {
  createError,
  defineEventHandler,
  readMultipartFormData,
  setResponseHeader,
} from 'h3'
import { resumeMetadataSchema } from '@hongyun/contracts'
import { strapiFetch } from '~/utils/cms'
import {
  consumeRateLimit,
  encryptPrivate,
  fingerprint,
  maskEmail,
  maskPhone,
  verifyResumeSignature,
} from '~/utils/security'

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  if (!parts) throw createError({ statusCode: 400, statusMessage: 'multipart form required' })
  const fields: Record<string, string> = {}
  let file: { filename?: string; type?: string; data: Buffer } | null = null
  for (const part of parts) {
    if (part.filename) file = { filename: part.filename, type: part.type, data: Buffer.from(part.data) }
    else if (part.name) fields[part.name] = Buffer.from(part.data).toString('utf8')
  }
  if (fields.website || fields.url) return { ok: true }
  const parsed = resumeMetadataSchema.safeParse(fields)
  if (!parsed.success || !file?.filename || !file.type) {
    throw createError({ statusCode: 400, statusMessage: 'invalid resume payload' })
  }
  if (file.data.byteLength > 10 * 1024 * 1024) {
    throw createError({ statusCode: 413, statusMessage: 'resume file too large' })
  }
  if (!verifyResumeSignature(file.filename, file.type, file.data)) {
    throw createError({ statusCode: 400, statusMessage: 'unsupported resume file' })
  }
  const fingerprintHash = fingerprint(event)
  const rate = consumeRateLimit(`resume:${fingerprintHash}`, 3, 60 * 60_000)
  if (!rate.allowed) {
    setResponseHeader(event, 'Retry-After', Math.max(1, Math.ceil(rate.retryAfterMs / 1000)))
    throw createError({ statusCode: 429, statusMessage: 'too many submissions' })
  }
  const config = useRuntimeConfig()
  const extension = extname(file.filename).toLowerCase()
  const privateFileKey = `${new Date().toISOString().slice(0, 10)}/${randomBytes(24).toString('hex')}${extension}`
  const privateRoot = resolve(process.cwd(), config.privateUploadDir)
  const target = resolve(privateRoot, privateFileKey)
  if (!target.startsWith(`${privateRoot}/`)) throw createError({ statusCode: 500, statusMessage: 'invalid upload path' })
  await mkdir(resolve(target, '..'), { recursive: true, mode: 0o700 })
  await writeFile(target, file.data, { mode: 0o600 })
  const expiresAt = new Date(Date.now() + Number(config.resumeRetentionDays) * 24 * 60 * 60_000).toISOString()
  try {
    await strapiFetch('/resume-submissions', {
      method: 'POST',
      write: true,
      body: {
        data: {
          name: parsed.data.name,
          phoneMasked: maskPhone(parsed.data.phone),
          emailMasked: maskEmail(parsed.data.email || ''),
          phoneEncrypted: encryptPrivate(parsed.data.phone),
          emailEncrypted: encryptPrivate(parsed.data.email || ''),
          position: parsed.data.position,
          privateFileKey,
          originalFilename: file.filename,
          mime: file.type,
          size: file.data.byteLength,
          scanStatus: 'pending',
          status: 'new',
          expiresAt,
        },
      },
    })
  } catch (error) {
    await unlink(target).catch(() => {})
    throw error
  }
  return { ok: true }
})
