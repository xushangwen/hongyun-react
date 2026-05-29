import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'
const HERO_IMG = '/assets/images/solutions/battery-manufacturing.webp'

const IMG = '/assets/images/solutions/dry-powder-mixer'

/* 参数表搬自「行业解决方案 — 固态电池 · 干法电极成套设备解决方案」 */
const modelParams = [
  { model: 'HY-FHJ2A',    vol: 2,    id: 130,  h: 150,  gap: 5,  kw: 4,   rpm: 15900, v: 100, scrapeKw: 0.25, scrapeRpm: 50, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ2B',    vol: 2,    id: 130,  h: 150,  gap: 5,  kw: 3,   rpm: 10400, v: 65,  scrapeKw: 0.25, scrapeRpm: 50, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ5A',    vol: 5,    id: 180,  h: 200,  gap: 7,  kw: 7.5, rpm: 11500, v: 100, scrapeKw: 0.25, scrapeRpm: 50, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ5B',    vol: 5,    id: 180,  h: 200,  gap: 7,  kw: 5.5, rpm: 7500,  v: 65,  scrapeKw: 0.25, scrapeRpm: 50, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ10A',   vol: 10,   id: 230,  h: 250,  gap: 9,  kw: 11,  rpm: 9000,  v: 100, scrapeKw: 0.37, scrapeRpm: 50, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ10B',   vol: 10,   id: 230,  h: 250,  gap: 9,  kw: 7.5, rpm: 5850,  v: 65,  scrapeKw: 0.37, scrapeRpm: 50, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ20A',   vol: 20,   id: 290,  h: 315,  gap: 11, kw: 15,  rpm: 7150,  v: 100, scrapeKw: 0.37, scrapeRpm: 50, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ20B',   vol: 20,   id: 290,  h: 315,  gap: 11, kw: 11,  rpm: 4630,  v: 65,  scrapeKw: 0.37, scrapeRpm: 50, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ50A',   vol: 50,   id: 390,  h: 430,  gap: 15, kw: 22,  rpm: 5300,  v: 100, scrapeKw: 0.55, scrapeRpm: 40, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ50B',   vol: 50,   id: 390,  h: 430,  gap: 15, kw: 18.5,rpm: 3450,  v: 65,  scrapeKw: 0.55, scrapeRpm: 40, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ100A',  vol: 100,  id: 490,  h: 540,  gap: 18, kw: 30,  rpm: 4230,  v: 100, scrapeKw: 0.55, scrapeRpm: 40, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ100B',  vol: 100,  id: 490,  h: 540,  gap: 18, kw: 22,  rpm: 2750,  v: 65,  scrapeKw: 0.55, scrapeRpm: 40, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ150A',  vol: 150,  id: 560,  h: 620,  gap: 21, kw: 45,  rpm: 3700,  v: 100, scrapeKw: 0.75, scrapeRpm: 40, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ150B',  vol: 150,  id: 560,  h: 620,  gap: 21, kw: 30,  rpm: 2400,  v: 65,  scrapeKw: 0.75, scrapeRpm: 40, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ200A',  vol: 200,  id: 617,  h: 683,  gap: 23, kw: 55,  rpm: 3360,  v: 100, scrapeKw: 0.75, scrapeRpm: 40, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ200B',  vol: 200,  id: 617,  h: 683,  gap: 23, kw: 45,  rpm: 2180,  v: 65,  scrapeKw: 0.75, scrapeRpm: 40, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ260A',  vol: 260,  id: 675,  h: 740,  gap: 25, kw: 75,  rpm: 3060,  v: 100, scrapeKw: 1.1,  scrapeRpm: 30, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ260B',  vol: 260,  id: 675,  h: 740,  gap: 25, kw: 55,  rpm: 1990,  v: 65,  scrapeKw: 1.1,  scrapeRpm: 30, sideKw: '/', sideRpm: '/', sideV: '/' },
  { model: 'HY-FHJ300A',  vol: 300,  id: 710,  h: 776,  gap: 27, kw: 90,  rpm: 2910,  v: 100, scrapeKw: 0.75, scrapeRpm: 30, sideKw: 2.2, sideRpm: 3200, sideV: 25 },
  { model: 'HY-FHJ300B',  vol: 300,  id: 710,  h: 776,  gap: 27, kw: 75,  rpm: 1900,  v: 65,  scrapeKw: 0.75, scrapeRpm: 30, sideKw: 2.2, sideRpm: 3200, sideV: 25 },
  { model: 'HY-FHJ350A',  vol: 350,  id: 750,  h: 810,  gap: 28, kw: 110, rpm: 2760,  v: 100, scrapeKw: 0.75, scrapeRpm: 30, sideKw: 2.2, sideRpm: 3200, sideV: 25 },
  { model: 'HY-FHJ350B',  vol: 350,  id: 750,  h: 810,  gap: 28, kw: 90,  rpm: 1800,  v: 65,  scrapeKw: 0.75, scrapeRpm: 30, sideKw: 2.2, sideRpm: 3200, sideV: 25 },
  { model: 'HY-FHJ400A',  vol: 400,  id: 780,  h: 855,  gap: 29, kw: 132, rpm: 2650,  v: 100, scrapeKw: 1.1,  scrapeRpm: 30, sideKw: 3,   sideRpm: 2850, sideV: 25 },
  { model: 'HY-FHJ400B',  vol: 400,  id: 780,  h: 855,  gap: 29, kw: 110, rpm: 1730,  v: 65,  scrapeKw: 1.1,  scrapeRpm: 30, sideKw: 3,   sideRpm: 2850, sideV: 25 },
  { model: 'HY-FHJ450A',  vol: 450,  id: 820,  h: 870,  gap: 31, kw: 132, rpm: 2520,  v: 100, scrapeKw: 1.5,  scrapeRpm: 20, sideKw: 3,   sideRpm: 2850, sideV: 25 },
  { model: 'HY-FHJ450B',  vol: 450,  id: 820,  h: 870,  gap: 31, kw: 110, rpm: 1640,  v: 65,  scrapeKw: 1.5,  scrapeRpm: 20, sideKw: 3,   sideRpm: 2850, sideV: 25 },
  { model: 'HY-FHJ500A',  vol: 500,  id: 850,  h: 900,  gap: 32, kw: 160, rpm: 2430,  v: 100, scrapeKw: 1.5,  scrapeRpm: 20, sideKw: 4,   sideRpm: 2700, sideV: 25 },
  { model: 'HY-FHJ500B',  vol: 500,  id: 850,  h: 900,  gap: 32, kw: 132, rpm: 1580,  v: 65,  scrapeKw: 2.2,  scrapeRpm: 20, sideKw: 4,   sideRpm: 2700, sideV: 25 },
  { model: 'HY-FHJ600B',  vol: 600,  id: 900,  h: 964,  gap: 34, kw: 160, rpm: 1150,  v: 50,  scrapeKw: 2.2,  scrapeRpm: 20, sideKw: 4,   sideRpm: 2700, sideV: 25 },
  { model: 'HY-FHJ700B',  vol: 700,  id: 950,  h: 1008, gap: 36, kw: 200, rpm: 1420,  v: 65,  scrapeKw: 3,    scrapeRpm: 20, sideKw: 4,   sideRpm: 2400, sideV: 25 },
  { model: 'HY-FHJ800B',  vol: 800,  id: 990,  h: 1060, gap: 37, kw: 200, rpm: 1360,  v: 65,  scrapeKw: 3,    scrapeRpm: 20, sideKw: 5.5, sideRpm: 2400, sideV: 25 },
  { model: 'HY-FHJ900B',  vol: 900,  id: 1030, h: 1102, gap: 39, kw: 250, rpm: 1310,  v: 65,  scrapeKw: 4,    scrapeRpm: 20, sideKw: 5.5, sideRpm: 2200, sideV: 25 },
  { model: 'HY-FHJ1000B', vol: 1000, id: 1070, h: 1135, gap: 40, kw: 250, rpm: 1260,  v: 65.3,scrapeKw: 4,    scrapeRpm: 20, sideKw: 5.5, sideRpm: 2200, sideV: 25 },
]

function ParamsTable() {
  return (
    <div className="detail-params-table">
      <table className="params-table pdm-params-table cp-params-table dpm-params-table">
        <thead>
          <tr>
            <th>机型/规格<br /><span className="th-sub">Model</span></th>
            <th>设计容积(L)<br /><span className="th-sub">Volume</span></th>
            <th>内径(mm)<br /><span className="th-sub">Inner Dia.</span></th>
            <th>高度(mm)<br /><span className="th-sub">Height</span></th>
            <th>浆与壁间距(mm)<br /><span className="th-sub">Gap</span></th>
            <th>主电机功率(kW)<br /><span className="th-sub">Motor</span></th>
            <th>转速rpm(max)<br /><span className="th-sub">RPM</span></th>
            <th>线速度m/s(max)<br /><span className="th-sub">Speed</span></th>
            <th>刮壁电机功率(kW)<br /><span className="th-sub">Scraper</span></th>
            <th>刮壁转速rpm(max)<br /><span className="th-sub">Scraper RPM</span></th>
            <th>侧分散电机功率(kW)<br /><span className="th-sub">Side Disp.</span></th>
            <th>侧分散电机转速rpm(max)<br /><span className="th-sub">Side RPM</span></th>
            <th>侧分散线速m/s(max)<br /><span className="th-sub">Side Speed</span></th>
          </tr>
        </thead>
        <tbody>
          {modelParams.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              <td className="td-model-code">{row.model}</td>
              <td>{row.vol}</td>
              <td>{row.id}</td>
              <td>{row.h}</td>
              <td>{row.gap}</td>
              <td>{row.kw}</td>
              <td>{row.rpm}</td>
              <td>{row.v}</td>
              <td>{row.scrapeKw}</td>
              <td>{row.scrapeRpm}</td>
              <td>{row.sideKw}</td>
              <td>{row.sideRpm}</td>
              <td>{row.sideV}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SsbDryMixerPage() {
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
        title="干法电极粉体高速混合机"
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/solid-state-battery' },
          { label: '固态电池', path: '/products/solid-state-battery' },
          { label: '干法电极粉体高速混合机' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', maxWidth: '1040px', margin: '0 auto' }}>
              <div style={{ flex: '0 0 50%', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${IMG}/product-main.webp`}
                  alt="干法电极粉体高速混合机"
                  style={{ display: 'block', height: '100%', width: 'auto', objectFit: 'contain' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">干法电极粉体高速混合机</h2>
                <ul className="cp-core-device-features fade-up fade-up-delay-2">
                  <li>用于干法电极粉体纤维化、电解质原料的混合、破碎、包覆，无溶剂工艺，<br />大幅降低制造成本与能耗，超高速粉体混合机——纤维化技术的速度颠覆</li>
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

        <TechInquirySection />
      </div>
    </>
  )
}
