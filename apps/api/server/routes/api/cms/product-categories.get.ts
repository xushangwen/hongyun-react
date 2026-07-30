import { defineEventHandler } from 'h3'
import { cached, normalizeCms, parseLocale, strapiFetch } from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)
  return cached(event, `product-categories:${locale}`, 60_000, async () => {
    const [categories, groups, products, placements, aliases] = await Promise.all([
      strapiFetch<any>('/product-categories', {
        query: { locale, sort: ['order:asc'], pagination: { pageSize: 100 }, populate: { cover: true } },
      }),
      strapiFetch<any>('/product-groups', {
        query: { locale, sort: ['order:asc'], pagination: { pageSize: 100 }, populate: { category: true } },
      }),
      strapiFetch<any>('/products', {
        query: {
          locale,
          status: 'published',
          sort: ['order:asc'],
          pagination: { pageSize: 100 },
          populate: { cover: true, categories: true, groups: true },
        },
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
    const normalizedProducts = normalizeCms(products.data ?? [])
    const normalizedPlacements = normalizeCms(placements.data ?? [])
    const normalizedAliases = normalizeCms(aliases.data ?? [])
    const placementDto = (product: any, category: any, group: any = null) => {
      const legacyPlacement = normalizedPlacements.find((placement: any) =>
        placement.product?.documentId === product.documentId
        && placement.category?.documentId === category.documentId
        && (placement.group?.documentId ?? null) === (group?.documentId ?? null))
      const candidates = normalizedAliases.filter((alias: any) =>
        alias.product?.documentId === product.documentId)
      const matched = candidates.find((alias: any) => alias.categoryContext === category.slug)
        ?? candidates.find((alias: any) => alias.canonical)
        ?? candidates[0]
      return {
        ...(legacyPlacement ?? {}),
        product,
        category,
        group,
        displayNameOverride: legacyPlacement?.displayNameOverride || product.name,
        coverOverride: legacyPlacement?.coverOverride || null,
        imageFit: legacyPlacement?.imageFit || 'contain',
        order: legacyPlacement?.order ?? product.order ?? 0,
        path: matched?.path ?? `/products/${category.slug}/${product.slug}`,
      }
    }
    return normalizedCategories.map((category: any) => ({
      ...category,
      groups: normalizedGroups
        .filter((group: any) => group.category?.documentId === category.documentId)
        .map((group: any) => ({
          ...group,
          placements: normalizedProducts
            .filter((product: any) => (product.groups ?? [])
              .some((relation: any) => relation.documentId === group.documentId))
            .map((product: any) => placementDto(product, category, group))
            .sort((left: any, right: any) => left.order - right.order),
        })),
      ungroupedPlacements: normalizedProducts
        .filter((product: any) => {
          const belongsToCategory = (product.categories ?? [])
            .some((relation: any) => relation.documentId === category.documentId)
          const categoryGroupIds = new Set(normalizedGroups
            .filter((group: any) => group.category?.documentId === category.documentId)
            .map((group: any) => group.documentId))
          const belongsToCategoryGroup = (product.groups ?? [])
            .some((relation: any) => categoryGroupIds.has(relation.documentId))
          return belongsToCategory && !belongsToCategoryGroup
        })
        .map((product: any) => placementDto(product, category))
        .sort((left: any, right: any) => left.order - right.order),
    }))
  })
})
