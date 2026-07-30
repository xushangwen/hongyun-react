const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const CMS_TIMEOUT_MS = 8000

export async function cmsRequest(path, { signal } = {}) {
  const controller = new AbortController()
  const timeoutId = globalThis.setTimeout(() => controller.abort(), CMS_TIMEOUT_MS)
  const abort = () => controller.abort()
  signal?.addEventListener('abort', abort, { once: true })
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
    if (!response.ok) {
      const error = new Error(`CMS request failed: ${response.status}`)
      error.status = response.status
      throw error
    }
    return response.json()
  } finally {
    globalThis.clearTimeout(timeoutId)
    signal?.removeEventListener('abort', abort)
  }
}

const imageUrl = (media, fallback = '') => media?.url || fallback
const dateDisplay = (value) => {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime())
    ? value
    : `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

export function mapCmsNewsCard(item) {
  return {
    id: item.slug,
    title: item.title,
    date: item.publishedDate,
    dateDisplay: dateDisplay(item.publishedDate),
    category: item.category?.name || '新闻',
    image: imageUrl(item.cover),
    summary: item.excerpt || '',
    _key: item.documentId || item.slug,
  }
}

function mapCmsArticleBlock(block) {
  switch (block.__component) {
    case 'article.paragraph':
      return { type: block.bold ? 'bold_paragraph' : 'paragraph', text: block.text }
    case 'article.section-title':
      return { type: 'section_title', text: block.text }
    case 'article.image':
      return {
        type: 'image',
        src: block.image?.url || block.sourcePath,
        absolute: true,
        alt: block.alt,
        caption: block.caption,
      }
    case 'article.carousel':
      return {
        type: 'image_carousel',
        images: (block.images || []).map((item) => ({
          src: item.media?.url || item.sourcePath,
          absolute: true,
          alt: item.alt,
          caption: item.caption,
        })),
      }
    case 'article.quote':
      return { type: 'quote', text: block.text, author: block.author }
    default:
      return null
  }
}

const mapNavArticle = (item) => item ? {
  id: item.slug,
  title: item.title,
  date: item.publishedDate,
  dateDisplay: dateDisplay(item.publishedDate),
  category: item.category?.name || '新闻',
  image: imageUrl(item.cover),
  summary: item.excerpt || '',
} : null

export function mapCmsArticle(item) {
  return {
    id: item.slug,
    title: item.title,
    date: item.publishedDate,
    dateDisplay: dateDisplay(item.publishedDate),
    category: item.category?.name || '新闻',
    image: imageUrl(item.cover),
    summary: item.summary || '',
    blocks: (item.sections || []).map(mapCmsArticleBlock).filter(Boolean),
    previous: mapNavArticle(item.previous),
    next: mapNavArticle(item.next),
    related: (item.related || []).map(mapNavArticle),
  }
}

function mapPlacement(placement) {
  const product = placement.product || {}
  return {
    name: placement.displayNameOverride || product.name,
    slug: product.slug,
    image: imageUrl(placement.coverOverride, imageUrl(product.cover)),
    imgContain: placement.imageFit === 'contain',
    customPath: placement.path,
  }
}

export function mapCmsProductCategories(remote, localCategories) {
  return remote.map((category) => {
    const local = localCategories.find((item) => item.id === category.slug)
    const systems = (category.groups || []).map((group) => ({
      name: group.name,
      slug: group.slug,
      products: (group.placements || []).map(mapPlacement),
    }))
    return {
      id: category.slug,
      Icon: local?.Icon,
      name: category.name,
      desc: category.summary,
      ...(systems.length
        ? { systems }
        : { products: (category.ungroupedPlacements || []).map(mapPlacement) }),
    }
  })
}

export async function getCmsNews(signal) {
  const response = await cmsRequest('/api/cms/news?locale=zh&pageSize=100', { signal })
  return (response.list || []).map(mapCmsNewsCard)
}

export async function getCmsAbout(signal) {
  return cmsRequest('/api/cms/about?locale=zh', { signal })
}

export async function getCmsContact(signal) {
  return cmsRequest('/api/cms/contact?locale=zh', { signal })
}

export async function getCmsHome(signal) {
  return cmsRequest('/api/cms/home?locale=zh', { signal })
}

export async function getCmsSite(signal) {
  return cmsRequest('/api/cms/site?locale=zh', { signal })
}

export async function getCmsArticle(slug, signal) {
  const response = await cmsRequest(`/api/cms/news/${encodeURIComponent(slug)}?locale=zh`, { signal })
  return mapCmsArticle(response)
}

export async function getCmsProductCategories(signal) {
  return cmsRequest('/api/cms/product-categories?locale=zh', { signal })
}

export async function getCmsProduct(slug, category, signal) {
  const categoryQuery = category ? `&category=${encodeURIComponent(category)}` : ''
  return cmsRequest(`/api/cms/products/${encodeURIComponent(slug)}?locale=zh${categoryQuery}`, { signal })
}

export async function getCmsSolution(slug, signal) {
  return cmsRequest(`/api/cms/solutions/${encodeURIComponent(slug)}?locale=zh`, { signal })
}

export async function resolveCmsPath(path, signal) {
  return cmsRequest(`/api/cms/resolve?locale=zh&path=${encodeURIComponent(path)}`, { signal })
}

export async function searchCms(query, signal) {
  if (!query) return []
  const response = await cmsRequest(`/api/cms/search?locale=zh&pageSize=100&q=${encodeURIComponent(query)}`, { signal })
  return response.list || []
}
