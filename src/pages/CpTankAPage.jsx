import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ProductThreeView from '../components/ProductThreeView'
import TechInquirySection from '../components/TechInquirySection'
const HERO_IMG = '/assets/images/solutions/battery-manufacturing.webp'

const IMG = '/assets/images/solutions/circulation-pulping'

export default function CpTankAPage() {
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
        title="高速循环循环罐 A"
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/new-energy' },
          { label: '新能源行业', path: '/products/new-energy' },
          { label: '高速循环循环罐 A' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', maxWidth: '1040px', margin: '0 auto' }}>
              <div style={{ flex: '0 0 50%', height: '368px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${IMG}/cp-tank-a.webp`}
                  alt="循环罐A结构示意图"
                  style={{ display: 'block', height: '100%', width: 'auto', objectFit: 'contain' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">高速循环循环罐 A</h2>
                <ul className="cp-core-device-features fade-up fade-up-delay-2">
                  <li>带慢速搅拌，转速 0–40 rpm/min，锚式搅拌桨，变频电机驱动</li>
                  <li>带冷却水夹套，桶内物料温度在线监测，保障物料温度可控</li>
                  <li>采用自主专利设计机械密封，保障设备高气密性</li>
                  <li>桶底锥形夹角 60° 设计，物料上进下出，保障物料 100% 循环分散</li>
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
              { src: `${IMG}/cp-tank-a-tv1.webp`, label: '正视图' },
              { src: `${IMG}/cp-tank-a-tv2.webp`, label: '侧视图' },
              { src: `${IMG}/cp-tank-a-tv3.webp`, label: '俯视图' },
            ]} />
          </div>
        </section>

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
