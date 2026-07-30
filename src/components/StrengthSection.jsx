import { useEffect, useMemo, useRef, useState } from 'react'

const defaultStrengthStats = [
  { target: 5.6, decimals: 1, sup: '', unit: '%', label: '研发投入' },
  { target: 200, sup: '+', unit: '', label: '自主研发专利' },
  { target: 25, sup: '', unit: '%', label: '博士占比硕士占比' },
]

const defaultCertifications = [
  { img: '/assets/images/str/cert-iso9001.webp', label: 'ISO 9001' },
  { img: '/assets/images/str/cert-iso14001.webp', label: 'ISO 14001' },
  { img: '/assets/images/str/cert-sgs.svg', label: 'SGS认证' },
  { img: '/assets/images/str/cert-patent.webp', label: '专利证书' },
]

const defaultCertImages = [
  '/assets/images/honors/certificate/ce-cert.webp',
  '/assets/images/honors/certificate/iso9001.webp',
  '/assets/images/honors/certificate/iso14001.webp',
  '/assets/images/honors/patent/patent-01.webp',
  '/assets/images/honors/patent/patent-02.webp',
  '/assets/images/honors/patent/patent-03.webp',
  '/assets/images/honors/patent/patent-04.webp',
  '/assets/images/honors/patent/patent-05.webp',
  '/assets/images/honors/patent/patent-06.webp',
  '/assets/images/honors/patent/patent-07.webp',
  '/assets/images/honors/patent/patent-08.webp',
]

function animateNumber(element, target, decimals = 0, duration = 2000) {
  const startTime = performance.now()
  const factor = Math.pow(10, decimals)

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = 1 - Math.pow(1 - progress, 4)
    const currentValue = target * easeProgress

    element.textContent = (Math.floor(currentValue * factor) / factor).toFixed(decimals)

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      element.textContent = target.toFixed(decimals)
    }
  }

  requestAnimationFrame(update)
}

export default function StrengthSection({ content }) {
  const strengthStats = useMemo(() => (
    content?.stats?.length
      ? content.stats.map((stat) => ({
          target: Number(stat.value),
          decimals: Number.isInteger(Number(stat.value)) ? 0 : 1,
          sup: '',
          unit: stat.suffix || '',
          label: stat.label,
        }))
      : defaultStrengthStats
  ), [content])
  const certifications = useMemo(() => (
    content?.certifications?.length
      ? content.certifications
          .map((item) => ({ img: item.media?.url, label: item.label || item.alt }))
          .filter((item) => item.img)
      : defaultCertifications
  ), [content])
  const certImages = useMemo(() => {
    const remote = (content?.certificateGallery || [])
      .map((item) => item.media?.url)
      .filter(Boolean)
    return remote.length ? remote : defaultCertImages
  }, [content])
  const sectionRef = useRef(null)
  const numberRefs = useRef([])
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true)
            numberRefs.current.forEach((el, index) => {
              if (el) {
                animateNumber(el, strengthStats[index].target, strengthStats[index].decimals || 0)
              }
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [animated, strengthStats])

  // 生成滚动列内容（重复以实现无缝循环）
  const renderScrollCol = (images, direction) => (
    <div className={`cert-scroll-col cert-scroll-${direction}`}>
      <div className="cert-scroll-track">
        {images.map((img, i) => (
          <div className="cert-item" key={i}>
            <img src={img} alt="证书" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section className="strength" ref={sectionRef}>
      <div className="strength-container">
        <div className="strength-left">
          <h2 className="strength-title">
            {content?.title || '研发创新'}
          </h2>
          <p className="strength-desc">
            {content?.description || '红运机械的研发体系致力于新材料与新工艺的开发、产品开发，以及样品的试制与测试验证。结合市场需求与行业前沿技术动态，专注于新能源电池材料、化工材料、电子材料、涂料、医疗药剂、火工炸药等多个应用领域的物料搅拌混合设备技术。通过持续创新打造性能卓越、质量可靠的搅拌混合设备产品系列，以满足不同领域客户的精准需求。'}
          </p>

          <div className="strength-divider" />

          {/* Stats */}
          <div className="strength-stats">
            {strengthStats.map((stat, index) => (
              <div className="strength-stat" key={index}>
                <div className="strength-stat-value">
                  <span
                    className="strength-stat-number font-din"
                    ref={(el) => (numberRefs.current[index] = el)}
                    data-target={stat.target}
                  >
                    0
                  </span>
                  <span className="strength-stat-sup font-din">{stat.sup}</span>
                  <span className="strength-stat-unit">{stat.unit}</span>
                </div>
                <span className="strength-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="strength-divider" />

          {/* Certifications */}
          <div className="strength-certs">
            {certifications.map((cert, index) => (
              <div className="strength-cert" key={index}>
                <img src={cert.img} alt={cert.label} loading="lazy" />
                <span>{cert.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Certificates Scroll */}
        <div className="strength-right">
          {renderScrollCol([...certImages.filter((_, index) => index % 3 === 0), ...certImages.filter((_, index) => index % 3 === 0)], 'up')}
          {renderScrollCol([...certImages.filter((_, index) => index % 3 === 1), ...certImages.filter((_, index) => index % 3 === 1)], 'down')}
          {renderScrollCol([...certImages.filter((_, index) => index % 3 === 2), ...certImages.filter((_, index) => index % 3 === 2)], 'up')}
        </div>
      </div>
    </section>
  )
}
