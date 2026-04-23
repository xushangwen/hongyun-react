import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'
import productHeroImg from '../assets/img/Generated Image March 20, 2026 - 10_16PM.jpg'

const IMG = '/assets/images/solutions/dry-powder-mixer'

export default function SsbFeederPage() {
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
        title="电磁给料机"
        subtitle="Electromagnetic Feeder · 固态电池核心装备"
        bgImage={productHeroImg}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/solid-state-battery' },
          { label: '固态电池', path: '/products/solid-state-battery' },
          { label: '电磁给料机' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'center', marginTop: '56px' }}>
              <div style={{ flex: '0 0 50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${IMG}/core-device-01.webp`}
                  alt="电磁给料机"
                  style={{ display: 'block', width: '70%', height: 'auto' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">电磁给料机</h2>
                <ul className="cp-core-device-features fade-up fade-up-delay-2">
                  <li>集预热、展平与定量输送于一体，确保粉料稳定、均匀供给，<br />为极片均匀辊压工序奠定基础</li>
                  <li>罐体：SUS304不锈钢，内表面300目镜面抛光，外表面150目拉丝；料仓盖小半翻盖式，配破拱搅拌电机（0～40 rpm可调）、气锤及气蝶</li>
                  <li>震动筛：SUS304不锈钢，380V震动电机，激振力可调，可安装6～12目筛网</li>
                  <li>电磁给料机：振幅根据物料特性和输送量调节（常规振幅1.2 mm），实现精确给料</li>
                  <li>粉料预加热：碳纤维管红外线加热，温度可调，配PID控制器确保温度高精度控制</li>
                  <li>播粉器：快卡式结构，播粉宽度灵活调节</li>
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
