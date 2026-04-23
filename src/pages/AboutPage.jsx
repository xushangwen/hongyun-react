import { useState, useEffect, useRef, useCallback } from 'react'
import {
  IconEcoLightbulbOutline24,
  IconWrenchScrewdriverOutline24,
  IconDrawCompassOutline24,
  IconCarBatteryOutline24,
  IconFlask2Outline24,
  IconBatteryChargingOutline24,
  IconMedicineOutline24,
  IconCoinsChartOutline24,
  IconAwardCertificateOutline24,
  IconPeopleOutline24,
} from 'nucleo-core-outline-24'
import { IconArrowLeftOutline48, IconArrowRightOutline48 } from 'nucleo-core-outline-48'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'
import VideoPlayer from '../components/VideoPlayer'
import GlobalMap from '../components/GlobalMap'
import heroImg from '../assets/img/DJI_20250418102124_0133_D-3 拷贝.jpg'
import companyImg from '../assets/img/DJI_20250418103239_0149_D 拷贝.jpg'
import videoImg from '../assets/img/IMG_4366.jpg'

/* ========== 打字机效果组件 ========== */
function TypewriterText({ text, speed = 40, delay = 0, className }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    setDisplayed('')
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(timer)
    }, speed)
    return () => clearInterval(timer)
  }, [started, text, speed])

  return (
    <p ref={ref} className={className}>
      {displayed.split('\n').map((line, i, arr) => (
        <span key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </p>
  )
}

/* ========== 数字计数动画 Hook ========== */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return [count, ref]
}

/* ========== 专利数字滚动：tab 激活时触发 ========== */
function PatentCount({ target, active, duration = 1500 }) {
  const [count, setCount] = useState(0)
  const playedRef = useRef(false)

  useEffect(() => {
    if (!active || playedRef.current) return
    playedRef.current = true
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])

  return <>{count}</>
}

/* 按中文标点切分，每段独行 */
function splitByPunctuation(text) {
  const parts = text.split(/(?<=[，。！？；：])/)
  return parts.filter(Boolean).map((part, i) => (
    <span key={i} style={{ display: 'block' }}>{part}</span>
  ))
}

/* ========== 生产实力 – 车间数据 ========== */
const WORKSHOP_DURATION = 10000

const productionWorkshops = [
  {
    id: 'welding',
    name: '焊接车间',
    desc: '机器人焊接与激光切割协同作业，保障焊缝强度与工艺一致性。',
    images: [
      { src: '/assets/images/production/welding/全自动氩弧焊机焊接@2x.webp', alt: '全自动氩弧焊机焊接' },
      { src: '/assets/images/production/welding/全自动焊接机器人焊接@2x.webp', alt: '全自动焊接机器人焊接' },
      { src: '/assets/images/production/welding/双枪机器人焊接@2x.webp', alt: '双枪机器人焊接' },
      { src: '/assets/images/production/welding/水刀切割机器人@2x.webp', alt: '水刀切割机器人' },
      { src: '/assets/images/production/welding/激光切割机@2x.webp', alt: '激光切割机' },
    ],
  },
  {
    id: 'precision',
    name: '精加工车间',
    desc: '马扎克四轴加工中心精密成型，喷丸处理保障表面质量，关键尺寸公差严格可控。',
    images: [
      { src: '/assets/images/production/precision/喷丸加工中心@2x.webp', alt: '喷丸加工中心' },
      { src: '/assets/images/production/precision/焊接件喷丸处理@2x.webp', alt: '焊接件喷丸处理' },
      { src: '/assets/images/production/precision/精加工车间@2x.webp', alt: '精加工车间全景' },
      { src: '/assets/images/production/precision/马扎克四轴加工中心@2x.webp', alt: '马扎克四轴加工中心' },
      { src: '/assets/images/production/precision/马扎克精加工车间@2x.webp', alt: '马扎克精加工车间' },
    ],
  },
  {
    id: 'assembly',
    name: '装配调试车间',
    desc: '多类型大型设备整机装配与精密调试，每台出厂前经严格运行测试与工艺验证。',
    images: [
      { src: '/assets/images/production/assembly/双螺杆制浆系统@2x.webp', alt: '双螺杆制浆系统' },
      { src: '/assets/images/production/assembly/炉壳设备安装@2x.webp', alt: '炉壳设备安装' },
      { src: '/assets/images/production/assembly/粉体下料设备装配@2x.webp', alt: '粉体下料设备装配' },
      { src: '/assets/images/production/assembly/罐体设备安装@2x.webp', alt: '罐体设备安装' },
      { src: '/assets/images/production/assembly/高效管线式制浆系统@2x.webp', alt: '高效管线式制浆系统' },
      { src: '/assets/images/production/assembly/2300L双行星搅拌机装配@2x.webp', alt: '2300L双行星搅拌机装配' },
    ],
  },
]

// 右列 1fr ≈ 740px（1280-380-160），卡片 aspect-ratio 5/3 → 高度 740×3/5 = 444px
const PW_ITEM_H  = 444
const PW_SCALE_A = 0.88
const PW_SCALE_I = 0.68
const PW_GAP     = 14
// 每步位移 = 非激活项有效高度 + gap
const PW_SLOT    = PW_ITEM_H * PW_SCALE_I + PW_GAP          // ≈ 243
// 初始偏移，使 imgIndex=0 激活项视觉中心对齐 PW_CTR
const PW_CTR     = 280                                        // 容器高度 560 / 2
// PW_OFFSET = PW_CTR + ITEM_H*(1-SCALE_A)/2 - ITEM_H/2 ≈ 280+26.6-222 = 84.6
const PW_OFFSET  = PW_CTR + PW_ITEM_H * (1 - PW_SCALE_A) / 2 - PW_ITEM_H / 2

function ProductionWorkshop() {
  const [activeTab, setActiveTab] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)

  const currentWs = productionWorkshops[activeTab]
  const images = currentWs.images
  const n = images.length

  // 10s 后自动切换到下一个车间
  useEffect(() => {
    const id = setTimeout(() => {
      setActiveTab(t => (t + 1) % productionWorkshops.length)
      setImgIndex(0)
    }, WORKSHOP_DURATION)
    return () => clearTimeout(id)
  }, [activeTab])

  // 图片在 10s 内均匀循环
  useEffect(() => {
    const interval = WORKSHOP_DURATION / n
    const id = setInterval(() => setImgIndex(i => (i + 1) % n), interval)
    return () => clearInterval(id)
  }, [activeTab, n])

  const trackY = PW_OFFSET - imgIndex * PW_SLOT

  function handleTabClick(i) {
    setActiveTab(i)
    setImgIndex(0)
  }

  return (
    <div className="pw-root">
      {/* 左：Tab 列表 */}
      <div className="pw-tabs">
        {productionWorkshops.map((ws, i) => {
          const isActive = i === activeTab
          return (
            <div
              key={ws.id}
              className={`pw-tab${isActive ? ' pw-tab--active' : ''}`}
              onClick={() => handleTabClick(i)}
            >
              {/* 激活时的描边 loading 动画层，mount 即播放 */}
              {isActive && <span className="pw-tab-border" aria-hidden="true" />}
              <h3 className="pw-tab-name">{ws.name}</h3>
              <p className="pw-tab-desc">{ws.desc}</p>
            </div>
          )
        })}
      </div>

      {/* 右：竖向轮播 */}
      <div className="pw-carousel-wrap">
        <div
          className="pw-carousel-track"
          style={{
            transform: `translateY(${trackY}px)`,
            transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {images.map((img, i) => {
            const rawDist = i - imgIndex
            const dist = Math.min(
              Math.abs(rawDist),
              Math.abs(rawDist + n),
              Math.abs(rawDist - n)
            )
            const isCenter   = dist === 0
            const isAdjacent = dist === 1
            // scale 缩小后布局盒保持原高，用负 margin 抵消上下空白
            const scale = isCenter ? 0.88 : 0.68
            const vMargin = -(PW_ITEM_H * (1 - scale) / 2)
            return (
              <div
                key={img.src}
                className="pw-carousel-item"
                style={{
                  transform:    `scale(${scale})`,
                  marginTop:    `${vMargin}px`,
                  marginBottom: `${vMargin}px`,
                  opacity:      isCenter ? 1 : isAdjacent ? 0.5 : 0.1,
                  filter:       isCenter ? 'none' : 'brightness(0.7)',
                  transition:   'transform 0.65s ease, opacity 0.65s ease, filter 0.65s ease, margin 0.65s ease',
                  cursor:       isCenter ? 'default' : 'pointer',
                }}
                onClick={() => !isCenter && setImgIndex(i)}
              >
                <div className="pw-carousel-card">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <span className="pw-carousel-label">{img.alt}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ========== 发展历程数据 ========== */
const timelineData = [
  { year: '1990', theme: '起步探索', desc: '企业法人经营代理油漆、油墨等化工、食品、制药设备，积累行业经验，奠定坚实发展基础。', img: '/assets/images/history/1990@2x.jpg' },
  { year: '1993', theme: '正式成立', desc: '广州市海珠区红运机械厂正式成立，开启专业混合设备研发制造征程，迈出品牌建设第一步。', img: '/assets/images/history/1993@2x.jpg' },
  { year: '2000', theme: '扩张迁址', desc: '迁至广州市番禺区，更名为广州市番禺区红运机械厂，规模持续壮大，产能显著提升。', img: '/assets/images/history/2000@2x.jpg' },
  { year: '2007', theme: '公司化运营', desc: '注册成立广州红运混合设备有限公司，完成现代企业制度建设，规范化运营全面展开。', img: '/assets/images/history/2007@2x.jpg' },
  { year: '2014', theme: '南沙新基地', desc: '迁至广州市南沙区东涌镇同裕街40号，注册成立广州红尚机械制造有限公司，华南制造能力全面升级。', img: '/assets/images/history/2014@2x.jpg' },
  { year: '2021', theme: '智造总部', desc: '在江苏常州成立江苏红运智能制造有限公司并作为集团总部，全面迈入智能制造新时代，引领行业创新变革。', img: '/assets/images/history/2021@2x.jpg' },
  { year: '2022', theme: '海外布局', desc: '建立日本京都办事处，迈出国际化战略重要一步，红运品牌正式进入亚太主流市场。', img: '/assets/images/history/2022@2x.jpg' },
  { year: '2024', theme: '亚洲拓展', desc: '建立印度办事处，深化南亚市场战略布局，全球服务网络持续向纵深延伸。', img: '/assets/images/history/2024@2x.jpg' },
  { year: '2025', theme: '全球网络', desc: '建立海南、香港、新加坡分公司，形成覆盖全球三大洲的完整服务网络，实现真正意义的全球化布局。', img: '/assets/images/history/2025@2x.jpg' },
]

/* ========== 发展历程 – 固定激活位 + 可拖拽时间轴 ========== */
const MAX_W = 1360 // 与 CSS --max-width 保持一致
const ITEM_W = 280 // 非激活年份列宽度，必须与 CSS tl-item flex-basis 保持一致

function HistoryTimeline({ data }) {
  const [active, setActive] = useState(0) // 默认最早年份，从左往右展开
  const [pageOffset, setPageOffset] = useState(80)
  const [dragging, setDragging] = useState(false)
  const [dragDelta, setDragDelta] = useState(0)
  const dragStartX = useRef(0)
  const isDragRef = useRef(false) // 区分点击与拖拽
  const viewportRef = useRef(null)
  const autoTimerRef = useRef(null)

  const startAutoPlay = useCallback(() => {
    clearInterval(autoTimerRef.current)
    autoTimerRef.current = setInterval(() => {
      setActive(i => (i + 1) % data.length)
    }, 4000)
  }, [data.length])

  useEffect(() => {
    startAutoPlay()
    return () => clearInterval(autoTimerRef.current)
  }, [startAutoPlay])

  // 计算页面左侧内容区起始位置（与 page-container padding 对齐）
  useEffect(() => {
    const update = () => {
      setPageOffset(Math.max(40, (window.innerWidth - MAX_W) / 2 + 40))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const navigate = (dir) => {
    startAutoPlay()
    setActive(i => Math.max(0, Math.min(data.length - 1, i + dir)))
  }

  // 激活项始终对齐 pageOffset，track 整体平移
  const baseX = pageOffset - active * ITEM_W
  const trackX = baseX + (dragging ? dragDelta : 0)

  const onPointerDown = (e) => {
    startAutoPlay()
    isDragRef.current = false
    setDragging(true)
    dragStartX.current = e.clientX
    setDragDelta(0)
    viewportRef.current?.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!dragging) return
    const delta = e.clientX - dragStartX.current
    if (Math.abs(delta) > 5) isDragRef.current = true
    setDragDelta(delta)
  }

  const onPointerUp = () => {
    if (!dragging) return
    setDragging(false)
    // 拖拽结束后 snap 到最近年份
    const snapped = Math.round(active - dragDelta / ITEM_W)
    setActive(Math.max(0, Math.min(data.length - 1, snapped)))
    setDragDelta(0)
  }

  return (
    <div className="tl-root">
      {/* 标题 */}
      <div className="tl-header">
        <h2 className="section-heading" style={{ margin: 0 }}>发展历程</h2>
      </div>

      {/*
        tl-body: position relative，承载贯穿全高的红色竖线
        --tl-x: 激活年份左边距，与 pageOffset 同步
      */}
      <div className="tl-body" style={{ '--tl-x': `${pageOffset}px` }}>
        {/* 贯穿全高的品牌红竖线（绝对定位） */}
        <div className="tl-border-line" aria-hidden="true" />

        {/* 时间轴视口：仅滚动年份数字 */}
        <div
          className="tl-viewport"
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ cursor: dragging ? 'grabbing' : 'grab' }}
        >
          <div
            className="tl-track"
            style={{
              transform: `translateX(${trackX}px)`,
              transition: dragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {data.map((item, i) => (
              <div
                key={item.year}
                className={`tl-item${i === active ? ' tl-item--active' : ''}`}
                onClick={() => { if (!isDragRef.current) { startAutoPlay(); setActive(i) } }}
              >
                <div className="tl-year">{item.year}</div>
                {i !== active && (
                  <div className="tl-item-img">
                    <img src={item.img} alt={item.theme} loading="lazy" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>


        {/* 内容 + 图片：缩进与红线对齐，切换时淡入 */}
        <div
          className="tl-content"
          key={active}
          style={{ marginLeft: pageOffset }}
        >
          <p className="tl-desc">{splitByPunctuation(data[active].desc)}</p>
          <div className="tl-img-wrap">
            <img src={data[active].img} alt={data[active].theme} loading="lazy" />
          </div>
        </div>

      </div>

      {/* 右下角装饰大字 */}
      <div className="tl-bg-text" aria-hidden="true">History</div>

      {/* 右下角导航按钮：相对 tl-root 定位，落在 padding-bottom 区域 */}
      <div className="tl-nav">
        <button
          className="tl-nav-btn"
          onClick={() => navigate(-1)}
          disabled={active === 0}
          aria-label="上一年"
        >
          <IconArrowLeftOutline48 />
        </button>
        <button
          className="tl-nav-btn"
          onClick={() => navigate(1)}
          disabled={active === data.length - 1}
          aria-label="下一年"
        >
          <IconArrowRightOutline48 />
        </button>
      </div>
    </div>
  )
}

/* ========== 全球化布局数据 ========== */
const globalBranches = [
  {
    label: '常州基地',
    name: '江苏红运智能装备有限公司',
    address: '江苏省常州市武进高新区南湖西路8-8号',
    contact: '0519-86886896',
    isGlobal: false,
  },
  {
    label: '广州基地',
    name: '广州红尚机械制造有限公司',
    address: '广州市南沙区东涌镇同裕街40号',
    contact: '020-34881055',
    isGlobal: false,
  },
  {
    name: '全球服务网络',
    role: '全球技术支持 · 售后服务网络',
    isGlobal: true,
  },
]

/* ========== 企业文化数据 ========== */
const cultureItems = [
  {
    title: '核心价值观',
    content: '追求完美，做到极致。',
  },
  {
    title: '企业使命',
    content: '付出百分之200的努力，\n为客户提供优质的产品和服务！',
  },
  {
    title: '企业愿景',
    content: '成为客户心目中最值得信赖的伙伴，\n被客户称赞的品牌！',
  },
]

/* ========== 资质荣誉数据 ========== */
const honorsTabs = ['资质认证', '专利证书', '荣誉奖项']

const honorsData = [
  /* 资质认证 */
  [
    { src: '/assets/images/honors/certificate/ce-cert.webp', alt: 'CE证书' },
    { src: '/assets/images/honors/certificate/iso9001.webp', alt: 'ISO 9001证书' },
    { src: '/assets/images/honors/certificate/iso14001.webp', alt: 'ISO 14001证书' },
  ],
  /* 专利技术 */
  [
    { src: '/assets/images/honors/patent/patent-01.webp', alt: '专利01' },
    { src: '/assets/images/honors/patent/patent-02.webp', alt: '专利02' },
    { src: '/assets/images/honors/patent/patent-03.webp', alt: '专利03' },
    { src: '/assets/images/honors/patent/patent-04.webp', alt: '专利04' },
    { src: '/assets/images/honors/patent/patent-05.webp', alt: '专利05' },
    { src: '/assets/images/honors/patent/patent-06.webp', alt: '专利06' },
    { src: '/assets/images/honors/patent/patent-07.webp', alt: '专利07' },
    { src: '/assets/images/honors/patent/patent-08.webp', alt: '专利08' },
  ],
  /* 荣誉奖项 */
  [
    { src: '/assets/images/honors/honor/honor-01.webp', alt: '荣誉01' },
    { src: '/assets/images/honors/honor/honor-02.webp', alt: '荣誉02' },
    { src: '/assets/images/honors/honor/honor-03.webp', alt: '荣誉03' },
    { src: '/assets/images/honors/honor/honor-04.webp', alt: '荣誉04' },
    { src: '/assets/images/honors/honor/honor-05.webp', alt: '荣誉05' },
    { src: '/assets/images/honors/honor/honor-06.webp', alt: '荣誉06' },
  ],
]

const CERT_FRAME = '/assets/images/honors/certificate-frame.png'

/* ========== 企业简介统计图标（与首页同款 mask-image 方案） ========== */
const introStats = [
  {
    icon: '/assets/icons/gr/building%202.svg',
    number: 94000,
    suffix: '',
    unit: 'm²',
    label: '生产基地',
    isDecimalTimes10: false,
  },
  {
    icon: '/assets/icons/gr/coins-stack%202.svg',
    number: 19,
    suffix: '',
    unit: '亿',
    label: '注册资本（CNY）',
    isDecimalTimes10: true,
  },
  {
    icon: '/assets/icons/gr/chart-bar-square-plus%202.svg',
    number: 30,
    suffix: '+',
    unit: '年',
    label: '研发经验',
    isDecimalTimes10: false,
  },
]

/* ========== 研发图片轮播数据（4张 = 2组，每组2张） ========== */
const rndImages = [
  { src: '/assets/images/rnd/hy-rnd-output.jpg',    label: '输出实验数据、测试报告' },
  { src: '/assets/images/rnd/hy-rnd-rheometer.jpg', label: '德国赛默飞安东帕流变仪 Viscotester iQ Air' },
  { src: '/assets/images/rnd/hy-rnd-turbiscan.jpg', label: '法国 TURBISCAN 浆料稳定性检测仪' },
  { src: '/assets/images/rnd/hy-rnd-screw.jpg',     label: '红运双螺杆匀浆设备' },
]
// 真实组数 = 图片数 ÷ 每组显示数(2)，到此值时说明显示的是克隆组，需无感归零
const RND_SLIDE_RESET = rndImages.length / 2

/* ========== 合作伙伴数据 ========== */
const P = '/assets/images/partner'
const C = `${P}/clients`

const partnerGroups = [
  {
    label: '新能源行业',
    Icon: IconCarBatteryOutline24,
    items: [
      { src: `${P}/par-logo-12.svg`,    name: '比亚迪' },
      { src: `${P}/par-logo-11.svg`,    name: '远景动力' },
      { src: `${P}/par-logo-08.svg`,    name: '三星' },
      { src: `${P}/par-logo-09.svg`,    name: 'TDK' },
      { src: `${C}/ne-calb.webp`,       name: '中航锂电' },
      { src: `${C}/ne-eve.webp`,        name: '亿纬锂能' },
      { src: `${C}/ne-svolt.webp`,      name: '蜂巢能源' },
      { src: `${C}/ne-sunwoda.webp`,    name: '欣旺达' },
      { src: `${C}/ne-rept.webp`,       name: '瑞浦能源' },
      { src: `${C}/ne-dfd.webp`,        name: '多氟多新能源' },
      { src: `${C}/ne-hithium.webp`,    name: '海辰储能' },
      { src: `${C}/ne-trina.webp`,      name: '天合储能' },
      { src: `${C}/ne-lithion.webp`,    name: '美国 Lithion' },
      { src: `${C}/ne-foxconn.webp`,    name: '台湾鸿海' },
      { src: `${C}/ne-ganfeng.webp`,    name: '赣锋锂电' },
      { src: `${C}/ne-murata.webp`,     name: '村田制作所' },
      { src: `${C}/ne-aec.webp`,        name: '广东国光' },
      { src: `${C}/ne-univercell.webp`, name: '德国 Univercell' },
      { src: `${C}/ne-atl.webp`,        name: 'ATL 新能源科技' },
      { src: `${C}/ne-shaanxi.webp`,    name: '陕西煤业' },
      { src: `${C}/ne-farasis.webp`,    name: '孚能科技' },
    ],
  },
  {
    label: '胶粘剂行业',
    Icon: IconFlask2Outline24,
    items: [
      { src: `${P}/par-logo-01.svg`,   name: '埃肯' },
      { src: `${P}/par-logo-02.svg`,   name: '巴斯夫' },
      { src: `${P}/par-logo-06.svg`,   name: '汉高' },
      { src: `${P}/par-logo-05.svg`,   name: '万华化学' },
      { src: `${P}/par-logo-07.svg`,   name: '富乐科梅林' },
      { src: `${P}/par-logo-04.svg`,   name: '陶氏化学' },
      { src: `${P}/par-logo-03.svg`,   name: '华为' },
      { src: `${C}/ad-sika.svg`,       name: '西卡' },
      { src: `${C}/ad-foxconn.svg`,    name: '富士康' },
      { src: `${C}/ad-honeywell.svg`,  name: '美国霍尼韦尔' },
      { src: `${C}/ad-darbond.png`,    name: '德邦' },
      { src: `${C}/ad-seayu.png`,      name: '信友' },
      { src: `${C}/ad-johnson.png`,    name: '德昌电机' },
      { src: `${C}/ad-itw.png`,        name: '依工聚合' },
      { src: `${C}/ad-hanstars.png`,   name: '汉思' },
      { src: `${C}/ad-casic.png`,      name: '中国航天' },
      { src: `${C}/ad-aecc.png`,       name: '中国航发' },
      { src: `${C}/ad-dec.png`,        name: '东方电气' },
      { src: `${C}/ad-silande.png`,    name: '思蓝德' },
      { src: `${C}/ad-pochely.png`,    name: '聚合' },
      { src: `${C}/ad-bjpharma.png`,   name: '白金制药' },
    ],
  },
  {
    label: '银浆行业',
    Icon: IconBatteryChargingOutline24,
    items: [
      { src: `${C}/sp-fusion.png`,  name: '聚和新材' },
      { src: `${C}/sp-rutech.png`,  name: '儒兴科技' },
      { src: `${C}/sp-heraeus.png`, name: '贺利氏' },
      { src: `${C}/sp-ssp.png`,     name: '上海银浆' },
      { src: `${C}/sp-riyu.png`,    name: '日御股份' },
      { src: `${C}/sp-dec.png`,     name: '东方电气' },
      { src: `${C}/sp-johnson.png`, name: '德昌电机' },
    ],
  },
  {
    label: '医药行业',
    Icon: IconMedicineOutline24,
    items: [
      { src: `${C}/ph-jiudian.webp`,  name: '九典制药' },
      { src: `${C}/ph-yabao.webp`,    name: '亚宝药业集团' },
      { src: `${C}/ph-cr.webp`,       name: '华润' },
      { src: `${C}/ph-sirio.webp`,    name: '仙乐健康' },
      { src: `${C}/ph-tianbang.webp`, name: '天邦医疗' },
      { src: `${C}/ph-amhwa.webp`,    name: '安华生物' },
      { src: `${C}/ph-yuchun.webp`,   name: '广州雨纯' },
      { src: `${C}/ph-yige.webp`,     name: '一格制药' },
      { src: `${C}/ph-hongjou.webp`,  name: '泓友医药' },
      { src: `${C}/ph-lingrui.webp`,  name: '羚锐' },
      { src: `${C}/ph-khb.webp`,      name: '科华生物' },
      { src: `${C}/ph-yifang.webp`,   name: '一方制药' },
      { src: `${C}/ph-xianju.webp`,   name: '仙琚制药' },
      { src: `${C}/ph-hengjian.webp`, name: '恒建制药' },
      { src: `${C}/ph-yicheng.webp`,  name: '逸诚医药' },
    ],
  },
]

export default function AboutPage() {
  const [activeHonorTab, setActiveHonorTab] = useState(0)

  /* 企业简介统计数字动画 */
  const statRefs = useRef([])
  const [statCounts, setStatCounts] = useState(introStats.map(() => 0))
  const statStarted = useRef(false)

  useEffect(() => {
    const firstRef = statRefs.current[0]
    if (!firstRef) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statStarted.current) {
          statStarted.current = true
          introStats.forEach((stat, i) => {
            let startTime = null
            const duration = 1800
            const step = (ts) => {
              if (!startTime) startTime = ts
              const progress = Math.min((ts - startTime) / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = Math.round(eased * stat.number)
              setStatCounts((prev) => {
                const next = [...prev]
                next[i] = current
                return next
              })
              if (progress < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(firstRef)
    return () => observer.disconnect()
  }, [])

  /* 生产实力统计 */
  const [count50000, ref50000] = useCountUp(50000)
  const [count300, ref300] = useCountUp(300)
  const [count1000, ref1000] = useCountUp(1000)

  /* 研发实力统计 */
  const [rndCount15, rndRef15] = useCountUp(15, 1200)
  const [rndCount200, rndRef200] = useCountUp(200, 1800)
  const [rndCount20, rndRef20] = useCountUp(20, 1200)

  /* 研发图片轮播：无缝单向循环 */
  const rndTrackRef = useRef(null)
  const [rndSlide, setRndSlide] = useState(0)

  useEffect(() => {
    // 每 3.5s 推进一格（0→1→2→0→...）
    const timer = setInterval(() => setRndSlide(s => s + 1), 3500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // 显示克隆组时，过渡结束后无感跳回 slide=0（视觉一致）
    if (rndSlide !== RND_SLIDE_RESET) return
    const timeout = setTimeout(() => {
      const el = rndTrackRef.current
      if (!el) return
      el.style.transition = 'none'
      setRndSlide(0)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (rndTrackRef.current) rndTrackRef.current.style.transition = ''
      }))
    }, 650) // 比 CSS transition(600ms) 多 50ms 缓冲
    return () => clearTimeout(timeout)
  }, [rndSlide])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const honorsGridClass = ['cert', 'patent', 'honor'][activeHonorTab]
  const isHonorTab = activeHonorTab === 2

  return (
    <>
      <PageHero
        title="追求完美 做到极致"
        subtitle="专注混合设备研发制造三十余年"
        bgImage={heroImg}
        bgPosition="center 60%"
      />

      <div className="page-body">
        {/* ===== 面包屑 ===== */}
        <Breadcrumb items={[{ label: '关于红运' }]} />

        {/* ===== 公司简介 ===== */}
        <section className="about-page-section" id="company-intro">
          <div className="page-container">
            <h2 className="section-heading">公司简介</h2>
            <div className="about-intro-grid">
              <div className="about-intro-text">
                <p>
                  红运机械自1993年创立以来，致力于混合设备的研究、开发及制造，在不同领域开发了诸多高效节能、创新的混合设备解决方案和系统，帮助用户解决许多生产及生产工艺方面遇到的问题。因此，我们可以依用30多年来积累在粉体计量、混合及输送方面的技术及物料混合生产工艺经验沉淀，为粉体上料、浆料混合及输送行业提供更好的建议及使用方法。
                </p>
                <p>
                  我们的产品广泛应用于新能源、电子电极浆料、各种胶粘剂、火工药剂、涂料、食品、医药及化妆品等行业。
                </p>
                <div className="about-intro-stats">
                  {introStats.map((stat, i) => (
                    <div
                      key={i}
                      ref={(el) => {
                        statRefs.current[i] = el
                      }}
                    >
                      <div
                        className="about-intro-stat-icon"
                        style={{
                          WebkitMaskImage: `url(${stat.icon})`,
                          maskImage: `url(${stat.icon})`,
                        }}
                      />
                      <div className="about-intro-stat-number">
                        {stat.isDecimalTimes10
                          ? (statCounts[i] / 10).toFixed(1)
                          : statCounts[i].toLocaleString()}
                        <span style={{ fontSize: '18px' }}>{stat.suffix}</span>
                        <span style={{ fontSize: '16px', marginLeft: '3px', fontFamily: 'inherit' }}>{stat.unit}</span>
                      </div>
                      <div className="about-intro-stat-unit">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about-intro-image">
                <img src={companyImg} alt="公司外景" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 企业宣传片 ===== */}
        <section className="about-page-section" id="promo-video">
          <div className="page-container">
            <h2 className="section-heading">企业宣传片</h2>
            <div className="about-video-wrapper">
              <VideoPlayer
                src="/assets/video/promo.mp4"
                poster={videoImg}
                title="红运机械 · 企业宣传片"
              />
            </div>
          </div>
        </section>

        {/* ===== 企业文化 ===== */}
        <section className="about-page-section" id="culture">
          <div className="page-container">
            <h2 className="section-heading">企业文化</h2>
            <div className="about-culture-grid">
              {cultureItems.map((item, index) => (
                <div className={`about-culture-card fade-up fade-up-delay-${index + 1}`} key={index}>
                  <h3 className="about-culture-card-title">{item.title}</h3>
                  <TypewriterText
                    text={item.content}
                    delay={index * 200}
                    speed={38}
                    className="about-culture-card-desc"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 发展历程 ===== */}
        <section className="about-page-section" id="history">
          <HistoryTimeline data={timelineData} />
        </section>

        {/* ===== 生产实力 ===== */}
        <section className="about-page-section" id="production">
          <div className="page-container">
            <h2 className="section-heading">生产实力</h2>
            <ProductionWorkshop />
          </div>
        </section>

        {/* ===== 研发实力 ===== */}
        <section className="about-page-section about-rnd-section" id="rnd">
          <div className="page-container">
            <h2 className="section-heading">研发实力</h2>
            <div className="about-rnd-layout">

              {/* 左：文字内容 */}
              <div className="about-rnd-inner">
                <p className="about-rnd-heading">
                  <span className="about-rnd-heading-light">实验室硬件完全满足锂电及化工行业的温度、湿度要求：</span><br />
                  温度 25±3℃；湿度 ≤3% RH；洁净度 10 万级。
                </p>
                <p className="about-rnd-equip-title">红运研发实验室检测设备：</p>
                <ul className="about-rnd-equip-list">
                  <li>粘度检测设备：美国 DV2T 博勒飞粘度计（61#/62#/63#/64# 转子）；</li>
                  <li>细度检测：细度计刮板量程：0–50 μm；</li>
                  <li>固含量检测设备：MB27 水分检测仪、烘箱及电子天平；</li>
                  <li>流动性及稳定性检测设备：德国赛默飞安东帕流变仪 Viscotester iQ Air；</li>
                  <li>稳定性检测设备：法国 TURBISCAN 多重光散射仪；</li>
                  <li>桌面式涂布机：半自动涂布，间隙可调；</li>
                  <li>拉力机：测试涂布及辊压后极片的剥离强度；</li>
                  <li>验证产线：纽扣电池制造产线。</li>
                </ul>
                <div className="about-rnd-stats">
                  <div className="about-rnd-stat" ref={rndRef15}>
                    <IconCoinsChartOutline24 size={24} className="about-rnd-stat-icon" />
                    <div className="about-rnd-stat-number">
                      {rndCount15}<span className="about-rnd-stat-suffix">%</span>
                    </div>
                    <div className="about-rnd-stat-label">研发投入</div>
                  </div>
                  <div className="about-rnd-stat" ref={rndRef200}>
                    <IconAwardCertificateOutline24 size={24} className="about-rnd-stat-icon" />
                    <div className="about-rnd-stat-number">
                      {rndCount200}<span className="about-rnd-stat-suffix">+</span>
                    </div>
                    <div className="about-rnd-stat-label">自主研发专利</div>
                  </div>
                  <div className="about-rnd-stat" ref={rndRef20}>
                    <IconPeopleOutline24 size={24} className="about-rnd-stat-icon" />
                    <div className="about-rnd-stat-number">
                      {rndCount20}<span className="about-rnd-stat-suffix">%</span>
                    </div>
                    <div className="about-rnd-stat-label">研发成员占比</div>
                  </div>
                </div>
              </div>

              {/* 右：图片画廊 */}
              <div className="about-rnd-gallery">
                {/* 第一行：品牌红色卡 */}
                <div className="about-rnd-brand-card">
                  <img src="/assets/images/rnd/hy-rnd-brand.webp" alt="红运品牌" />
                </div>
                {/* 第二行：4张图平铺，track 宽 200%，每张占 25%（= 容器宽 50%），两张一组 */}
                <div className="about-rnd-carousel">
                  {/* track = 3组（2真实+1克隆），宽 300%，每张图占 track 的 1/6 = 容器的 50% */}
                  <div
                    ref={rndTrackRef}
                    className="about-rnd-carousel-track"
                    style={{ transform: `translateX(-${rndSlide * (100 / 3)}%)` }}
                  >
                    {[...rndImages, rndImages[0], rndImages[1]].map(({ src, label }, i) => (
                      <div className="about-rnd-img-card" key={i}>
                        <img src={src} alt={label} loading="lazy" />
                        <span className="about-rnd-img-label">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===== 全球化布局 ===== */}
        <section className="about-page-section" id="global">
          <div className="page-container">
            <h2 className="section-heading">全球化布局</h2>
            <div className="about-global-map">
              <GlobalMap />
            </div>
            <div className="about-global-branches">
              {globalBranches.map((branch, index) => (
                <div className={`about-global-branch fade-up fade-up-delay-${index + 1}`} key={index}>
                  {branch.isGlobal ? (
                    <span className="about-global-branch-top-spacer" aria-hidden="true">placeholder</span>
                  ) : (
                    <span className="about-global-branch-label">{branch.label}</span>
                  )}
                  <h3 className="about-global-branch-name">{branch.name}</h3>
                  {branch.isGlobal ? (
                    <p className="about-global-branch-address">
                      业务遍布<span style={{ fontSize: '1.6em', fontWeight: 700, color: 'var(--hy-red)', margin: '0 0.2em', marginTop: '-0.2em' }}>3</span>大洲，数十个国家
                    </p>
                  ) : (
                    <p className="about-global-branch-address">{branch.address}</p>
                  )}
                  {branch.contact && (
                    <p className="about-global-branch-contact">Tel: {branch.contact}</p>
                  )}
                  {branch.role && (
                    <p className="about-global-branch-role">{branch.role}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 资质荣誉 ===== */}
        <section className="about-page-section" id="honors">
          <div className="page-container">
            <h2 className="section-heading">资质荣誉</h2>
            <div className="about-honors-tabs">
              {honorsTabs.map((tab, index) => (
                <span
                  key={tab}
                  className={`about-honors-tab${activeHonorTab === index ? ' active' : ''}`}
                  onClick={() => setActiveHonorTab(index)}
                >
                  {tab}
                </span>
              ))}
            </div>
            {/* 专利统计行：仅专利 tab 显示，独立于卡片网格 */}
            {activeHonorTab === 1 && (
              <div className="patent-stats-bar-wrapper">
                <div className="patent-stats-bar">
                  {[
                    { num: 200, label: '红运机械专利共有' },
                    { num: 100, label: '发明专利' },
                    { num: 100, label: '实用新型专利' },
                    { num: 20,  label: '外观设计专利' },
                  ].map(({ num, label }) => (
                    <div className="patent-stats-bar-item" key={label}>
                      <img src="/assets/icons/laurel-branch.webp" alt="" className="patent-laurel patent-laurel--left" aria-hidden="true" />
                      <div className="patent-stats-bar-content">
                        <div className="patent-stats-bar-label">{label}</div>
                        <div className="patent-stats-bar-num">
                          <PatentCount target={num} active={activeHonorTab === 1} />
                          <span className="patent-stats-bar-plus">+</span>
                          <span className="patent-stats-bar-unit">项</span>
                        </div>
                      </div>
                      <img src="/assets/icons/laurel-branch.webp" alt="" className="patent-laurel patent-laurel--right" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={`about-honors-grid about-honors-grid--${honorsGridClass}`}>
              {honorsData[activeHonorTab].map((item, i) => (
                <div className="about-honors-item" key={i}>
                  <div className="about-honors-card">
                    {isHonorTab ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="about-honors-honor-img"
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <div
                          className="about-honors-cert-layer"
                          style={{ backgroundImage: `url(${item.src})` }}
                          role="img"
                          aria-label={item.alt}
                        />
                        <div className="about-honors-frame-layer" aria-hidden="true" />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 合作伙伴 ===== */}
        <section className="about-page-section" id="partners-page">
          <div className="page-container">
            <h2 className="section-heading">合作伙伴</h2>
            <p className="section-desc">
              深耕新能源、胶粘剂、银浆及医药四大行业，与比亚迪、巴斯夫、汉高、贺利氏、华润等全球知名企业建立长期战略合作。覆盖国内头部动力电池制造商及巴斯夫、陶氏、埃肯等国际化工巨头，服务客户遍布亚洲、欧洲及北美市场。
            </p>
            <div className="about-partners-grid">
              {partnerGroups.flatMap(({ label, Icon, items }) => {
                const total = 1 + items.length
                const pad = (8 - (total % 8)) % 8
                return [
                  <div className="about-partner-logo-item about-partner-category-card" key={`cat-${label}`}>
                    <Icon size={24} className="partner-category-icon" />
                    <span className="partner-category-name">{label}</span>
                  </div>,
                  ...items.map((p) => (
                    <div className="about-partner-logo-item" key={p.name}>
                      <img src={p.src} alt={p.name} className="partner-logo-img" loading="lazy" />
                      <span className="partner-logo-name">{p.name}</span>
                    </div>
                  )),
                  ...Array.from({ length: pad }, (_, i) => (
                    <div className="about-partner-logo-item about-partner-empty-card" key={`empty-${label}-${i}`} />
                  )),
                ]
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
