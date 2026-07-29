import { defineEventHandler } from 'h3'
import { strapiFetch } from '~/utils/cms'

export default defineEventHandler(async () => {
  const response = await strapiFetch<any>('/product-categories', {
    query: { locale: 'zh', pagination: { pageSize: 1 } },
  })
  return {
    ok: true,
    cms: Array.isArray(response.data) ? 'up' : 'degraded',
    timestamp: new Date().toISOString(),
  }
})
