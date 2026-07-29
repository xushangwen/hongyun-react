import { defineEventHandler } from 'h3'
import { cached, normalizeCms, parseLocale, strapiFetch } from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  return cached(event, `industries:${locale}`, 60_000, async () => {
    const response = await strapiFetch<any>('/industries', {
      query: {
        locale,
        status: 'published',
        sort: ['order:asc'],
        pagination: { pageSize: 100 },
        populate: { cover: true, seo: true },
      },
    })
    return normalizeCms(response.data ?? [])
  })
})
