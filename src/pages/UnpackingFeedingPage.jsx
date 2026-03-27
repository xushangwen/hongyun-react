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

/* 气流云 — 中央集尘系统与单点除尘器配套，投料无扬尘 */
function CleanAirIcon() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 云朵 — 深色 */}
        <g transform="translate(256,240)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 38.66,0 70,31.34 70,70 0,38.66 -31.34,70 -70,70 -0.616,0 -1.226,-0.03 -1.838,-0.046 C -8.907,179.762 -43.661,210 -85.5,210 c -41.839,0 -76.592,-30.238 -83.662,-70.046 -0.612,0.016 -1.221,0.046 -1.838,0.046 -38.66,0 -70,-31.34 -70,-70 0,-38.66 31.34,-70 70,-70 h 326.5 c 47.22,0 85.5,38.28 85.5,85.5 0,47.22 -38.28,85.5 -85.5,85.5 -0.687,0 -1.365,-0.036 -2.048,-0.052 C 144.948,219.832 102.316,257 51,257 9.834,257 -25.724,233.07 -42.578,198.373" />
        </g>
        {/* 气流短线 — 深色 */}
        <g transform="translate(0,105)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 H 411.5" />
        </g>
        {/* 气流长弧（上）— 品牌红 */}
        <g transform="translate(497,210)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="M 0,0 C 0,-24.853 -20.147,-45 -45,-45 H -497" />
        </g>
        {/* 气流长弧（下）— 品牌红 */}
        <g transform="translate(497,0)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="M 0,0 C 0,24.853 -20.147,45 -45,45 H -497" />
        </g>
        {/* 气流短弧 — 深色 */}
        <g transform="translate(326,0)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="M 0,0 C 0,24.853 -20.147,45 -45,45" />
        </g>
      </g>
    </svg>
  )
}

/* 条形码 — 生产资源条码化管理，确保投料准确可追溯 */
function BarcodeIcon() {
  return (
    <svg viewBox="0 -91 512 512" className="cp-feat-icon-svg">
      {/* 角框 — 深色 */}
      <path fill={DARK} d="m30 30h61v-30h-91v90h30zm0 0"/>
      <path fill={DARK} d="m421 0v30h61v60h30v-90zm0 0"/>
      <path fill={DARK} d="m482 300h-61v30h91v-90h-30zm0 0"/>
      <path fill={DARK} d="m91 300h-61v-60h-30v90h91zm0 0"/>
      {/* 长竖条 — 深色 */}
      <path fill={DARK} d="m61 60h30v210h-30zm0 0"/>
      <path fill={DARK} d="m241 60h30v210h-30zm0 0"/>
      <path fill={DARK} d="m421 60h30v210h-30zm0 0"/>
      {/* 中等竖条 — 深色 */}
      <path fill={DARK} d="m121 60h30v150h-30zm0 0"/>
      <path fill={DARK} d="m181 60h30v150h-30zm0 0"/>
      <path fill={DARK} d="m301 60h30v150h-30zm0 0"/>
      <path fill={DARK} d="m361 60h30v150h-30zm0 0"/>
      {/* 底部校验条（可追溯标记）— 品牌红 */}
      <path fill={RED} d="m121 240h30v30h-30zm0 0"/>
      <path fill={RED} d="m181 240h30v30h-30zm0 0"/>
      <path fill={RED} d="m301 240h30v30h-30zm0 0"/>
      <path fill={RED} d="m361 240h30v30h-30zm0 0"/>
    </svg>
  )
}

/* 笔记本 — 智能化控制，数据实时采集上传 */
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
      <rect fill={DARK} x="80" y="382" width="30" height="30"/>
      <rect fill={DARK} x="130" y="382" width="30" height="30"/>
      <rect fill={DARK} x="216" y="332" width="30" height="30"/>
      <rect fill={DARK} x="266" y="332" width="30" height="30"/>
      <rect fill={DARK} x="316" y="332" width="30" height="30"/>
      <rect fill={DARK} x="366" y="332" width="30" height="30"/>
      <rect fill={DARK} x="116" y="332" width="30" height="30"/>
      <rect fill={DARK} x="166" y="332" width="30" height="30"/>
      <rect fill={DARK} x="91" y="282" width="30" height="30"/>
      <rect fill={DARK} x="141" y="282" width="30" height="30"/>
      <rect fill={DARK} x="191" y="282" width="30" height="30"/>
      <rect fill={DARK} x="241" y="282" width="30" height="30"/>
      <rect fill={DARK} x="291" y="282" width="30" height="30"/>
      <rect fill={DARK} x="341" y="282" width="30" height="30"/>
      <rect fill={DARK} x="391" y="282" width="30" height="30"/>
    </svg>
  )
}

/* 均衡器/滤波器 — 针对特殊物料的个性化专项控制 */
function FilterIcon() {
  const d = { fill: 'none', strokeLinecap: 'square', strokeLinejoin: 'miter', strokeMiterlimit: '10', strokeWidth: '30' }
  const dk = { ...d, stroke: DARK }
  const rd = { ...d, stroke: RED }
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
        {/* 中间滑块（中位，代表专项控制调节）— 品牌红 */}
        <path {...rd} d="m 346.5,215 h -60 v 60 h 60 z" />
        <g transform="translate(316.5,275)"><path {...rd} d="M 0,0 V 222" /></g>
        <g transform="translate(316.5,15)"><path {...rd} d="M 0,0 V 200" /></g>
        {/* 左高滑块（高位）— 深色 */}
        <path {...dk} d="m 225.5,383.348 h -60 v 60 h 60 z" />
        <g transform="translate(195.5,443.3477)"><path {...dk} d="M 0,0 V 53.652" /></g>
        <g transform="translate(195.5,15)"><path {...dk} d="M 0,0 V 368.348" /></g>
      </g>
    </svg>
  )
}

/* 铅笔/蓝图 — 个性化规划设计，适配多种车间环境 */
function PencilIcon() {
  const dk = { fill: 'none', stroke: DARK, strokeWidth: '30', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '10' }
  const rd = { fill: 'none', stroke: RED,  strokeWidth: '30', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: '10' }
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 铅笔主体 — 深色 */}
        <g transform="translate(257.6543,172.4922)">
          <path {...dk} d="m 0,0 -106.565,-106.366 -127.28,-42.426 42.427,127.279 106.565,106.366" />
        </g>
        <g transform="translate(257.6543,342.1982)">
          <path {...dk} d="M 0,0 148.493,148.492 233.346,63.64 84.854,-84.853" />
        </g>
        <g transform="translate(108.6621,108.5527)"><path {...dk} d="M 0,0 106.566,106.366" /></g>
        <g transform="translate(300.0811,299.7715)"><path {...dk} d="M 0,0 106.066,106.066" /></g>
        {/* 外轮廓 — 深色 */}
        <g transform="translate(406.1475,21)">
          <path {...dk} d="M 0,0 -384.838,384.838 -299.985,469.69 84.853,84.853 Z" />
        </g>
        {/* 两端标记 — 深色 */}
        <g transform="translate(95.5557,416.4443)"><path {...dk} d="M 0,0 21.213,-21.213" /></g>
        <g transform="translate(395.541,116.4595)"><path {...dk} d="M 0,0 21.213,-21.213" /></g>
        {/* 内部纹理 — 深色 */}
        <g transform="translate(138.9824,351.8047)"><path {...dk} d="M 0,0 -31.82,-31.82" /></g>
        <g transform="translate(181.4082,309.3784)"><path {...dk} d="M 0,0 -31.819,-31.82" /></g>
        <g transform="translate(223.835,266.9517)"><path {...dk} d="M 0,0 -31.819,-31.82" /></g>
        <g transform="translate(266.2617,224.5254)"><path {...dk} d="M 0,0 -31.82,-31.82" /></g>
        <g transform="translate(308.6875,182.0991)"><path {...dk} d="M 0,0 -31.819,-31.82" /></g>
        <g transform="translate(351.1143,139.6729)"><path {...dk} d="M 0,0 -31.82,-31.82" /></g>
        {/* 规划角尺（个性化设计标记）— 品牌红 */}
        <g transform="translate(66.2363,152)">
          <path {...rd} d="m 0,0 h 42.764 v -44 h 42 v -41.874" />
        </g>
        {/* 铅笔尖高光线 — 品牌红 */}
        <g transform="translate(363.7207,448.2642)">
          <path {...rd} d="M 0,0 84.853,-84.853" />
        </g>
      </g>
    </svg>
  )
}

/* ── 系统特点数据（5 项）─────────────────── */
const features = [
  {
    Icon: CleanAirIcon,
    title: '中央集尘系统与单点除尘器配套，投料无扬尘',
    desc: '中央集尘系统与单点除尘器协同工作，投料全程无粉尘外溢，为操作人员创造洁净安全的生产环境。',
  },
  {
    Icon: BarcodeIcon,
    title: '生产资源条码化管理，确保投料准确可追溯',
    desc: '原料条码扫描与系统关联，确保投料品种、批次、数量准确无误，实现从原料到成品的全程可追溯管理。',
  },
  {
    Icon: LaptopIcon,
    title: '智能化控制系统，数据实时采集、储存、上传',
    desc: '智能控制系统自动记录投料时间、品种、重量等关键数据，实时上传至 MES 系统，支持精细化生产管理。',
  },
  {
    Icon: FilterIcon,
    title: '针对物料特性做专项控制',
    desc: '针对吸水性强、流动性差、气味刺激等特殊物料特性进行专项控制设计，保障各类物料投料安全顺畅。',
  },
  {
    Icon: PencilIcon,
    title: '根据客户需求及车间环境进行个性化规划设计',
    desc: '根据客户实际车间布局与生产工艺进行个性化规划，灵活适配不同厂房结构，实现最优空间利用方案。',
  },
]

/* ── 核心设备数据 ─────────────────────────── */
const coreEquipment = [
  { name: '小袋解包站',    img: '/ref-images/image_20240118_1705565893_80363.png' },
  { name: '吨袋解包站',    img: '/ref-images/image_20221014_1665732359_503939.png' },
  { name: 'FFS 重膜包装机', img: '/ref-images/image_20241206_1733452669_188551.png' },
]

/* ── 客户案例数据（来源：ongoaltech-127）── */
const customerCases = [
  {
    tag: '工程案例 · 新材料',
    client: '宁波某可降解塑料公司',
    desc: '宁波**科技股份有限公司专注新型塑料和生物材料的研发、生产与技术推广，入选工业和信息化部绿色设计示范企业名单，是国内可降解材料领域单项冠军。解包投料系统助力实现无尘、高精度的原料自动化投送。',
    img: '/ref-images/image_20221014_1665711153_431627.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 高分子材料',
    client: '东莞某高分子材料公司',
    desc: '东莞市**高分子材料有限公司成立于 2005 年，主营硅橡胶生胶、混炼胶及液态硅橡胶系列产品，在广东珠三角及周边地区占有较大市场份额，旗下两大主体公司分别专注制造与出口销售。',
    img: '/ref-images/image_20221014_1665713583_527938.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 化工',
    client: '浙江某化工集团',
    desc: '**化学集团是一家全球化的功能化学公司，重点聚焦纺织、造纸、塑料与建筑四大行业，以领先的化学解决方案让基底界面更卓越，致力于成为功能化学领域的全球专家。',
    img: '/ref-images/image_20221014_1665712966_182878.jpg',
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

export default function UnpackingFeedingPage() {
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
            src="/assets/解包投料系统.jpg"
            alt="解包投料系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: '新能源行业', path: '/solutions#new-energy' },
            { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
            { label: '解包投料系统' },
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
            <h1 className="cp-sol-hero-title fade-up fade-up-delay-1">解包投料系统</h1>
            <p className="cp-intro-desc fade-up fade-up-delay-2">
              小袋包装、吨袋包装、槽罐车和集装箱均为生产中常见的物料包装方式，针对不同类型的原料包装，宏工均能提供合适的解包投料方案，实现无尘、可追溯的智能化投料全流程。
            </p>
            <div className="cp-sol-hero-pills fade-up fade-up-delay-3">
              <span>无尘投料</span>
              <span>条码化管理</span>
              <span>智能数据采集</span>
              <span>特殊物料专控</span>
              <span>个性化布局</span>
            </div>
          </div>
        </section>

        {/* ===== 系统特点（3+2 flex 居中布局）===== */}
        <SystemFeaturesSection features={features} columns={3} />

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
