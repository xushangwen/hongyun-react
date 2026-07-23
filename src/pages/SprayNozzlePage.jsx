import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'
import TechInquirySection from '../components/TechInquirySection'

const HERO_IMG = '/assets/images/solutions/battery-manufacturing.webp'

export default function SprayNozzlePage() {
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
        title="高压喷淋嘴"
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/auxiliary' },
          { label: '辅助设备', path: '/products/auxiliary' },
          { label: '高压喷淋嘴' },
        ]} />

        {/* ===== 产品介绍（内容待提供）===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', maxWidth: '1040px', margin: '0 auto' }}>
              <div style={{ flex: '0 0 50%', height: '368px' }}>
                <ImagePlaceholder height="100%" label="高压喷淋嘴" />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">高压喷淋嘴</h2>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 三视图：内容待提供，板块先隐藏 ===== */}

        <TechInquirySection />
      </div>
    </>
  )
}
