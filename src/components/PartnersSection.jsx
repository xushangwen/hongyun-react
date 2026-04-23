import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'

const P = '/assets/images/partner'
const C = `${P}/clients`

const row1Partners = [
  { logo: `${P}/par-logo-12.svg`,   alt: '比亚迪',   category: '新能源领域', name: '比亚迪' },
  { logo: `${P}/par-logo-02.svg`,   alt: '巴斯夫',   category: '胶粘剂领域', name: '巴斯夫' },
  { logo: `${C}/sp-heraeus.png`,    alt: '贺利氏',   category: '银浆领域',   name: '贺利氏' },
  { logo: `${C}/ph-cr.webp`,        alt: '华润',     category: '医药领域',   name: '华润' },
  { logo: `${C}/ne-calb.webp`,      alt: '中航锂电', category: '新能源领域', name: '中航锂电' },
  { logo: `${P}/par-logo-06.svg`,   alt: '汉高',     category: '胶粘剂领域', name: '汉高' },
  { logo: `${C}/sp-fusion.png`,     alt: '聚和新材', category: '银浆领域',   name: '聚和新材' },
  { logo: `${C}/ph-sirio.webp`,     alt: '仙乐健康', category: '医药领域',   name: '仙乐健康' },
]

const row2Partners = [
  { logo: `${C}/ne-eve.webp`,       alt: '亿纬锂能', category: '新能源领域', name: '亿纬锂能' },
  { logo: `${P}/par-logo-04.svg`,   alt: '陶氏化学', category: '胶粘剂领域', name: '陶氏化学' },
  { logo: `${C}/sp-rutech.png`,     alt: '儒兴科技', category: '银浆领域',   name: '儒兴科技' },
  { logo: `${C}/ph-yabao.webp`,     alt: '亚宝药业', category: '医药领域',   name: '亚宝药业集团' },
  { logo: `${P}/par-logo-08.svg`,   alt: '三星',     category: '新能源领域', name: '三星' },
  { logo: `${P}/par-logo-01.svg`,   alt: '埃肯',     category: '胶粘剂领域', name: '埃肯' },
  { logo: `${C}/sp-ssp.png`,        alt: '上海银浆', category: '银浆领域',   name: '上海银浆' },
  { logo: `${C}/ph-lingrui.webp`,   alt: '羚锐',     category: '医药领域',   name: '羚锐' },
]

const row3Partners = [
  { logo: `${C}/ne-svolt.webp`,     alt: '蜂巢能源', category: '新能源领域', name: '蜂巢能源' },
  { logo: `${C}/ad-honeywell.svg`,  alt: '霍尼韦尔', category: '胶粘剂领域', name: '美国霍尼韦尔' },
  { logo: `${C}/sp-riyu.png`,       alt: '日御股份', category: '银浆领域',   name: '日御股份' },
  { logo: `${C}/ph-khb.webp`,       alt: '科华生物', category: '医药领域',   name: '科华生物' },
  { logo: `${C}/ne-ganfeng.webp`,   alt: '赣锋锂电', category: '新能源领域', name: '赣锋锂电' },
  { logo: `${P}/par-logo-05.svg`,   alt: '万华化学', category: '胶粘剂领域', name: '万华化学' },
  { logo: `${C}/sp-dec.png`,        alt: '东方电气', category: '银浆领域',   name: '东方电气' },
  { logo: `${C}/ph-tianbang.webp`,  alt: '天邦医疗', category: '医药领域',   name: '天邦医疗' },
]

const row4Partners = [
  { logo: `${P}/par-logo-11.svg`,   alt: '远景动力', category: '新能源领域', name: '远景动力' },
  { logo: `${C}/ad-sika.svg`,       alt: '西卡',     category: '胶粘剂领域', name: '西卡' },
  { logo: `${C}/ne-murata.webp`,    alt: '村田制作所', category: '新能源领域', name: '村田制作所' },
  { logo: `${C}/ph-yifang.webp`,    alt: '一方制药', category: '医药领域',   name: '一方制药' },
  { logo: `${C}/ne-sunwoda.webp`,   alt: '欣旺达',   category: '新能源领域', name: '欣旺达' },
  { logo: `${P}/par-logo-07.svg`,   alt: '富乐科梅林', category: '胶粘剂领域', name: '富乐科梅林' },
  { logo: `${C}/ne-atl.webp`,       alt: 'ATL',      category: '新能源领域', name: 'ATL新能源科技' },
  { logo: `${C}/ph-jiudian.webp`,   alt: '九典制药', category: '医药领域',   name: '九典制药' },
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
        <h2 className="partners-title">追求完美，做到极致</h2>

        <ScrollRow partners={row1Partners} direction="left" />
        <ScrollRow partners={row2Partners} direction="right" />
        <ScrollRow partners={row3Partners} direction="left" />
        <ScrollRow partners={row4Partners} direction="right" />

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

        {/* Background Text */}
        <div className="partners-bg-text">PARTNERS</div>
      </div>
    </section>
  )
}
