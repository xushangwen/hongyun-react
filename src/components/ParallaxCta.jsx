import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxCta({ bgImage, title, desc, linkTo = '/contact', linkLabel = '联系我们' }) {
  const containerRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="detail-contact-cta">
      <div className="detail-contact-inner" ref={containerRef}>
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
