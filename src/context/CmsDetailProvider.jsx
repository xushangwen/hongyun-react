import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getCmsAbout, getCmsContact, getCmsProduct, getCmsSolution } from '../services/cmsApi'
import { CmsDetailContext, emptyCmsDetailState } from './cmsDetailContext'

const PRODUCT_SLUG_ALIASES = {
  'ssb-multi-mixer': 'multi-mixer',
}

function resolveDetailRoute(pathname) {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === 'about' && segments.length === 1) {
    return {
      key: 'page:about',
      kind: 'about',
    }
  }
  if (segments[0] === 'contact' && segments.length === 1) {
    return {
      key: 'page:contact',
      kind: 'contact',
    }
  }
  if (segments[0] === 'products' && segments.length === 3) {
    return {
      key: `product:${segments[1]}:${segments[2]}`,
      kind: 'product',
      category: segments[1],
      slug: PRODUCT_SLUG_ALIASES[segments[2]] || segments[2],
    }
  }
  if (segments[0] === 'solutions' && segments.length === 3) {
    return {
      key: `solution:${segments[2]}`,
      kind: 'solution',
      slug: segments[2],
    }
  }
  return null
}

function CmsDetailLoader({ children, route }) {
  const [state, setState] = useState({
    detail: null,
    status: 'loading',
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    const request = route.kind === 'about'
      ? getCmsAbout(controller.signal)
      : route.kind === 'contact'
        ? getCmsContact(controller.signal)
      : route.kind === 'product'
        ? getCmsProduct(route.slug, route.category, controller.signal)
        : getCmsSolution(route.slug, controller.signal)

    request
      .then((detail) => setState({ detail, status: 'ready', error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.warn(`[CMS] ${route.kind} 详情读取失败，继续使用本地内容`)
          setState({ detail: null, status: 'error', error })
        }
      })

    return () => controller.abort()
  }, [route])

  return <CmsDetailContext.Provider value={state}>{children}</CmsDetailContext.Provider>
}

export default function CmsDetailProvider({ children }) {
  const { pathname } = useLocation()
  const route = useMemo(() => resolveDetailRoute(pathname), [pathname])

  if (!route) {
    return <CmsDetailContext.Provider value={emptyCmsDetailState}>{children}</CmsDetailContext.Provider>
  }

  return (
    <CmsDetailLoader key={route.key} route={route}>
      {children}
    </CmsDetailLoader>
  )
}
