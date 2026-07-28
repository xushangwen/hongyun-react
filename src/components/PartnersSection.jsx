import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import { partnerGroupsData } from '../data/partners'

// 视觉滚动速度统一：每个 item 约 4 秒，duration 与 item 数线性相关
const SECONDS_PER_ITEM = 4

function PartnerItem({ partner, category }) {
  return (
    <div className="partner-item">
      <div className={`partner-logo${partner.textOnly ? ' partner-logo-text-mode' : ''}`}>
        {partner.textOnly ? (
          <span className="partner-logo-text">{partner.name}</span>
        ) : (
          <img src={partner.logo} alt={partner.alt || partner.name} loading="lazy" />
        )}
      </div>
      <div className="partner-info">
        <span className="partner-category">{category}</span>
        <span className="partner-name">{partner.name}</span>
      </div>
    </div>
  )
}

function ScrollRow({ rowKey, items, category, direction }) {
  const duped = [...items, ...items]
  const duration = items.length * SECONDS_PER_ITEM

  return (
    <div className={`partners-scroll-row scroll-${direction}`}>
      <div
        className="partners-scroll-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {duped.map((partner, index) => (
          <PartnerItem
            key={`${rowKey}-${partner.name}-${index}`}
            partner={partner}
            category={category}
          />
        ))}
      </div>
    </div>
  )
}

export default function PartnersSection() {
  return (
    <section className="partners">
      <div className="partners-container">
        <h2 className="partners-title">追求完美，做到极致</h2>

        {partnerGroupsData.map((group, idx) => (
          <ScrollRow
            key={group.id}
            rowKey={group.id}
            items={group.items}
            category={group.category}
            direction={idx % 2 === 0 ? 'left' : 'right'}
          />
        ))}

        {/* Bottom Content */}
        <div className="partners-bottom">
          <div className="partners-text">
            <h3 className="partners-subtitle">
              红运机械凭借卓越的技术与可靠的品质，<br />赢得了全球领先企业的信赖与选择。
            </h3>
            <p className="partners-desc">
              我们与行业领袖建立的深度合作关系，不仅见证了红运产品的实力，<br />更成为推动行业技术进步的重要力量。
            </p>
            <a href="/about#partners-page" className="partners-btn">
              浏览所有合作客户
              <IconArrowRightOutline24 className="partners-btn-arrow" size={18} />
            </a>
          </div>
        </div>

        <div className="partners-bg-text">PARTNERS</div>
      </div>
    </section>
  )
}
