import React from 'react'

/**
 * IncludedEquipmentSection — 包含设备区块
 *
 * @param {Array}   items  - 设备列表，每项 { name: string, img: string }
 * @param {string}  title  - 区块标题，默认"包含设备"
 * @param {boolean} grayBg - 是否使用灰色背景，默认 false
 */
export default function IncludedEquipmentSection({
  items = [],
  title = '包含设备',
  grayBg = false,
}) {
  return (
    <section className={`page-section${grayBg ? ' page-section--gray' : ''}`}>
      <div className="page-container">
        <h2 className="section-heading section-heading--center fade-up">{title}</h2>
        <div className="pc-incl-grid">
          {items.map((eq, i) => (
            <div key={i} className={`pc-incl-card fade-up fade-up-delay-${(i % 2) + 1}`}>
              <div className="pc-incl-card-content">
                <span className="pc-incl-card-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="pc-incl-card-name">{eq.name}</h3>
              </div>
              <div className="pc-incl-card-img-wrap">
                <img src={eq.img} alt={eq.name} className="pc-incl-card-img" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
