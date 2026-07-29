import { createHmac, timingSafeEqual } from 'node:crypto'
import { createError, getRequestHeader, type H3Event } from 'h3'

export function requireRecruiter(event: H3Event) {
  const config = useRuntimeConfig()
  const authorization = getRequestHeader(event, 'authorization') || ''
  const expected = `Bearer ${config.recruiterToken}`
  if (!config.recruiterToken ||
      authorization.length !== expected.length ||
      !timingSafeEqual(Buffer.from(authorization), Buffer.from(expected))) {
    throw createError({ statusCode: 401, statusMessage: 'unauthorized recruiter' })
  }
  return getRequestHeader(event, 'x-recruiter-id') || 'recruiter-token'
}

export function signResumeDownload(documentId: string, expires: number) {
  const secret = useRuntimeConfig().recruiterToken
  return createHmac('sha256', secret).update(`${documentId}.${expires}`).digest('hex')
}

export function verifyResumeDownload(documentId: string, expires: number, signature: string) {
  if (!Number.isFinite(expires) || expires < Date.now() || expires > Date.now() + 10 * 60_000) return false
  const expected = signResumeDownload(documentId, expires)
  return signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}
