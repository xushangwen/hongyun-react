import React from 'react'
import { useCmsDetail } from '../context/useCmsDetail'

/* ──────────────────────────────────────────────────────────
   SystemFeaturesSection — 系统/方案特点可复用区块
   props:
     features  {Icon, img, title, desc}[]  必填
     title     string                      默认 "系统特点"
     grayBg    boolean                     默认 true（灰色背景）
     columns   number (可选)               强制指定列数，启用 flex 居中布局
   ────────────────────────────────────────────────────────── */

function getGridCols(n) {
  if (n <= 4) return n
  if (n === 5) return 5
  if (n % 3 === 0) return 3
  if (n % 4 === 0) return 4
  return 3
}

export default function SystemFeaturesSection({ features = [], title = '系统特点', enLabel, grayBg = true, columns }) {
  const { detail, status } = useCmsDetail()
  const cmsSection = detail?.sections?.find(
    (section) => section.__component === 'content.feature-grid',
  )
  if (status === 'ready' && cmsSection?.visible === false) return null

  const cmsFeatures = (cmsSection?.items || [])
    .filter((item) => item.iconMedia?.url || item.iconKey)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => ({
      img: item.iconMedia?.url,
      title: item.title,
      desc: item.description,
    }))
  const resolvedFeatures = cmsFeatures.length ? cmsFeatures : features
  if (!resolvedFeatures.length) return null
  const resolvedTitle = cmsFeatures.length ? (cmsSection.title || title) : title
  const useFlexCenter = columns !== undefined
  const cols = useFlexCenter ? columns : getGridCols(resolvedFeatures.length)

  return (
    <section className={`page-section${grayBg ? ' page-section--gray' : ''}`}>
      <div className="page-container">
        {enLabel && <p className="section-en-label fade-up">{enLabel}</p>}
        <h2 className="section-heading section-heading--center fade-up">{resolvedTitle}</h2>
        <div
          className={`cp-feat-icon-grid${useFlexCenter ? ' cp-feat-icon-grid--flex' : ''}`}
          style={useFlexCenter ? { '--flex-cols': cols } : { gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {resolvedFeatures.map(({ Icon, img, title: featTitle, desc }, i) => (
            <div
              key={i}
              className={`cp-feat-icon-card fade-up fade-up-delay-${(i % Math.min(cols, 3)) + 1}`}
            >
              <div className="cp-feat-icon-wrap">
                {Icon ? <Icon /> : <img src={img} alt={featTitle} className="cp-feat-icon-img" loading="lazy" />}
              </div>
              <h3 className="cp-feat-icon-title">{featTitle}</h3>
              {desc && <div className="cp-feat-icon-desc">{desc}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
