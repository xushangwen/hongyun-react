import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import { productCategories, getCategoryProducts } from '../data/productCategories'
import newsData from '../data/newsData'

const products = productCategories.flatMap((category) =>
  getCategoryProducts(category).map((product) => ({
    ...product,
    categoryId: category.id,
    path: product.customPath || `/products/${category.id}/${product.slug}`,
  }))
)

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() || ''
  const normalizedQuery = query.toLocaleLowerCase('zh-CN')
  const productResults = normalizedQuery
    ? products.filter((item) => item.name.toLocaleLowerCase('zh-CN').includes(normalizedQuery))
    : []
  const newsResults = normalizedQuery
    ? newsData.filter((item) =>
        `${item.title} ${item.summary} ${item.category}`.toLocaleLowerCase('zh-CN').includes(normalizedQuery)
      )
    : []

  return (
    <>
      <PageHero title="搜索结果" subtitle={query ? `“${query}”` : '请输入搜索关键词'} />
      <div className="page-body">
        <Breadcrumb items={[{ label: '搜索结果' }]} />
        <section className="news-list-section">
          <div className="page-container">
            {[...productResults.map((item) => ({
              key: `product-${item.categoryId}-${item.slug}`,
              title: item.name,
              path: item.path,
            })), ...newsResults.map((item) => ({
              key: `news-${item.id}`,
              title: item.title,
              path: `/news/${item.id}`,
            }))].map((item) => (
              <article className="news-list-card visible" key={item.key}>
                <Link to={item.path} className="news-list-card-link">
                  <div className="news-list-card-content">
                    <h2 className="news-list-card-title">{item.title}</h2>
                  </div>
                </Link>
              </article>
            ))}
            {query && productResults.length + newsResults.length === 0 && (
              <div className="news-list-empty">未找到相关内容</div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
