import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ProductThreeView from '../components/ProductThreeView'
import TechInquirySection from '../components/TechInquirySection'
import CmsParameterTableSection from '../components/CmsParameterTableSection'
const HERO_IMG = '/assets/images/solutions/circulation-pulping/hero-bg-new.webp'

const IMG = '/assets/images/solutions/twin-screw-pulping'

export default function TwinScrewPulperPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <PageHero
        title="双螺杆制浆机"
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/new-energy' },
          { label: '新能源行业', path: '/products/new-energy' },
          { label: '双螺杆制浆机' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', maxWidth: '1040px', margin: '0 auto' }}>
              <div style={{ flex: '0 0 50%', height: '368px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${IMG}/product-render.webp`}
                  alt="双螺杆制浆机"
                  style={{ display: 'block', height: '100%', width: 'auto', objectFit: 'contain' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">双螺杆制浆机</h2>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  双螺杆制浆机具备高效的捏合与分散能力，可实现电池浆料的连续化制备。
                </p>
                <ul className="cp-core-device-features fade-up fade-up-delay-2">
                  <li>低功耗、效率高</li>
                  <li>占地小、低维护</li>
                  <li>产能覆盖 30L/h－1500L/h，多规格区间</li>
                  <li>配置选择灵活，适配电池浆料规模化量产场景</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 三视图 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <p className="section-en-label fade-up">Three Views</p>
            <h2 className="section-heading section-heading--center fade-up">三视图</h2>
            <ProductThreeView views={[
              { src: `${IMG}/product-tv2.webp`, label: '正视图' },
              { src: `${IMG}/product-tv1.webp`, label: '侧视图' },
            ]} />
          </div>
        </section>

        <CmsParameterTableSection
          fallbackTitle="双螺杆制浆机型号参数"
          className="page-section"
        />

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
