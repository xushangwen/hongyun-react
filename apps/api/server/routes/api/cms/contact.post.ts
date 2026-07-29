import { createError, defineEventHandler, readBody, setResponseHeader } from 'h3'
import { contactPayloadSchema } from '@hongyun/contracts'
import { strapiFetch } from '~/utils/cms'
import {
  consumeRateLimit,
  encryptPrivate,
  fingerprint,
  maskEmail,
  maskPhone,
} from '~/utils/security'

export default defineEventHandler(async (event) => {
  const raw = await readBody(event)
  if (raw?.website || raw?.url) return { ok: true }
  const parsed = contactPayloadSchema.safeParse(raw)
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: 'invalid contact payload' })
  const fingerprintHash = fingerprint(event)
  const rate = consumeRateLimit(`contact:${fingerprintHash}`, 5, 10 * 60_000)
  if (!rate.allowed) {
    setResponseHeader(event, 'Retry-After', Math.max(1, Math.ceil(rate.retryAfterMs / 1000)))
    throw createError({ statusCode: 429, statusMessage: 'too many submissions' })
  }
  const data = parsed.data
  let contextTitleSnapshot = ''
  let contextDocumentId = data.contextDocumentId || ''
  try {
    const resolved = await strapiFetch<any>('/url-aliases', {
      query: {
        filters: { path: { $eq: data.contextPath }, localeCode: { $eq: 'zh' }, active: { $eq: true } },
        pagination: { pageSize: 1 },
        populate: { product: true, solution: true, article: true },
      },
    })
    const alias = resolved.data?.[0]
    const target = alias?.product || alias?.solution || alias?.article
    contextTitleSnapshot = target?.name || target?.title || ''
    contextDocumentId = target?.documentId || contextDocumentId
  } catch {
    // 联系页面等非内容别名仍可提交；不相信浏览器传入的标题。
  }
  const expiresAt = new Date(Date.now() + 180 * 24 * 60 * 60_000).toISOString()
  await strapiFetch('/contact-submissions', {
    method: 'POST',
    write: true,
    body: {
      data: {
        name: data.name,
        company: data.company,
        industry: data.industry,
        phoneMasked: maskPhone(data.phone),
        emailMasked: maskEmail(data.email || ''),
        phoneEncrypted: encryptPrivate(data.phone),
        emailEncrypted: encryptPrivate(data.email || ''),
        message: data.message,
        contextType: data.contextType,
        contextDocumentId,
        contextPath: data.contextPath,
        contextTitleSnapshot,
        referrer: data.referrer || '',
        utm: data.utm || {},
        status: 'new',
        expiresAt,
        fingerprintHash,
      },
    },
  })
  return { ok: true }
})
