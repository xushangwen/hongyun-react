import { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const lenisRef = useRef(null)

  // 初始化 Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: false,
      overscroll: false,
    })

    lenisRef.current = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // 标签页隐藏时暂停，恢复时继续，避免后台空跑 RAF
    function handleVisibility() {
      if (document.hidden) lenis.stop()
      else lenis.start()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('visibilitychange', handleVisibility)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // 全局拦截同页 hash 链接点击，阻止浏览器原生瞬间跳转，改由 Lenis 平滑滚动
  useEffect(() => {
    function handleHashClick(e) {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return

      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!target) return

      e.preventDefault()

      // 动态读取实际偏移：固定 header + sticky 导航栏（如有）
      const stickyNav = document.querySelector('.page-sticky-nav')
      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '64'
      )
      const stickyNavHeight = stickyNav ? stickyNav.getBoundingClientRect().height : 0
      const offset = -(headerHeight + stickyNavHeight + 8)

      lenisRef.current?.scrollTo(target, { offset })

      // 更新 URL hash，不触发原生滚动
      window.history.pushState(null, '', hash)
    }

    document.addEventListener('click', handleHashClick)
    return () => document.removeEventListener('click', handleHashClick)
  }, [])

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  )
}

export function useLenisInstance() {
  return useContext(LenisContext)
}
