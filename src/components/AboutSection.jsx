import { useEffect, useRef, useState } from 'react'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'

const statsData = [
  {
    icon: '/assets/icons/gr/coins-stack%202.svg',
    label: '资本实力',
    target: 1.9,
    unit: '亿',
    desc: '注册资本（CNY）',
    isDecimal: true,
  },
  {
    icon: '/assets/icons/gr/chart-bar-square-plus%202.svg',
    label: '研发积淀',
    target: 30,
    sup: '+',
    unit: '年',
    desc: '注册资本（CNY）',
    isDecimal: false,
  },
  {
    icon: '/assets/icons/gr/building%202.svg',
    label: '生产规模',
    target: 94000,
    unit: 'm²',
    desc: '现代化生产基地',
    isDecimal: false,
  },
]

function animateNumber(element, target, isDecimal, duration = 2000) {
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = 1 - Math.pow(1 - progress, 4)
    const currentValue = target * easeProgress

    if (isDecimal) {
      element.textContent = currentValue.toFixed(1)
    } else {
      element.textContent = Math.floor(currentValue).toLocaleString()
    }

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      element.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString()
    }
  }

  requestAnimationFrame(update)
}

export default function AboutSection() {
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
                animateNumber(el, statsData[index].target, statsData[index].isDecimal)
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

  return (
    <section className="about" ref={sectionRef}>
      <div className="about-bg" />
      <div className="about-container">
        {/* Top Content */}
        <div className="about-content">
          <div className="about-left">
            <h2 className="about-title">
              30年的混合设备研发及<br />产线集成技术的积累与沉淀
            </h2>
            <p className="about-subtitle">
              红运为客户研发和定制上料、输送、除尘、排空、<br />计量的个性化解决方案
            </p>
          </div>
          <div className="about-right">
            <p className="about-desc">
              红运机械自1993年成立以来，专注于混合设备的研究、开发与制造，始终以技术创新为核心驱动力。三十载砥砺前行，我们已成功开发出一系列高效节能、工艺领先的解决方案，为多个行业客户解决了诸多生产及工艺难题。
            </p>
            <p className="about-desc">
              凭借在粉体计量、物料输送、混合技术及液体处理系统等方面的深厚积累，红运机械为客户提供专业、精准、高效的整体解决方案，以卓越的技术实力助力客户实现产能与品质的双重提升。
            </p>
            <a href="#" className="about-btn">
              进一步探索
              <IconArrowRightOutline24 className="about-btn-arrow" size={18} />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats">
          {statsData.map((stat, index) => (
            <div className="about-stat" key={index}>
              <div
                className="about-stat-icon"
                style={{
                  WebkitMaskImage: `url(${stat.icon})`,
                  maskImage: `url(${stat.icon})`,
                }}
              />
              <div className="about-stat-content">
                <span className="about-stat-label">{stat.label}</span>
                <div className="about-stat-value">
                  <span
                    className="about-stat-number font-din"
                    ref={(el) => (numberRefs.current[index] = el)}
                    data-target={stat.target}
                  >
                    0
                  </span>
                  {stat.sup && <span className="about-stat-sup">{stat.sup}</span>}
                  <span className="about-stat-unit">{stat.unit}</span>
                </div>
                <span className="about-stat-desc">{stat.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
