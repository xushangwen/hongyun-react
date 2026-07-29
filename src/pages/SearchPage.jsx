import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import { productCategories, getCategoryProducts } from '../data/productCategories'
import newsData from '../data/newsData'
import { searchCms } from '../services/cmsApi'

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
  const localResults = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase('zh-CN')
    if (!normalizedQuery) return []
    return [
      ...products
        .filter((item) => item.name.toLocaleLowerCase('zh-CN').includes(normalizedQuery))
        .map((item) => ({
          key: `product-${item.categoryId}-${item.slug}`,
          title: item.name,
          path: item.path,
        })),
      ...newsData
        .filter((item) =>
          `${item.title} ${item.summary} ${item.category}`.toLocaleLowerCase('zh-CN').includes(normalizedQuery))
        .map((item) => ({
          key: `news-${item.id}`,
          title: item.title,
          path: `/news/${item.id}`,
        })),
    ]
  }, [query])
  const [remoteResults, setRemoteResults] = useState(null)
  const results = remoteResults?.query === query ? remoteResults.items : localResults

  useEffect(() => {
    if (!query) return undefined
    const controller = new AbortController()
    searchCms(query, controller.signal)
      .then((items) => setRemoteResults({
        query,
        items: items.map((item) => ({
          key: `${item.type}-${item.documentId}`,
          title: item.title,
          path: item.path,
        })),
      }))
      .catch((error) => {
        if (error.name !== 'AbortError') console.warn('[CMS] 搜索读取失败，继续使用本地索引')
      })
    return () => controller.abort()
  }, [localResults, query])

  return (
    <>
      <PageHero title="搜索结果" subtitle={query ? `“${query}”` : '请输入搜索关键词'} />
      <div className="page-body">
        <Breadcrumb items={[{ label: '搜索结果' }]} />
        <section className="news-list-section">
          <div className="page-container">
            {results.map((item) => (
              <article className="news-list-card visible" key={item.key}>
                <Link to={item.path} className="news-list-card-link">
                  <div className="news-list-card-content">
                    <h2 className="news-list-card-title">{item.title}</h2>
                  </div>
                </Link>
              </article>
            ))}
            {query && results.length === 0 && (
              <div className="news-list-empty">未找到相关内容</div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
