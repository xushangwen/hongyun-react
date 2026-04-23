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
    desc: '研发经验',
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
              红运机械自1993年创立以来，致力于混合设备的研究、开发及制造，在不同领域开发了诸多高效节能、创新的混合设备解决方案和系统，帮助用户解决许多生产及生产工艺方面遇到的问题。因此，我们可以依用30多年来积累在粉体计量、混合及输送方面的技术及物料混合生产工艺经验沉淀，为粉体上料、浆料混合及输送行业提供更好的建议及使用方法。
            </p>
            <p className="about-desc">
              我们的产品广泛应用于新能源、电子电极浆料、各种胶粘剂、火工药剂、涂料、食品、医药及化妆品等行业。
            </p>
            <a href="/about" className="about-btn">
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
