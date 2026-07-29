import { defineEventHandler } from 'h3'
import { cached, normalizeCms, parseLocale, strapiFetch } from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  return cached(event, `product-categories:${locale}`, 60_000, async () => {
    const [categories, groups, placements, aliases] = await Promise.all([
      strapiFetch<any>('/product-categories', {
        query: { locale, sort: ['order:asc'], pagination: { pageSize: 100 }, populate: { cover: true } },
      }),
      strapiFetch<any>('/product-groups', {
        query: { locale, sort: ['order:asc'], pagination: { pageSize: 100 }, populate: { category: true } },
      }),
      strapiFetch<any>('/product-placements', {
        query: {
          locale,
          sort: ['order:asc'],
          pagination: { pageSize: 100 },
          populate: { product: { populate: { cover: true } }, category: true, group: true, coverOverride: true },
        },
      }),
      strapiFetch<any>('/url-aliases', {
        query: {
          locale,
          filters: { targetType: { $eq: 'product' }, localeCode: { $eq: locale }, active: { $eq: true } },
          pagination: { pageSize: 100 },
          fields: ['path', 'categoryContext', 'canonical'],
          populate: { product: true },
        },
      }),
    ])
    const normalizedCategories = normalizeCms(categories.data ?? [])
    const normalizedGroups = normalizeCms(groups.data ?? [])
    const normalizedPlacements = normalizeCms(placements.data ?? [])
    const normalizedAliases = normalizeCms(aliases.data ?? [])
    const placementDto = (placement: any) => {
      const candidates = normalizedAliases.filter((alias: any) =>
        alias.product?.documentId === placement.product?.documentId)
      const matched = candidates.find((alias: any) => alias.categoryContext === placement.category?.slug)
        ?? candidates.find((alias: any) => alias.canonical)
        ?? candidates[0]
      return { ...placement, path: matched?.path ?? `/products/${placement.category?.slug}/${placement.product?.slug}` }
    }
    return normalizedCategories.map((category: any) => ({
      ...category,
      groups: normalizedGroups
        .filter((group: any) => group.category?.documentId === category.documentId)
        .map((group: any) => ({
          ...group,
          placements: normalizedPlacements
            .filter((placement: any) => placement.group?.documentId === group.documentId)
            .map(placementDto),
        })),
      ungroupedPlacements: normalizedPlacements
        .filter((placement: any) => placement.category?.documentId === category.documentId && !placement.group)
        .map(placementDto),
    }))
  })
})
