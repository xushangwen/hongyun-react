import React, { useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import BentoGallerySection from '../components/BentoGallerySection'
import CustomerCasesSection from '../components/CustomerCasesSection'
import TechInquirySection from '../components/TechInquirySection'

/* ──────────────────────────────────────────────────────────
   双色 SVG 图标组件
   主体: stroke="#1E1E1E"  accent: stroke/fill="#BA0C2F"（品牌红）
   ────────────────────────────────────────────────────────── */

/* 图标1：设置/数据采集（settings.svg — 显示器+齿轮） */
function IconSettings() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 显示器外框 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(367.9658,427.501)"
          d="m 0,0 h 129.034 v -342.849 h -482 V 0 H -225.4" />
        {/* 底座左弧 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(155.478,15)"
          d="M 0,0 C 22.116,0 40.044,17.928 40.044,40.043 V 69.652" />
        {/* 底座右弧 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(356.5215,15)"
          d="M 0,0 C -22.115,0 -40.043,17.928 -40.043,40.043 V 69.652" />
        {/* 底部横线 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="square" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(121,15)" d="M 0,0 H 270" />
        {/* 横向分割线 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(15,144.6523)" d="M 0,0 H 482" />
        {/* 齿轮外环 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(401.0439,329.4551)"
          d="m 0,0 v 45.003 l -28.895,7.546 c -2.827,10.961 -7.165,21.314 -12.778,30.826 l 15.101,25.777 -31.822,31.822 -25.777,-15.101 c -9.512,5.612 -19.865,9.95 -30.825,12.778 l -7.547,28.894 h -45.002 l -7.546,-28.894 c -10.961,-2.828 -21.315,-7.166 -30.826,-12.778 l -25.777,15.101 -31.822,-31.822 15.101,-25.777 c -5.613,-9.512 -9.951,-19.865 -12.778,-30.826 l -28.894,-7.546 V 0 l 28.894,-7.546 c 2.827,-10.961 7.165,-21.314 12.778,-30.826 l -15.101,-25.777 31.822,-31.822 25.777,15.101 c 9.511,-5.612 19.865,-9.95 30.826,-12.778 l 7.546,-28.894 h 45.002 l 7.547,28.894 c 10.96,2.828 21.313,7.166 30.825,12.778 l 25.777,-15.101 31.822,31.822 -15.101,25.777 c 5.613,9.512 9.951,19.865 12.778,30.826 z" />
        {/* 齿轮内圆 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(316.8691,351.9565)"
          d="m 0,0 c 0,-33.617 -27.252,-60.87 -60.869,-60.87 -33.617,0 -60.87,27.253 -60.87,60.87 0,33.617 27.253,60.87 60.87,60.87 C -27.252,60.87 0,33.617 0,0 Z" />
      </g>
    </svg>
  )
}

/* 图标2：追踪/全周期管理（tracking.svg — 监控框+瞄准镜） */
function IconTracking() {
  return (
    <svg viewBox="0 0 510 510" fill="none" className="cp-feat-icon-svg">
      {/* 外框 */}
      <path fill="#1E1E1E" d="M510 420v-420h-510v420h180v38.787l-21.213 21.213h-38.787v30h51.213l30-30h107.574l30 30h51.213v-30h-38.787l-21.213-21.213v-38.787zm-480-30v-360h450v360c-44.076 0-399.31 0-450 0zm270 60h-90v-30h90z" />
      {/* 四角瞄准框 — 品牌红 */}
      <path fill="#BA0C2F" d="M375 330h-45v30h75v-75h-30z" />
      <path fill="#BA0C2F" d="M375 135h30v-75h-75v30h45z" />
      <path fill="#BA0C2F" d="M135 90h45v-30h-75v75h30z" />
      <path fill="#BA0C2F" d="M135 285h-30v75h75v-30h-45z" />
      {/* 十字准线 + 中心圆 */}
      <path fill="#1E1E1E" d="M358.924 225h46.076v-30h-46.076c-6.597-45.916-43.008-82.327-88.924-88.924v-46.076h-30v46.076c-45.916 6.597-82.327 43.008-88.924 88.924h-46.078v30h46.078c6.597 45.916 43.009 82.328 88.926 88.924v46.076h30v-46.076c45.915-6.598 82.325-43.009 88.922-88.924zm-30.433-30h-31.071c-4.527-12.764-14.656-22.893-27.42-27.42v-31.07c29.344 5.979 52.511 29.146 58.491 58.49zm-73.491 0c8.271 0 15 6.729 15 15s-6.729 15-15 15c-8.272 0-15-6.729-15-15s6.728-15 15-15zm-15-58.49v31.07c-12.764 4.527-22.893 14.656-27.42 27.42h-31.071c5.98-29.344 29.147-52.511 58.491-58.49zm-58.491 88.49h31.071c4.527 12.765 14.657 22.895 27.422 27.42v31.071c-29.345-5.979-52.513-29.146-58.493-58.491zm88.493 58.49v-31.071c12.763-4.526 22.891-14.655 27.418-27.419h31.071c-5.98 29.344-29.146 52.51-58.489 58.49z" />
    </svg>
  )
}

/* 图标3：能源追踪（energy.svg — 循环箭头+闪电） */
function IconEnergy() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 中心圆 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,106)"
          d="m 0,0 c -82.705,0 -150,67.295 -150,150 0,82.705 67.295,150 150,150 82.705,0 150,-67.295 150,-150 C 150,67.295 82.705,0 0,0 Z" />
        {/* 右上弧线 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(147.2979,470.5332)"
          d="m 0,0 c 90.265,46.4 203.789,31.791 279.407,-43.828 93.727,-93.725 93.727,-245.685 0,-339.411" />
        {/* 左下弧线 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(364.7021,41.4668)"
          d="m 0,0 c -90.265,-46.4 -203.79,-31.791 -279.408,43.828 -93.726,93.725 -93.726,245.685 0,339.411" />
        {/* 左上箭头尾 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(85.2939,361.0659)" d="M 0,0 V 63.64 H -63.64" />
        {/* 右下箭头尾 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(426.7051,150.9341)" d="M 0,0 V -63.64 H 63.64" />
        {/* 闪电 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,166)" d="M 0,0 30,90 H -30 L 0,180" />
      </g>
    </svg>
  )
}

/* 图标4：可视化图表（graph.svg — 柱状图+趋势线） */
function IconGraph() {
  return (
    <svg viewBox="0 0 513 513" fill="none" className="cp-feat-icon-svg">
      {/* 坐标轴 + 三根柱子 */}
      <path fill="#1E1E1E"
        d="M472 483v-290.993h-103.2v290.993h-43.2v-215.993h-103.2v215.993h-43.2v-140.993h-103.2v140.993h-45v-483h-30v513h511v-30zm-366 0v-110.993h43.2v110.993zm146.4 0v-185.993h43.2v185.993zm146.4 0v-260.993h43.2v260.993z" />
      {/* 趋势线+箭头 — 品牌红（使用小写 l 相对坐标，避免直线到左上角） */}
      <path fill="#BA0C2F"
        d="M79.099 201.607l1.857 29.942c117.148-7.269 226.739-57.605 308.584-141.736l6.46-7.154v40.764h30v-94.756h-90.405v30h41.66l-9.412 10.427c-76.614 78.654-179.148 125.713-288.744 132.513z" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────
   系统特点数据
   ────────────────────────────────────────────────────────── */
const features = [
  {
    Icon: IconSettings,
    title: '数据实时采集',
    desc: '全流程工艺参数秒级采集，温度、压力、转速、流量等关键数据实时上传，随时掌握产线运行状态。',
  },
  {
    Icon: IconTracking,
    title: '生产全周期管理',
    desc: '从原料投入到浆料产出的完整生产周期数字化闭环管理，批次追溯清晰，品质可回溯。',
  },
  {
    Icon: IconEnergy,
    title: '能源跟踪管理',
    desc: '精准统计各工序能耗，自动识别用能异常，为节能优化与成本管控提供精准数据支撑。',
  },
  {
    Icon: IconGraph,
    title: '生产可视化',
    desc: '大屏实时展示设备状态、产量进度与告警信息，管理层与操作层同步掌握产线全貌。',
  },
]

/* ──────────────────────────────────────────────────────────
   应用行业数据
   ────────────────────────────────────────────────────────── */
const appIndustries = [
  { img: '/ref-images/image_20221013_1665651453_108062.jpg', name: '正极材料' },
  { img: '/ref-images/image_20221013_1665651495_299237.jpg', name: '负极材料' },
  { img: '/ref-images/image_20221015_1665801977_723502.jpg', name: '电池匀浆' },
  { img: '/ref-images/image_20221001_1664622305_817454.png', name: '环保涂料' },
  { img: '/ref-images/image_20221014_1665728875_924017.jpg', name: '高分子材料' },
  { img: '/ref-images/image_20221014_1665728800_100713.jpg', name: '改性塑料' },
  { img: '/ref-images/image_20221001_1664622409_300630.png', name: '精细化工' },
  { img: '/ref-images/image_20221014_1665728806_965046.jpg', name: '可降解塑料' },
]

/* ──────────────────────────────────────────────────────────
   客户案例数据
   ────────────────────────────────────────────────────────── */
const customerCases = [
  {
    tag: '工程案例 · 新能源',
    client: '河南某知名集团锂电池公司',
    desc: '河南**新能源股份有限公司是中国化学与物理电源行业协会副理事长单位，设有国家级企业技术中心、博士后科研工作站等研发平台。智能控制系统为其实现全流程工艺参数秒级采集与可视化管控，产线稳定性显著提升。',
    img: '/ref-images/image_20221014_1665711961_98396.jpg',
    metrics: [
      { value: '99.6%', label: '产线稳定率' },
      { value: '24h', label: '全天候数据监控' },
      { value: '50%+', label: '异常响应提速' },
    ],
  },
  {
    tag: '工程案例 · 锂电材料',
    client: '广东某新能源电池材料企业',
    desc: '专注于高性能锂电池正极材料研发与生产，年产能超过 20,000 吨。导入智能控制系统后，实现批次数据全程可溯，能耗异常自动预警，运维成本降低 38%。',
    img: '/ref-images/image_20221014_1665712980_529731.jpg',
    metrics: [
      { value: '38%', label: '运维成本降低' },
      { value: '100%', label: '批次数据可溯' },
      { value: '实时', label: '工艺参数采集' },
    ],
  },
  {
    tag: '工程案例 · 储能',
    client: '浙江某化工集团',
    desc: '**化学集团是一家全球化的功能化学公司，重点聚焦纺织、造纸、塑料与建筑四大行业。智能控制系统接入其多条产线，统一数据平台实现跨线管控，管理效率大幅提升。',
    img: '/ref-images/image_20221014_1665712966_182878.jpg',
    metrics: [
      { value: '多线', label: '统一平台管控' },
      { value: '30%+', label: '管理效率提升' },
      { value: '零遗漏', label: '工艺记录完整性' },
    ],
  },
]

/* ──────────────────────────────────────────────────────────
   主页面组件
   ────────────────────────────────────────────────────────── */
export default function SmartControlPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ===== Hero（sc 修饰类：全幅 cover，高度增加） ===== */}
      <section className="cp-sol-hero cp-sol-hero--sc">
        <div className="cp-sol-hero-img-full">
          <img
            src="/assets/智能控制系统.jpg"
            alt="智能控制系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: '新能源行业', path: '/solutions#new-energy' },
            { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
            { label: '智能控制系统' },
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
            <h1 className="cp-sol-hero-title fade-up fade-up-delay-1">智能控制系统</h1>
            <p className="cp-intro-desc fade-up fade-up-delay-2">
              智能控制系统作为高效循环制浆系统的数字化管控中枢，集成数据实时采集、生产全周期管理、能源跟踪及可视化管控四大核心功能，让每一工艺参数清晰可溯、精准可控。
            </p>
            <div className="cp-sol-hero-pills fade-up fade-up-delay-3">
              <span>实时数据采集</span>
              <span>全周期管理</span>
              <span>能源跟踪</span>
              <span>可视化管控</span>
            </div>
          </div>
        </section>

        {/* ===== 系统特点（智能列数组件） ===== */}
        <SystemFeaturesSection features={features} title="系统特点" />

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

        {/* ===== 系统展示（可复用 Bento 组件） ===== */}
        <BentoGallerySection title="系统展示" />

        {/* ===== 客户案例（可复用组件） ===== */}
        <CustomerCasesSection cases={customerCases} />

        {/* ===== 技术咨询（可复用组件） ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
