import { useEffect, useRef, useState } from 'react'

const strengthStats = [
  { target: 100, sup: '+', unit: '项', label: '累计专利技术' },
  { target: 30, sup: '+', unit: '%', label: '研发人员占比' },
  { target: 8, sup: '+', unit: '%', label: '年均研发投入' },
]

const certifications = [
  { img: '/assets/images/str/au-01.svg', label: '国家高新技术企业' },
  { img: '/assets/images/str/au-02.svg', label: '专精特新"小巨人"企业' },
  { img: '/assets/images/str/au-03.svg', label: 'CNAS认证' },
  { img: '/assets/images/str/au-04.svg', label: 'CE认证' },
  { img: '/assets/images/str/au-05.svg', label: 'UL安全认证' },
  { img: '/assets/images/str/au-06.svg', label: 'ISO9001' },
]

const certImages = [
  '/assets/images/str/cr-01.jpg',
  '/assets/images/str/cr-02.jpg',
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
            以国家级专精特新实力<br />定义混合设备新高度
          </h2>
          <p className="strength-desc">
            红运机械坚持每年将高比例营收投入研发，依托CNAS级实验检测中心与全球顶尖技术团队，在全固态电池设备及流体自动化领域持续突破，以权威认证（CE/UL）对标国际严苛标准。
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
            [certImages[0], certImages[1], certImages[0], certImages[1]],
            'up'
          )}
          {renderScrollCol(
            [certImages[1], certImages[0], certImages[1], certImages[0]],
            'down'
          )}
          {renderScrollCol(
            [certImages[0], certImages[1], certImages[0], certImages[1]],
            'up'
          )}
        </div>
      </div>
    </section>
  )
}
