import { defineEventHandler, getQuery } from 'h3'
import { cached, normalizeCms, parseLocale, parsePagination, parseSlug, strapiFetch } from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  const { page, pageSize } = parsePagination(event)
  const category = getQuery(event).category ? parseSlug(getQuery(event).category) : null
  return cached(event, `news:${locale}:${category ?? ''}:${page}:${pageSize}`, 45_000, async () => {
    const response = await strapiFetch<any>('/articles', {
      query: {
        locale,
        status: 'published',
        filters: category ? { category: { slug: { $eq: category } } } : {},
        sort: ['publishedDate:desc', 'order:asc'],
        pagination: { page, pageSize, withCount: true },
        fields: ['documentId', 'title', 'slug', 'excerpt', 'publishedDate', 'featured', 'updatedAt'],
        populate: { cover: true, category: true },
      },
    })
    return { list: normalizeCms(response.data ?? []), pagination: response.meta?.pagination }
  })
})
