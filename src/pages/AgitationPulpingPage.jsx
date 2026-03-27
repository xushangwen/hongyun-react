import React, { useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import BentoGallerySection from '../components/BentoGallerySection'
import CustomerCasesSection from '../components/CustomerCasesSection'
import TechInquirySection from '../components/TechInquirySection'
import CoreEquipmentCarousel from '../components/CoreEquipmentCarousel'

/* ── 品牌色常量 ─────────────────────────── */
const RED  = '#BA0C2F'
const DARK = '#1a1a1a'

/* ── 内联 SVG 图标组件（局部元素品牌红） ── */

/* 瞄准镜 — 产品一致性更好，适用固含量更高 */
function TargetIcon() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 对角连线 — 深色 */}
        <g transform="translate(225.0479,225.0479)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 128.188,128.188" />
        </g>
        {/* 箭头 — 深色 */}
        <g transform="translate(427.5996,484.2139)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 -85.088,-85.089 10.724,-45.889 45.89,-10.724 85.088,85.088 -42.46,14.154 z" />
        </g>
        {/* 内心圆 — 品牌红 */}
        <g transform="translate(285.0957,225.0479)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 0,-33.164 -26.884,-60.048 -60.048,-60.048 -33.163,0 -60.048,26.884 -60.048,60.048 0,33.164 26.885,60.048 60.048,60.048 C -26.884,60.048 0,33.164 0,0 Z" />
        </g>
        {/* 中圆 — 深色 */}
        <g transform="translate(360.0957,225.0479)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 0,-74.492 -60.556,-135.048 -135.048,-135.048 -74.492,0 -135.048,60.556 -135.048,135.048 0,74.492 60.556,135.048 135.048,135.048 C -60.556,135.048 0,74.492 0,0 Z" />
        </g>
        {/* 外弧（缺口）— 深色 */}
        <g transform="translate(399.1255,342.5122)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 22.702,-33.545 35.97,-73.978 35.97,-117.464 0,-115.862 -94.186,-210.048 -210.048,-210.048 -115.861,0 -210.047,94.186 -210.047,210.048 0,115.861 94.186,210.047 210.047,210.047 43.449,0 83.849,-13.245 117.377,-35.911" />
        </g>
      </g>
    </svg>
  )
}

/* 闪电/循环 — 系统能耗更低，有助于降低生产成本 */
function EnergyIcon() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 内圆 — 深色 */}
        <g transform="translate(256,106)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c -82.705,0 -150,67.295 -150,150 0,82.705 67.295,150 150,150 82.705,0 150,-67.295 150,-150 C 150,67.295 82.705,0 0,0 Z" />
        </g>
        {/* 外循环弧 1 — 深色 */}
        <g transform="translate(147.2979,470.5332)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 90.265,46.4 203.789,31.791 279.407,-43.828 93.727,-93.725 93.727,-245.685 0,-339.411" />
        </g>
        {/* 外循环弧 2 — 深色 */}
        <g transform="translate(364.7021,41.4668)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c -90.265,-46.4 -203.79,-31.791 -279.408,43.828 -93.726,93.725 -93.726,245.685 0,339.411" />
        </g>
        {/* 箭头转角 1 — 深色 */}
        <g transform="translate(85.2939,361.0659)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 V 63.64 H -63.64" />
        </g>
        {/* 箭头转角 2 — 深色 */}
        <g transform="translate(426.7051,150.9341)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 V -63.64 H 63.64" />
        </g>
        {/* 闪电 — 品牌红 */}
        <g transform="translate(256,166)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 30,90 H -30 L 0,180" />
        </g>
      </g>
    </svg>
  )
}

/* 罗盘/仪表 — 系统型号多样，突破产能瓶颈 */
function ProductivityIcon() {
  const tick = { stroke: DARK, strokeWidth: '30', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '10' }
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 外大圆 — 深色 */}
        <g transform="translate(465.9854,256)">
          <path {...tick} stroke={DARK}
            d="m 0,0 c 0,-115.98 -94.02,-210 -210,-210 -115.979,0 -210,94.02 -210,210 0,115.98 94.021,210 210,210 C -94.02,210 0,115.98 0,0 Z" />
        </g>
        {/* 新月弧形 — 深色 */}
        <g transform="translate(192.3745,192.3892)">
          <path {...tick} stroke={DARK}
            d="m 0,0 c -16.296,16.296 -26.389,38.796 -26.389,63.611 0,49.629 40.371,90 90,90 49.629,0 90,-40.371 90,-90 0,-24.815 -10.093,-47.315 -26.389,-63.611 l 42.403,-42.404 c 27.163,27.162 43.986,64.662 43.986,106.015 0,82.705 -67.295,150 -150,150 -82.705,0 -150,-67.295 -150,-150 0,-41.353 16.824,-78.853 43.986,-106.015 z" />
        </g>
        {/* 中心圆 — 品牌红 */}
        <g transform="translate(285.9854,256)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 0,-16.568 -13.431,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.431,30 0,16.568 0,0 Z" />
        </g>
        {/* 指针 — 品牌红 */}
        <g transform="translate(279.9873,274.001)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 95.998,71.999" />
        </g>
        {/* 刻度线 — 深色 */}
        <g transform="translate(255.9854,406)"><path {...tick} d="M 0,0 V -60" /></g>
        <g transform="translate(155.2227,364.2627)"><path {...tick} d="M 0,0 42.427,-42.426" /></g>
        <g transform="translate(106.1709,263.5)"><path {...tick} d="M 0,0 H 60.124" /></g>
        <g transform="translate(345.6758,263.5)"><path {...tick} d="M 0,0 H 60.125" /></g>
        <g transform="translate(255.9854,512)"><path {...tick} d="M 0,0 V -46" /></g>
        <g transform="translate(255.9854,46)"><path {...tick} d="M 0,0 V -46" /></g>
        <g transform="translate(128.4858,476.8364)"><path {...tick} d="M 0,0 22.5,-38.971" /></g>
        <g transform="translate(360.9854,74.1348)"><path {...tick} d="M 0,0 22.5,-38.971" /></g>
        <g transform="translate(35.1489,383.5)"><path {...tick} d="M 0,0 38.971,-22.5" /></g>
        <g transform="translate(437.8506,151)"><path {...tick} d="M 0,0 38.972,-22.5" /></g>
        <g transform="translate(-0.0142,256)"><path {...tick} d="M 0,0 H 46" /></g>
        <g transform="translate(465.9854,256)"><path {...tick} d="M 0,0 H 46" /></g>
        <g transform="translate(35.1489,128.5)"><path {...tick} d="M 0,0 38.971,22.5" /></g>
        <g transform="translate(437.8506,361)"><path {...tick} d="M 0,0 38.972,22.5" /></g>
        <g transform="translate(128.4854,35.1636)"><path {...tick} d="M 0,0 22.5,38.971" /></g>
        <g transform="translate(360.9854,437.8652)"><path {...tick} d="M 0,0 22.5,38.971" /></g>
      </g>
    </svg>
  )
}

/* 盾牌 — 金属 Particle 控制更佳 */
function ShieldIcon() {
  return (
    <svg viewBox="0 0 512.145 512.145" className="cp-feat-icon-svg" fill="none">
      {/* 外盾 — 深色 */}
      <path stroke={DARK} strokeWidth="30" strokeMiterlimit="10"
        d="M350.994,427.388l-94.887,66.446l-94.926-66.448c-55.77-39.039-88.985-102.834-88.985-170.91V87.616l183.877-71.521l183.877,71.521V256.5C439.949,324.563,406.747,388.347,350.994,427.388z" />
      {/* 内盾 — 品牌红 */}
      <path stroke={RED} strokeWidth="30" strokeMiterlimit="10"
        d="M318.941,369.164l-62.845,44.008l-62.871-44.01c-36.938-25.856-58.936-68.108-58.936-113.196V134.111l121.785-47.37l121.785,47.37v121.87C377.857,301.061,355.867,343.306,318.941,369.164z" />
      {/* 勾选符号 — 品牌红 */}
      <polyline stroke={RED} strokeWidth="30" strokeMiterlimit="10"
        points="321.735,206.529 241.986,286.278 190.41,234.701" />
    </svg>
  )
}

/* S 曲线 — 通过设计优化，降低设备投资与运营成本 */
function FluctuationIcon() {
  return (
    <svg viewBox="0 0 512 512" className="cp-feat-icon-svg">
      {/* 横轴 — 深色 */}
      <path fill={DARK} d="m0 240.941h512v30.117h-512z" />
      {/* 纵轴 — 深色 */}
      <path fill={DARK} d="m240.941 0h30.117v512h-30.117z" />
      {/* 上升 S 段 — 深色 */}
      <path fill={DARK} d="m271.059 256h-30.118c0-115.367-40.673-195.765-77.176-195.765s-77.177 80.398-77.177 195.765h-30.117c0-58.344 10.042-113.431 28.277-155.111 19.967-45.638 48.029-70.771 79.017-70.771s59.05 25.134 79.017 70.771c18.235 41.681 28.277 96.767 28.277 155.111z" />
      {/* 下降 S 段 — 品牌红（表示成本下降趋势） */}
      <path fill={RED} d="m348.235 481.882c-30.988 0-59.05-25.134-79.017-70.771-18.235-41.68-28.277-96.766-28.277-155.11h30.117c0 115.367 40.674 195.765 77.177 195.765s77.177-80.399 77.177-195.766h30.117c0 58.345-10.042 113.431-28.277 155.11-19.967 45.638-48.028 70.772-79.017 70.772z" />
      {/* 右侧刻度 — 深色 */}
      <path fill={DARK} d="m301.177 30.118h105.411v30.118h-105.411z" />
      <path fill={DARK} d="m436.706 30.118h30.117v30.117h-30.117z" />
      <path fill={DARK} d="m301.177 90.353h105.411v30.118h-105.411z" />
      <path fill={DARK} d="m436.706 90.353h30.117v30.117h-30.117z" />
      <path fill={DARK} d="m301.177 150.588h105.411v30.118h-105.411z" />
      <path fill={DARK} d="m436.706 150.588h30.117v30.117h-30.117z" />
    </svg>
  )
}

/* 气流云 — 性能稳定，无排料堵料、过载等问题 */
function CleanAirIcon() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 云朵形状 — 深色 */}
        <g transform="translate(256,240)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 38.66,0 70,31.34 70,70 0,38.66 -31.34,70 -70,70 -0.616,0 -1.226,-0.03 -1.838,-0.046 C -8.907,179.762 -43.661,210 -85.5,210 c -41.839,0 -76.592,-30.238 -83.662,-70.046 -0.612,0.016 -1.221,0.046 -1.838,0.046 -38.66,0 -70,-31.34 -70,-70 0,-38.66 31.34,-70 70,-70 h 326.5 c 47.22,0 85.5,38.28 85.5,85.5 0,47.22 -38.28,85.5 -85.5,85.5 -0.687,0 -1.365,-0.036 -2.048,-0.052 C 144.948,219.832 102.316,257 51,257 9.834,257 -25.724,233.07 -42.578,198.373" />
        </g>
        {/* 气流线（短） — 深色 */}
        <g transform="translate(0,105)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 H 411.5" />
        </g>
        {/* 气流线（长弧上）— 品牌红 */}
        <g transform="translate(497,210)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="M 0,0 C 0,-24.853 -20.147,-45 -45,-45 H -497" />
        </g>
        {/* 气流线（长弧下）— 品牌红 */}
        <g transform="translate(497,0)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="M 0,0 C 0,24.853 -20.147,45 -45,45 H -497" />
        </g>
        {/* 气流线（短弧）— 深色 */}
        <g transform="translate(326,0)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="M 0,0 C 0,24.853 -20.147,45 -45,45" />
        </g>
      </g>
    </svg>
  )
}

/* ── 系统特点数据 ─────────────────────────── */
const features = [
  {
    Icon: TargetIcon,
    title: '产品一致性更好，适用固含量更高',
    desc: '满足高品质电池浆料的生产需求，批次间稳定性卓越，适用固含量范围更宽，品质更稳定。',
  },
  {
    Icon: EnergyIcon,
    title: '系统能耗更低，有助于降低生产成本',
    desc: '优化传动结构与分散工艺，在保证制浆品质的同时显著降低单位能耗，为客户持续节约生产成本。',
  },
  {
    Icon: ProductivityIcon,
    title: '系统型号多样，突破产能瓶颈',
    desc: '覆盖实验室到 GWh 量产全系列规格，满足不同阶段产能扩张需求，满足大规模生产要求。',
  },
  {
    Icon: ShieldIcon,
    title: '金属 Particle 控制更佳',
    desc: '全流程密封设计，有效控制磁性金属异物引入，保障浆料洁净度，满足高品质电芯生产要求。',
  },
  {
    Icon: FluctuationIcon,
    title: '通过设计优化，降低设备投资与运营成本',
    desc: '模块化结构简化维护流程，减少停机时间，综合 TCO 大幅下降，提升整体投资回报率。',
  },
  {
    Icon: CleanAirIcon,
    title: '性能稳定，无排料堵料、过载等问题',
    desc: '针对高粘度浆料优化的结构设计，长期运行稳定可靠，彻底解决排料堵料、过载等常见故障。',
  },
]

/* ── 核心设备数据 ─────────────────────────── */
const coreEquipment = [
  { name: '双行星动力搅拌机', img: '/ref-images/image_20240117_1705480936_405786.png' },
  { name: '双螺杆连续制浆机', img: '/ref-images/image_20240117_1705478717_273925.png' },
]

/* ── 客户案例数据 ─────────────────────────── */
const customerCases = [
  {
    tag: '工程案例 · 新能源',
    client: '河南某知名集团锂电池公司',
    desc: '河南**新能源股份有限公司专业从事高性能二次电池材料的研发、生产和销售，是中国化学与物理电源行业协会副理事长单位，设有国家级企业技术中心、博士后科研工作站等多个高水平研发平台。',
    img: '/ref-images/image_20221014_1665711961_98396.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 高分子材料',
    client: '安庆某尼龙材料企业',
    desc: '安庆**尼龙材料科技有限公司一家生产双向拉伸聚酰胺（BOPA)薄膜的制造型企业，注册资金2.3亿元，计划投资5.1亿元，达产后年产BOPA薄膜2.5万吨，产值10亿元。',
    img: '/ref-images/image_20221014_1665712980_529731.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 化工',
    client: '浙江某化工集团',
    desc: '**化学集团是一家全球化的功能化学公司，重点聚焦纺织、造纸、塑料与建筑四大行业，以领先的化学解决方案让基底界面更卓越，致力于成为功能化学领域的全球专家。',
    img: '/ref-images/image_20221014_1665712966_182878.jpg',
    metrics: [],
  },
]

export default function AgitationPulpingPage() {
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
            src="/assets/搅拌制浆系统.jpg"
            alt="搅拌制浆系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: '新能源行业', path: '/solutions#new-energy' },
            { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
            { label: '搅拌制浆系统' },
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
            <h1 className="cp-sol-hero-title fade-up fade-up-delay-1">搅拌制浆系统</h1>
            <p className="cp-intro-desc fade-up fade-up-delay-2">
              宏工科技推出的高效制浆系统、双行星搅拌机等制浆设备，可运用于新能源、硅胶、胶粘剂、涂料等浆料制备，覆盖从实验室到 GWh 量产全系列规格，无堵料、低能耗、金属污染严格管控。
            </p>
            <div className="cp-sol-hero-pills fade-up fade-up-delay-3">
              <span>高固含量</span>
              <span>多型号适配</span>
              <span>低能耗</span>
              <span>无金属污染</span>
              <span>性能稳定</span>
            </div>
          </div>
        </section>

        {/* ===== 系统特点 ===== */}
        <SystemFeaturesSection features={features} />

        {/* ===== 系统展示 ===== */}
        <BentoGallerySection title="系统展示" grayBg={false} images={[]} />

        {/* ===== 核心设备 ===== */}
        <CoreEquipmentCarousel items={coreEquipment} grayBg={true} />

        {/* ===== 客户案例 ===== */}
        <CustomerCasesSection cases={customerCases} />

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
