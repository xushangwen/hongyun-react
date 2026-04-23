import React, { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'
import productHeroImg from '../assets/img/Generated Image March 20, 2026 - 10_16PM.jpg'

const IMG = '/assets/images/solutions/pipeline-pulping'

const modelParams = [
  { model: 'HY-GFS100', kw: 11,  rpm: 5800, flow: '5~20',   dia: 100, speed: 30.4 },
  { model: 'HY-GFS160', kw: 37,  rpm: 3600, flow: '20~60',  dia: 160, speed: 30.1 },
  { model: 'HY-GFS220', kw: 75,  rpm: 2650, flow: '60~100', dia: 220, speed: 30.5 },
  { model: 'HY-GFS270', kw: 90,  rpm: 2150, flow: '100~160',dia: 270, speed: 30.4 },
]

function ParamsTable() {
  return (
    <div className="detail-params-table">
      <table className="params-table pdm-params-table">
        <thead>
          <tr>
            <th>型号<br /><span className="th-sub">Model</span></th>
            <th>功率 (kW)<br /><span className="th-sub">Power</span></th>
            <th>转子转速 (rpm)<br /><span className="th-sub">Rotor Speed</span></th>
            <th>流量<br /><span className="th-sub">Flow Rate</span></th>
            <th>转子直径 (mm)<br /><span className="th-sub">Rotor Dia.</span></th>
            <th>线速度 (m/s)<br /><span className="th-sub">Linear Speed</span></th>
          </tr>
        </thead>
        <tbody>
          {modelParams.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              <td className="td-model-code">{row.model}</td>
              <td>{row.kw}</td>
              <td>{row.rpm}</td>
              <td>{row.flow}</td>
              <td>{row.dia}</td>
              <td>{row.speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function HighSpeedDisperserPage() {
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
  }, [])

  return (
    <>
      <PageHero
        title="高速分散机"
        subtitle="High Speed Disperser · 新能源行业核心装备"
        bgImage={productHeroImg}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/new-energy' },
          { label: '新能源行业', path: '/products/new-energy' },
          { label: '高速分散机' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'center', marginTop: '56px' }}>
              <div style={{ flex: '0 0 50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${IMG}/disperser-view.webp`}
                  alt="高速分散机"
                  style={{ display: 'block', width: '70%', height: 'auto' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">高速分散机</h2>
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
            <div className="fade-up fade-up-delay-1" style={{ display: 'flex', gap: '12px', marginTop: '40px' }}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} style={{ flex: 1, background: '#fff', borderRadius: '8px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={`${IMG}/component-0${n}.svg`}
                    alt={`部件 ${n}`}
                    style={{ display: 'block', width: [2, 6].includes(n) ? '70%' : '100%', height: 'auto' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 参数汇总 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Parameters Overview</p>
            <h2 className="section-heading section-heading--center fade-up">参数汇总</h2>
            <div className="fade-up fade-up-delay-1">
              <ParamsTable />
            </div>
            <p className="cp-table-note fade-up fade-up-delay-3">
              * 以上参数仅供参考，实际规格以合同为准。可根据客户工艺需求进行定制化设计。
            </p>
          </div>
        </section>

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
