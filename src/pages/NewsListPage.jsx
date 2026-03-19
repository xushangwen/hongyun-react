import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import newsData from '../data/newsData'
import newsHeroImg from '../assets/img/IMG_4865 拷贝.jpg'

const PAGE_SIZE = 12

const _sorted = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date))
const _top3 = _sorted.slice(0, 3)
// 重复填充至15条以支持「浏览更多」交互演示
const sortedNews = [..._top3, ..._top3, ..._top3, ..._top3, ..._top3].map((item, i) => ({
  ...item,
  _key: `${item.id}-${i}`,
}))

export default function NewsListPage() {
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)
  const [activeCategory, setActiveCategory] = useState('全部')

  const categories = ['全部', ...new Set(sortedNews.map((n) => n.category))]

  const filtered = activeCategory === '全部'
    ? sortedNews
    : sortedNews.filter((n) => n.category === activeCategory)

  const pageNews = filtered.slice(0, displayCount)
  const hasMore = displayCount < filtered.length

  useEffect(() => {
    setDisplayCount(PAGE_SIZE)
  }, [activeCategory])

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + PAGE_SIZE, filtered.length))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.news-list-card').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pageNews])

  return (
    <>
      <PageHero
        title="行业动态"
        subtitle="聚焦固态电池与高端装备制造前沿资讯"
        bgImage={newsHeroImg}
        bgPosition="center 40%"
      />

      <div className="page-body">
        <Breadcrumb items={[{ label: '行业动态' }]} />

        {/* 分类筛选 - sticky 全宽 */}
        <div className="page-sticky-nav">
          <div className="page-container">
            <div className="news-list-filter">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`news-filter-btn${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="news-list-section">
          <div className="page-container">

            {/* 新闻网格 */}
            {pageNews.length > 0 ? (
              <div className="news-list-grid">
                {pageNews.map((news, i) => (
                  <article
                    className="news-list-card"
                    key={news._key}
                    style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
                  >
                    <Link to={`/news/${news.id}`} className="news-list-card-link">
                      <div className="news-list-card-image">
                        <img src={news.image} alt={news.title} loading="lazy" />
                      </div>
                      <div className="news-list-card-content">
                        <time className="news-list-card-date">{news.dateDisplay}</time>
                        <h3 className="news-list-card-title">{news.title}</h3>
                        <p className="news-list-card-summary">{news.summary}</p>
                        <div className="news-list-card-footer">
                          <span className="news-list-card-category">{news.category}</span>
                          <span className="news-list-card-more">
                            阅读全文
                            <IconArrowRightOutline24 size={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="news-list-empty">暂无相关新闻</div>
            )}

            {/* 加载更多 */}
            {hasMore && (
              <div className="news-list-load-more">
                <button className="news-load-more-btn" onClick={loadMore}>
                  浏览更多新闻
                  <IconArrowRightOutline24 size={18} />
                </button>
              </div>
            )}

          </div>
        </section>
      </div>
    </>
  )
}
