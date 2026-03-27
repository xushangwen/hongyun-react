import React, { useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import BentoGallerySection from '../components/BentoGallerySection'
import CustomerCasesSection from '../components/CustomerCasesSection'
import TechInquirySection from '../components/TechInquirySection'
import IncludedEquipmentSection from '../components/IncludedEquipmentSection'

/* ── 品牌色常量 ─────────────────────────── */
const RED  = '#BA0C2F'
const DARK = '#1a1a1a'

/* ── 内联 SVG 图标组件（局部元素品牌红） ── */

/* 靶心/精准 — 清除管道内浆料沉积，预防管道堵塞 */
function TargetIcon() {
  const s = { fill: 'none', strokeWidth: '30', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '10' }
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 瞄准对角线 — 品牌红 */}
        <g transform="translate(225.0479,225.0479)">
          <path {...s} stroke={RED} d="M 0,0 128.188,128.188" />
        </g>
        {/* 放大镜/笔形体 — 深色 */}
        <g transform="translate(427.5996,484.2139)">
          <path {...s} stroke={DARK} d="m 0,0 -85.088,-85.089 10.724,-45.889 45.89,-10.724 85.088,85.088 -42.46,14.154 z" />
        </g>
        {/* 内圆（靶心）— 品牌红 */}
        <g transform="translate(285.0957,225.0479)">
          <path {...s} stroke={RED} d="m 0,0 c 0,-33.164 -26.884,-60.048 -60.048,-60.048 -33.163,0 -60.048,26.884 -60.048,60.048 0,33.164 26.885,60.048 60.048,60.048 C -26.884,60.048 0,33.164 0,0 Z" />
        </g>
        {/* 中圆 — 深色 */}
        <g transform="translate(360.0957,225.0479)">
          <path {...s} stroke={DARK} d="m 0,0 c 0,-74.492 -60.556,-135.048 -135.048,-135.048 -74.492,0 -135.048,60.556 -135.048,135.048 0,74.492 60.556,135.048 135.048,135.048 C -60.556,135.048 0,74.492 0,0 Z" />
        </g>
        {/* 外大弧（不完整）— 深色 */}
        <g transform="translate(399.1255,342.5122)">
          <path {...s} stroke={DARK} d="m 0,0 c 22.702,-33.545 35.97,-73.978 35.97,-117.464 0,-115.862 -94.186,-210.048 -210.048,-210.048 -115.861,0 -210.047,94.186 -210.047,210.048 0,115.861 94.186,210.047 210.047,210.047 43.449,0 83.849,-13.245 117.377,-35.911" />
        </g>
      </g>
    </svg>
  )
}

/* 速度计 — 管道中端及末端回收产品，自动回收清管球 */
function ProductivityIcon() {
  const s = { fill: 'none', strokeWidth: '30', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '10' }
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 外大圆 — 深色 */}
        <g transform="translate(465.9854,256)">
          <path {...s} stroke={DARK} d="m 0,0 c 0,-115.98 -94.02,-210 -210,-210 -115.979,0 -210,94.02 -210,210 0,115.98 94.021,210 210,210 C -94.02,210 0,115.98 0,0 Z" />
        </g>
        {/* 内盾弧（量程弧）— 深色 */}
        <g transform="translate(192.3745,192.3892)">
          <path {...s} stroke={DARK} d="m 0,0 c -16.296,16.296 -26.389,38.796 -26.389,63.611 0,49.629 40.371,90 90,90 49.629,0 90,-40.371 90,-90 0,-24.815 -10.093,-47.315 -26.389,-63.611 l 42.403,-42.404 c 27.163,27.162 43.986,64.662 43.986,106.015 0,82.705 -67.295,150 -150,150 -82.705,0 -150,-67.295 -150,-150 0,-41.353 16.824,-78.853 43.986,-106.015 z" />
        </g>
        {/* 中心小圆（转轴）— 品牌红 */}
        <g transform="translate(285.9854,256)">
          <path {...s} stroke={RED} d="m 0,0 c 0,-16.568 -13.431,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.431,30 0,16.568 0,0 Z" />
        </g>
        {/* 指针 — 品牌红 */}
        <g transform="translate(279.9873,274.001)">
          <path {...s} stroke={RED} d="M 0,0 95.998,71.999" />
        </g>
        {/* 刻度线：上 */}
        <g transform="translate(255.9854,406)"><path {...s} stroke={DARK} d="M 0,0 V -60" /></g>
        <g transform="translate(255.9854,512)"><path {...s} stroke={DARK} d="M 0,0 V -46" /></g>
        <g transform="translate(255.9854,46)"><path {...s} stroke={DARK} d="M 0,0 V -46" /></g>
        {/* 刻度线：斜向 */}
        <g transform="translate(155.2227,364.2627)"><path {...s} stroke={DARK} d="M 0,0 42.427,-42.426" /></g>
        <g transform="translate(106.1709,263.5)"><path {...s} stroke={DARK} d="M 0,0 H 60.124" /></g>
        <g transform="translate(345.6758,263.5)"><path {...s} stroke={DARK} d="M 0,0 H 60.125" /></g>
        <g transform="translate(128.4858,476.8364)"><path {...s} stroke={DARK} d="M 0,0 22.5,-38.971" /></g>
        <g transform="translate(360.9854,74.1348)"><path {...s} stroke={DARK} d="M 0,0 22.5,-38.971" /></g>
        <g transform="translate(35.1489,383.5)"><path {...s} stroke={DARK} d="M 0,0 38.971,-22.5" /></g>
        <g transform="translate(437.8506,151)"><path {...s} stroke={DARK} d="M 0,0 38.972,-22.5" /></g>
        <g transform="translate(-0.0142,256)"><path {...s} stroke={DARK} d="M 0,0 H 46" /></g>
        <g transform="translate(465.9854,256)"><path {...s} stroke={DARK} d="M 0,0 H 46" /></g>
        <g transform="translate(35.1489,128.5)"><path {...s} stroke={DARK} d="M 0,0 38.971,22.5" /></g>
        <g transform="translate(437.8506,361)"><path {...s} stroke={DARK} d="M 0,0 38.972,22.5" /></g>
        <g transform="translate(128.4854,35.1636)"><path {...s} stroke={DARK} d="M 0,0 22.5,38.971" /></g>
        <g transform="translate(360.9854,437.8652)"><path {...s} stroke={DARK} d="M 0,0 22.5,38.971" /></g>
      </g>
    </svg>
  )
}

/* 笔记本 — 空气/工艺产品推球，匀速控制，在线追踪 */
function LaptopIcon() {
  return (
    <svg viewBox="0 0 512 512" className="cp-feat-icon-svg">
      {/* 笔记本外框及键盘区 — 深色 */}
      <path fill={DARK} d="M509.297,432L472,245.516V0H40v245.516L2.703,432H0v80h512v-80H509.297z M70,30h372v202H70V30z M67.297,262h377.406l34,170H33.297L67.297,262z M482,482H30v-20h452V482z"/>
      {/* 屏幕代码符号 &lt;/&gt; — 品牌红 */}
      <rect fill={RED} x="193.735" y="121.863" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -20.8368 223.4203)" width="131.079" height="30"/>
      <polygon fill={RED} points="176.292,96.87 155.467,75.274 98.391,130.313 155.467,185.352 176.292,163.756 141.609,130.313"/>
      <polygon fill={RED} points="356.533,75.274 335.708,96.87 370.391,130.313 335.708,163.756 356.533,185.352 413.609,130.313"/>
      {/* 键盘像素点 — 深色 */}
      <rect fill={DARK} x="180" y="382" width="152" height="30"/>
      <rect fill={DARK} x="352" y="382" width="30" height="30"/>
      <rect fill={DARK} x="402" y="382" width="30" height="30"/>
      <rect fill={DARK} x="80"  y="382" width="30" height="30"/>
      <rect fill={DARK} x="130" y="382" width="30" height="30"/>
      <rect fill={DARK} x="216" y="332" width="30" height="30"/>
      <rect fill={DARK} x="266" y="332" width="30" height="30"/>
      <rect fill={DARK} x="316" y="332" width="30" height="30"/>
      <rect fill={DARK} x="366" y="332" width="30" height="30"/>
      <rect fill={DARK} x="116" y="332" width="30" height="30"/>
      <rect fill={DARK} x="166" y="332" width="30" height="30"/>
      <rect fill={DARK} x="91"  y="282" width="30" height="30"/>
      <rect fill={DARK} x="141" y="282" width="30" height="30"/>
      <rect fill={DARK} x="191" y="282" width="30" height="30"/>
      <rect fill={DARK} x="241" y="282" width="30" height="30"/>
      <rect fill={DARK} x="291" y="282" width="30" height="30"/>
      <rect fill={DARK} x="341" y="282" width="30" height="30"/>
      <rect fill={DARK} x="391" y="282" width="30" height="30"/>
    </svg>
  )
}

/* 均衡器 — 配套气力输送管道除尘，中央除尘+单点除尘 */
function FilterIcon() {
  const s = { fill: 'none', strokeLinecap: 'square', strokeLinejoin: 'miter', strokeMiterlimit: '10', strokeWidth: '30' }
  const dk = { ...s, stroke: DARK }
  const rd = { ...s, stroke: RED  }
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 左侧滑块（低位）— 深色 */}
        <path {...dk} d="m 105.5,75 h -60 v 60 h 60 z" />
        <g transform="translate(75.5,135)"><path {...dk} d="M 0,0 V 362" /></g>
        <g transform="translate(75.5,15)"><path {...dk} d="M 0,0 V 60" /></g>
        {/* 右侧滑块（低位）— 深色 */}
        <path {...dk} d="m 466.5,75 h -60 v 60 h 60 z" />
        <g transform="translate(436.5,135)"><path {...dk} d="M 0,0 V 362" /></g>
        <g transform="translate(436.5,15)"><path {...dk} d="M 0,0 V 60" /></g>
        {/* 中间滑块（代表除尘调节）— 品牌红 */}
        <path {...rd} d="m 346.5,215 h -60 v 60 h 60 z" />
        <g transform="translate(316.5,275)"><path {...rd} d="M 0,0 V 222" /></g>
        <g transform="translate(316.5,15)"><path {...rd} d="M 0,0 V 200" /></g>
        {/* 高位滑块（左高）— 深色 */}
        <path {...dk} d="m 225.5,383.348 h -60 v 60 h 60 z" />
        <g transform="translate(195.5,443.3477)"><path {...dk} d="M 0,0 V 53.652" /></g>
        <g transform="translate(195.5,15)"><path {...dk} d="M 0,0 V 368.348" /></g>
      </g>
    </svg>
  )
}

/* 树叶 — 可用于配方快速切换，确保无交叉污染 */
function LeafIcon() {
  const s = { fill: 'none', strokeWidth: '30', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '10' }
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 叶片轮廓圆 — 深色 */}
        <g transform="translate(361.5459,234.5454)">
          <path {...s} stroke={DARK} d="m 0,0 c 0,-58.291 -47.255,-105.545 -105.546,-105.545 -58.291,0 -105.546,47.254 -105.546,105.545 0,107.018 105.546,164.455 105.546,164.455 C -105.546,164.455 0,107.018 0,0 Z" />
        </g>
        {/* 茎干中线 — 深色 */}
        <g transform="translate(256,399)">
          <path {...s} stroke={DARK} d="M 0,0 V -270" />
        </g>
        {/* 左侧叶脉 — 深色 */}
        <g transform="translate(154.8789,271.8809)">
          <path {...s} stroke={DARK} d="M 0,0 101.121,-78.732" />
        </g>
        <g transform="translate(187.5967,338.647)">
          <path {...s} stroke={DARK} d="M 0,0 68.403,-53.259" />
        </g>
        {/* 右侧叶脉 — 深色 */}
        <g transform="translate(357.1211,271.8809)">
          <path {...s} stroke={DARK} d="M 0,0 -101.121,-78.732" />
        </g>
        <g transform="translate(324.4033,338.647)">
          <path {...s} stroke={DARK} d="M 0,0 -68.403,-53.259" />
        </g>
        {/* 左上角括弧 — 深色 */}
        <g transform="translate(44.1855,475.9243)">
          <path {...s} stroke={DARK} d="M 0,0 91.314,-11.212 80.103,-102.526" />
        </g>
        {/* 右下角括弧 — 深色 */}
        <g transform="translate(467.8145,36.0757)">
          <path {...s} stroke={DARK} d="m 0,0 -91.314,11.212 11.211,91.314" />
        </g>
        {/* 外大弧（左侧）— 品牌红 */}
        <g transform="translate(318.375,23.2119)">
          <path {...s} stroke={RED} d="m 0,0 c -128.564,-34.449 -260.714,41.847 -295.163,170.413 -28.864,107.724 20.021,217.963 112.259,271.139" />
        </g>
        {/* 外大弧（右侧）— 品牌红 */}
        <g transform="translate(193.625,488.7881)">
          <path {...s} stroke={RED} d="M 0,0 C 128.564,34.449 260.714,-41.847 295.163,-170.413 324.027,-278.137 275.142,-388.376 182.904,-441.552" />
        </g>
      </g>
    </svg>
  )
}

/* 气流云 — 大大降低粉尘外扬，提供良好工作环境 */
function CleanAirIcon() {
  const s = { fill: 'none', strokeWidth: '30', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '10' }
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 云朵 — 深色 */}
        <g transform="translate(256,240)">
          <path {...s} stroke={DARK}
            d="m 0,0 c 38.66,0 70,31.34 70,70 0,38.66 -31.34,70 -70,70 -0.616,0 -1.226,-0.03 -1.838,-0.046 C -8.907,179.762 -43.661,210 -85.5,210 c -41.839,0 -76.592,-30.238 -83.662,-70.046 -0.612,0.016 -1.221,0.046 -1.838,0.046 -38.66,0 -70,-31.34 -70,-70 0,-38.66 31.34,-70 70,-70 h 326.5 c 47.22,0 85.5,38.28 85.5,85.5 0,47.22 -38.28,85.5 -85.5,85.5 -0.687,0 -1.365,-0.036 -2.048,-0.052 C 144.948,219.832 102.316,257 51,257 9.834,257 -25.724,233.07 -42.578,198.373" />
        </g>
        {/* 气流短线 — 深色 */}
        <g transform="translate(0,105)">
          <path {...s} stroke={DARK} d="M 0,0 H 411.5" />
        </g>
        {/* 气流长弧（上）— 品牌红 */}
        <g transform="translate(497,210)">
          <path {...s} stroke={RED} d="M 0,0 C 0,-24.853 -20.147,-45 -45,-45 H -497" />
        </g>
        {/* 气流长弧（下）— 品牌红 */}
        <g transform="translate(497,0)">
          <path {...s} stroke={RED} d="M 0,0 C 0,24.853 -20.147,45 -45,45 H -497" />
        </g>
        {/* 气流短弧 — 深色 */}
        <g transform="translate(326,0)">
          <path {...s} stroke={DARK} d="M 0,0 C 0,24.853 -20.147,45 -45,45" />
        </g>
      </g>
    </svg>
  )
}

/* ── 系统特点数据（6 项）─────────────────── */
const features = [
  {
    Icon: TargetIcon,
    title: '清除管道内浆料沉积，预防管道堵塞',
    desc: '智能清管系统定期清除管道内壁浆料沉积，有效预防堵管风险，保障系统长期稳定运行。',
  },
  {
    Icon: ProductivityIcon,
    title: '管道中端及末端回收产品，自动回收清管球',
    desc: '中端及末端回收设计，清管球全自动回收，减少物料浪费，大幅提升整体产品回收率。',
  },
  {
    Icon: LaptopIcon,
    title: '空气 / 工艺产品推球，匀速控制，在线追踪',
    desc: '采用空气或工艺介质推动清管球，匀速精准控制，支持在线实时追踪清管球位置，安全可靠。',
  },
  {
    Icon: FilterIcon,
    title: '可为气力输送系统配套设计管道除尘系统（中央除尘系统 + 单点除尘设备）',
    desc: '中央除尘系统与单点除尘设备协同工作，针对输送管路各节点实现全面高效的粉尘治理。',
  },
  {
    Icon: LeafIcon,
    title: '可用于产品配方快速切换，确保产品无交叉污染',
    desc: '清洁系统支持多品种配方快速切换场景，确保各批次产品之间无交叉污染，适合柔性生产线。',
  },
  {
    Icon: CleanAirIcon,
    title: '大大降低粉尘外扬的可能性，为客户提供良好的工作环境',
    desc: '全密封清洁方案大幅降低粉尘外扬可能性，为操作人员提供洁净安全的生产工作环境。',
  },
]

/* ── 应用行业数据 ─────────────────────────── */
const appIndustries = [
  { name: '环保涂料',   img: '/ref-images/image_20221001_1664622305_817454.png' },
  { name: '改性塑料',   img: '/ref-images/image_20221014_1665728800_100713.jpg' },
  { name: '可降解塑料', img: '/ref-images/image_20221014_1665728806_965046.jpg' },
  { name: '无机材料',   img: '/ref-images/image_20221001_1664622352_54233.png' },
  { name: '高分子材料', img: '/ref-images/image_20221014_1665728875_924017.jpg' },
  { name: '精细化工',   img: '/ref-images/image_20221001_1664622409_300630.png' },
  { name: '聚氨酯制品', img: '/ref-images/image_20221014_1665728867_252839.jpg' },
  { name: '正极材料',   img: '/ref-images/image_20221013_1665651453_108062.jpg' },
]

/* ── 包含设备数据 ─────────────────────────── */
const includedEquipment = [
  { name: '清管球系统', img: '/ref-images/image_20221104_1667522683_673154.png' },
]

/* ── 客户案例数据（来源：ongoaltech-122）── */
const customerCases = [
  {
    tag: '工程案例 · 新能源',
    client: '某新能源 TOP1 汽车企业',
    desc: '**股份有限公司成立于 1995 年 2 月，总部位于广东省深圳市。公司现有员工超过 22 万人，业务横跨汽车、轨道交通、新能源和电子四大产业，在香港和深圳两地上市，营收和市值均超千亿元。',
    img: '/ref-images/image_20221021_1666344504_535871.png',
    metrics: [],
  },
  {
    tag: '工程案例 · 高分子材料',
    client: '安庆某尼龙材料企业',
    desc: '安庆**尼龙材料科技有限公司是一家生产双向拉伸聚酰胺（BOPA）薄膜的制造型企业，注册资金 2.3 亿元，计划投资 5.1 亿元，达产后年产 BOPA 薄膜 2.5 万吨，产值 10 亿元。',
    img: '/ref-images/image_20221014_1665712980_529731.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 高分子材料',
    client: '东莞某高分子材料企业',
    desc: '东莞市**高分子材料有限公司成立于 2005 年，主营业务为生产、销售硅橡胶生胶、混炼胶及液态硅橡胶系列产品，经过多年沉淀，已在广东珠三角及周边地区取得一定市场份额。',
    img: '/ref-images/image_20221014_1665713583_527938.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 涂料',
    client: '安徽某 TOP 涂料企业',
    desc: '**是中国知名的涂料及涂装解决方案提供商，业务涵盖家具涂料、建筑涂料、工业涂料等多个领域，品牌创立于 1993 年，现旗下有 9 大生产基地，位列全球涂料 40 强企业之一。',
    img: '/ref-images/image_20221014_1665711914_248366.jpg',
    metrics: [],
  },
]

export default function DustCleaningPage() {
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
            src="/assets/除尘清洁系统.jpg"
            alt="除尘清洁系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: '新能源行业', path: '/solutions#new-energy' },
            { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
            { label: '除尘清洁系统' },
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
            <h1 className="cp-sol-hero-title fade-up fade-up-delay-1">除尘清洁系统</h1>
            <p className="cp-intro-desc fade-up fade-up-delay-2">
              宏工为气力输送系统配套设计的管道除尘系统，及为浆料输送系统配套设计的清管球系统，为客户提供良好的清洁环境。
            </p>
            <div className="cp-sol-hero-pills fade-up fade-up-delay-3">
              <span>清管球系统</span>
              <span>中央除尘</span>
              <span>无交叉污染</span>
              <span>在线追踪</span>
              <span>匀速控制</span>
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

        {/* ===== 包含设备 ===== */}
        <IncludedEquipmentSection items={includedEquipment} grayBg={true} />

        {/* ===== 客户案例 ===== */}
        <CustomerCasesSection cases={customerCases} />

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
