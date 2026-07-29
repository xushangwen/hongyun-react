import { createError, defineEventHandler, getQuery, getRouterParam } from 'h3'
import {
  cached,
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
  const category = getQuery(event).category ? parseSlug(getQuery(event).category) : null
  return cached(event, `product:${locale}:${slug}:${category ?? ''}`, 180_000, async () => {
    const response = await strapiFetch<any>('/products', {
      query: {
        locale,
        status: 'published',
        filters: { slug: { $eq: slug } },
        pagination: { pageSize: 1 },
        populate: {
          ...detailPopulate,
          family: true,
          relatedProducts: { populate: { cover: true } },
        },
      },
    })
    const item = response.data?.[0]
    if (!item) throw createError({ statusCode: 404, statusMessage: 'product not found' })
    const normalizedItem = normalizeCms(item)
    const datasets = await detailDatasets(locale, normalizedItem.sections)
    const placements = await strapiFetch<any>('/product-placements', {
      query: {
        locale,
        filters: { product: { documentId: { $eq: item.documentId } } },
        pagination: { pageSize: 100 },
        populate: { category: true, group: true, coverOverride: true },
      },
    })
    const canonicalPath = category
      ? `/products/${category}/${slug}`
      : `/products/${normalizeCms(placements.data?.[0])?.category?.slug ?? 'new-energy'}/${slug}`
    return {
      ...detailDto('product', item, canonicalPath, locale),
      placements: normalizeCms(placements.data ?? []),
      family: normalizeCms(item.family),
      relatedProducts: normalizeCms(item.relatedProducts ?? []),
      categoryContext: category,
      datasets,
    }
  })
})
