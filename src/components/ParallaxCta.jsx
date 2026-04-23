import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import { useLenisInstance } from '../context/LenisContext'

export default function ParallaxCta({ bgImage, title, desc, linkTo = '/contact', linkLabel = '联系我们' }) {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const lenisRef = useLenisInstance()

  useEffect(() => {
    const lenis = lenisRef?.current
    if (!lenis) return

    function onScroll() {
      if (!sectionRef.current || !bgRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2
      bgRef.current.style.transform = `translateY(${centerOffset * 0.2}px)`
    }

    lenis.on('scroll', onScroll)
    onScroll()
    return () => lenis.off('scroll', onScroll)
  }, [lenisRef])

  return (
    <div className="detail-contact-cta">
      <div className="detail-contact-inner" ref={sectionRef}>
        <div
          ref={bgRef}
          className="detail-contact-parallax-bg"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
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
