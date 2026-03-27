import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

/**
 * CoreEquipmentCarousel — 核心设备轮播区块
 *
 * @param {Array}   items        - 设备列表，每项 { name: string, img: string }
 * @param {string}  title        - 区块标题，默认"核心设备"
 * @param {boolean} grayBg       - 是否使用灰色背景，默认 true
 * @param {number}  visibleCount - 同时可见卡片数，默认 3
 */
export default function CoreEquipmentCarousel({
  items = [],
  title = '核心设备',
  grayBg = true,
  visibleCount = 3,
}) {
  const [start, setStart] = useState(0)
  const max = Math.max(0, items.length - visibleCount)
  const canPrev = start > 0
  const canNext = start < max
  const cardWidthPct = 100 / visibleCount

  return (
    <section className={`page-section${grayBg ? ' page-section--gray' : ''}`}>
      <div className="page-container">
        <h2 className="section-heading section-heading--center fade-up">{title}</h2>
        <div className="pc-core-carousel-wrap fade-up fade-up-delay-1">
          <button
            className="pc-core-nav pc-core-nav--prev"
            onClick={() => setStart(i => Math.max(0, i - 1))}
            disabled={!canPrev}
            aria-label="上一组"
          >
            <ChevronLeft />
          </button>

          <div className="pc-core-carousel-viewport">
            <div
              className="pc-core-carousel-track"
              style={{ transform: `translateX(calc(-${start} * ${cardWidthPct}%))` }}
            >
              {items.map((eq, i) => (
                <div key={i} className="pc-core-card-outer">
                  {eq.link ? (
                    <Link to={eq.link} className="pc-core-card pc-core-card--link">
                      <div className="pc-core-card-img-wrap">
                        <img src={eq.img} alt={eq.name} className="pc-core-card-img" loading="lazy" />
                      </div>
                      <div className="pc-core-card-info">
                        <h3 className="pc-core-card-name">{eq.name}</h3>
                      </div>
                    </Link>
                  ) : (
                    <div className="pc-core-card">
                      <div className="pc-core-card-img-wrap">
                        <img src={eq.img} alt={eq.name} className="pc-core-card-img" loading="lazy" />
                      </div>
                      <div className="pc-core-card-info">
                        <h3 className="pc-core-card-name">{eq.name}</h3>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            className="pc-core-nav pc-core-nav--next"
            onClick={() => setStart(i => Math.min(max, i + 1))}
            disabled={!canNext}
            aria-label="下一组"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
