import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'
import productHeroImg from '../assets/img/Generated Image March 20, 2026 - 10_16PM.jpg'

const IMG = '/assets/images/solutions/circulation-pulping'

export default function CpTankBPage() {
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
        title="循环罐 B"
        subtitle="Circulation Tank B · 新能源行业核心装备"
        bgImage={productHeroImg}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/new-energy' },
          { label: '新能源行业', path: '/products/new-energy' },
          { label: '循环罐 B' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'center', marginTop: '56px' }}>
              <div style={{ flex: '0 0 50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${IMG}/循环罐-B-svg.svg`}
                  alt="循环罐B结构示意图"
                  style={{ display: 'block', width: '70%', height: 'auto' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">循环罐 B</h2>
                <ul className="cp-core-device-features fade-up fade-up-delay-2">
                  <li>带在线分散功能，设计线速度 30 m/s，双层剪切，定转子间隙 2 mm，伺服电机驱动</li>
                  <li>采用自主专利设计机械密封，保障设备高气密性</li>
                  <li>桶底锥形夹角 60° 设计，保障物料 100% 分散，无死区残留</li>
                  <li>带冷却水夹套，桶内物料温度在线监测，保障物料温度可控</li>
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

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
