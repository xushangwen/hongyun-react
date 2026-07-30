import { createHash } from 'node:crypto'
import {
  createError,
  getQuery,
  getRequestHeader,
  setResponseHeader,
  type H3Event,
} from 'h3'
import qs from 'qs'
import { localeSchema, paginationSchema, slugSchema, type Locale } from '@hongyun/contracts'

type FetchOptions = {
  query?: Record<string, unknown>
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  write?: boolean
  timeout?: number
}

type CacheEntry = {
  value: unknown
  expiresAt: number
  etag: string
}

const cache = new Map<string, CacheEntry>()
const DELAYED_INVALIDATION_MS = [1_000, 5_000] as const
let cacheGeneration = 0
let delayedInvalidations: ReturnType<typeof setTimeout>[] = []

function invalidateCmsCache() {
  cache.clear()
  cacheGeneration += 1
}

export function clearCmsCache() {
  for (const timer of delayedInvalidations) clearTimeout(timer)
  invalidateCmsCache()
  // Strapi lifecycle events can arrive just before the published transaction
  // becomes visible. Re-clear shortly afterwards without disabling the cache
  // globally for a long grace period.
  delayedInvalidations = DELAYED_INVALIDATION_MS.map((delay) => {
    const timer = setTimeout(invalidateCmsCache, delay)
    timer.unref?.()
    return timer
  })
}

export function getCmsCacheGeneration() {
  return cacheGeneration
}

export function parseLocale(event: H3Event): Locale {
  const value = getQuery(event).locale ?? 'zh'
  const parsed = localeSchema.safeParse(value)
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: 'invalid locale' })
  return parsed.data
}

export function parseSlug(value: unknown) {
  const parsed = slugSchema.safeParse(value)
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: 'invalid slug' })
  return parsed.data
}

export function parsePagination(event: H3Event) {
  const parsed = paginationSchema.safeParse(getQuery(event))
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: 'invalid pagination' })
  return parsed.data
}

export async function strapiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const config = useRuntimeConfig()
  const token = options.write ? config.strapiWriteToken : config.strapiReadToken
  if (!token) {
    throw createError({
      statusCode: 500,
      statusMessage: options.write
        ? 'CMS write token is not configured'
        : 'CMS read token is not configured',
    })
  }
  const query = options.query ? `?${qs.stringify(options.query, { encodeValuesOnly: true })}` : ''
  try {
    return await $fetch<T>(`${config.strapiUrl}/api${path}${query}`, {
      method: options.method ?? 'GET',
      body: options.body as any,
      timeout: options.timeout ?? (options.write ? 8000 : 5000),
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error: any) {
    const status = Number(error?.response?.status || error?.statusCode || 0)
    console.error(`[BFF] CMS ${options.method ?? 'GET'} ${path} failed:`, error?.message || error)
    if (status === 404) throw createError({ statusCode: 404, statusMessage: 'content not found' })
    throw createError({ statusCode: 502, statusMessage: 'CMS upstream error' })
  }
}

export async function cached<T>(
  event: H3Event,
  key: string,
  ttlMs: number,
  loader: () => Promise<T>,
): Promise<T> {
  // Nitro owns the short-lived CMS cache. Browsers and IIS/ARR must always
  // revalidate through Nitro so a webhook invalidation cannot be masked by a
  // second, independent proxy cache.
  setResponseHeader(event, 'Cache-Control', 'private, no-store, no-cache, must-revalidate, max-age=0')
  setResponseHeader(event, 'Pragma', 'no-cache')
  setResponseHeader(event, 'Expires', '0')

  const now = Date.now()
  const generation = cacheGeneration
  const entry = cache.get(key)
  if (entry && entry.expiresAt > now) {
    setResponseHeader(event, 'ETag', entry.etag)
    setResponseHeader(event, 'X-CMS-Cache', 'HIT')
    if (getRequestHeader(event, 'if-none-match') === entry.etag) {
      throw createError({ statusCode: 304, statusMessage: 'Not Modified' })
    }
    return entry.value as T
  }
  const value = await loader()
  const etag = `"${createHash('sha1').update(JSON.stringify(value)).digest('hex')}"`
  if (cacheGeneration === generation) {
    cache.set(key, { value, expiresAt: Date.now() + ttlMs, etag })
  }
  setResponseHeader(event, 'ETag', etag)
  setResponseHeader(event, 'X-CMS-Cache', 'MISS')
  return value
}

export function mediaUrl(media: any): string | null {
  if (!media) return null
  if (typeof media === 'string') return media
  if (media.url) {
    const pathname = media.url.startsWith('http')
      ? new URL(media.url).pathname
      : media.url
    if (pathname.startsWith('/uploads/')) {
      return `/api/cms/media/${encodeURIComponent(pathname.slice('/uploads/'.length))}`
    }
    return media.url
  }
  return null
}

export function normalizeCms(value: any): any {
  if (Array.isArray(value)) return value.map(normalizeCms)
  if (typeof value === 'string' && value.startsWith('/uploads/')) {
    return mediaUrl({ url: value })
  }
  if (!value || typeof value !== 'object') return value
  if (value.url && (value.mime || value.provider || value.ext)) {
    return {
      url: mediaUrl(value),
      alt: value.alternativeText || undefined,
      width: value.width || undefined,
      height: value.height || undefined,
      mime: value.mime || undefined,
    }
  }
  const output: Record<string, unknown> = {}
  for (const [key, item] of Object.entries(value)) {
    // JSON datasets use `id` as a public column key; removing it breaks
    // table rendering. Strapi numeric ids are harmless in the normalized DTO.
    if (['createdBy', 'updatedBy'].includes(key)) continue
    output[key] = normalizeCms(item)
  }
  if (output.media == null && typeof output.sourcePath === 'string') {
    output.media = { url: output.sourcePath, alt: output.alt }
  }
  if (output.image == null && typeof output.sourcePath === 'string') {
    output.image = { url: output.sourcePath, alt: output.alt }
  }
  return output
}

const mediaFields = ['url', 'alternativeText', 'width', 'height', 'mime']
const mediaItemPopulate = { populate: { media: { fields: mediaFields } } }

export const detailPopulate = {
  cover: { fields: mediaFields },
  hero: {
    populate: {
      desktopMedia: { fields: mediaFields },
      mobileMedia: { fields: mediaFields },
    },
  },
  seo: { populate: { ogImage: { fields: mediaFields } } },
  sections: {
    on: {
      'content.rich-text': { populate: '*' },
      'content.media-text': { populate: { mediaItems: mediaItemPopulate } },
      'content.video': {
        populate: {
          video: mediaItemPopulate,
          poster: mediaItemPopulate,
          captions: { fields: mediaFields },
        },
      },
      'content.media-gallery': { populate: { items: mediaItemPopulate } },
      'content.feature-grid': {
        populate: {
          items: {
            populate: {
              iconMedia: { fields: mediaFields },
            },
          },
        },
      },
      'content.data-table': { populate: '*' },
      'content.equipment-grid': {
        populate: {
          items: {
            populate: {
              image: { fields: mediaFields },
              features: '*',
              paragraphs: '*',
            },
          },
        },
      },
      'content.case-list': { populate: '*' },
      'content.cta': { populate: '*' },
      'technical.chart-gallery': { populate: { items: mediaItemPopulate } },
      'technical.metric-chart': { populate: '*' },
      'technical.simulation-gallery': { populate: { items: mediaItemPopulate } },
      'technical.report-section': { populate: '*' },
      'technical.evidence-grid': {
        populate: {
          items: {
            populate: {
              mediaItems: mediaItemPopulate,
            },
          },
        },
      },
      'special.renderer': { populate: '*' },
    },
  },
}

export const articleBlocksPopulate = {
  on: {
    'article.paragraph': { populate: '*' },
    'article.section-title': { populate: '*' },
    'article.image': { populate: { image: { fields: mediaFields } } },
    'article.carousel': { populate: { images: mediaItemPopulate } },
    'article.quote': { populate: '*' },
  },
}

export async function detailDatasets(locale: Locale, sections: any[]) {
  const keys = [...new Set(
    (sections ?? [])
      .map((section) => section?.datasetKey)
      .filter((key): key is string => typeof key === 'string' && Boolean(key)),
  )]
  if (!keys.length) return {}
  const response = await strapiFetch<any>('/technical-datasets', {
    query: {
      locale,
      status: 'published',
      filters: { legacyKey: { $in: keys } },
      pagination: { pageSize: 100 },
      populate: { sourceFile: { fields: mediaFields } },
    },
  })
  return Object.fromEntries(
    normalizeCms(response.data ?? []).map((dataset: any) => [dataset.legacyKey, dataset]),
  )
}

export async function detailCases(locale: Locale, sections: any[]) {
  const keys = [...new Set(
    (sections ?? [])
      .filter((section) => section?.__component === 'content.case-list' && section.visible !== false)
      .flatMap((section) => Array.isArray(section.caseKeys) ? section.caseKeys : [])
      .filter((key): key is string => typeof key === 'string' && Boolean(key)),
  )]
  if (!keys.length) return {}
  const response = await strapiFetch<any>('/case-studies', {
    query: {
      locale,
      status: 'published',
      filters: { legacyKey: { $in: keys } },
      pagination: { pageSize: 100 },
      populate: {
        cover: { fields: mediaFields },
        sections: {
          on: {
            'content.media-gallery': { populate: { items: mediaItemPopulate } },
            'special.renderer': { populate: '*' },
          },
        },
      },
    },
  })
  return Object.fromEntries(
    normalizeCms(response.data ?? []).map((caseStudy: any) => [caseStudy.legacyKey, caseStudy]),
  )
}

export function detailDto(kind: 'product' | 'solution' | 'article', item: any, canonicalPath: string, locale: Locale) {
  const normalized = normalizeCms(item)
  return {
    kind,
    documentId: normalized.documentId,
    slug: normalized.slug,
    title: normalized.name ?? normalized.title,
    summary: normalized.summary ?? normalized.excerpt ?? '',
    cover: normalized.cover ?? null,
    hero: normalized.hero ?? null,
    sections: normalized.sections ?? normalized.blocks ?? [],
    seo: normalized.seo ?? null,
    canonicalPath,
    updatedAt: normalized.updatedAt,
    locale,
  }
}
