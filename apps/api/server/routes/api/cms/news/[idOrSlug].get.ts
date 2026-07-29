import { createError, defineEventHandler, getRouterParam } from 'h3'
import {
  articleBlocksPopulate,
  cached,
  detailDto,
  normalizeCms,
  parseLocale,
  parseSlug,
  strapiFetch,
} from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  const slug = parseSlug(getRouterParam(event, 'idOrSlug'))
  return cached(event, `article:${locale}:${slug}`, 120_000, async () => {
    const [response, navigation] = await Promise.all([
      strapiFetch<any>('/articles', {
        query: {
          locale,
          status: 'published',
          filters: { slug: { $eq: slug } },
          pagination: { pageSize: 1 },
          populate: {
            cover: true,
            category: true,
            seo: { populate: { ogImage: true } },
            blocks: articleBlocksPopulate,
          },
        },
      }),
      strapiFetch<any>('/articles', {
        query: {
          locale,
          status: 'published',
          sort: ['publishedDate:desc', 'order:asc'],
          pagination: { pageSize: 100 },
          fields: ['documentId', 'title', 'slug', 'publishedDate', 'excerpt'],
          populate: { cover: true, category: true },
        },
      }),
    ])
    const item = response.data?.[0]
    if (!item) throw createError({ statusCode: 404, statusMessage: 'article not found' })
    const list = normalizeCms(navigation.data ?? [])
    const index = list.findIndex((entry: any) => entry.slug === slug)
    const normalized = normalizeCms(item)
    return {
      ...detailDto('article', item, `/news/${slug}`, locale),
      category: normalized.category,
      publishedDate: normalized.publishedDate,
      author: normalized.author,
      previous: index > 0 ? list[index - 1] : null,
      next: index >= 0 && index < list.length - 1 ? list[index + 1] : null,
      related: list.filter((entry: any) =>
        entry.slug !== slug && entry.category?.documentId === normalized.category?.documentId).slice(0, 3),
    }
  })
})
