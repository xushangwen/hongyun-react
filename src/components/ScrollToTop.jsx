import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { useLenisInstance } from '../hooks/useLenisInstance'

// 每条历史条目的滚动位置，key = location.key（React Router 每个 history entry 唯一）
const scrollPositions = new Map()

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  const lenisRef = useLenisInstance()

  const prevKeyRef = useRef(key)
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    const lenis = lenisRef?.current
    const pathnameChanged = prevPathnameRef.current !== pathname

    if (pathnameChanged) {
      // 离开当前页面前，把滚动位置存到上一个 key
      scrollPositions.set(prevKeyRef.current, window.scrollY)
    }

    prevPathnameRef.current = pathname
    prevKeyRef.current = key

    if (!pathnameChanged) return

    if (navigationType === 'POP') {
      // 浏览器回退 / 前进：恢复目标页面上次的滚动位置
      const savedY = scrollPositions.get(key) ?? 0
      // 双帧保证 React 完成渲染后再恢复位置，避免内容还没出现就跳
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lenis
            ? lenis.scrollTo(savedY, { immediate: true })
            : window.scrollTo({ top: savedY, behavior: 'instant' })
        })
      })
      return
    }

    // PUSH / REPLACE：用户主动点击链接，回到顶部
    if (hash) {
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
    }

    lenis
      ? lenis.scrollTo(0, { immediate: true })
      : window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash, key, navigationType, lenisRef])

  return null
}
