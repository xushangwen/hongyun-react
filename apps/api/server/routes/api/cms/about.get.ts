import { createError, defineEventHandler } from 'h3'
import {
  cached,
  detailPopulate,
  normalizeCms,
  parseLocale,
  strapiFetch,
} from '~/utils/cms'

export default defineEventHandler(async (event) => {
  const locale = parseLocale(event)

  return cached(event, `about:${locale}`, 180_000, async () => {
    const [pageResponse, datasetResponse, partnerResponse, presenceResponse] = await Promise.all([
      strapiFetch<any>('/about-page', {
        query: {
          locale,
          status: 'published',
          populate: {
            hero: detailPopulate.hero,
            seo: detailPopulate.seo,
            sections: detailPopulate.sections,
          },
        },
      }),
      strapiFetch<any>('/technical-datasets', {
        query: {
          locale,
          status: 'published',
          filters: { legacyKey: { $startsWith: 'about:' } },
          pagination: { pageSize: 100 },
          populate: { sourceFile: true },
        },
      }),
      strapiFetch<any>('/partners', {
        query: {
          locale,
          filters: { visible: { $eq: true } },
          sort: ['order:asc', 'name:asc'],
          pagination: { pageSize: 200 },
          populate: { logo: true },
        },
      }),
      strapiFetch<any>('/global-presences', {
        query: {
          locale,
          filters: { visible: { $eq: true } },
          sort: ['order:asc', 'name:asc'],
          pagination: { pageSize: 200 },
        },
      }),
    ])

    if (!pageResponse.data) {
      throw createError({ statusCode: 404, statusMessage: 'about page not found' })
    }

    const page = normalizeCms(pageResponse.data)
    const datasets = Object.fromEntries(
      normalizeCms(datasetResponse.data ?? []).map((dataset: any) => [dataset.legacyKey, dataset]),
    )

    return {
      kind: 'page',
      documentId: page.documentId,
      title: page.title,
      hero: page.hero ?? null,
      sections: page.sections ?? [],
      seo: page.seo ?? null,
      canonicalPath: '/about',
      updatedAt: page.updatedAt,
      locale,
      datasets,
      partners: normalizeCms(partnerResponse.data ?? []),
      globalPresences: normalizeCms(presenceResponse.data ?? []),
    }
  })
})
