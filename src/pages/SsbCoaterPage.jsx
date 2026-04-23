import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'
import productHeroImg from '../assets/img/Generated Image March 20, 2026 - 10_16PM.jpg'

const IMG = '/assets/images/solutions/dry-powder-mixer'

export default function SsbCoaterPage() {
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
        title="固态电解质包覆机"
        subtitle="Solid Electrolyte Coater · 固态电池核心装备"
        bgImage={productHeroImg}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/solid-state-battery' },
          { label: '固态电池', path: '/products/solid-state-battery' },
          { label: '固态电解质包覆机' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'center', marginTop: '56px' }}>
              <div style={{ flex: '0 0 50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${IMG}/core-device-03.webp`}
                  alt="固态电解质包覆机"
                  style={{ display: 'block', width: '70%', height: 'auto' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">固态电解质包覆机</h2>
                <ul className="cp-core-device-features fade-up fade-up-delay-2">
                  <li>从源头构筑稳定界面，解决固态电池界面难题，实现材料纳米级包覆</li>
                  <li>核心优势：包覆率 99% 以上，降低界面阻抗，提升固态电解质体系综合性能</li>
                  <li>容器旋转与搅拌桨反向运转，实现流化悬浮</li>
                  <li>支持喷气、喷液、气液同喷三种模式</li>
                  <li>控温精度 ±1℃，控压精度 ±0.1 bar</li>
                  <li>产品序列：实验型 2–50 L，量产型 100–2000 L</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 核心部件 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <p className="section-en-label fade-up">Core Parts</p>
            <h2 className="section-heading section-heading--center fade-up">核心部件</h2>
            <p className="cp-core-device-tbd fade-up fade-up-delay-1">核心部件内容待补充</p>
          </div>
        </section>

        {/* ===== 参数汇总 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Parameters Overview</p>
            <h2 className="section-heading section-heading--center fade-up">参数汇总</h2>
            <p className="cp-core-device-tbd fade-up fade-up-delay-1">参数内容待补充</p>
          </div>
        </section>

        <TechInquirySection />
      </div>
    </>
  )
}
