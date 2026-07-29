import { createHmac, timingSafeEqual } from 'node:crypto'
import {
  createError,
  defineEventHandler,
  getRequestHeader,
  readRawBody,
} from 'h3'
import { clearCmsCache } from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const secret = config.cmsWebhookSecret
  const timestamp = getRequestHeader(event, 'x-cms-timestamp') || ''
  const signature = getRequestHeader(event, 'x-cms-signature') || ''
  const body = await readRawBody(event) || ''
  const parsedTimestamp = Number(timestamp)
  if (!secret || !Number.isFinite(parsedTimestamp) || Math.abs(Date.now() - parsedTimestamp) > 5 * 60_000) {
    throw createError({ statusCode: 401, statusMessage: 'invalid webhook timestamp' })
  }
  const expected = createHmac('sha256', secret).update(`${timestamp}.${body}`).digest('hex')
  const valid = signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  if (!valid) throw createError({ statusCode: 401, statusMessage: 'invalid webhook signature' })
  clearCmsCache()
  return { ok: true }
})
