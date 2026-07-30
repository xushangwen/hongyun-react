import { createError, defineEventHandler, getQuery } from 'h3'
import { cached, normalizeCms, parseLocale, parsePagination, parseSlug, strapiFetch } from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  const { page, pageSize } = parsePagination(event)
  const query = getQuery(event)
  const category = query.category ? parseSlug(query.category) : null
  const group = query.group ? parseSlug(query.group) : null
  return cached(event, `products:${locale}:${category ?? ''}:${group ?? ''}:${page}:${pageSize}`, 45_000, async () => {
    if (category || group) {
      const response = await strapiFetch<any>('/products', {
        query: {
          locale,
          status: 'published',
          sort: ['order:asc'],
          pagination: { page, pageSize, withCount: true },
          filters: {
            ...(category ? { categories: { slug: { $eq: category } } } : {}),
            ...(group ? { groups: { slug: { $eq: group } } } : {}),
          },
          populate: { cover: true, categories: true, groups: true },
        },
      })
      return { list: normalizeCms(response.data ?? []), pagination: response.meta?.pagination }
    }
    const response = await strapiFetch<any>('/products', {
      query: {
        locale,
        status: 'published',
        sort: ['order:asc'],
        pagination: { page, pageSize, withCount: true },
        populate: { cover: true },
      },
    })
    if (!response) throw createError({ statusCode: 502, statusMessage: 'CMS upstream error' })
    return { list: normalizeCms(response.data ?? []), pagination: response.meta?.pagination }
  })
})
