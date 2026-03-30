import React, { useEffect, useState } from 'react'
import {
  IconArrowsInfinityOutline24,
  IconShieldLockOutline24,
  IconTargetOutline24,
  IconRotateCubeOutline24,
} from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import TechInquirySection from '../components/TechInquirySection'
import prdSysImg from '../assets/img/prd-sys.png'

const IMG = '/assets/images/solutions/circulation-pulping'

/* ========== 系统特点 SVG 图标 ========== */

function IconDevelopment() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <path stroke="#A1A1AA" strokeWidth="28" strokeMiterlimit="10"
        d="M464.758,135.498C485.264,170.947,497,212.103,497,256c0,133.101-107.899,241-241,241
           c-71.929,0-136.498-31.511-180.655-81.482" />
      <polyline stroke="#A1A1AA" strokeWidth="28" strokeMiterlimit="10"
        points="135.5,415.408 75.25,415.408 75.25,475.658" />
      <path stroke="#A1A1AA" strokeWidth="28" strokeMiterlimit="10"
        d="M47.242,376.501C26.736,341.053,15,299.897,15,256C15,122.899,122.899,15,256,15
           c71.929,0,136.498,31.511,180.655,81.482" />
      <polyline stroke="#A1A1AA" strokeWidth="28" strokeMiterlimit="10"
        points="376.5,96.592 436.75,96.592 436.75,36.342" />
      <path stroke="#A1A1AA" strokeWidth="26" strokeMiterlimit="10"
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
      <circle stroke="#A1A1AA" strokeWidth="28" strokeMiterlimit="10" cx="256" cy="256" r="73.342" />
    </svg>
  )
}

function IconLeaf() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <path stroke="#A1A1AA" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(361.5459,234.5454)"
          d="m 0,0 c 0,-58.291 -47.255,-105.545 -105.546,-105.545 -58.291,0 -105.546,47.254 -105.546,105.545 0,107.018 105.546,164.455 105.546,164.455 C -105.546,164.455 0,107.018 0,0 Z" />
        <path stroke="#A1A1AA" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,399)" d="M 0,0 V -270" />
        <path stroke="#A1A1AA" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(154.8789,271.8809)" d="M 0,0 101.121,-78.732" />
        <path stroke="#A1A1AA" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(187.5967,338.647)" d="M 0,0 68.403,-53.259" />
        <path stroke="#A1A1AA" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(357.1211,271.8809)" d="M 0,0 -101.121,-78.732" />
        <path stroke="#A1A1AA" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(324.4033,338.647)" d="M 0,0 -68.403,-53.259" />
        <path stroke="#A1A1AA" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(44.1855,475.9243)" d="M 0,0 91.314,-11.212 80.103,-102.526" />
        <path stroke="#A1A1AA" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(467.8145,36.0757)" d="m 0,0 -91.314,11.212 11.211,91.314" />
        <path stroke="#A1A1AA" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(318.375,23.2119)"
          d="m 0,0 c -128.564,-34.449 -260.714,41.847 -295.163,170.413 -28.864,107.724 20.021,217.963 112.259,271.139" />
        <path stroke="#A1A1AA" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(193.625,488.7881)"
          d="M 0,0 C 128.564,34.449 260.714,-41.847 295.163,-170.413 324.027,-278.137 275.142,-388.376 182.904,-441.552" />
      </g>
    </svg>
  )
}

function IconLike() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <path stroke="#A1A1AA" strokeWidth="28" strokeMiterlimit="10"
        d="M105.721,467H161.7l59.723,30h174.399c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5
           h11c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5h12c17.949,0,32.5-14.551,32.5-32.5
           c0-17.947-14.547-32.496-32.494-32.5h14.952c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5
           h-99.458v-58.528c0-34.808-28.218-63.026-63.026-63.026l-12.793,83.414C252.05,240.933,215.856,272,173.29,272h-68.569" />
      <rect x="45.721" y="242" stroke="#A1A1AA" strokeWidth="28" strokeMiterlimit="10" width="60" height="255" />
      <line stroke="#A1A1AA" strokeWidth="28" strokeMiterlimit="10" x1="177.321" y1="31" x2="223.321" y2="77" />
      <line stroke="#A1A1AA" strokeWidth="28" strokeMiterlimit="10" x1="409.321" y1="31" x2="363.321" y2="77" />
      <line stroke="#A1A1AA" strokeWidth="28" strokeMiterlimit="10" x1="293.321" y1="0" x2="293.321" y2="59" />
    </svg>
  )
}

function IconCleanAir() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <path stroke="#A1A1AA" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(0,105)" d="M 0,0 H 411.5" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(497,210)" d="M 0,0 C 0,-24.853 -20.147,-45 -45,-45 H -497" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(497,0)" d="M 0,0 C 0,24.853 -20.147,45 -45,45 H -497" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(326,0)" d="M 0,0 C 0,24.853 -20.147,45 -45,45" />
        <path stroke="#A1A1AA" strokeWidth="24" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,240)"
          d="m 0,0 c 38.66,0 70,31.34 70,70 0,38.66 -31.34,70 -70,70 -0.616,0 -1.226,-0.03 -1.838,-0.046
             C -8.907,179.762 -43.661,210 -85.5,210 c -41.839,0 -76.592,-30.238 -83.662,-70.046
             c -0.612,0.016 -1.221,0.046 -1.838,0.046 c -38.66,0 -70,-31.34 -70,-70 0,-38.66 31.34,-70 70,-70
             h 326.5 c 47.22,0 85.5,38.28 85.5,85.5 0,47.22 -38.28,85.5 -85.5,85.5
             c -0.687,0 -1.365,-0.036 -2.048,-0.052 C 144.948,219.832 102.316,257 51,257
             C 9.834,257 -25.724,233.07 -42.578,198.373" />
      </g>
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
          <path key={i} stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10"
            transform={t} d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z" />
        ))}
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(286,467)" d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(286,45)" d="m 0,0 c 0,16.568 -13.432,30 -30,30 -16.568,0 -30,-13.432 -30,-30 0,-16.568 13.432,-30 30,-30 16.568,0 30,13.432 30,30 z" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(45,286)" d="m 0,0 c 16.568,0 30,-13.432 30,-30 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 z" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(467,286)" d="m 0,0 c -16.568,0 -30,-13.432 -30,-30 0,-16.568 13.432,-30 30,-30 16.568,0 30,13.432 30,30 C 30,-13.432 16.568,0 0,0 Z" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10" transform="translate(256,75)" d="M 0,0 V 121" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10" transform="translate(256,437)" d="M 0,0 V -121" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10" transform="translate(75,256)" d="M 0,0 H 121" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10" transform="translate(437,256)" d="M 0,0 H -121" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10" transform="translate(97.2129,414.7866)" d="M 0,0 116.378,-116.377" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10" transform="translate(213.5908,213.5908)" d="M 0,0 -116.378,-116.377" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10" transform="translate(298.4092,213.5908)" d="M 0,0 116.378,-116.377" />
        <path stroke="#A1A1AA" strokeWidth="22" strokeMiterlimit="10" transform="translate(414.7871,414.7866)" d="M 0,0 -116.378,-116.377" />
        <path stroke="#A1A1AA" strokeWidth="26" strokeMiterlimit="10"
          transform="translate(256,196)"
          d="m 0,0 c -33.091,0 -60,26.909 -60,60 0,33.091 26.909,60 60,60 C 33.091,120 60,93.091 60,60 60,26.909 33.091,0 0,0 Z" />
      </g>
    </svg>
  )
}

function IconFilter() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <polyline stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" points="437,497 437,255 286,255" />
      <polyline stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" points="75,497 75,255 226,255" />
      <polygon stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" points="286,316 286,255 346,195 346,135 166,135 166,195 226,255 226,316" />
      <line stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" x1="166" y1="195" x2="346" y2="195" />
      <line stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" x1="30" y1="497" x2="482" y2="497" />
      {/* 柱内横线 — 品牌红 */}
      <line stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" x1="190.667" y1="377" x2="120" y2="377" />
      <line stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" x1="291.333" y1="377" x2="220.667" y2="377" />
      <line stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" x1="392" y1="377" x2="321.333" y2="377" />
      <line stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" x1="190.667" y1="437" x2="120" y2="437" />
      <line stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" x1="291.333" y1="437" x2="220.667" y2="437" />
      <line stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" x1="392" y1="437" x2="321.333" y2="437" />
      {/* 顶部粒子短线 — 品牌红 */}
      <line stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" x1="241" y1="75" x2="271" y2="75" />
      <line stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" x1="211" y1="15" x2="241" y2="15" />
      <line stroke="#A1A1AA" strokeWidth="30" strokeMiterlimit="10" x1="301" y1="45" x2="331" y2="45" />
    </svg>
  )
}

function IconLaptop() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <path fill="#A1A1AA" d="M509.297,432L472,245.516V0H40v245.516L2.703,432H0v80h512v-80H509.297z
        M70,30h372v202H70V30z M67.297,262h377.406l34,170H33.297L67.297,262z M482,482H30v-20h452V482z" />
      <rect fill="#A1A1AA" x="180" y="382" width="152" height="30" />
      <rect fill="#A1A1AA" x="352" y="382" width="30" height="30" />
      <rect fill="#A1A1AA" x="402" y="382" width="30" height="30" />
      <rect fill="#A1A1AA" x="80" y="382" width="30" height="30" />
      <rect fill="#A1A1AA" x="130" y="382" width="30" height="30" />
      <rect fill="#A1A1AA" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -20.8368 223.4203)"
        x="193.735" y="121.863" width="131.079" height="30" />
      <polygon fill="#A1A1AA" points="176.292,96.87 155.467,75.274 98.391,130.313 155.467,185.352 176.292,163.756 141.609,130.313" />
      <polygon fill="#A1A1AA" points="356.533,75.274 335.708,96.87 370.391,130.313 335.708,163.756 356.533,185.352 413.609,130.313" />
    </svg>
  )
}

/* ========== 系统特点数据 ========== */
const features = [
  { Icon: IconDevelopment, title: '制浆效率高' },
  { Icon: IconConnect, title: '占用高度小，兼容性与灵活性提升' },
  { Icon: IconLike, title: '设备投资成本降低' },
  { Icon: IconLeaf, title: '全过程无金属无尘化生产' },
  { Icon: IconFilter, title: '下粉顺畅，无堵料风险' },
  { Icon: IconLaptop, title: '系统监控可视化管理' },
]

/* ========== 产品型号参数 ========== */
const modelParams = [
  { model: 'HY-HXF60',   output: 60,   batchVol: 120,  flowRate: 40,   motorKW: 37,  linearSpeed: 30 },
  { model: 'HY-HXF120',  output: 120,  batchVol: 240,  flowRate: 80,   motorKW: 55,  linearSpeed: 30 },
  { model: 'HY-HXF300',  output: 300,  batchVol: 600,  flowRate: 200,  motorKW: 75,  linearSpeed: 30 },
  { model: 'HY-HXF600',  output: 600,  batchVol: 1200, flowRate: 400,  motorKW: 132, linearSpeed: 30 },
  { model: 'HY-HXF900',  output: 900,  batchVol: 1800, flowRate: 600,  motorKW: 185, linearSpeed: 30 },
  { model: 'HY-HXF1200', output: 1200, batchVol: 2400, flowRate: 800,  motorKW: 200, linearSpeed: 30 },
  { model: 'HY-HXF1500', output: 1500, batchVol: 3000, flowRate: 1000, motorKW: 250, linearSpeed: 30 },
  { model: 'HY-HXF1800', output: 1800, batchVol: 3600, flowRate: 1200, motorKW: 300, linearSpeed: 30 },
]

function ParamsTable() {
  return (
    <div className="detail-params-table">
      <table className="params-table pdm-params-table cp-params-table">
        <thead>
          <tr>
            <th>型号<br /><span className="th-sub">Model</span></th>
            <th>产出要求<br /><span className="th-sub">Output (L/H)</span></th>
            <th>批次循环时间<br /><span className="th-sub">Cycle time (min)</span></th>
            <th>工艺时间<br /><span className="th-sub">Process time (h)</span></th>
            <th>批次量<br /><span className="th-sub">Batch volume (L)</span></th>
            <th>循环流量<br /><span className="th-sub">Flow rate (L/min)</span></th>
            <th>电机功率<br /><span className="th-sub">Motor power (kW)</span></th>
            <th>转子线速度<br /><span className="th-sub">Linear speed (m/s)</span></th>
          </tr>
        </thead>
        <tbody>
          {modelParams.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              <td className="td-model-code">{row.model}</td>
              <td>{row.output}</td>
              <td>3</td>
              <td>2</td>
              <td>{row.batchVol}</td>
              <td>{row.flowRate}</td>
              <td>{row.motorKW}</td>
              <td>{row.linearSpeed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ========== 主页面 ========== */
export default function CirculationPulpingPage() {
  const [videoPlayed, setVideoPlayed] = useState(false)

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
        bgImage={`${IMG}/hero-bg-new.jpg`}
        noScroll
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '新能源行业', path: '/solutions#new-energy' },
          { label: '高效循环制浆系统' },
        ]} />

        {/* ===== 系统介绍 + 方案视频 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <p className="section-en-label fade-up">System Introduction</p>
            <h2 className="section-heading section-heading--center fade-up">系统介绍</h2>
            <div className="pdm-intro-grid">
              <div className="pdm-intro-visual fade-up fade-up-delay-1">
                <img src={prdSysImg} alt="高效循环制浆系统" className="cp-intro-product-img" />
              </div>
              <div className="pdm-intro-content">
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">红运高效循环制浆系统</h2>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  自主研发专利技术，采用独特分散模块实现粉体与溶剂的快速充分混合。其独立的自循环分散系统可高效完成浆料均匀混合，确保稳定性和一致性。
                </p>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  系统采用简便传动结构，在保证高扭矩输出的同时显著降低故障率，极大提高了匀浆效率和设备稼动率。
                </p>
              </div>
            </div>
            <div className="cp-video-mock fade-up fade-up-delay-2">
              <img src={`${IMG}/hero.jpeg`} alt="方案视频封面" className="cp-video-mock-poster" />
              <div className={`cp-video-mock-overlay${videoPlayed ? ' cp-video-mock-overlay--played' : ''}`}>
                {!videoPlayed ? (
                  <button className="cp-video-play-btn" onClick={() => setVideoPlayed(true)} aria-label="播放">
                    <span className="cp-video-play-ring" />
                    <span className="cp-video-play-icon">▶</span>
                  </button>
                ) : (
                  <div className="cp-video-played-state">
                    <p className="cp-video-played-text">视频制作中，敬请期待</p>
                    <button className="cp-video-played-reset" onClick={() => setVideoPlayed(false)}>返回</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 系统特点 ===== */}
        <SystemFeaturesSection features={features} title="系统特点" enLabel="System Features" grayBg />

        {/* ===== 核心设备 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Core Equipment</p>
            <h2 className="section-heading section-heading--center fade-up">核心设备</h2>

            <div className="cp-core-section">
              {/* 高速分散机 */}
              <div className="cp-core-device-row fade-up fade-up-delay-1">
                <div className="cp-core-device-img-wrap">
                  <img
                    src={`${IMG}/disperser-structure.svg`}
                    alt="高速分散机结构示意图"
                    className="cp-core-device-img"
                    loading="lazy"
                  />
                </div>
                <div className="cp-core-device-info">
                  <div className="cp-core-device-badge">
                    <h3 className="cp-core-device-name">高速分散机</h3>
                  </div>
                  <div className="cp-core-device-divider" />
                  <ul className="cp-core-device-features">
                    <li>集预混分散一体，设计线速度30m/s，伺服电机驱动，效率卓越</li>
                    <li>采用自主专利设计机械密封，保障设备持续高气密性</li>
                    <li>侧面螺杆喂料，液料下进上出，进料连续顺畅</li>
                    <li>分散腔体设计双层分散剪切，带增压叶片，分散效率倍增</li>
                    <li>预混腔采用自主专利叶轮，可迅速将粉液预混并快速排出</li>
                    <li>带冷却水夹套，物料温度在线监测，全程保障物料温度可控</li>
                  </ul>
                </div>
              </div>

              <hr className="cp-core-divider" />

              {/* 循环罐A */}
              <div className="cp-core-device-row fade-up fade-up-delay-1">
                <div className="cp-core-device-img-wrap">
                  <img
                    src={`${IMG}/tank-a.svg`}
                    alt="循环罐A结构示意图"
                    className="cp-core-device-img"
                    loading="lazy"
                  />
                </div>
                <div className="cp-core-device-info">
                  <div className="cp-core-device-badge">
                    <h3 className="cp-core-device-name">循环罐 A</h3>
                  </div>
                  <div className="cp-core-device-divider" />
                  <ul className="cp-core-device-features">
                    <li>带慢速搅拌，转速0–40rpm/min，锚式搅拌桨，变频电机驱动</li>
                    <li>带冷却水夹套，桶内物料温度在线监测，保障物料温度可控</li>
                    <li>采用自主专利设计机械密封，保障设备高气密性</li>
                    <li>桶底锥形夹角60°设计，物料上进下出，保障物料100%循环分散</li>
                  </ul>
                </div>
              </div>

              <hr className="cp-core-divider" />

              {/* 循环罐B */}
              <div className="cp-core-device-row fade-up fade-up-delay-1">
                <div className="cp-core-device-img-wrap">
                  <img
                    src={`${IMG}/tank-b.svg`}
                    alt="循环罐B结构示意图"
                    className="cp-core-device-img"
                    loading="lazy"
                  />
                </div>
                <div className="cp-core-device-info">
                  <div className="cp-core-device-badge">
                    <h3 className="cp-core-device-name">循环罐 B</h3>
                  </div>
                  <div className="cp-core-device-divider" />
                  <ul className="cp-core-device-features">
                    <li>带在线分散功能，设计线速度30m/s，双层剪切，定转子间隙2mm，伺服电机驱动</li>
                    <li>采用自主专利设计机械密封，保障设备高气密性</li>
                    <li>桶底锥形夹角60°设计，保障物料100%分散，无死区残留</li>
                    <li>带冷却水夹套，桶内物料温度在线监测，保障物料温度可控</li>
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

        {/* ===== 客户案例 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Case</p>
            <h2 className="section-heading section-heading--center fade-up">客户案例</h2>

            {/* 01 来料信息 */}
            <div className="cp-verify-block fade-up fade-up-delay-1">
              <h3 className="cp-verify-subheading">来料信息</h3>
              <h4 className="cp-incoming-material-title">LFP：D50 = 0.5–1μm、SP、PVDF、分散剂</h4>
              <div className="cp-incoming-grid">
                <div className="cp-incoming-item">
                  <span className="cp-incoming-label">浆料粘度</span>
                  <span className="cp-incoming-value">9000 ± 3000 mPa·s</span>
                </div>
                <div className="cp-incoming-item">
                  <span className="cp-incoming-label">细度</span>
                  <span className="cp-incoming-value">≤ 20 μm</span>
                </div>
                <div className="cp-incoming-item">
                  <span className="cp-incoming-label">固含量</span>
                  <span className="cp-incoming-value">65%</span>
                </div>
              </div>
            </div>

            {/* 02 浆料质量检测（原 04 浆料流变性 + 05 浆料稳定性数据 + 06 极片电镜） */}
            <div className="cp-verify-block fade-up fade-up-delay-2">
              <h3 className="cp-verify-subheading">浆料质量检测</h3>

              {/* 浆料流变性（原04） */}
              <div className="cp-verify-subsection">
                <h4 className="cp-verify-sub-title">浆料流变性</h4>
                <div className="cp-charts-grid-3">
                  <div className="cp-chart-card">
                    <div className="cp-chart-img-wrap">
                      <img src={`${IMG}/chart-12.jpg`} alt="剪切速率曲线" className="cp-chart-img" loading="lazy" />
                    </div>
                    <p className="cp-chart-caption">剪切速率：过程剪切无突变，非牛顿流体特征</p>
                  </div>
                  <div className="cp-chart-card cp-chart-card--span2">
                    <div className="cp-chart-dual-imgs">
                      <img src={`${IMG}/chart-13.jpg`} alt="三区间及触变环图1" className="cp-chart-img" loading="lazy" />
                      <img src={`${IMG}/chart-14.jpg`} alt="三区间及触变环图2" className="cp-chart-img" loading="lazy" />
                    </div>
                    <p className="cp-chart-caption">三区间及触变环：浆料具备一定的触变恢复性，利于涂布</p>
                  </div>
                </div>
              </div>

              {/* 浆料稳定性数据（原05） */}
              <div className="cp-verify-subsection">
                <h4 className="cp-verify-sub-title">浆料稳定性数据</h4>
                <div className="cp-charts-grid-3">
                  <div className="cp-chart-card">
                    <div className="cp-chart-img-wrap">
                      <img src={`${IMG}/chart-15.jpg`} alt="背散射光曲线" className="cp-chart-img" loading="lazy" />
                    </div>
                    <p className="cp-chart-caption">背散射光曲线：浆料测试过程未出现颗粒团聚和沉降</p>
                  </div>
                  <div className="cp-chart-card cp-chart-card--span2">
                    <div className="cp-chart-dual-imgs">
                      <img src={`${IMG}/chart-16.jpg`} alt="稳定性指数图1" className="cp-chart-img" loading="lazy" />
                      <img src={`${IMG}/chart-17.jpg`} alt="稳定性指数图2" className="cp-chart-img" loading="lazy" />
                    </div>
                    <p className="cp-chart-caption">稳定性指数：TSI = 0.08（行业内 &lt;0.2 为准）</p>
                  </div>
                  <div className="cp-chart-card">
                    <div className="cp-chart-img-wrap">
                      <img src={`${IMG}/chart-18.jpg`} alt="粒子迁移率" className="cp-chart-img" loading="lazy" />
                    </div>
                    <p className="cp-chart-caption">粒子迁移率</p>
                  </div>
                  <div className="cp-chart-card cp-chart-card--span2">
                    <div className="cp-chart-img-wrap">
                      <img src={`${IMG}/chart-19.jpg`} alt="分散均匀性指数" className="cp-chart-img" loading="lazy" />
                    </div>
                    <p className="cp-chart-caption">分散均匀性指数：0.0925（行业内 &lt;2 为最佳）</p>
                  </div>
                </div>
              </div>

              {/* 极片电镜（原06） */}
              <div className="cp-verify-subsection">
                <h4 className="cp-verify-sub-title">红运高速循环制浆极片电镜</h4>
                <div className="cp-sem-grid">
                  <div className="cp-sem-card">
                    <div className="cp-sem-img-wrap">
                      <img src={`${IMG}/chart-20.jpg`} alt="极片SEM 20000倍" className="cp-sem-img" loading="lazy" />
                    </div>
                    <p className="cp-sem-caption">20,000× 倍 · 比例尺 1μm</p>
                  </div>
                  <div className="cp-sem-card">
                    <div className="cp-sem-img-wrap">
                      <img src={`${IMG}/chart-21.jpg`} alt="极片SEM 50000倍" className="cp-sem-img" loading="lazy" />
                    </div>
                    <p className="cp-sem-caption">50,000× 倍 · 比例尺 500nm</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
