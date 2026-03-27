import React, { useState } from 'react'
import {
  IconChevronLeftOutline24,
  IconChevronRightOutline24,
} from 'nucleo-core-outline-24'

export default function CustomerCasesSection({ cases }) {
  const [caseIndex, setCaseIndex] = useState(0)
  const totalCases = cases.length
  const currentCase = cases[caseIndex]

  const prevCase = () => setCaseIndex((i) => (i - 1 + totalCases) % totalCases)
  const nextCase = () => setCaseIndex((i) => (i + 1) % totalCases)

  return (
    <section className="page-section">
      <div className="page-container">
        <div className="cp-carousel-header fade-up">
          <h2 className="section-heading cp-carousel-heading">客户案例</h2>
          <div className="cp-carousel-nav">
            <span className="cp-carousel-count">
              {String(caseIndex + 1).padStart(2, '0')} / {String(totalCases).padStart(2, '0')}
            </span>
            <button className="cp-carousel-btn" onClick={prevCase} aria-label="上一个案例">
              <IconChevronLeftOutline24 size={20} />
            </button>
            <button className="cp-carousel-btn" onClick={nextCase} aria-label="下一个案例">
              <IconChevronRightOutline24 size={20} />
            </button>
          </div>
        </div>

        <div className="cp-carousel-body" key={caseIndex}>
          <div className="cp-carousel-img-col">
            <img
              src={currentCase.img}
              alt={currentCase.client}
              className="cp-carousel-img"
              loading="lazy"
            />
          </div>
          <div className="cp-carousel-content-col">
            {currentCase.tag && (
              <span className="cp-carousel-tag">{currentCase.tag}</span>
            )}
            <h3 className="cp-carousel-client">{currentCase.client}</h3>
            <p className="cp-carousel-desc">{currentCase.desc}</p>
            {currentCase.metrics && currentCase.metrics.length > 0 && (
              <div className="cp-carousel-metrics">
                {currentCase.metrics.map((m, i) => (
                  <div key={i} className="cp-carousel-metric">
                    <span className="cp-carousel-metric-value">{m.value}</span>
                    <span className="cp-carousel-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="cp-carousel-dots fade-up fade-up-delay-2">
          {cases.map((_, i) => (
            <button
              key={i}
              className={`cp-carousel-dot ${i === caseIndex ? 'cp-carousel-dot--active' : ''}`}
              onClick={() => setCaseIndex(i)}
              aria-label={`切换到案例 ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
