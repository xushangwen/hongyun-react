import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { IconUsersChatOutline24 } from 'nucleo-core-outline-24'
import { IconChevronUpOutline24 } from 'nucleo-core-outline-24'
import { useLenisInstance } from '../hooks/useLenisInstance'

export default function FixedSideButtons() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [heroOutOfView, setHeroOutOfView] = useState(false)
  const lenisRef = useLenisInstance()

  useEffect(() => {
    // 观察 .hero 是否离开视口，替代 scroll 事件，避免每帧触发 setState
    const heroEl = document.querySelector('.hero')
    if (!heroEl) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setHeroOutOfView(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [location.pathname])

  const visible = !isHome || heroOutOfView

  const scrollToTop = () => {
    lenisRef?.current?.scrollTo(0, { duration: 1.2 })
  }

  return (
    <div className={`fixed-side-btns${visible ? ' visible' : ''}`}>
      <a href="#contact" className="fixed-btn fixed-btn-contact" aria-label="联系我们">
        <IconUsersChatOutline24 size={24} aria-hidden={true} />
      </a>
      <button className="fixed-btn fixed-btn-top" aria-label="回到顶部" onClick={scrollToTop}>
        <IconChevronUpOutline24 size={24} aria-hidden={true} />
      </button>
    </div>
  )
}
