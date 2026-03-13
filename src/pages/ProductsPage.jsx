import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'
import productsHeroImg from '../assets/img/产品中心.jpg'

/* ========== 产品分类数据 [AI生成描述] ========== */
const productCategories = [
  {
    id: 'new-energy',
    name: '新能源',
    desc: '面向锂电池正负极浆料制备的核心装备，覆盖搅拌、分散、捏合、制浆全工艺环节。',
    products: [
      { name: '双行星动力混合机', slug: 'dual-planetary-mixer' },
      { name: '高速分散机', slug: 'high-speed-disperser' },
      { name: '捏合机', slug: 'kneader' },
      { name: '双螺杆制浆机', slug: 'twin-screw-pulper' },
    ],
  },
  {
    id: 'solid-state-battery',
    name: '固态电池',
    desc: '面向下一代固态电池干法电极制备工艺的前沿装备，涵盖包覆、混合、挤出等关键工序。',
    products: [
      { name: '湿法PD搅拌机', slug: 'wet-pd-mixer' },
      { name: '干法电极粉体高速混合机', slug: 'dry-electrode-mixer' },
      { name: '双螺杆干法电极连续挤出机', slug: 'twin-screw-dry-extruder' },
      { name: '固态电解质包覆机', slug: 'solid-electrolyte-coater' },
    ],
  },
  {
    id: 'chemical',
    name: '化工',
    desc: '适用于涂料、胶粘剂、密封胶等高粘度多组分物料的专业混合搅拌设备。',
    products: [
      { name: '双行星动力混合机', slug: 'chem-dual-planetary' },
      { name: '往复式混合搅拌机', slug: 'reciprocating-mixer' },
      { name: '双行星混合搅拌机', slug: 'dual-planetary-stirrer' },
      { name: '行星蝶式混合搅拌机', slug: 'planetary-butterfly' },
      { name: '立式捏合机', slug: 'vertical-kneader' },
      { name: '压料机、倾倒机', slug: 'press-dumper' },
      { name: '洗桶机', slug: 'barrel-washer' },
      { name: '反应釜、储罐', slug: 'reactor-tank' },
      { name: '高分子材料溶解釜', slug: 'polymer-dissolving' },
      { name: '高压清洗成套设备', slug: 'high-pressure-cleaning' },
    ],
  },
  {
    id: 'adhesive',
    name: '制胶',
    desc: '针对密封胶、结构胶、硅胶等高粘度物料的真空搅拌与脱泡专用装备。',
    products: [
      { name: '制胶核心设备', slug: 'adhesive-core' },
    ],
  },
  {
    id: 'pyrotechnics',
    name: '火工药剂',
    desc: '符合国防安全标准的防爆型混合搅拌设备，适用于含能材料安全生产。',
    products: [
      { name: '捏合机', slug: 'pyro-kneader' },
    ],
  },
  {
    id: 'food',
    name: '食品',
    desc: '符合食品安全标准的卫生级混合设备，全不锈钢设计，支持CIP在线清洗。',
    products: [
      { name: '食品级混合设备', slug: 'food-core' },
    ],
  },
  {
    id: 'cosmetics',
    name: '化妆品',
    desc: '适用于乳液、膏霜等化妆品生产的真空乳化均质混合设备。',
    products: [
      { name: '化妆品级混合设备', slug: 'cosmetics-core' },
    ],
  },
  {
    id: 'electronics',
    name: '电子材料',
    desc: '满足电子级材料纳米级粒径要求的超细研磨与真空脱泡混合装备。',
    products: [
      { name: '电子材料混合设备', slug: 'electronics-core' },
    ],
  },
]

export default function ProductsPage() {
  const [activeId, setActiveId] = useState(`products-${productCategories[0]?.id}`)

  useEffect(() => {
    const fadeObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => fadeObserver.observe(el))

    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id) }),
      { rootMargin: '-20% 0px -60% 0px' }
    )
    productCategories.forEach(({ id }) => {
      const el = document.getElementById(`products-${id}`)
      if (el) sectionObserver.observe(el)
    })

    return () => { fadeObserver.disconnect(); sectionObserver.disconnect() }
  }, [])

  return (
    <>
      <PageHero
        title="产品中心"
        subtitle="核心混合装备与整线解决方案"
        bgImage={productsHeroImg}
      />

      <div className="page-body">
        <div className="page-container">
          <Breadcrumb items={[{ label: '产品中心' }]} />
        </div>

        {/* 产品分类导航 - sticky 全宽 */}
        <div className="page-sticky-nav">
          <div className="page-container">
            <nav className="products-nav">
              {productCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#products-${cat.id}`}
                  className={`solutions-nav-item${activeId === `products-${cat.id}` ? ' active' : ''}`}
                >
                  {cat.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* 各产品分类 */}
        {productCategories.map((category, idx) => (
          <section className="products-category" id={`products-${category.id}`} key={category.id}>
            <div className="page-container">
              <div className="products-category-header">
                <div className="products-category-index">{String(idx + 1).padStart(2, '0')}</div>
                <h2 className="products-category-title">{category.name}</h2>
              </div>

              <p className="products-category-desc">
                {category.desc}
              </p>

              <div className="products-grid">
                {category.products.map((product) => (
                  <Link
                    to={`/products/${category.id}/${product.slug}`}
                    className="product-card"
                    key={product.slug}
                  >
                    <div className="product-card-image">
                      <ImagePlaceholder height="220px" label={product.name} />
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
        ))}
      </div>
    </>
  )
}
