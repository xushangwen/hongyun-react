import { createError, defineEventHandler, getRouterParam } from 'h3'
import {
  cached,
  detailCases,
  detailDatasets,
  detailDto,
  detailPopulate,
  normalizeCms,
  parseLocale,
  parseSlug,
  strapiFetch,
} from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  const slug = parseSlug(getRouterParam(event, 'slug'))
  return cached(event, `solution:${locale}:${slug}`, 180_000, async () => {
    const response = await strapiFetch<any>('/solutions', {
      query: {
        locale,
        status: 'published',
        filters: { slug: { $eq: slug } },
        pagination: { pageSize: 1 },
        populate: {
          ...detailPopulate,
          industry: true,
          relatedSolutions: { populate: { cover: true } },
        },
      },
    })
    const item = response.data?.[0]
    if (!item) throw createError({ statusCode: 404, statusMessage: 'solution not found' })
    const normalized = normalizeCms(item)
    const [datasets, cases] = await Promise.all([
      detailDatasets(locale, normalized.sections),
      detailCases(locale, normalized.sections),
    ])
    const industrySlug = normalized.industry?.slug ?? 'new-energy'
    return {
      ...detailDto('solution', item, `/solutions/${industrySlug}/${slug}`, locale),
      industry: normalized.industry,
      relatedSolutions: normalized.relatedSolutions ?? [],
      datasets,
      cases,
    }
  })
})
