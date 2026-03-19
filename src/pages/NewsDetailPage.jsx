import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import { IconArrowLeftOutline24 } from 'nucleo-core-outline-24'
import { IconCalendarOutline24 } from 'nucleo-core-outline-24'
import { IconTagOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'
import ImageCarousel from '../components/ImageCarousel'
import newsData from '../data/newsData'
import newsHeroImg from '../assets/img/IMG_4865 拷贝.jpg'

function ArticleBlock({ block, articleId }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="article-paragraph">{block.text}</p>
    case 'bold_paragraph':
      return <p className="article-paragraph article-paragraph--bold">{block.text}</p>
    case 'section_title':
      return (
        <div className="article-section-title-wrap">
          <h2 className="article-section-title">{block.text}</h2>
        </div>
      )
    case 'image':
      return (
        <figure className="article-figure">
          {block.src ? (
            <img 
              src={`/news-images/${articleId}/${block.src}`} 
              alt={block.alt || ''} 
              className="article-image"
            />
          ) : (
            <ImagePlaceholder height="400px" label={block.alt} />
          )}
          {block.caption && (
            <figcaption className="article-figcaption">{block.caption}</figcaption>
          )}
        </figure>
      )
    case 'image_carousel':
      return <ImageCarousel images={block.images} articleId={articleId} />
    case 'quote':
      return (
        <blockquote className="article-blockquote">
          <p>{block.text}</p>
          {block.author && <cite className="article-cite">—— {block.author}</cite>}
        </blockquote>
      )
    default:
      return null
  }
}

export default function NewsDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const article = newsData.find((n) => n.id === id)
  const sortedNews = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date))
  const currentIndex = sortedNews.findIndex((n) => n.id === id)
  const prevArticle = currentIndex > 0 ? sortedNews[currentIndex - 1] : null
  const nextArticle = currentIndex < sortedNews.length - 1 ? sortedNews[currentIndex + 1] : null
  const relatedArticles = sortedNews.filter((n) => n.id !== id && n.category === article?.category).slice(0, 3)
  const fallbackRelated = sortedNews.filter((n) => n.id !== id).slice(0, 3)

  useEffect(() => {
    if (!article) navigate('/news', { replace: true })
  }, [article, navigate])

  if (!article) return null

  return (
    <>
      <PageHero
        title={article.category}
        subtitle="行业动态 · 前沿资讯"
        bgImage={newsHeroImg}
        bgPosition="center 40%"
      />

      <div className="page-body page-body--news-detail">
        <Breadcrumb
          items={[
            { label: '行业动态', path: '/news' },
            { label: article.title.length > 20 ? article.title.slice(0, 20) + '…' : article.title },
          ]}
        />

        <div className="article-layout">
          {/* ===== 文章主体 ===== */}
          <article className="article-main">
            {/* 文章头部 */}
            <header className="article-header">
              <div className="article-meta-row">
                <span className="article-category-badge">{article.category}</span>
                <div className="article-meta-items">
                  <span className="article-meta-item">
                    <IconCalendarOutline24 size={14} />
                    {article.dateDisplay}
                  </span>
                  <span className="article-meta-item">
                    <IconTagOutline24 size={14} />
                    红运机械
                  </span>
                </div>
              </div>
              <h1 className="article-title">{article.title}</h1>
              <p className="article-lead">{article.summary}</p>
              <div className="article-header-divider" />
            </header>

            {/* 正文内容 */}
            <div className="article-body">
              {article.blocks.map((block, index) => (
                <ArticleBlock key={index} block={block} articleId={article.id} />
              ))}
            </div>

            {/* 上下篇导航 */}
            <nav className="article-nav">
              {prevArticle ? (
                <Link to={`/news/${prevArticle.id}`} className="article-nav-item article-nav-item--prev">
                  <span className="article-nav-label">
                    <IconArrowLeftOutline24 size={14} />
                    上一篇
                  </span>
                  <span className="article-nav-title">{prevArticle.title}</span>
                </Link>
              ) : <div />}
              {nextArticle ? (
                <Link to={`/news/${nextArticle.id}`} className="article-nav-item article-nav-item--next">
                  <span className="article-nav-label">
                    下一篇
                    <IconArrowRightOutline24 size={14} />
                  </span>
                  <span className="article-nav-title">{nextArticle.title}</span>
                </Link>
              ) : <div />}
            </nav>

            {/* 返回列表 */}
            <div className="article-back-row">
              <Link to="/news" className="article-back-btn">
                <IconArrowLeftOutline24 size={16} />
                返回新闻列表
              </Link>
            </div>
          </article>

          {/* ===== 侧边栏 ===== */}
          <aside className="article-sidebar">
            <div className="article-sidebar-block">
              <h3 className="article-sidebar-title">相关阅读</h3>
              <ul className="article-related-list">
                {(relatedArticles.length > 0 ? relatedArticles : fallbackRelated).map((item) => (
                  <li key={item.id} className="article-related-item">
                    <Link to={`/news/${item.id}`} className="article-related-link">
                      <div className="article-related-img">
                        <img src={item.image} alt={item.title} loading="lazy" />
                      </div>
                      <div className="article-related-info">
                        <span className="article-related-date">{item.dateDisplay}</span>
                        <span className="article-related-title">{item.title}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="article-sidebar-block">
              <h3 className="article-sidebar-title">关于红运机械</h3>
              <p className="article-sidebar-desc">
                红运机械深耕高端装备制造领域30余年，是国内固态电池工艺装备领域的代表企业，致力成为全球混合设备服务领域的标杆企业。
              </p>
              <Link to="/contact" className="article-sidebar-cta">
                联系我们
                <IconArrowRightOutline24 size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
