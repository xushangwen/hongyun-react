import React, { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import CoreEquipmentSection from '../components/CoreEquipmentSection'
import TechInquirySection from '../components/TechInquirySection'

const HERO_IMG = '/assets/images/solutions/circulation-pulping/hero-bg-new.jpg'
const PRODUCT_IMG = '/assets/images/solutions/pipeline-pulping/main-product.webp'
const IMG = '/assets/images/solutions/pipeline-pulping'

/* ========== 系统特点 SVG 图标（复用 circulation-pulping 图标）========== */

/* 节能高效 — 循环效率 */
function IconEnergy() {
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

/* 工艺优势 — 网络连接 */
function IconProcess() {
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

/* 浆料品质 — 过滤精度 */
function IconQuality() {
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

/* 设备性能 — 数字监控 */
function IconPerformance() {
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

/* ========== 系统特点详细说明（品牌红序列点）========== */
function FeatList({ items }) {
  return (
    <ul className="pp-feat-list">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  )
}

const features = [
  {
    Icon: IconEnergy,
    title: '节能高效',
    desc: <FeatList items={[
      <>{'制浆能耗低：正极制浆 <40 KWh/t，'}<br />{'负极制浆 <33 KWh/t'}</>,
      '制浆效率高：60 分钟快速制浆',
    ]} />,
  },
  {
    Icon: IconProcess,
    title: '工艺优势',
    desc: <FeatList items={[
      '完整保持活性物质包覆层及粘结剂特性',
      '适用于所有材料体系的制浆混合工艺',
      '独创捏合工艺于粉体与液体的浸润混合',
    ]} />,
  },
  {
    Icon: IconQuality,
    title: '浆料品质',
    desc: <FeatList items={[
      '浆料一致性高：粘度/固含量/细度极差 <1%',
      '稳定性（TSI）指数 <0.09，分散均匀性 <0.5',
      '流变性、流动性、流平性好，利于涂布',
    ]} />,
  },
  {
    Icon: IconPerformance,
    title: '设备性能',
    desc: <FeatList items={[
      '稼动率高：传动系统全面简化，维护成本低',
      '紧凑型设计，占用空间小',
      '精准温控系统，出料温度可控',
    ]} />,
  },
]

/* ========== 三元体系 TSI 柱状图（OCR 还原）========== */
const ncaTsiData = {
  maxVal: 0.10,
  yTicks: [0, 0.02, 0.04, 0.06, 0.08, 0.10],
  bars: [
    { label: '整体', value: 0.09 },
    { label: '底部', value: 0.08 },
    { label: '中部', value: 0.08 },
    { label: '顶部', value: 0.09 },
  ],
}

function NcaTsiBarChart({ noCard = false }) {
  const { maxVal, yTicks, bars } = ncaTsiData
  const inner = (
    <>
      <p className="cp-verify-sub-title" style={{ marginBottom: 20 }}>TSI稳定性指数</p>
      <div className="tsp-bar-chart">
        <div className="tsp-bar-chart-yaxis">
          {[...yTicks].reverse().map((t) => (
            <span key={t} className="tsp-bar-chart-ytick">{t.toFixed(2)}</span>
          ))}
        </div>
        <div className="tsp-bar-chart-body">
          <div className="tsp-bar-chart-gridlines">
            {yTicks.map((t) => (
              <div key={t} className="tsp-bar-chart-gridline" style={{ bottom: `${(t / maxVal) * 100}%` }} />
            ))}
          </div>
          {bars.map((bar, i) => (
            <div key={i} className="tsp-bar-group">
              <div className="tsp-bar-item">
                <span className="tsp-bar-val">{bar.value.toFixed(2)}</span>
                <div
                  className="tsp-bar"
                  style={{ height: `${(bar.value / maxVal) * 100}%`, background: '#4472C4' }}
                />
              </div>
              <p className="tsp-bar-group-label">{bar.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
  return noCard
    ? <div className="lfp-tsi-bar-inline">{inner}</div>
    : <div className="tsp-bar-chart-card">{inner}</div>
}

/* ========== 铁锂体系 TSI 柱状图（OCR 还原）========== */
const lfpTsiData = {
  maxVal: 0.18,
  yTicks: [0, 0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.16, 0.18],
  bars: [
    { label: '整体', value: 0.15 },
    { label: '底部', value: 0.14 },
    { label: '中部', value: 0.14 },
    { label: '顶部', value: 0.17 },
  ],
}

function LfpTsiBarChart({ noCard = false }) {
  const { maxVal, yTicks, bars } = lfpTsiData
  const inner = (
    <>
      <p className="cp-verify-sub-title" style={{ marginBottom: 20 }}>TSI稳定性指数</p>
      <div className="tsp-bar-chart">
        <div className="tsp-bar-chart-yaxis">
          {[...yTicks].reverse().map((t) => (
            <span key={t} className="tsp-bar-chart-ytick">{t.toFixed(2)}</span>
          ))}
        </div>
        <div className="tsp-bar-chart-body">
          <div className="tsp-bar-chart-gridlines">
            {yTicks.map((t) => (
              <div key={t} className="tsp-bar-chart-gridline" style={{ bottom: `${(t / maxVal) * 100}%` }} />
            ))}
          </div>
          {bars.map((bar, i) => (
            <div key={i} className="tsp-bar-group">
              <div className="tsp-bar-item">
                <span className="tsp-bar-val">{bar.value.toFixed(2)}</span>
                <div
                  className="tsp-bar"
                  style={{ height: `${(bar.value / maxVal) * 100}%`, background: '#4472C4' }}
                />
              </div>
              <p className="tsp-bar-group-label">{bar.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
  return noCard
    ? <div className="lfp-tsi-bar-inline">{inner}</div>
    : <div className="tsp-bar-chart-card">{inner}</div>
}

/* ========== 石墨体系 TSI 柱状图（OCR 还原）========== */
const graphiteTsiData = {
  maxVal: 0.08,
  yTicks: [0, 0.02, 0.04, 0.06, 0.08],
  bars: [
    { label: '整体', value: 0.06 },
    { label: '底部', value: 0.06 },
    { label: '中部', value: 0.06 },
    { label: '顶部', value: 0.05 },
  ],
}

function GraphiteTsiBarChart({ noCard = false }) {
  const { maxVal, yTicks, bars } = graphiteTsiData
  const inner = (
    <>
      <p className="cp-verify-sub-title" style={{ marginBottom: 20 }}>TSI稳定性指数</p>
      <div className="tsp-bar-chart">
        <div className="tsp-bar-chart-yaxis">
          {[...yTicks].reverse().map((t) => (
            <span key={t} className="tsp-bar-chart-ytick">{t.toFixed(2)}</span>
          ))}
        </div>
        <div className="tsp-bar-chart-body">
          <div className="tsp-bar-chart-gridlines">
            {yTicks.map((t) => (
              <div key={t} className="tsp-bar-chart-gridline" style={{ bottom: `${(t / maxVal) * 100}%` }} />
            ))}
          </div>
          {bars.map((bar, i) => (
            <div key={i} className="tsp-bar-group">
              <div className="tsp-bar-item">
                <span className="tsp-bar-val">{bar.value.toFixed(2)}</span>
                <div
                  className="tsp-bar"
                  style={{ height: `${(bar.value / maxVal) * 100}%`, background: '#4472C4' }}
                />
              </div>
              <p className="tsp-bar-group-label">{bar.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
  return noCard
    ? <div className="lfp-tsi-bar-inline">{inner}</div>
    : <div className="tsp-bar-chart-card">{inner}</div>
}

/* ========== 主页面 ========== */
// 视频模块开关：true = 显示，false = 隐藏
const SHOW_VIDEO = true

export default function PipelinePulpingPage() {
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
        noScroll
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '新能源行业', path: '/solutions#new-energy' },
          { label: '管线式制浆系统' },
        ]} />

        {/* ===== 系统介绍（与 pd-pulping 同 section 类，padding/margin 一致）===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            {/* banner：与视频等宽，图片靠底左缩放，文字右侧浮层 */}
            <div className="pp-intro-banner fade-up fade-up-delay-1">
              <img
                src={PRODUCT_IMG}
                alt="高效管线式制浆系统"
                className="pp-intro-banner-img"
              />
              <div className="pp-intro-banner-content">
                <h2 className="pdm-intro-name">红运管线式制浆系统</h2>
                <p className="pdm-intro-desc">
                  基于 PD 搅拌机制浆系统升级研发，创新采用分离式捏合与稀释分散工艺，实现对配方工艺的精准调控与各组分的高效混合，确保成品浆料高质量，显著提升电池性能及循环寿命。
                </p>
                <p className="pdm-intro-desc">
                  该方案是电池行业高固含量制浆工艺的首选解决方案。
                </p>
              </div>
            </div>

            {/* 视频模块（SHOW_VIDEO 控制显隐） */}
            {SHOW_VIDEO && (
              <div className="cp-video-mock pp-video-mock fade-up fade-up-delay-2">
                <video
                  className="cp-video-mock-poster"
                  controls
                  playsInline
                  poster={`${IMG}/video-poster.jpg`}
                  preload="metadata"
                >
                  <source src={`${IMG}/product-video.mp4`} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </section>

        {/* ===== 系统特点 ===== */}
        <SystemFeaturesSection features={features} title="系统特点" enLabel="System Features" grayBg columns={4} />

        {/* ===== 核心设备 ===== */}
        <CoreEquipmentSection devices={[
          {
            name: '管线捏合罐',
            img: `${IMG}/tank-main.webp`,
            tbd: '设备介绍文字内容待提供',
          },
          {
            name: '高速分散机',
            img: `${IMG}/disperser-view.webp`,
            tbd: '设备介绍文字内容待提供',
          },
          {
            name: '管线分散罐',
            img: `${IMG}/管线分散罐.svg`,
            paragraphs: [
              {
                title: '基本配置',
                text: '管线分散罐基本构成由搅拌系统模块、密封系统模块、分散系统模块及水冷系统组成，主体设备有观察口、加料口、进料口、抽真空口、放空口、取样口、出料口等，桶体带冷却夹套。控制系统包含：搅拌系统 1 套、定转子高速分散剪切系统 1 套、恒温控制系统 1 套。',
              },
              {
                title: '基本原理',
                text: '搅拌桨正向旋转时，搅拌桨轴向将罐内两端的物料推向罐体中间，便于中部位置的高速分散系统将浆料进行分散。螺旋形桨叶将分散好的浆料径向散开，形成浆料大循环流动；分散系统定子的弧形叶片在高速旋转下，产生强大的离心流场，在转子中心形成相对低压区，浆料从定转子中心被吸入，在离心力的作用下，物料被分散剪切，由中心向四周扩散，配合螺旋搅拌桨的旋转，进行浆料循环分散。',
              },
            ],
          },
        ]} />

        {/* ===== 客户案例 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Case</p>
            <h2 className="section-heading section-heading--center fade-up">客户案例</h2>

            {/* 车间实拍 */}
            <div className="cp-verify-block fade-up fade-up-delay-1">
              <div className="cp-charts-grid-4 pp-charts-grid">
                {[
                  { src: `${IMG}/case-workshop-01.webp`, alt: '管线式制浆车间' },
                  { src: `${IMG}/case-workshop-02.webp`, alt: '管线式制浆车间' },
                  { src: `${IMG}/case-workshop-03.webp`, alt: '管线式制浆车间' },
                  { src: `${IMG}/case-workshop-04.jpg`,  alt: '吨包投料车间' },
                ].map((item, i) => (
                  <div key={i} className="cp-chart-card">
                    <img src={item.src} alt={item.alt} className="cp-chart-img" loading="lazy" />
                    <p className="cp-chart-caption">{item.alt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 三种典型材料体系 */}
            <div className="pp-material-cases fade-up fade-up-delay-2">
              <h3 className="pp-material-cases-title">三种典型材料体系经过管线式制浆机处理结果</h3>

              {/* ── 01 铁锂体系 ── */}
              <div className="cp-verify-block">
                <h3 className="cp-verify-subheading">
                  <span className="cp-verify-num">01</span>
                  制浆解决方案——铁锂体系
                </h3>

                {/* 红运管线正极浆料结果如下 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">红运管线正极浆料结果如下：</h4>
                  <div className="lfp-result-cards">
                    <div className="lfp-result-card">
                      <p className="lfp-result-card-label">浆料粘度</p>
                      <p className="lfp-result-card-val">5920 <span className="lfp-result-card-unit">mPas</span></p>
                      <p className="lfp-result-card-meta">63# · 12 rpm · 14.7 m/s</p>
                      <p className="lfp-result-card-sub">细度：6 μm</p>
                    </div>
                    <div className="lfp-result-card">
                      <p className="lfp-result-card-label">浆料粘度</p>
                      <p className="lfp-result-card-val">5480 <span className="lfp-result-card-unit">mPas</span></p>
                      <p className="lfp-result-card-meta">63# · 12 rpm · 18 m/s</p>
                      <p className="lfp-result-card-sub">细度：6 μm</p>
                    </div>
                    <div className="lfp-result-card">
                      <p className="lfp-result-card-label">浆料固含量</p>
                      <p className="lfp-result-card-solids">66.2% <span>/</span> 65.9% <span>/</span> 65.5%</p>
                    </div>
                  </div>
                </div>

                {/* 匀浆总时长 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">匀浆总时长：</h4>
                  <p className="cp-body-text">粉体混合10min+捏合60min+高粘30min+稀释30min+高速分散5min，共135min。</p>
                </div>

                {/* 铁锂浆料24h稳定性 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">铁锂浆料24h稳定性：</h4>

                  {/* Row 1: 整体无团聚无沉降 | 分散均匀性指数（图+表在同一张卡） */}
                  <div className="lfp-stability-2col">
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/lfp-stability-scatter.png`} alt="整体无团聚无沉降" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">整体无团聚、无沉降</p>
                    </div>

                    <div className="cp-chart-card lfp-dispersion-card">
                      <div className="lfp-dispersion-inner">
                        <div className="cp-chart-img-wrap">
                          <img src={`${IMG}/lfp-dispersion-chart.png`} alt="分散均匀性指数图" className="cp-chart-img" loading="lazy" />
                        </div>
                        <div className="lfp-dispersion-table-wrap">
                          <table className="lfp-dispersion-table">
                            <tbody>
                              <tr className="tr-odd"><td>STDEV.P</td><td className="lfp-dt-val">0.09</td></tr>
                              <tr className="tr-even"><td>AVERAGE</td><td className="lfp-dt-val">1.83</td></tr>
                              <tr className="tr-odd">
                                <td>分散均匀性指数</td>
                                <td className="lfp-dt-val lfp-dt-highlight">0.49</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <p className="cp-chart-caption">分散均匀性指数0.49（＜2为标准）</p>
                    </div>
                  </div>

                  {/* Row 2: TSI 三图合一卡 */}
                  <div className="cp-chart-card lfp-tsi-combined" style={{ marginTop: 20 }}>
                    <div className="lfp-tsi-inner">
                      <div className="lfp-tsi-col">
                        <div className="cp-chart-img-wrap">
                          <img src={`${IMG}/lfp-tsi-dynamic.png`} alt="动力学不稳定性整体" className="cp-chart-img" loading="lazy" />
                        </div>
                      </div>
                      <div className="lfp-tsi-col">
                        <LfpTsiBarChart noCard />
                      </div>
                      <div className="lfp-tsi-col">
                        <div className="cp-chart-img-wrap">
                          <img src={`${IMG}/lfp-tsi-position.png`} alt="TSI分层" className="cp-chart-img" loading="lazy" />
                        </div>
                      </div>
                    </div>
                    <p className="cp-chart-caption">整体TSI指数0.15（&lt;0.2为标准）</p>
                  </div>
                </div>

                {/* 铁锂浆料流变性 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">铁锂浆料流变性</h4>
                  <div className="tsp-charts-grid-3">
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/lfp-rheology-01.png`} alt="流动曲线" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">流动性较强</p>
                    </div>
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/lfp-rheology-02.png`} alt="触变环" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">典型的非牛顿流体特征</p>
                    </div>
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/lfp-rheology-03.png`} alt="三段式粘度恢复" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">具备较强的剪切恢复性</p>
                    </div>
                  </div>
                </div>

                {/* 铁锂浆料及电镜 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">铁锂浆料及电镜</h4>
                  <div className="tsp-charts-grid-3 lfp-sem-grid">
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/lfp-verify.jpg`} alt="粘度及细度检测" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">浆料经过线速度14.7m/s高效分散后粘度：5920 mPas（28.4°C、63# 12rpm）细度：6 μm，固含量：66.2%</p>
                    </div>
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/lfp-sem-20000x.jpg`} alt="SEM 20000×" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">线速度14.7m/s<br />20000倍，2um比例尺</p>
                    </div>
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/lfp-sem-50000x.jpg`} alt="SEM 50000×" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">线速度14.7m/s<br />50000倍，500nm比例尺</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 02 三元体系 ── */}
              <div className="cp-verify-block">
                <h3 className="cp-verify-subheading">
                  <span className="cp-verify-num">02</span>
                  制浆解决方案——三元体系
                </h3>

                {/* 红运工艺验证结果 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">红运工艺验证结果</h4>
                  <div className="nca-verify-banner">
                    <p className="nca-verify-badge">55L 管线式捏合 <span>+</span> 43L PD搅拌机分散</p>
                    <ol className="nca-verify-list">
                      <li>
                        PVDF胶液粘度（7%固含量）：<strong>2750 mPas</strong>
                        <span className="nca-verify-meta">（63# 12rpm，20°C）</span>
                      </li>
                      <li>
                        55L管线2.0捏合固含88%，捏合60min、高粘20min、稀释20min，<strong>共计100min</strong>
                      </li>
                      <li>
                        浆料固含量：<strong>74%</strong>，高目标固含一个点（73%）
                      </li>
                    </ol>
                  </div>
                </div>

                {/* 三元浆料10h稳定性 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">三元浆料10h稳定性：</h4>

                  {/* Row 1: scatter | 分散均匀性图+表 */}
                  <div className="lfp-stability-2col">
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/nca-stability-scatter.png`} alt="整体无团聚无沉降" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">整体无团聚、无沉降</p>
                    </div>

                    <div className="cp-chart-card lfp-dispersion-card">
                      <div className="lfp-dispersion-inner">
                        <div className="cp-chart-img-wrap">
                          <img src={`${IMG}/nca-dispersion-chart.png`} alt="分散均匀性指数图" className="cp-chart-img" loading="lazy" />
                        </div>
                        <div className="lfp-dispersion-table-wrap">
                          <table className="lfp-dispersion-table">
                            <tbody>
                              <tr className="tr-odd"><td>STDEV.P</td><td className="lfp-dt-val">0.07</td></tr>
                              <tr className="tr-even"><td>AVERAGE</td><td className="lfp-dt-val">1.78</td></tr>
                              <tr className="tr-odd">
                                <td>分散均匀性指数</td>
                                <td className="lfp-dt-val lfp-dt-highlight">0.41</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <p className="cp-chart-caption">分散均匀性指数0.41（＜2为标准）</p>
                    </div>
                  </div>

                  {/* Row 2: TSI 三图合一 */}
                  <div className="cp-chart-card lfp-tsi-combined nca-tsi-combined" style={{ marginTop: 20 }}>
                    <div className="lfp-tsi-inner">
                      <div className="lfp-tsi-col">
                        <div className="cp-chart-img-wrap">
                          <img src={`${IMG}/nca-tsi-dynamic.png`} alt="动力学不稳定性整体" className="cp-chart-img" loading="lazy" />
                        </div>
                      </div>
                      <div className="lfp-tsi-col">
                        <NcaTsiBarChart noCard />
                      </div>
                      <div className="lfp-tsi-col">
                        <div className="cp-chart-img-wrap">
                          <img src={`${IMG}/nca-tsi-position.png`} alt="TSI分层" className="cp-chart-img" loading="lazy" />
                        </div>
                      </div>
                    </div>
                    <p className="cp-chart-caption">整体TSI指数0.09（&lt;0.2为标准）</p>
                  </div>
                </div>

                {/* 三元浆料流变性 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">三元浆料流变性</h4>
                  <div className="tsp-charts-grid-3 nca-rheology-grid">
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/nca-rheology-01.png`} alt="剪切变稀" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">剪切变稀，典型非牛顿流体特征，且过程无剪切突变</p>
                    </div>
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/nca-rheology-02.png`} alt="触变恢复率" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">浆料具备较好的流动性，以及一定的触变恢复率</p>
                    </div>
                  </div>
                </div>

                {/* 三元浆料及电镜 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">三元浆料及电镜</h4>

                  {/* 两张 SEM 主图 */}
                  <div className="tsp-charts-grid-3 lfp-sem-grid">
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/nca-sem-5000x.png`} alt="SEM 5000×" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">5000倍，5μm比例尺</p>
                    </div>
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/nca-sem-20000x.png`} alt="SEM 20000×" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">20000倍，2μm比例尺</p>
                    </div>
                  </div>

                  {/* 说明文字 */}
                  <div className="nca-sem-desc">
                    <h4 className="nca-sem-desc-heading">捏合工艺直接影响电池浆料的品质</h4>
                    <ol className="nca-sem-desc-list">
                      <li>捏合好的浆料经过稀释分散很容易就达到理想状态，并不需要复杂的分散工艺或者较长的分散时间，不破坏活性物质的包覆层及粘结剂特性。</li>
                      <li>下图为正极三元复配材料经管线式捏合罐捏合、稀释后，在PD搅拌机分散后不同时长的电镜图。不同分散时长的极片无差异，电化学等各方面性能均持平。</li>
                    </ol>
                  </div>

                  {/* 4 张分散时长电镜图 */}
                  <div className="cp-charts-grid-4 pp-charts-grid nca-sem-time-grid">
                    {[
                      { src: `${IMG}/nca-sem-1h.png`,  label: '1h' },
                      { src: `${IMG}/nca-sem-2h.png`,  label: '2h' },
                      { src: `${IMG}/nca-sem-3h.png`,  label: '3h' },
                      { src: `${IMG}/nca-sem-4h.png`,  label: '4h' },
                    ].map((item, i) => (
                      <div key={i} className="cp-chart-card nca-sem-time-card">
                        <div className="nca-sem-time-img-wrap">
                          <img src={item.src} alt={`分散${item.label}电镜`} className="cp-chart-img" loading="lazy" />
                          <span className="nca-sem-time-badge">{item.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── 03 石墨体系 ── */}
              <div className="cp-verify-block">
                <h3 className="cp-verify-subheading">
                  <span className="cp-verify-num">03</span>
                  制浆解决方案——石墨体系
                </h3>

                {/* 红运负极管线式工艺验证结果 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">红运负极管线式工艺验证结果</h4>
                  <div className="lfp-result-cards">
                    <div className="lfp-result-card">
                      <p className="lfp-result-card-label">稀释搅拌后未加SBR，未开分散</p>
                      <p className="lfp-result-card-val">10480 <span className="lfp-result-card-unit">mPas</span></p>
                      <p className="lfp-result-card-meta">63# · 6 rpm · 30.3°C</p>
                    </div>
                    <div className="lfp-result-card">
                      <p className="lfp-result-card-label">分散线速度 14.7 m/s，分散时间 20 min</p>
                      <p className="lfp-result-card-val">6490 <span className="lfp-result-card-unit">mPas</span></p>
                      <p className="lfp-result-card-meta">63# · 12 rpm · 26.8°C</p>
                    </div>
                    <div className="lfp-result-card">
                      <p className="lfp-result-card-label">加SBR，分散线速度 8.1 m/s，分散时间 20 min</p>
                      <p className="lfp-result-card-val">5300 <span className="lfp-result-card-unit">mPas</span></p>
                      <p className="lfp-result-card-meta">63# · 12 rpm · 23°C</p>
                      <p className="lfp-result-card-sub">固含量：55.4%（理论值 55.2%）</p>
                    </div>
                  </div>
                </div>

                {/* 石墨浆料20h稳定性 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">石墨浆料20h稳定性</h4>
                  <div className="tsp-charts-grid-3">
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/graphite-stability-scatter.png`} alt="背散射光曲线" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">背散射光曲线稳定，浆料未发生颗粒团聚及沉降现象</p>
                    </div>
                    <div className="cp-chart-card graphite-tsi-compact">
                      <GraphiteTsiBarChart noCard />
                      <p className="cp-chart-caption">整体TSI指数（TSI&lt;0.06），浆料具备较强的稳定性</p>
                    </div>
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/graphite-dispersion.png`} alt="分散均匀性指数" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">分散均匀性指数0.19（＜2为标准），新型管线式制浆机分散性能满足浆料分散需求</p>
                    </div>
                  </div>
                </div>

                {/* 石墨浆料流变性 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">石墨浆料流变性</h4>
                  <div className="cp-chart-card graphite-rheology-card">
                    <div className="tsp-card-dual-imgs">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/graphite-rheology-01.png`} alt="石墨浆料流变性图1" className="cp-chart-img" loading="lazy" />
                      </div>
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/graphite-rheology-02.png`} alt="石墨浆料流变性图2" className="cp-chart-img" loading="lazy" />
                      </div>
                    </div>
                    <p className="cp-chart-caption cp-chart-caption--multi">
                      <span className="cp-chart-caption-item">浆料粘度随剪切速率升高呈降低趋势，且过程无剪切突变，具备非牛顿流体特征</span>
                      <span className="cp-chart-caption-item">浆料的流动性、流平性和触变恢复性高，利于涂布工序</span>
                    </p>
                  </div>
                </div>

                {/* 石墨浆料极片电镜 */}
                <div className="cp-verify-subsection">
                  <h4 className="cp-verify-sub-title">石墨浆料极片电镜</h4>
                  <div className="tsp-charts-grid-3 lfp-sem-grid">
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/graphite-sem-2000x.png`} alt="电镜 2000倍" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">2000倍，10μm比例尺</p>
                    </div>
                    <div className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/graphite-sem-5000x.png`} alt="电镜 5000倍" className="cp-chart-img" loading="lazy" />
                      </div>
                      <p className="cp-chart-caption">5000倍，5μm比例尺</p>
                    </div>
                    <div className="cp-chart-card graphite-sem-text-card">
                      <ol className="graphite-sem-desc-list">
                        <li>石墨颗粒棱角分明，与匀浆前颗粒形貌基本一致。</li>
                        <li>颗粒大小分布均匀，未有团聚现象。</li>
                        <li>炭黑以颗粒状形貌均匀分布在石墨表面。</li>
                      </ol>
                    </div>
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
