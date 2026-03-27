import React, { useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import BentoGallerySection from '../components/BentoGallerySection'
import CustomerCasesSection from '../components/CustomerCasesSection'
import TechInquirySection from '../components/TechInquirySection'
import CoreEquipmentCarousel from '../components/CoreEquipmentCarousel'
import IncludedEquipmentSection from '../components/IncludedEquipmentSection'

/* ── 品牌色常量 ─────────────────────────── */
const RED  = '#BA0C2F'
const DARK = '#1a1a1a'

/* ── 内联 SVG 图标组件（局部元素品牌红） ── */
function DevelopmentIcon() {
  return (
    <svg viewBox="0 0 512 512" className="cp-feat-icon-svg" fill="none">
      {/* 全局循环箭头 — 深色 */}
      <path stroke={DARK} strokeWidth="30" strokeMiterlimit="10" d="M464.758,135.498C485.264,170.947,497,212.103,497,256c0,133.101-107.899,241-241,241c-71.929,0-136.498-31.511-180.655-81.482"/>
      <polyline stroke={DARK} strokeWidth="30" strokeMiterlimit="10" points="135.5,415.408 75.25,415.408 75.25,475.658"/>
      <path stroke={DARK} strokeWidth="30" strokeMiterlimit="10" d="M47.242,376.501C26.736,341.053,15,299.897,15,256C15,122.899,122.899,15,256,15c71.929,0,136.498,31.511,180.655,81.482"/>
      <polyline stroke={DARK} strokeWidth="30" strokeMiterlimit="10" points="376.5,96.592 436.75,96.592 436.75,36.342"/>
      {/* 齿轮机构 — 品牌红 */}
      <path stroke={RED} strokeWidth="30" strokeMiterlimit="10" d="M416.607,286.12c1.69-9.79,2.57-19.85,2.57-30.12s-0.88-20.33-2.57-30.12h-29.123c-3.41-14.947-9.306-28.944-17.225-41.543l20.605-20.605c-5.728-8.118-12.219-15.853-19.481-23.115s-14.998-13.753-23.115-19.481l-20.605,20.605c-12.599-7.919-26.597-13.816-41.543-17.225V95.393c-9.79-1.69-19.85-2.57-30.12-2.57s-20.33,0.88-30.12,2.57v29.123c-14.947,3.41-28.944,9.307-41.543,17.225l-20.605-20.605c-8.118,5.728-15.853,12.219-23.115,19.481s-13.753,14.998-19.481,23.115l20.605,20.605c-7.919,12.599-13.816,26.597-17.225,41.543H95.393c-1.69,9.79-2.57,19.85-2.57,30.12s0.88,20.33,2.57,30.12h29.123c3.41,14.947,9.307,28.944,17.225,41.543l-20.605,20.605c5.728,8.118,12.219,15.853,19.481,23.115s14.998,13.753,23.115,19.481l20.605-20.605c12.599,7.919,26.597,13.816,41.543,17.225v29.123c9.79,1.69,19.85,2.57,30.12,2.57s20.33-0.88,30.12-2.57v-29.123c14.947-3.41,28.944-9.307,41.543-17.225l20.605,20.605c8.118-5.728,15.853-12.219,23.115-19.481s13.753-14.998,19.481-23.115l-20.605-20.605c7.919-12.599,13.816-26.597,17.225-41.543H416.607z"/>
      {/* 中心圆 — 品牌红 */}
      <circle stroke={RED} strokeWidth="30" strokeMiterlimit="10" cx="256" cy="256" r="73.342"/>
    </svg>
  )
}

function CleanAirIcon() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 云朵主体 — 品牌红 */}
        <g transform="translate(256,240)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 38.66,0 70,31.34 70,70 0,38.66 -31.34,70 -70,70 -0.616,0 -1.226,-0.03 -1.838,-0.046 C -8.907,179.762 -43.661,210 -85.5,210 c -41.839,0 -76.592,-30.238 -83.662,-70.046 -0.612,0.016 -1.221,0.046 -1.838,0.046 -38.66,0 -70,-31.34 -70,-70 0,-38.66 31.34,-70 70,-70 h 326.5 c 47.22,0 85.5,38.28 85.5,85.5 0,47.22 -38.28,85.5 -85.5,85.5 -0.687,0 -1.365,-0.036 -2.048,-0.052 C 144.948,219.832 102.316,257 51,257 9.834,257 -25.724,233.07 -42.578,198.373"/>
        </g>
        {/* 管道线条 — 深色 */}
        <g transform="translate(0,105)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 H 411.5"/>
        </g>
        <g transform="translate(497,210)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 C 0,-24.853 -20.147,-45 -45,-45 H -497"/>
        </g>
        <g transform="translate(497,0)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 C 0,24.853 -20.147,45 -45,45 H -497"/>
        </g>
        <g transform="translate(326,0)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 C 0,24.853 -20.147,45 -45,45"/>
        </g>
      </g>
    </svg>
  )
}

function ConnectIcon() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 中心主圆 — 品牌红 */}
        <g transform="translate(256,196)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c -33.091,0 -60,26.909 -60,60 0,33.091 26.909,60 60,60 C 33.091,120 60,93.091 60,60 60,26.909 33.091,0 0,0 Z"/>
        </g>
        {/* 上连接节点 */}
        <g transform="translate(286,467)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z"/>
        </g>
        <g transform="translate(256,437)"><path stroke={DARK} strokeWidth="30" d="M 0,0 V -121"/></g>
        {/* 下连接节点 */}
        <g transform="translate(286,45)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 0,16.568 -13.432,30 -30,30 -16.568,0 -30,-13.432 -30,-30 0,-16.568 13.432,-30 30,-30 16.568,0 30,13.432 30,30 z"/>
        </g>
        <g transform="translate(256,75)"><path stroke={DARK} strokeWidth="30" d="M 0,0 V 121"/></g>
        {/* 左连接节点 */}
        <g transform="translate(45,286)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 16.568,0 30,-13.432 30,-30 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 z"/>
        </g>
        <g transform="translate(75,256)"><path stroke={DARK} strokeWidth="30" d="M 0,0 H 121"/></g>
        {/* 右连接节点 */}
        <g transform="translate(467,286)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c -16.568,0 -30,-13.432 -30,-30 0,-16.568 13.432,-30 30,-30 16.568,0 30,13.432 30,30 C 30,-13.432 16.568,0 0,0 Z"/>
        </g>
        <g transform="translate(437,256)"><path stroke={DARK} strokeWidth="30" d="M 0,0 H -121"/></g>
        {/* 四角节点 */}
        <g transform="translate(106,436)"><path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z"/></g>
        <g transform="translate(106,76)"><path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z"/></g>
        <g transform="translate(466,436)"><path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z"/></g>
        <g transform="translate(466,76)"><path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z"/></g>
        {/* 对角连线 */}
        <g transform="translate(97.2129,414.7866)"><path stroke={DARK} strokeWidth="30" d="M 0,0 116.378,-116.377"/></g>
        <g transform="translate(213.5908,213.5908)"><path stroke={DARK} strokeWidth="30" d="M 0,0 -116.378,-116.377"/></g>
        <g transform="translate(298.4092,213.5908)"><path stroke={DARK} strokeWidth="30" d="M 0,0 116.378,-116.377"/></g>
        <g transform="translate(414.7871,414.7866)"><path stroke={DARK} strokeWidth="30" d="M 0,0 -116.378,-116.377"/></g>
      </g>
    </svg>
  )
}

const features = [
  {
    Icon: DevelopmentIcon,
    title: '专业的气力输送设计团队，提供精准输送参数',
    desc: '专业设计团队根据物料特性量身定制输送方案，精准计算输送参数，确保输送过程物料损耗极低。',
  },
  {
    Icon: CleanAirIcon,
    title: '全密闭式管道输送，无尘、不易泄露',
    desc: '全密闭管道设计杜绝粉尘外溢与物料泄漏，为操作人员提供洁净安全的生产工作环境。',
  },
  {
    Icon: ConnectIcon,
    title: '清管装置配合双层管设计，降低粘壁堵管风险',
    desc: '入料口采用清管装置，配合双层管道设计，有效降低高粘性物料粘壁及堵管风险，系统运行更稳定。',
  },
]

const appIndustries = [
  { img: '/ref-images/image_20221013_1665651453_108062.jpg', name: '正极材料' },
  { img: '/ref-images/image_20221001_1664622305_817454.png', name: '环保涂料' },
  { img: '/ref-images/image_20221014_1665728760_894348.jpg', name: '电线电缆' },
  { img: '/ref-images/image_20221001_1664622330_151570.png', name: '日用化学品' },
  { img: '/ref-images/image_20221014_1665728867_252839.jpg', name: '聚氨酯制品' },
  { img: '/ref-images/image_20221014_1665728875_924017.jpg', name: '高分子材料' },
  { img: '/ref-images/image_20221001_1664622352_54233.png', name: '无机材料' },
  { img: '/ref-images/image_20221014_1665728800_100713.jpg', name: '改性塑料' },
  { img: '/ref-images/image_20221001_1664622421_415088.png', name: '石油化工' },
  { img: '/ref-images/image_20221013_1665651495_299237.jpg', name: '负极材料' },
  { img: '/ref-images/image_20221015_1665801977_723502.jpg', name: '电池匀浆' },
]

const coreEquipment = [
  { name: '吨袋解包站', img: '/ref-images/image_20221014_1665732359_503939.png' },
  { name: '小袋解包站', img: '/ref-images/image_20240118_1705565893_80363.png' },
  { name: '集成式吨袋包装机', img: '/ref-images/image_20240102_1704158599_941438.png' },
  { name: 'FFS重膜包装机', img: '/ref-images/image_20241206_1733452669_188551.png' },
]

const includedEquipment = [
  { name: '正压稀相气力输送', img: '/ref-images/image_20221104_1667522586_485596.png' },
  { name: '正压密相气力输送', img: '/ref-images/image_20221104_1667522601_305653.png' },
  { name: '负压稀相气力输送', img: '/ref-images/image_20221104_1667522615_683133.png' },
  { name: '氮气循环气力输送', img: '/ref-images/image_20221104_1667522627_363698.png' },
]

const customerCases = [
  {
    tag: '工程案例 · 新能源',
    client: '河南某知名集团锂电池公司',
    desc: '河南**新能源股份有限公司专业从事高性能二次电池材料的研发、生产和销售，是中国化学与物理电源行业协会副理事长单位。气力输送系统助力全流程无尘自动化输送，物料损耗大幅降低。',
    img: '/ref-images/image_20221014_1665711961_98396.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 高分子材料',
    client: '安庆某尼龙材料企业',
    desc: '安庆**尼龙材料科技有限公司一家生产BOPA薄膜的制造型企业，计划投资5.1亿元，达产后年产BOPA薄膜2.5万吨。',
    img: '/ref-images/image_20221014_1665712980_529731.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 化工',
    client: '浙江某化工集团',
    desc: '**化学集团是一家全球化的功能化学公司，重点聚焦纺织、造纸、塑料与建筑四大行业。',
    img: '/ref-images/image_20221014_1665712966_182878.jpg',
    metrics: [],
  },
]

export default function PneumaticConveyingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="cp-sol-hero cp-sol-hero--sc">
        <div className="cp-sol-hero-img-full">
          <img
            src="/assets/气力输送系统.jpg"
            alt="气力输送系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: '新能源行业', path: '/solutions#new-energy' },
            { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
            { label: '气力输送系统' },
          ]} />
        </div>
      </section>

      <div className="page-body">
        {/* ===== 系统介绍 ===== */}
        <section className="page-section cp-intro-section">
          <div className="page-container">
            <div className="cp-sol-hero-tag-row fade-up">
              <span className="cp-sol-hero-industry">新能源行业</span>
              <span className="cp-sol-hero-sep">·</span>
              <span className="cp-sol-hero-type">高效循环制浆系统</span>
            </div>
            <h1 className="cp-sol-hero-title fade-up fade-up-delay-1">气力输送系统</h1>
            <p className="cp-intro-desc fade-up fade-up-delay-2">
              气力输送系统采用正压稀相输送原理，实现粉体原料从储仓到制浆机的全密闭自动化输送。专业团队精准设计输送参数，配备清管装置防止堵管，全程无尘、无泄漏，保障粉体输送品质与生产安全。
            </p>
            <div className="cp-sol-hero-pills fade-up fade-up-delay-3">
              <span>全密闭输送</span>
              <span>物料损耗低</span>
              <span>清管防堵</span>
              <span>无尘无泄漏</span>
            </div>
          </div>
        </section>

        {/* ===== 系统特点 ===== */}
        <SystemFeaturesSection features={features} />

        {/* ===== 应用行业 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading section-heading--center fade-up">应用行业</h2>
            <div className="sc-app-industry-grid">
              {appIndustries.map((item, i) => (
                <div key={i} className={`sc-app-industry-card fade-up fade-up-delay-${(i % 4) + 1}`}>
                  <img src={item.img} alt={item.name} className="sc-app-industry-img" loading="lazy" />
                  <div className="sc-app-industry-label">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 系统展示（占位符）===== */}
        <BentoGallerySection title="系统展示" grayBg={false} images={[]} />

        {/* ===== 核心设备 ===== */}
        <CoreEquipmentCarousel items={coreEquipment} grayBg={true} />

        {/* ===== 包含设备 ===== */}
        <IncludedEquipmentSection items={includedEquipment} grayBg={false} />

        {/* ===== 客户案例 ===== */}
        <CustomerCasesSection cases={customerCases} />

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
