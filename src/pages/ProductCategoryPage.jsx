import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import ParallaxCta from '../components/ParallaxCta'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { productCategories, getCategoryById } from '../data/productCategories'
import ctaBgImg from '../assets/img/IMG_5036.jpg'
import productsHeroImg from '../assets/img/IMG_4280.jpg'

export default function ProductCategoryPage() {
  const { categoryId } = useParams()
  const category = getCategoryById(categoryId)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [categoryId])

  if (!category) return <Navigate to="/products" replace />

  return (
    <>
      <PageHero
        title={category.name}
        subtitle="产品中心"
        bgImage={productsHeroImg}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/new-energy' },
          { label: category.name },
        ]} />

        {/* 行业切换 sticky nav */}
        <div className="page-sticky-nav">
          <div className="page-container">
            <nav className="products-nav">
              {productCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products/${cat.id}`}
                  className={`solutions-nav-item${cat.id === categoryId ? ' active' : ''}`}
                >
                  <cat.Icon size={14} />
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* 产品列表 */}
        <section className="products-category">
          <div className="page-container">
            <div className="products-category-header fade-up">
              <h2 className="products-category-title">{category.name}</h2>
            </div>
            <p className="products-category-desc fade-up">{category.desc}</p>

            <div className="products-grid fade-up fade-up-delay-1">
              {category.products.map((product) => (
                <Link
                  to={`/products/${category.id}/${product.slug}`}
                  className="product-card"
                  key={product.slug}
                >
                  <div className={`product-card-image${product.imgContain ? ' product-card-image--contain' : ''}`}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} loading="lazy" />
                    ) : (
                      <ImagePlaceholder height="100%" label={product.name} />
                    )}
                  </div>
                  <div className="product-card-content">
                    <h3 className="product-card-title">{product.name}</h3>
                    <span className="product-card-more">
                      查看详情
                      <IconArrowRightOutline24 size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <ParallaxCta
        bgImage={ctaBgImg}
        title="获取专属解决方案"
        desc="我们的专业团队随时为您提供技术咨询和定制化解决方案，<br />助力您的生产工艺升级。"
      />
    </>
  )
}
