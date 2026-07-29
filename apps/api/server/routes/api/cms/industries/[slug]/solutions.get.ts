import { createError, defineEventHandler, getRouterParam } from 'h3'
import { cached, normalizeCms, parseLocale, parseSlug, strapiFetch } from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  const slug = parseSlug(getRouterParam(event, 'slug'))
  return cached(event, `industry-solutions:${locale}:${slug}`, 60_000, async () => {
    const industryResponse = await strapiFetch<any>('/industries', {
      query: { locale, status: 'published', filters: { slug: { $eq: slug } }, pagination: { pageSize: 1 } },
    })
    const industry = industryResponse.data?.[0]
    if (!industry) throw createError({ statusCode: 404, statusMessage: 'industry not found' })
    const response = await strapiFetch<any>('/solutions', {
      query: {
        locale,
        status: 'published',
        filters: { industry: { documentId: { $eq: industry.documentId } } },
        sort: ['order:asc'],
        pagination: { pageSize: 100 },
        populate: { cover: true, industry: true },
      },
    })
    return { industry: normalizeCms(industry), list: normalizeCms(response.data ?? []) }
  })
})
