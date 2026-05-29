import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'
const HERO_IMG = '/assets/images/solutions/battery-manufacturing.webp'

const IMG = '/assets/images/solutions/wet-electrode-system/high-pressure-washer.webp'

export default function SsbHighPressureWasherPage() {
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
        title="高压清洗机"
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/auxiliary' },
          { label: '辅助设备', path: '/products/auxiliary' },
          { label: '高压清洗机' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', maxWidth: '1040px', margin: '0 auto' }}>
              <div style={{ flex: '0 0 50%', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={IMG}
                  alt="高压清洗机"
                  style={{ display: 'block', height: '100%', width: 'auto', objectFit: 'contain' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">高压清洗机</h2>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  应用于各种行业的搅拌罐、容器内壁残留物、飞溅物的全方位清洗。
                </p>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  通过高压溶剂或水螺产生动力，驱动喷头旋转，并喷射多束射流剥离附着物，实现高压清洗。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 三视图 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <p className="section-en-label fade-up">Three Views</p>
            <h2 className="section-heading section-heading--center fade-up">三视图</h2>
            <p className="cp-core-device-tbd fade-up fade-up-delay-1">三视图内容待提供</p>
          </div>
        </section>

        <TechInquirySection />
      </div>
    </>
  )
}
