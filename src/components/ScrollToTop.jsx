import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenisInstance } from '../context/LenisContext'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenisRef = useLenisInstance()
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    const pathnameChanged = prevPathnameRef.current !== pathname
    prevPathnameRef.current = pathname

    // hash-only 变化（同页锚点）已由 LenisContext 的全局点击拦截器处理，这里跳过
    if (!pathnameChanged) return

    const lenis = lenisRef?.current

    if (hash) {
      // 跨页跳转带 hash：等待新页面渲染完成后滚动到目标
      const timer = setTimeout(() => {
        const target = document.querySelector(hash)
        const stickyNav = document.querySelector('.page-sticky-nav')
        const headerHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '64'
        )
        const stickyNavHeight = stickyNav ? stickyNav.getBoundingClientRect().height : 0
        const offset = -(headerHeight + stickyNavHeight + 8)

        if (target) {
          lenis
            ? lenis.scrollTo(target, { offset, immediate: false })
            : target.scrollIntoView({ behavior: 'smooth' })
        } else {
          lenis
            ? lenis.scrollTo(0, { immediate: true })
            : window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }, 150)
      return () => clearTimeout(timer)
    } else {
      // 普通跨页跳转：瞬间归顶
      lenis
        ? lenis.scrollTo(0, { immediate: true })
        : window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash, lenisRef])

  return null
}
