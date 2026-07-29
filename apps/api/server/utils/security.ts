import { createCipheriv, createHash, randomBytes } from 'node:crypto'
import { isIP } from 'node:net'
import { getRequestIP, getRequestHeader, type H3Event } from 'h3'

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

export function consumeRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now()
  const current = buckets.get(key)
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterMs: 0 }
  }
  if (current.count >= max) return { allowed: false, retryAfterMs: current.resetAt - now }
  current.count += 1
  return { allowed: true, retryAfterMs: 0 }
}

function isLoopback(ip: string) {
  return ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1'
}

export function clientIp(event: H3Event) {
  const peer = getRequestIP(event, { xForwardedFor: false }) || ''
  const realIp = getRequestHeader(event, 'x-real-ip') || ''
  if (isLoopback(peer) && isIP(realIp)) return realIp
  return isIP(peer) ? peer : 'unknown'
}

export function fingerprint(event: H3Event) {
  const userAgent = getRequestHeader(event, 'user-agent') || ''
  return createHash('sha256').update(`${clientIp(event)}\n${userAgent}`).digest('hex')
}

export function encryptPrivate(value: string) {
  if (!value) return ''
  const config = useRuntimeConfig()
  const key = Buffer.from(config.formEncryptionKey, 'hex')
  if (key.length !== 32) throw new Error('FORM_ENCRYPTION_KEY must be 32 bytes')
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return `v1.${iv.toString('base64url')}.${tag.toString('base64url')}.${encrypted.toString('base64url')}`
}

export function maskPhone(value: string) {
  const compact = value.replace(/\s+/g, '')
  if (compact.length <= 5) return `${compact.slice(0, 1)}***${compact.slice(-1)}`
  return `${compact.slice(0, 3)}****${compact.slice(-4)}`
}

export function maskEmail(value: string) {
  if (!value || !value.includes('@')) return ''
  const [name, domain] = value.split('@')
  return `${name.slice(0, 1)}***@${domain}`
}

export function verifyResumeSignature(filename: string, mime: string, data: Buffer) {
  const extension = filename.toLowerCase().split('.').pop()
  const allowed = new Set(['pdf', 'doc', 'docx'])
  if (!extension || !allowed.has(extension)) return false
  const pdf = data.subarray(0, 5).toString() === '%PDF-'
  const doc = data.subarray(0, 8).equals(Buffer.from('d0cf11e0a1b11ae1', 'hex'))
  const docx = data.subarray(0, 4).equals(Buffer.from('504b0304', 'hex'))
  if (extension === 'pdf') return pdf && mime === 'application/pdf'
  if (extension === 'doc') return doc
  return docx
}
