import React from 'react'

/* ──────────────────────────────────────────────────────────
   SystemFeaturesSection — 系统/方案特点可复用区块
   props:
     features  {Icon, title, desc}[]  必填
     title     string                 默认 "系统特点"
     grayBg    boolean                默认 true（灰色背景）
   ────────────────────────────────────────────────────────── */

/**
 * 智能列数算法：
 *   ≤ 4 items → 全部并排（单行）
 *   5        → 5 列
 *   % 3 == 0 → 3 列
 *   % 4 == 0 → 4 列
 *   其他      → 3 列（兜底）
 */
function getGridCols(n) {
  if (n <= 4) return n
  if (n === 5) return 5
  if (n % 3 === 0) return 3
  if (n % 4 === 0) return 4
  return 3
}

export default function SystemFeaturesSection({ features = [], title = '系统特点', grayBg = true }) {
  const cols = getGridCols(features.length)

  return (
    <section className={`page-section${grayBg ? ' page-section--gray' : ''}`}>
      <div className="page-container">
        <h2 className="section-heading section-heading--center fade-up">{title}</h2>
        <div
          className="cp-feat-icon-grid"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {features.map(({ Icon, img, title: featTitle, desc }, i) => (
            <div
              key={i}
              className={`cp-feat-icon-card fade-up fade-up-delay-${(i % Math.min(cols, 3)) + 1}`}
            >
              <div className="cp-feat-icon-wrap">
                {Icon ? <Icon /> : <img src={img} alt={featTitle} className="cp-feat-icon-img" loading="lazy" />}
              </div>
              <h3 className="cp-feat-icon-title">{featTitle}</h3>
              <p className="cp-feat-icon-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
