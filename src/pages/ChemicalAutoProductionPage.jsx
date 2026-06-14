import React, { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import TechInquirySection from '../components/TechInquirySection'
import VideoPlayer from '../components/VideoPlayer'

const HERO_IMG = '/assets/images/solutions/battery-manufacturing.webp'
const PRODUCT_IMG = '/assets/images/solutions/chemical/main-product.webp'
const EQ = '/assets/images/solutions/chemical/equipment'

/* ========== 系统特点图标（来自循环制浆页）========== */

function IconDevelopment() {
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

function IconLeaf() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(361.5459,234.5454)"
          d="m 0,0 c 0,-58.291 -47.255,-105.545 -105.546,-105.545 -58.291,0 -105.546,47.254 -105.546,105.545 0,107.018 105.546,164.455 105.546,164.455 C -105.546,164.455 0,107.018 0,0 Z" />
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,399)" d="M 0,0 V -270" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(154.8789,271.8809)" d="M 0,0 101.121,-78.732" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(187.5967,338.647)" d="M 0,0 68.403,-53.259" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(357.1211,271.8809)" d="M 0,0 -101.121,-78.732" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(324.4033,338.647)" d="M 0,0 -68.403,-53.259" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(44.1855,475.9243)" d="M 0,0 91.314,-11.212 80.103,-102.526" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(467.8145,36.0757)" d="m 0,0 -91.314,11.212 11.211,91.314" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(318.375,23.2119)"
          d="m 0,0 c -128.564,-34.449 -260.714,41.847 -295.163,170.413 -28.864,107.724 20.021,217.963 112.259,271.139" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(193.625,488.7881)"
          d="M 0,0 C 128.564,34.449 260.714,-41.847 295.163,-170.413 324.027,-278.137 275.142,-388.376 182.904,-441.552" />
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

function IconCleanAir() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(0,105)" d="M 0,0 H 411.5" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(497,210)" d="M 0,0 C 0,-24.853 -20.147,-45 -45,-45 H -497" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(497,0)" d="M 0,0 C 0,24.853 -20.147,45 -45,45 H -497" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(326,0)" d="M 0,0 C 0,24.853 -20.147,45 -45,45" />
        <path stroke="#BA0C2F" strokeWidth="24" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
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

function IconFilter() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <polyline stroke="#1E1E1E" strokeWidth="30" strokeMiterlimit="10" points="437,497 437,255 286,255" />
      <polyline stroke="#1E1E1E" strokeWidth="30" strokeMiterlimit="10" points="75,497 75,255 226,255" />
      <polygon stroke="#1E1E1E" strokeWidth="30" strokeMiterlimit="10" points="286,316 286,255 346,195 346,135 166,135 166,195 226,255 226,316" />
      <line stroke="#1E1E1E" strokeWidth="30" strokeMiterlimit="10" x1="166" y1="195" x2="346" y2="195" />
      <line stroke="#1E1E1E" strokeWidth="30" strokeMiterlimit="10" x1="30" y1="497" x2="482" y2="497" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="190.667" y1="377" x2="120" y2="377" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="291.333" y1="377" x2="220.667" y2="377" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="392" y1="377" x2="321.333" y2="377" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="190.667" y1="437" x2="120" y2="437" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="291.333" y1="437" x2="220.667" y2="437" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="392" y1="437" x2="321.333" y2="437" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="241" y1="75" x2="271" y2="75" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="211" y1="15" x2="241" y2="15" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="301" y1="45" x2="331" y2="45" />
    </svg>
  )
}

function IconLaptop() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <path fill="#1E1E1E" d="M509.297,432L472,245.516V0H40v245.516L2.703,432H0v80h512v-80H509.297z
        M70,30h372v202H70V30z M67.297,262h377.406l34,170H33.297L67.297,262z M482,482H30v-20h452V482z" />
      <rect fill="#1E1E1E" x="180" y="382" width="152" height="30" />
      <rect fill="#1E1E1E" x="352" y="382" width="30" height="30" />
      <rect fill="#1E1E1E" x="402" y="382" width="30" height="30" />
      <rect fill="#1E1E1E" x="80" y="382" width="30" height="30" />
      <rect fill="#1E1E1E" x="130" y="382" width="30" height="30" />
      <rect fill="#BA0C2F" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -20.8368 223.4203)"
        x="193.735" y="121.863" width="131.079" height="30" />
      <polygon fill="#BA0C2F" points="176.292,96.87 155.467,75.274 98.391,130.313 155.467,185.352 176.292,163.756 141.609,130.313" />
      <polygon fill="#BA0C2F" points="356.533,75.274 335.708,96.87 370.391,130.313 335.708,163.756 356.533,185.352 413.609,130.313" />
    </svg>
  )
}

/* ========== 系统特点数据 ========== */
const features = [
  { Icon: IconDevelopment, title: '制浆效率高' },
  { Icon: IconConnect,     title: '占用高度小，兼容性与灵活性提升' },
  { Icon: IconLike,        title: '设备投资成本降低' },
  { Icon: IconLeaf,        title: '全过程无金属无尘化生产' },
  { Icon: IconFilter,      title: '下粉顺畅，无堵料风险' },
  { Icon: IconLaptop,      title: '系统监控可视化管理' },
]

/* ========== 核心设备数据 ========== */
const coreEquipment = [
  { name: '双行星动力混合机',   img: '/assets/images/solutions/pd-pulping/main-product.webp' },
  { name: '往复式混合机',   img: `${EQ}/02-reciprocating-mixer.png`   },
  { name: '双立柱行星混合机',   img: `${EQ}/03-dual-column-planetary-01.webp` },
  { name: '行星蝶式混合机', img: `${EQ}/05-butterfly-mixer.jpg`       },
  { name: '行星动力混合机', img: `${EQ}/06-planetary-power-mixer.webp` },
  { name: '立式捏合机',         img: `${EQ}/07-vertical-kneader-01.webp`      },
  { name: '压料机',             img: `${EQ}/08-material-press.webp`        },
  { name: '倾倒机',             img: `${EQ}/09-tilting-machine-01.png`       },
  { name: '洗桶机',             img: `${EQ}/10-barrel-washer.webp`         },
  { name: '反应釜',             img: `${EQ}/11-reactor.png`               },
  { name: '储罐',               img: `${EQ}/12-storage-tank.jpg`          },
]

/* ========== 核心设备卡片网格 ========== */
function EquipmentCardGrid({ devices }) {
  return (
    <section className="page-section page-section--gray">
      <div className="page-container">
        <p className="section-en-label fade-up">Core Equipment</p>
        <h2 className="section-heading section-heading--center fade-up">核心设备</h2>
        <div className="chem-eq-grid fade-up fade-up-delay-1">
          {devices.map((device, i) => (
            <div className="chem-eq-card" key={i}>
              <div className="chem-eq-img-wrap">
                <img
                  src={device.img}
                  alt={device.name}
                  className="chem-eq-img"
                  loading="lazy"
                />
              </div>
              <p className="chem-eq-name">{device.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ========== 主页面 ========== */
export default function ChemicalAutoProductionPage() {

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
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '化工行业', path: '/solutions#chemical' },
          { label: '化工全自动生产系统' },
        ]} />

        {/* ===== 系统介绍 + 视频模块 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="pdm-intro-grid">
              <div className="pdm-intro-visual pdm-intro-visual--photo fade-up fade-up-delay-1">
                <img
                  src={PRODUCT_IMG}
                  alt="红运机械化工全自动生产系统"
                  className="cp-intro-product-img"
                />
              </div>
              <div className="pdm-intro-content">
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">红运 化工全自动生产系统</h2>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  红运机械全自动系统广泛适配各种化工行业的大型规模化生产，精准满足各种新能源、化学品、电子电器、医药品、火工药剂、新材料等行业所需材料的全流程生产需求。
                </p>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  系统集成吨包自动上料、粉体干燥除湿、粉体自动计量、溶剂储存计量、搅拌混合、压料挤压出料包装等模块，采用全自动编程控制模式，能灵活适配多配方体系工艺需求，实现从原料投入到成品包装的自动化、精准化运行，大幅提升生产效率，保证产品一致性。
                </p>
              </div>
            </div>

            {/* 视频模块 */}
            <div className="fade-up fade-up-delay-2" style={{ marginTop: '40px' }}>
              <VideoPlayer
                src="/assets/videos/chemical-auto-production.webm"
                poster="/assets/videos/chemical-auto-production-poster.jpg"
                title="红运 化工全自动生产系统"
              />
            </div>
          </div>
        </section>

        {/* ===== 系统特点 ===== */}
        <SystemFeaturesSection features={features} title="系统特点" enLabel="System Features" grayBg />

        {/* ===== 核心设备卡片网格 ===== */}
        <EquipmentCardGrid devices={coreEquipment} />

        {/* ===== 参数汇总（暂空）===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <p className="section-en-label fade-up">Parameters Overview</p>
            <h2 className="section-heading section-heading--center fade-up">化工全自动生产系统参数汇总</h2>
            <p className="cp-table-note fade-up fade-up-delay-1" style={{ textAlign: 'center', marginTop: '2rem' }}>
              参数详情待补充，请联系我们获取完整技术规格。
            </p>
          </div>
        </section>

        {/* ===== 客户案例 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Case</p>
            <h2 className="section-heading section-heading--center fade-up">客户案例</h2>
            <div className="fade-up fade-up-delay-1" style={{ marginTop: '40px' }}>
              <VideoPlayer
                src="/assets/videos/shenglong-case.webm"
                poster="/assets/videos/shenglong-case-poster.jpg"
                title="盛龙项目案例"
              />
            </div>
          </div>
        </section>

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
