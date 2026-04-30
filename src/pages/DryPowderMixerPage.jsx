import React, { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import TechInquirySection from '../components/TechInquirySection'

const IMG = '/assets/images/solutions/dry-powder-mixer'

/* ========== 系统特点 SVG 图标 ========== */

function IconSpeed() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <path stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10"
        d="M464.758,135.498C485.264,170.947,497,212.103,497,256c0,133.101-107.899,241-241,241
           c-71.929,0-136.498-31.511-180.655-81.482" />
      <polyline stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10"
        points="135.5,415.408 75.25,415.408 75.25,475.658" />
      <path stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10"
        d="M47.242,376.501C26.736,341.053,15,299.897,15,256C15,122.899,122.899,15,256,15
           c71.929,0,136.498,31.511,180.655,81.482" />
      <polyline stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10"
        points="376.5,96.592 436.75,96.592 436.75,36.342" />
      <path stroke="#1E1E1E" strokeWidth="26" strokeMiterlimit="10"
        d="M416.607,286.12c1.69-9.79,2.57-19.85,2.57-30.12s-0.88-20.33-2.57-30.12h-29.123
           c-3.41-14.947-9.306-28.944-17.225-41.543l20.605-20.605c-5.728-8.118-12.219-15.853-19.481-23.115
           s-14.998-13.753-23.115-19.481l-20.605,20.605c-12.599-7.919-26.597-13.816-41.543-17.225V95.393
           c-9.79-1.69-19.85-2.57-30.12-2.57s-20.33,0.88-30.12,2.57v29.123c-14.947,3.41-28.944,9.307-41.543,17.225
           l-20.605-20.605c-8.118,5.728-15.853,12.219-23.115,19.481s-13.753,14.998-19.481,23.115l20.605,20.605
           c-7.919,12.599-13.816,26.597-17.225,41.543H95.393c-1.69,9.79-2.57,19.85-2.57,30.12s0.88,20.33,2.57,30.12h29.123
           c3.41,14.947,9.307,28.944,17.225,41.543l-20.605,20.605c5.728,8.118,12.219,15.853,19.481,23.115
           s14.998,13.753,23.115,19.481l20.605-20.605c12.599,7.919,26.597,13.816,41.543,17.225v29.123
           c9.79,1.69,19.85,2.57,30.12,2.57s20.33-0.88,30.12-2.57v-29.123c14.947-3.41,28.944-9.307,41.543-17.225
           l20.605,20.605c8.118-5.728,15.853-12.219,23.115-19.481s13.753-14.998,19.481-23.115l-20.605-20.605
           c7.919-12.599,13.816-26.597,17.225-41.543H416.607z" />
      <circle stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" cx="256" cy="256" r="73.342" />
    </svg>
  )
}

function IconConnect() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {[
          'translate(106,436)', 'translate(106,76)',
          'translate(466,436)', 'translate(466,76)',
        ].map((t, i) => (
          <path key={i} stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
            transform={t} d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z" />
        ))}
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(286,467)" d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(286,45)" d="m 0,0 c 0,16.568 -13.432,30 -30,30 -16.568,0 -30,-13.432 -30,-30 0,-16.568 13.432,-30 30,-30 16.568,0 30,13.432 30,30 z" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(45,286)" d="m 0,0 c 16.568,0 30,-13.432 30,-30 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 z" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(467,286)" d="m 0,0 c -16.568,0 -30,-13.432 -30,-30 0,-16.568 13.432,-30 30,-30 16.568,0 30,13.432 30,30 C 30,-13.432 16.568,0 0,0 Z" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(256,75)" d="M 0,0 V 121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(256,437)" d="M 0,0 V -121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(75,256)" d="M 0,0 H 121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(437,256)" d="M 0,0 H -121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(97.2129,414.7866)" d="M 0,0 116.378,-116.377" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(213.5908,213.5908)" d="M 0,0 -116.378,-116.377" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(298.4092,213.5908)" d="M 0,0 116.378,-116.377" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(414.7871,414.7866)" d="M 0,0 -116.378,-116.377" />
        <path stroke="#BA0C2F" strokeWidth="26" strokeMiterlimit="10"
          transform="translate(256,196)"
          d="m 0,0 c -33.091,0 -60,26.909 -60,60 0,33.091 26.909,60 60,60 C 33.091,120 60,93.091 60,60 60,26.909 33.091,0 0,0 Z" />
      </g>
    </svg>
  )
}

function IconLike() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <path stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10"
        d="M105.721,467H161.7l59.723,30h174.399c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5
           h11c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5h12c17.949,0,32.5-14.551,32.5-32.5
           c0-17.947-14.547-32.496-32.494-32.5h14.952c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5
           h-99.458v-58.528c0-34.808-28.218-63.026-63.026-63.026l-12.793,83.414C252.05,240.933,215.856,272,173.29,272h-68.569" />
      <rect x="45.721" y="242" stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10" width="60" height="255" />
      <line stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" x1="177.321" y1="31" x2="223.321" y2="77" />
      <line stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" x1="409.321" y1="31" x2="363.321" y2="77" />
      <line stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" x1="293.321" y1="0" x2="293.321" y2="59" />
    </svg>
  )
}

/* ========== 系统特点 ========== */
const features = [
  {
    Icon: IconSpeed,
    title: '效率颠覆',
    desc: '纤维化时间从 2h 缩短至 30 min，单线产能显著提升',
  },
  {
    Icon: IconConnect,
    title: '工艺广度',
    desc: '适配各种体系配方粉体纤维化需求，同时满足固态电解质前驱体的高效混合',
  },
  {
    Icon: IconLike,
    title: '全系列覆盖',
    desc: '实验型 2–100 L，量产型 150–1000 L，灵活满足从研发到量产各阶段需求',
  },
]

/* ========== 参数表数据 ========== */
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

/* ========== 主页面 ========== */
export default function DryPowderMixerPage() {
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
        title="行业解决方案"
        subtitle="Industry Solutions"
        bgImage="/assets/images/solutions/circulation-pulping/hero-bg-new.jpg"
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '固态电池行业', path: '/solutions#solid-state-battery' },
          { label: '干法电极成套设备解决方案' },
        ]} />

        {/* ===== 系统介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ maxWidth: '46%' }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">干法电极成套设备解决方案</h2>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  干法电极技术适用于磷酸（锰）铁锂、三元、钴酸锂、锰酸锂等多种正极体系，以及石墨、硅基负极、硬碳 / 软碳等多种负极体系，同时在硫化物、氧化物、聚合物固态电池领域均具有良好适配性，可有效避免溶剂对敏感材料的侵蚀。
                </p>
              </div>
              <div style={{ width: '100%' }}>
                <img
                  src={`${IMG}/干法电极系统-01.webp`}
                  alt="干法电极成套设备解决方案"
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 核心优势 ===== */}
        <SystemFeaturesSection
          features={features}
          title="核心优势"
          enLabel="Key Advantages"
          grayBg
          columns={3}
        />

        {/* ===== 核心设备 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Core Equipment</p>
            <h2 className="section-heading section-heading--center fade-up">核心设备</h2>

            <div className="cp-core-section">
              {/* 干法电极粉体高速混合机 */}
              <div className="cp-core-device-row fade-up fade-up-delay-1">
                <div className="cp-core-device-img-wrap">
                  <img
                    src={`${IMG}/product-main.png`}
                    alt="干法电极粉体高速混合机"
                    className="cp-core-device-img"
                    loading="lazy"
                  />
                </div>
                <div className="cp-core-device-info">
                  <div className="cp-core-device-badge">
                    <h3 className="cp-core-device-name">干法电极粉体高速混合机</h3>
                  </div>
                  <div className="cp-core-device-divider" />
                  <ul className="cp-core-device-features cp-core-device-features--no-dot">
                    <li>用于干法电极粉体纤维化、电解质原料的混合、破碎、包覆，无溶剂工艺，<br />大幅降低制造成本与能耗，超高速粉体混合机——纤维化技术的速度颠覆</li>
                  </ul>
                </div>
              </div>

              <hr className="cp-core-divider" />

              {/* 电磁给料机 */}
              <div className="cp-core-device-row fade-up fade-up-delay-1">
                <div className="cp-core-device-img-wrap">
                  <img
                    src={`${IMG}/core-device-01.webp`}
                    alt="电磁给料机结构示意图"
                    className="cp-core-device-img"
                    loading="lazy"
                  />
                </div>
                <div className="cp-core-device-info">
                  <div className="cp-core-device-badge">
                    <h3 className="cp-core-device-name">电磁给料机</h3>
                  </div>
                  <div className="cp-core-device-divider" />
                  <ul className="cp-core-device-features">
                    <li>集预热、展平与定量输送于一体，确保粉料稳定、均匀供给，<br />为极片均匀辊压工序奠定基础</li>
                    <li>罐体：SUS304不锈钢，内表面300目镜面抛光，外表面150目拉丝；料仓盖小半翻盖式，配破拱搅拌电机（0～40 rpm可调）、气锤及气蝶</li>
                    <li>震动筛：SUS304不锈钢，380V震动电机，激振力可调，可安装6～12目筛网</li>
                    <li>电磁给料机：振幅根据物料特性和输送量调节（常规振幅1.2 mm），实现精确给料</li>
                    <li>粉料预加热：碳纤维管红外线加热，温度可调，配PID控制器确保温度高精度控制</li>
                    <li>播粉器：快卡式结构，播粉宽度灵活调节</li>
                  </ul>
                </div>
              </div>

              <hr className="cp-core-divider" />

              {/* 双螺杆干法电极连续挤出机 */}
              <div className="cp-core-device-row fade-up fade-up-delay-1">
                <div className="cp-core-device-img-wrap">
                  <img
                    src={`${IMG}/core-device-02.webp`}
                    alt="双螺杆干法电极连续挤出机"
                    className="cp-core-device-img"
                    loading="lazy"
                  />
                </div>
                <div className="cp-core-device-info">
                  <div className="cp-core-device-badge">
                    <h3 className="cp-core-device-name">双螺杆干法电极连续挤出机</h3>
                  </div>
                  <div className="cp-core-device-divider" />
                  <ul className="cp-core-device-features">
                    <li>核心优势：2–5 min 快速出片，简单高效</li>
                    <li>多种物料同步计量喂料，实现完美的连续化生产，精度高达0.4%</li>
                    <li>模块独立温控，清理换型时间短</li>
                    <li>产品序列：实验型10–100 kg/h，量产型200–1500 kg/h</li>
                  </ul>
                </div>
              </div>

              <hr className="cp-core-divider" />

              {/* 固态电解质包覆机 */}
              <div className="cp-core-device-row fade-up fade-up-delay-1">
                <div className="cp-core-device-img-wrap">
                  <img
                    src={`${IMG}/core-device-03.webp`}
                    alt="固态电解质包覆机"
                    className="cp-core-device-img"
                    loading="lazy"
                  />
                </div>
                <div className="cp-core-device-info">
                  <div className="cp-core-device-badge">
                    <h3 className="cp-core-device-name">固态电解质包覆机</h3>
                  </div>
                  <div className="cp-core-device-divider" />
                  <ul className="cp-core-device-features">
                    <li>从源头构筑稳定界面，解决固态电池界面难题，实现材料纳米级包覆</li>
                    <li>核心优势：包覆率99%以上，降低界面阻抗，提升固态电解质体系综合性能</li>
                    <li>容器旋转与搅拌桨反向运转，实现流化悬浮</li>
                    <li>支持喷气、喷液、气液同喷三种模式</li>
                    <li>控温精度±1℃，控压精度±0.1 bar</li>
                    <li>产品序列：实验型2–50 L，量产型100–2000 L</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 参数汇总 ===== */}
        <section className="page-section page-section--gray">
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
