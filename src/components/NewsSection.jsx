import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'

const newsData = [
  {
    image: '/assets/images/news/new-img-01.jpg',
    date: '2025-9-28',
    title: '红运机械加入「全固态电池智能...',
    desc: '在新能源产业向"高安全、高能量密度、低能耗"升级的关键阶段，全固态电池作为下一代动力电池的核心突破口，正加速重构智能制造的技术逻辑与...',
  },
  {
    image: '/assets/images/news/new-img-02.jpg',
    date: '2025-7-10',
    title: '[强强联合·共启新篇] 红运机械&...',
    desc: '2025年6月25日，红运机械总经理吕柏良先生与赛科动力董事长朱高龙博士为"全国态电池关键设备联合开发实验室"的落地揭幕！这一里程碑式的合作...',
  },
  {
    image: '/assets/images/news/new-img-03.jpg',
    date: '2025-9-28',
    title: '红运机械2025新品重磅发布 | 从...',
    desc: '6月25日，红运机械2025新品发布会"浆芯之力·智链未来"新品发布会在金坛圆满举办。本次发布会，红运机械发布了高效管线式制浆系统、固态电池...',
  },
]

export default function NewsSection() {
  return (
    <section className="news">
      <div className="news-container">
        <h2 className="section-title">行业动态</h2>

        <div className="news-grid">
          {newsData.map((news, index) => (
            <article className="news-card" key={index}>
              <a href="#" className="news-card-link">
                <div className="news-card-image">
                  <img src={news.image} alt={news.title} />
                </div>
                <div className="news-card-content">
                  <time className="news-card-date">{news.date}</time>
                  <h3 className="news-card-title">{news.title}</h3>
                  <p className="news-card-desc">{news.desc}</p>
                  <span className="news-card-more">
                    了解更多
                    <span
                      className="news-card-arrow"
                      style={{
                        WebkitMaskImage: 'url(/assets/icons/gr/arrow-right%203.svg)',
                        maskImage: 'url(/assets/icons/gr/arrow-right%203.svg)',
                      }}
                    />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className="news-action">
          <a href="#" className="news-btn">
            浏览更多新闻
            <IconArrowRightOutline24 className="news-btn-arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
