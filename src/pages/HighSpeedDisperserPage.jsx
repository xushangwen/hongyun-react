import React, { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ProductThreeView from '../components/ProductThreeView'
import TechInquirySection from '../components/TechInquirySection'
const HERO_IMG = '/assets/images/solutions/circulation-pulping/hero-bg-new.webp'

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
        title="管线式高速分散机"
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/new-energy' },
          { label: '新能源行业', path: '/products/new-energy' },
          { label: '管线式高速分散机' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', maxWidth: '1040px', margin: '0 auto' }}>
              <div style={{ flex: '0 0 50%', height: '368px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${IMG}/disperser-view.webp`}
                  alt="管线式高速分散机"
                  style={{ display: 'block', height: '100%', width: 'auto', objectFit: 'contain' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">管线式高速分散机</h2>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  红运管线式高速分散机依靠惯性、旋转、湍流剪切三重应力，结合空化效应强化分散效果；斜转子与定子结构可避免物料滑移，切割充分，高效完成浆料分散。
                </p>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  <strong>协同作用：</strong>设备依托三类应力，高速旋转形成压差并产生空化气泡，空泡溃灭进一步强化应力，实现浆料充分分散。
                </p>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  <strong>结构优势：</strong>斜转子带偏角，配合定子结构，物料被搅拌刃有效切割，不易滑移，大幅缩短分散时长、提升生产效率。
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
            <ProductThreeView views={[
              { src: `${IMG}/disperser-view-tv2.webp`, label: '正视图' },
              { src: `${IMG}/disperser-view-tv1.webp`, label: '侧视图' },
            ]} />
          </div>
        </section>

        {/* ===== 参数汇总 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Parameters Overview</p>
            <h2 className="section-heading section-heading--center fade-up">管线式高速分散机参数汇总</h2>
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
