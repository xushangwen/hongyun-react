import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import { productCategories } from '../data/productCategories'
import productsHeroImg from '../assets/img/IMG_4280.jpg'
import ctaBgImg from '../assets/img/IMG_5036.jpg'

export default function ProductsPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <PageHero
        title="产品中心"
        subtitle="核心混合装备与整线解决方案"
        bgImage={productsHeroImg}
      />

      <div className="page-body">
        <Breadcrumb items={[{ label: '产品中心' }]} />

        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Product Lines</p>
            <h2 className="section-heading section-heading--center fade-up">按行业选择产品</h2>

            <div className="products-hub-grid fade-up fade-up-delay-1">
              {productCategories.map((cat, idx) => (
                <Link
                  to={`/products/${cat.id}`}
                  className="products-hub-card"
                  key={cat.id}
                >
                  <div className="products-hub-card-index">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="products-hub-card-icon">
                    <cat.Icon size={28} />
                  </div>
                  <div className="products-hub-card-body">
                    <h3 className="products-hub-card-name">{cat.name}</h3>
                    <p className="products-hub-card-desc">{cat.desc}</p>
                    <span className="products-hub-card-count">{cat.products.length} 款产品</span>
                  </div>
                  <span className="products-hub-card-arrow">
                    <IconArrowRightOutline24 size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="detail-contact-cta">
        <div className="detail-contact-inner" style={{ backgroundImage: `url(${ctaBgImg})` }}>
          <h2 className="detail-contact-title">获取专属解决方案</h2>
          <p className="detail-contact-desc">
            我们的专业团队随时为您提供技术咨询和定制化解决方案，<br />
            助力您的生产工艺升级。
          </p>
          <Link to="/contact" className="btn-primary">
            联系我们
            <IconArrowRightOutline24 size={18} />
          </Link>
        </div>
      </div>
    </>
  )
}
