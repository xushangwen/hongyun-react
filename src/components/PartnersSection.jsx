import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'

const row1Partners = [
  { logo: '/assets/images/partner/par-logo-01.svg', alt: '宁德时代', category: '电子材料领域', name: '埃肯' },
  { logo: '/assets/images/partner/par-logo-02.svg', alt: '比亚迪', category: '化工材料领域', name: '巴斯夫' },
  { logo: '/assets/images/partner/par-logo-03.svg', alt: '远景动力', category: '电子材料领域', name: '华为' },
  { logo: '/assets/images/partner/par-logo-04.svg', alt: '特斯拉', category: '化工材料领域', name: '陶氏化学' },
  { logo: '/assets/images/partner/par-logo-05.svg', alt: 'TDK', category: '化工材料领域', name: '万华' },
  { logo: '/assets/images/partner/par-logo-06.svg', alt: '三星', category: '化工材料领域', name: '汉高' },
]

const row2Partners = [
  { logo: '/assets/images/partner/par-logo-07.svg', alt: '汉高', category: '化工材料领域', name: '富乐科梅林' },
  { logo: '/assets/images/partner/par-logo-08.svg', alt: '万画', category: '电子材料领域', name: '三星' },
  { logo: '/assets/images/partner/par-logo-09.svg', alt: '陶氏化学', category: '电子材料领域', name: 'TDK' },
  { logo: '/assets/images/partner/par-logo-10.svg', alt: '华为', category: '新能源领域', name: '特斯拉' },
  { logo: '/assets/images/partner/par-logo-11.svg', alt: '巴斯夫', category: '新能源领域', name: '远景动力' },
  { logo: '/assets/images/partner/par-logo-12.svg', alt: '宁德时代', category: '新能源领域', name: '比亚迪' },
]

function PartnerItem({ partner }) {
  return (
    <div className="partner-item">
      <div className="partner-logo">
        <img src={partner.logo} alt={partner.alt} />
      </div>
      <div className="partner-info">
        <span className="partner-category">{partner.category}</span>
        <span className="partner-name">{partner.name}</span>
      </div>
    </div>
  )
}

function ScrollRow({ partners, direction }) {
  // 重复一次以实现无缝循环
  const allPartners = [...partners, ...partners]

  return (
    <div className={`partners-scroll-row scroll-${direction}`}>
      <div className="partners-scroll-track">
        {allPartners.map((partner, index) => (
          <PartnerItem key={`${partner.name}-${index}`} partner={partner} />
        ))}
      </div>
    </div>
  )
}

export default function PartnersSection() {
  return (
    <section className="partners">
      <div className="partners-container">
        <h2 className="partners-title">携手共进，创造价值</h2>

        <ScrollRow partners={row1Partners} direction="left" />
        <ScrollRow partners={row2Partners} direction="right" />

        {/* Bottom Content */}
        <div className="partners-bottom">
          <div className="partners-text">
            <h3 className="partners-subtitle">
              红运机械凭借卓越的技术与可靠的品质，<br />赢得了全球领先企业的信赖与选择。
            </h3>
            <p className="partners-desc">
              我们与行业领袖建立的深度合作关系，不仅见证了红运产品的实力，<br />更成为推动行业技术进步的重要力量。
            </p>
            <a href="#" className="partners-btn">
              浏览所有合作客户
              <IconArrowRightOutline24 className="partners-btn-arrow" size={18} />
            </a>
          </div>
        </div>

        {/* Background Text */}
        <div className="partners-bg-text">PARTNERS</div>
      </div>
    </section>
  )
}
