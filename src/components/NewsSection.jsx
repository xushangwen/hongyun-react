import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import newsData from '../data/newsData'

const featuredNews = newsData.slice(0, 3)

export default function NewsSection({ title = '行业动态' }) {
  return (
    <section className="news">
      <div className="news-container">
        <h2 className="section-title">{title || '行业动态'}</h2>

        <div className="news-grid">
          {featuredNews.map((news) => (
            <article className="news-card" key={news.id}>
              <Link to={`/news/${news.id}`} className="news-card-link">
                <div className="news-card-image">
                  <img src={news.image} alt={news.title} />
                </div>
                <div className="news-card-content">
                  <time className="news-card-date">{news.dateDisplay}</time>
                  <h3 className="news-card-title">{news.title}</h3>
                  <p className="news-card-desc">{news.summary}</p>
                  <div className="news-card-footer">
                    <span className="news-card-category">{news.category}</span>
                    <span className="news-card-more">
                      阅读全文
                      <IconArrowRightOutline24 size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="news-action">
          <Link to="/news" className="news-btn">
            浏览更多新闻
            <IconArrowRightOutline24 className="news-btn-arrow" size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
