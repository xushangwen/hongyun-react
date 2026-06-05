import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ProductThreeView from '../components/ProductThreeView'
import TechInquirySection from '../components/TechInquirySection'
const HERO_IMG = '/assets/images/solutions/circulation-pulping/hero-bg-new.webp'

const IMG = '/assets/images/solutions/wet-electrode-system/multi-mixer.webp'

export default function SsbMultiMixerPage() {
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
        title="多功能混合机"
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/solid-state-battery' },
          { label: '固态电池', path: '/products/solid-state-battery' },
          { label: '多功能混合机' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', maxWidth: '1040px', margin: '0 auto' }}>
              <div style={{ flex: '0 0 50%', height: '368px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={IMG}
                  alt="多功能混合机"
                  style={{ display: 'block', height: '100%', width: 'auto', objectFit: 'contain' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">多功能混合机</h2>
                <p className="cp-core-device-tbd fade-up fade-up-delay-2">产品介绍内容待补充</p>
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
              { src: '/assets/images/solutions/wet-electrode-system/multi-mixer-tv1.webp', label: '正视图' },
              { src: '/assets/images/solutions/wet-electrode-system/multi-mixer-tv2.webp', label: '侧视图' },
            ]} />
          </div>
        </section>

        <TechInquirySection />
      </div>
    </>
  )
}
