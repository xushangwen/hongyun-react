import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'
const HERO_IMG = '/assets/images/solutions/circulation-pulping/hero-bg-new.webp'

const IMG = '/assets/images/solutions/circulation-pulping'

const modelParams = [
  { model: 'HY-HXF60',   output: 60,   cycleTime: 3, processTime: 2, batch: 120,  flow: 40,   power: 37,  lineV: 30 },
  { model: 'HY-HXF120',  output: 120,  cycleTime: 3, processTime: 2, batch: 240,  flow: 80,   power: 55,  lineV: 30 },
  { model: 'HY-HXF300',  output: 300,  cycleTime: 3, processTime: 2, batch: 600,  flow: 200,  power: 75,  lineV: 30 },
  { model: 'HY-HXF600',  output: 600,  cycleTime: 3, processTime: 2, batch: 1200, flow: 400,  power: 132, lineV: 30 },
  { model: 'HY-HXF900',  output: 900,  cycleTime: 3, processTime: 2, batch: 1800, flow: 600,  power: 185, lineV: 30 },
  { model: 'HY-HXF1200', output: 1200, cycleTime: 3, processTime: 2, batch: 2400, flow: 800,  power: 200, lineV: 30 },
  { model: 'HY-HXF1500', output: 1500, cycleTime: 3, processTime: 2, batch: 3000, flow: 1000, power: 250, lineV: 30 },
  { model: 'HY-HXF1800', output: 1800, cycleTime: 3, processTime: 2, batch: 3600, flow: 1200, power: 300, lineV: 30 },
]

function ParamsTable() {
  return (
    <div className="detail-params-table">
      <table className="params-table pdm-params-table">
        <thead>
          <tr>
            <th>型号<br /><span className="th-sub">Model</span></th>
            <th>产出要求<br /><span className="th-sub">Output (L/H)</span></th>
            <th>批次循环时间<br /><span className="th-sub">Cycle Time (min)</span></th>
            <th>工艺时间<br /><span className="th-sub">Process Time (h)</span></th>
            <th>批次量<br /><span className="th-sub">Batch (L)</span></th>
            <th>循环流量<br /><span className="th-sub">Flow (L/min)</span></th>
            <th>电机功率<br /><span className="th-sub">Power (kW)</span></th>
            <th>转子线速度<br /><span className="th-sub">Linear Speed (m/s)</span></th>
          </tr>
        </thead>
        <tbody>
          {modelParams.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              <td className="td-model-code">{row.model}</td>
              <td>{row.output}</td>
              <td>{row.cycleTime}</td>
              <td>{row.processTime}</td>
              <td>{row.batch}</td>
              <td>{row.flow}</td>
              <td>{row.power}</td>
              <td>{row.lineV}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CpDisperserPage() {
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
        title="高速循环高速分散机"
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/new-energy' },
          { label: '新能源行业', path: '/products/new-energy' },
          { label: '高速循环高速分散机' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', maxWidth: '1040px', margin: '0 auto' }}>
              <div style={{ flex: '0 0 50%', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${IMG}/高速分散机-svg.svg`}
                  alt="高速循环高速分散机结构示意图"
                  style={{ display: 'block', height: '100%', width: 'auto', objectFit: 'contain' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">高速循环高速分散机</h2>
                <ul className="cp-core-device-features fade-up fade-up-delay-2">
                  <li>集预混分散一体，设计线速度 30 m/s，伺服电机驱动，效率卓越</li>
                  <li>采用自主专利设计机械密封，保障设备持续高气密性</li>
                  <li>侧面螺杆喂料，液料下进上出，进料连续顺畅</li>
                  <li>分散腔体设计双层分散剪切，带增压叶片，分散效率倍增</li>
                  <li>预混腔采用自主专利叶轮，可迅速将粉液预混并快速排出</li>
                  <li>带冷却水夹套，物料温度在线监测，全程保障物料温度可控</li>
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
            <p className="cp-core-device-tbd fade-up fade-up-delay-1">三视图内容待提供</p>
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
