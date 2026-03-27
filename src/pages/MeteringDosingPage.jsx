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

/* 靶心准星 — 喂料精度高 */
function TargetIcon() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 外圆 — 深色 */}
        <g transform="translate(470.1377,256)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 0,-118.265 -95.873,-214.138 -214.138,-214.138 -118.265,0 -214.137,95.873 -214.137,214.138 0,118.265 95.872,214.138 214.137,214.138 C -95.873,214.138 0,118.265 0,0 Z" />
        </g>
        {/* 中圆 — 深色 */}
        <g transform="translate(407.3745,256)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 0,-83.602 -67.772,-151.375 -151.375,-151.375 -83.602,0 -151.374,67.773 -151.374,151.375 0,83.602 67.772,151.375 151.374,151.375 C -67.772,151.375 0,83.602 0,0 Z" />
        </g>
        {/* 内环弧段 — 品牌红 */}
        <g transform="translate(297.5889,179.4053)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c -12.359,-6.726 -26.528,-10.546 -41.589,-10.546 -15.06,0 -29.228,3.82 -41.588,10.545" />
        </g>
        <g transform="translate(214.4111,332.5947)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="M 0,0 C 12.36,6.726 26.528,10.546 41.589,10.546 56.649,10.546 70.818,6.726 83.178,0" />
        </g>
        <g transform="translate(179.4053,214.4111)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c -6.725,12.359 -10.546,26.528 -10.546,41.589 0,15.06 3.82,29.228 10.546,41.588" />
        </g>
        <g transform="translate(332.5952,297.5889)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="M 0,0 C 6.725,-12.359 10.546,-26.528 10.546,-41.589 10.546,-56.649 6.725,-70.817 0,-83.178" />
        </g>
        {/* 准星十字线 — 深色 */}
        <g transform="translate(256,343.1406)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 V 168.859" />
        </g>
        <g transform="translate(256,0)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 V 168.859" />
        </g>
        <g transform="translate(343.1411,256)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 H 168.859" />
        </g>
        <g transform="translate(0,256)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 H 168.859" />
        </g>
        {/* 中心点 — 品牌红 */}
        <g transform="translate(241,256)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 H 30" />
        </g>
      </g>
    </svg>
  )
}

/* 六棱柱模块 — 模块化快拆结构 */
function SpaceIcon() {
  return (
    <svg viewBox="0 0 516.641 516.641" className="cp-feat-icon-svg" fill="none">
      {/* 外六边形 — 深色 */}
      <polygon stroke={DARK} strokeWidth="30" strokeMiterlimit="10"
        points="467.033,137.821 467.033,378.82 258.32,499.32 49.608,378.82 49.608,137.821 258.32,17.321" />
      <line stroke={DARK} strokeWidth="30" strokeMiterlimit="10" x1="362.677" y1="318.57" x2="467.033" y2="378.82" />
      <line stroke={DARK} strokeWidth="30" strokeMiterlimit="10" x1="49.608" y1="378.82" x2="153.964" y2="318.57" />
      <line stroke={DARK} strokeWidth="30" strokeMiterlimit="10" x1="258.32" y1="137.821" x2="258.32" y2="17.321" />
      {/* 内六边形 — 品牌红 */}
      <polygon stroke={RED} strokeWidth="30" strokeMiterlimit="10"
        points="362.677,318.57 362.677,198.071 258.32,137.821 153.964,198.071 153.964,318.57 258.32,378.82" />
      <polyline stroke={RED} strokeWidth="30" strokeMiterlimit="10"
        points="153.964,198.071 258.32,258.32 362.677,198.071" />
      <line stroke={RED} strokeWidth="30" strokeMiterlimit="10" x1="258.32" y1="258.32" x2="258.32" y2="378.82" />
    </svg>
  )
}

/* 循环回收叶片 — 投料无尘清洁生产 */
function SustainabilityIcon() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 回收箭头转角 — 深色 */}
        <g transform="translate(391.5879,377)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 H 72.271 V 75" />
        </g>
        <g transform="translate(120.4707,135)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 H -72.43 V -75" />
        </g>
        <g transform="translate(377,120.5293)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 V -72.32 H 75" />
        </g>
        <g transform="translate(135,391.5293)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 V 72.445 H -75" />
        </g>
        {/* 回收箭头弧线 — 深色 */}
        <g transform="translate(196,489.439)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 19.177,4.936 39.282,7.561 60,7.561 88.828,0 166.385,-48.257 207.884,-119.986" />
        </g>
        <g transform="translate(489.4385,316)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 4.937,-19.177 7.562,-39.282 7.562,-60 0,-88.816 -48.245,-166.363 -119.957,-207.867" />
        </g>
        <g transform="translate(256.1729,136)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 -0.056,123.776" />
        </g>
        <g transform="translate(316,22.561)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c -19.177,-4.936 -39.282,-7.561 -60,-7.561 -88.846,0 -166.416,48.277 -207.909,120.029" />
        </g>
        <g transform="translate(22.5615,196)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c -4.937,19.177 -7.562,39.282 -7.562,60 0,88.849 48.281,166.421 120.036,207.913" />
        </g>
        {/* 中心叶片 — 品牌红 */}
        <g transform="translate(256,256)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 h -30 c -49.706,0 -90,40.294 -90,90 h 30 C -40.294,90 0,49.706 0,0 Z" />
        </g>
        <g transform="translate(256,226)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 h 30 c 49.706,0 90,40.294 90,90 H 90 C 40.294,90 0,49.706 0,0 Z" />
        </g>
        <g transform="translate(211,136)">
          <path stroke={RED} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 H 90" />
        </g>
      </g>
    </svg>
  )
}

/* 瞄准镜 — 小批量自动配料灵活性 */
function Target2Icon() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" className="cp-feat-icon-svg" fill="none">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 对角连线 — 深色 */}
        <g transform="translate(225.0479,225.0479)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" d="M 0,0 128.188,128.188" />
        </g>
        {/* 箭头形状 — 深色 */}
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
        {/* 外弧（缺口） — 深色 */}
        <g transform="translate(399.1255,342.5122)">
          <path stroke={DARK} strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
            d="m 0,0 c 22.702,-33.545 35.97,-73.978 35.97,-117.464 0,-115.862 -94.186,-210.048 -210.048,-210.048 -115.861,0 -210.047,94.186 -210.047,210.048 0,115.861 94.186,210.047 210.047,210.047 43.449,0 83.849,-13.245 117.377,-35.911" />
        </g>
      </g>
    </svg>
  )
}

/* ── 系统特点数据 ─────────────────────────── */
const features = [
  {
    Icon: TargetIcon,
    title: '喂料精度高，产品品质稳定',
    desc: '高精度失重秤配料系统，计量误差极低，确保每批次配方精准复现，产品品质高度稳定。',
  },
  {
    Icon: SpaceIcon,
    title: '模块化设计及快拆型结构，满足多配方快速切换',
    desc: '模块化结构与快拆设计相结合，支持工艺配方的快速切换，满足多品种、多配方柔性生产的工艺要求。',
  },
  {
    Icon: SustainabilityIcon,
    title: '投料无尘，换料清理容易、残留少',
    desc: '密封投料设计实现粉尘零外溢，快拆结构便于彻底清洁，换料残留量极低，有效防止交叉污染。',
  },
  {
    Icon: Target2Icon,
    title: '可进行小批量配方自动配料',
    desc: '系统兼容从实验室级小批量到大规模量产的配料需求，单台设备灵活覆盖多种生产规模。',
  },
]

/* ── 应用行业数据 ─────────────────────────── */
const appIndustries = [
  { img: '/ref-images/image_20221001_1664622421_415088.png', name: '石油化工' },
  { img: '/ref-images/image_20221001_1664622352_54233.png',  name: '无机材料' },
  { img: '/ref-images/image_20221001_1664622330_151570.png', name: '日用化学品' },
  { img: '/ref-images/image_20221013_1665651453_108062.jpg', name: '正极材料' },
  { img: '/ref-images/image_20221001_1664622305_817454.png', name: '环保涂料' },
  { img: '/ref-images/image_20221014_1665728875_924017.jpg', name: '高分子材料' },
  { img: '/ref-images/image_20221013_1665651537_996314.jpg', name: '胶粘剂' },
  { img: '/ref-images/image_20221014_1665728800_100713.jpg', name: '改性塑料' },
  { img: '/ref-images/image_20221014_1665728760_894348.jpg', name: '电线电缆' },
  { img: '/ref-images/image_20221001_1664622409_300630.png', name: '精细化工' },
  { img: '/ref-images/image_20221014_1665728867_252839.jpg', name: '聚氨酯制品' },
  { img: '/ref-images/image_20221001_1664622279_126533.png', name: '化学助剂' },
]

/* ── 核心设备数据 ─────────────────────────── */
const coreEquipment = [
  { name: '多组分吸料计量秤', img: '/ref-images/image_20221020_1666250832_565622.png' },
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
    desc: '安庆**尼龙材料科技有限公司一家生产双向拉伸聚酰胺（BOPA)薄膜的制造型企业，计划投资5.1亿元，达产后年产BOPA薄膜2.5万吨，产值10亿元。',
    img: '/ref-images/image_20221014_1665712980_529731.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 化工',
    client: '浙江某化工集团',
    desc: '**化学集团是一家全球化的功能化学公司，重点聚焦纺织、造纸、塑料与建筑四大行业，以领先的化学解决方案让基底界面更卓越。',
    img: '/ref-images/image_20221014_1665712966_182878.jpg',
    metrics: [],
  },
]

export default function MeteringDosingPage() {
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
            src="/assets/计量配料系统.jpg"
            alt="计量配料系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: '新能源行业', path: '/solutions#new-energy' },
            { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
            { label: '计量配料系统' },
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
            <h1 className="cp-sol-hero-title fade-up fade-up-delay-1">计量配料系统</h1>
            <p className="cp-intro-desc fade-up fade-up-delay-2">
              宏工具有丰富的系统集成经验，能根据不同工况，采用增重配料、减重配料、动态多组份配料、失重配料等方式，为客户提供稳定可靠、精准高效的计量配料系统。
            </p>
            <div className="cp-sol-hero-pills fade-up fade-up-delay-3">
              <span>高精度计量</span>
              <span>模块化快拆</span>
              <span>无尘投料</span>
              <span>自动配料</span>
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
