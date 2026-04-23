import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import { useLenisInstance } from '../context/LenisContext'

export default function ParallaxCta({ bgImage, title, desc, linkTo = '/contact', linkLabel = '联系我们' }) {
  const sectionRef = useRef(null)
  const lenisRef = useLenisInstance()

  useEffect(() => {
    const lenis = lenisRef?.current
    const section = sectionRef.current
    if (!lenis || !section) return

    // 缓存元素中心的文档坐标，避免 scroll handler 里触发 reflow
    let sectionMidY = section.offsetTop + section.offsetHeight / 2

    const handleResize = () => {
      sectionMidY = section.offsetTop + section.offsetHeight / 2
    }
    window.addEventListener('resize', handleResize, { passive: true })

    function onScroll({ scroll }) {
      const viewMid = scroll + window.innerHeight / 2
      const progress = (sectionMidY - viewMid) / window.innerHeight
      // progress > 0: 元素在视口下方; < 0: 在视口上方
      const yPercent = 50 - progress * 20
      section.style.backgroundPosition = `center ${yPercent}%`
    }

    lenis.on('scroll', onScroll)
    onScroll({ scroll: lenis.scroll ?? 0 })

    return () => {
      lenis.off('scroll', onScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [lenisRef])

  return (
    <div className="detail-contact-cta">
      <div
        className="detail-contact-inner"
        ref={sectionRef}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h2 className="detail-contact-title">{title}</h2>
        {desc && <p className="detail-contact-desc" dangerouslySetInnerHTML={{ __html: desc }} />}
        <Link to={linkTo} className="btn-primary">
          {linkLabel}
          <IconArrowRightOutline24 size={18} />
        </Link>
      </div>
    </div>
  )
}
