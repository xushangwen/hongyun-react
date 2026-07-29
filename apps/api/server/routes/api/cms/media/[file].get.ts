import { createError, defineEventHandler, getRouterParam, send, setResponseHeader } from 'h3'

const SAFE_UPLOAD_NAME = /^[A-Za-z0-9._-]+$/

export default defineEventHandler(async (event) => {
  const file = getRouterParam(event, 'file') || ''
  if (!SAFE_UPLOAD_NAME.test(file)) {
    throw createError({ statusCode: 400, statusMessage: 'invalid media path' })
  }

  const config = useRuntimeConfig()
  try {
    const response = await $fetch.raw<ArrayBuffer>(`${config.strapiUrl}/uploads/${file}`, {
      responseType: 'arrayBuffer',
      timeout: 5000,
    })
    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    const cacheControl = response.headers.get('cache-control') || 'public, max-age=31536000, immutable'
    setResponseHeader(event, 'Cache-Control', cacheControl)
    setResponseHeader(event, 'X-Content-Type-Options', 'nosniff')
    if (!response._data) {
      throw createError({ statusCode: 502, statusMessage: 'CMS media response is empty' })
    }
    return send(event, new Uint8Array(response._data), contentType)
  } catch (error: any) {
    const status = Number(error?.response?.status || error?.statusCode || 0)
    if (status === 404) throw createError({ statusCode: 404, statusMessage: 'media not found' })
    throw createError({ statusCode: 502, statusMessage: 'CMS media upstream error' })
  }
})
