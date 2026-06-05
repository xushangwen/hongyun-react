import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ProductThreeView from '../components/ProductThreeView'
import TechInquirySection from '../components/TechInquirySection'

const HERO_IMG = '/assets/images/solutions/battery-manufacturing.webp'
const EQ = '/assets/images/solutions/chemical/equipment'

const productMap = {
  'reciprocating-mixer':   { name: '往复式混合搅拌机',   img: `${EQ}/02-reciprocating-mixer.png`   },
  'dual-column-planetary': { name: '双立柱行星搅拌机',   img: `${EQ}/03-dual-column-planetary-01.webp` },
  'butterfly-mixer':       { name: '行星蝶式混合搅拌机', img: `${EQ}/05-butterfly-mixer.jpg`       },
  'planetary-power-mixer': { name: '行星动力混合搅拌机', img: `${EQ}/06-planetary-power-mixer.webp` },
  'vertical-kneader':      { name: '立式捏合机',         img: `${EQ}/07-vertical-kneader-01.webp`, views: [
    { src: `${EQ}/07-vertical-kneader-tv1.webp`, label: '正视图' },
    { src: `${EQ}/07-vertical-kneader-tv2.webp`, label: '侧视图' },
  ] },
  'press-machine':         { name: '压料机',             img: `${EQ}/08-material-press.webp`, views: [
    { src: `${EQ}/08-material-press-tv1.webp`, label: '正视图' },
    { src: `${EQ}/08-material-press-tv2.webp`, label: '侧视图' },
  ] },
  'tilting-machine':       { name: '倾倒机',             img: `${EQ}/09-tilting-machine-01.png`       },
  'barrel-washer':         { name: '洗桶机',             img: `${EQ}/10-barrel-washer.webp`         },
  'reactor':               { name: '反应釜',             img: `${EQ}/11-reactor.png`               },
  'storage-tank':          { name: '储罐',               img: `${EQ}/12-storage-tank.jpg`          },
}

export default function ChemicalProductDetailPage() {
  const { productId } = useParams()
  const product = productMap[productId]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [productId])

  if (!product) return <Navigate to="/products/chemical" replace />

  return (
    <>
      <PageHero
        title={product.name}
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/chemical' },
          { label: '化工行业', path: '/products/chemical' },
          { label: product.name },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', maxWidth: '1040px', margin: '0 auto' }}>
              <div style={{ flex: '0 0 50%', height: '368px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ display: 'block', height: '100%', width: 'auto', objectFit: 'contain' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">{product.name}</h2>
                <p className="cp-core-device-tbd fade-up fade-up-delay-2">产品介绍内容待提供</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 三视图 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <p className="section-en-label fade-up">Three Views</p>
            <h2 className="section-heading section-heading--center fade-up">三视图</h2>
            {product.views
              ? <ProductThreeView views={product.views} />
              : <p className="cp-core-device-tbd fade-up fade-up-delay-1">三视图内容待提供</p>}
          </div>
        </section>

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
