import { useEffect, useRef, useState } from 'react'

const strengthStats = [
  { target: 4, sup: '', unit: '%', label: '研发投入' },
  { target: 200, sup: '+', unit: '', label: '自主研发专利' },
  { target: 25, sup: '', unit: '%', label: '博士占比硕士占比' },
]

const certifications = [
  { img: '/assets/images/str/cert-iso9001.png', label: 'ISO 9001' },
  { img: '/assets/images/str/cert-iso14001.png', label: 'ISO 14001' },
  { img: '/assets/images/str/cert-sgs.svg', label: 'SGS认证' },
  { img: '/assets/images/str/cert-patent.webp', label: '专利证书' },
]

const certImages = [
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

function animateNumber(element, target, duration = 2000) {
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = 1 - Math.pow(1 - progress, 4)
    const currentValue = target * easeProgress

    element.textContent = Math.floor(currentValue)

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      element.textContent = target
    }
  }

  requestAnimationFrame(update)
}

export default function StrengthSection() {
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
                animateNumber(el, strengthStats[index].target)
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
  }, [animated])

  // 生成滚动列内容（重复以实现无缝循环）
  const renderScrollCol = (images, direction) => (
    <div className={`cert-scroll-col cert-scroll-${direction}`}>
      <div className="cert-scroll-track">
        {images.map((img, i) => (
          <div className="cert-item" key={i}>
            <img src={img} alt="证书" />
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
            研发创新
          </h2>
          <p className="strength-desc">
            红运机械的研发体系致力于新材料与新工艺的开发、产品开发，以及样品的试制与测试验证。结合市场需求与行业前沿技术动态，专注于新能源电池材料、化工材料、电子材料、涂料、医疗药剂、火工炸药等多个应用领域的物料搅拌混合设备技术。通过持续创新打造性能卓越、质量可靠的搅拌混合设备产品系列，以满足不同领域客户的精准需求。
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
                <img src={cert.img} alt={cert.label} />
                <span>{cert.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Certificates Scroll */}
        <div className="strength-right">
          {renderScrollCol(
            [certImages[0], certImages[1], certImages[2], certImages[3], certImages[0], certImages[1], certImages[2], certImages[3]],
            'up'
          )}
          {renderScrollCol(
            [certImages[4], certImages[5], certImages[6], certImages[7], certImages[4], certImages[5], certImages[6], certImages[7]],
            'down'
          )}
          {renderScrollCol(
            [certImages[8], certImages[9], certImages[10], certImages[8], certImages[9], certImages[10]],
            'up'
          )}
        </div>
      </div>
    </section>
  )
}
