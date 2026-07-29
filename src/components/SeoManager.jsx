import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCmsDetail } from '../context/useCmsDetail'

const DEFAULT_TITLE = '红运机械 - 30年的混合设备研发及产线集成技术的积累与沉淀'
const DEFAULT_DESCRIPTION = '红运机械专注混合设备研发、制造与产线集成，为新能源、固态电池和化工等行业提供解决方案。'

const ROUTE_TITLES = {
  '/': DEFAULT_TITLE,
  '/about': '关于红运 - 红运机械',
  '/solutions': '行业解决方案 - 红运机械',
  '/contact': '联系我们 - 红运机械',
  '/news': '行业动态 - 红运机械',
  '/search': '搜索 - 红运机械',
}

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

export default function SeoManager() {
  const location = useLocation()
  const { detail } = useCmsDetail()

  useEffect(() => {
    const basePath = `/${location.pathname.split('/').filter(Boolean)[0] || ''}`
    const title = detail?.seo?.metaTitle
      || (detail?.title ? `${detail.title} - 红运机械` : null)
      || ROUTE_TITLES[location.pathname]
      || ROUTE_TITLES[basePath]
      || DEFAULT_TITLE
    const description = detail?.seo?.metaDescription || detail?.summary || DEFAULT_DESCRIPTION
    const canonicalPath = detail?.canonicalPath || location.pathname
    const canonicalUrl = new URL(canonicalPath, window.location.origin).toString()

    document.title = title
    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    const ogImage = detail?.seo?.ogImage?.url || detail?.cover?.url
    if (ogImage) {
      setMeta('meta[property="og:image"]', {
        property: 'og:image',
        content: new URL(ogImage, window.location.origin).toString(),
      })
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove()
    }

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [detail, location.pathname])

  return null
}
