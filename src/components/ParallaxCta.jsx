import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import { useLenisInstance } from '../context/LenisContext'

export default function ParallaxCta({ bgImage, title, desc, linkTo = '/contact', linkLabel = '联系我们' }) {
  const sectionRef = useRef(null)
  const lenisRef = useLenisInstance()

  useEffect(() => {
    const lenis = lenisRef?.current
    if (!lenis) return

    function onScroll() {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      // progress: 正数=在视口下方, 负数=在视口上方, 0=居中
      const progress = (rect.top + rect.height / 2) / window.innerHeight
      // background-position Y 从 30%（进入时）过渡到 70%（离开时）
      const yPercent = Math.round(50 - progress * 20)
      sectionRef.current.style.backgroundPosition = `center ${yPercent}%`
    }

    lenis.on('scroll', onScroll)
    onScroll()
    return () => lenis.off('scroll', onScroll)
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
