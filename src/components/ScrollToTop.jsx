import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenisInstance } from '../context/LenisContext'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenisRef = useLenisInstance()

  useEffect(() => {
    const lenis = lenisRef?.current
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) {
          lenis ? lenis.scrollTo(el, { offset: -80, duration: 1 }) : el.scrollIntoView({ behavior: 'smooth' })
        } else {
          lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }, 80)
      return () => clearTimeout(timer)
    } else {
      lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash, lenisRef])

  return null
}
