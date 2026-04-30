import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'

const HERO_IMG = '/assets/images/solutions/battery-manufacturing.webp'
const EQ = '/assets/images/solutions/chemical/equipment'

const productMap = {
  'reciprocating-mixer':   { name: '往复式混合搅拌机',   img: `${EQ}/02-reciprocating-mixer.png`   },
  'dual-column-planetary': { name: '双立柱行星搅拌机',   img: `${EQ}/03-dual-column-planetary-01.jpg` },
  'butterfly-mixer':       { name: '行星蝶式混合搅拌机', img: `${EQ}/05-butterfly-mixer.jpg`       },
  'planetary-power-mixer': { name: '行星动力混合搅拌机', img: `${EQ}/06-planetary-power-mixer.png` },
  'vertical-kneader':      { name: '立式捏合机',         img: `${EQ}/07-vertical-kneader-01.png`      },
  'press-machine':         { name: '压料机',             img: `${EQ}/08-material-press.png`        },
  'tilting-machine':       { name: '倾倒机',             img: `${EQ}/09-tilting-machine-01.png`       },
  'barrel-washer':         { name: '洗桶机',             img: `${EQ}/10-barrel-washer.jpg`         },
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
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'center', marginTop: '56px' }}>
              <div style={{ flex: '0 0 50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ display: 'block', width: '70%', height: 'auto' }}
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

        {/* ===== 核心部件 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <p className="section-en-label fade-up">Core Parts</p>
            <h2 className="section-heading section-heading--center fade-up">核心部件</h2>
            <p className="cp-core-device-tbd fade-up fade-up-delay-1" style={{ textAlign: 'center', marginTop: '2rem' }}>
              核心部件内容待提供
            </p>
          </div>
        </section>

        {/* ===== 参数汇总 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Parameters Overview</p>
            <h2 className="section-heading section-heading--center fade-up">参数汇总</h2>
            <p className="cp-table-note fade-up fade-up-delay-1" style={{ textAlign: 'center', marginTop: '2rem' }}>
              参数详情待补充，请联系我们获取完整技术规格。
            </p>
          </div>
        </section>

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
