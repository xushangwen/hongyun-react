import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  IconArrowRightOutline24,
  IconAwardCertificateOutline24,
  IconEcoLightbulbOutline24,
  IconWrenchScrewdriverOutline24,
  IconDrawCompassOutline24,
} from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'
import VideoPlayer from '../components/VideoPlayer'
import GlobalMap from '../components/GlobalMap'
import heroImg from '../assets/img/DJI_20250418102124_0133_D-3 拷贝.jpg'
import companyImg from '../assets/img/DJI_20250418103239_0149_D 拷贝.jpg'
import videoImg from '../assets/img/IMG_4366.jpg'
import rndImg from '../assets/img/IMG_4280.jpg'

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

/* ========== 发展历程数据 ========== */
const timelineData = [
  { year: '1990', title: '企业法人经营代理油漆、油墨等化工、食品、制药设备' },
  { year: '1993', title: '广州市海珠区红运机械厂成立' },
  { year: '2000', title: '搬至广州市番禺区，更名为广州市番禺区红运机械厂' },
  { year: '2007', title: '注册成立广州红运混合设备有限公司' },
  { year: '2014', title: '搬至广州市南沙区东涌镇同裕街40号，注册成立广州红尚机械制造有限公司' },
  { year: '2021', title: '在江苏常州成立江苏红运智能制造有限公司，并作为公司总部' },
  { year: '2022', title: '建立日本京都办事处' },
  { year: '2024', title: '建立印度办事处' },
  { year: '2025', title: '建立海南、香港、新加坡分公司' },
]

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
    address: '业务遍布<span style="font-size: 1.6em; font-weight: 700; color: var(--hy-red); margin: 0 0.2em; margin-top: -0.2em;">3</span>大洲，数十个国家',
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

export default function AboutPage() {
  const [activeHonorTab, setActiveHonorTab] = useState(0)

  /* 时间线自动滚动 */
  const timelineRef = useRef(null)
  const animFrameRef = useRef(null)
  const pausedRef = useRef(false)
  const posRef = useRef(0)

  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    const speed = 0.6

    const tick = () => {
      if (!pausedRef.current) {
        posRef.current += speed
        const half = el.scrollWidth / 2
        if (posRef.current >= half) posRef.current -= half
        el.scrollLeft = posRef.current
      }
      animFrameRef.current = requestAnimationFrame(tick)
    }
    animFrameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

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

  /* 生产实力统计（不变） */
  const [count50000, ref50000] = useCountUp(50000)
  const [count300, ref300] = useCountUp(300)
  const [count1000, ref1000] = useCountUp(1000)

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
          <div className="page-container">
            <h2 className="section-heading">发展历程</h2>
          </div>
          <div
            className="about-timeline"
            ref={timelineRef}
            onMouseEnter={() => { pausedRef.current = true }}
            onMouseLeave={() => { pausedRef.current = false }}
          >
            <div className="about-timeline-inner">
              {/* 首尾各复制一份，实现无缝循环 */}
              {[...timelineData, ...timelineData].map((item, index) => (
                <div className="about-timeline-item" key={index}>
                  <div className="about-timeline-image">
                    <ImagePlaceholder height="180px" showLabel={false} />
                  </div>
                  <div className="about-timeline-dot" />
                  <div className="about-timeline-content">
                    <span className="about-timeline-year">{item.year}</span>
                    <h4 className="about-timeline-title">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 生产实力 ===== */}
        <section className="about-page-section" id="production">
          <div className="page-container">
            <h2 className="section-heading">生产实力</h2>
            <p className="section-desc">
公司拥有江苏常州、广州南沙两大现代化生产基地，配备数百台精密加工设备，年产能超千台套，为客户提供从设计到交付的一站式服务。
            </p>
            <div className="about-production-grid">
              <div className="about-production-card">
                <ImagePlaceholder height="260px" label="江苏红运智能装备有限公司" />
                <div className="about-production-card-info">
                  <h3>江苏红运智能装备有限公司</h3>
                  <p>位于江苏省常州市武进高新区，集团总部所在地，承担核心设备的研发设计与精密制造。</p>
                </div>
              </div>
              <div className="about-production-card">
                <ImagePlaceholder height="260px" label="广州红尚机械制造有限公司" />
                <div className="about-production-card-info">
                  <h3>广州红尚机械制造有限公司</h3>
                  <p>位于广州市南沙区，华南核心制造基地，辐射珠三角及东南亚市场。</p>
                </div>
              </div>
            </div>
            <div className="about-production-stats">
              <div className="about-production-stat" ref={ref50000}>
                <div className="about-production-stat-num">{count50000.toLocaleString()}<span style={{ fontSize: '16px' }}>+</span></div>
                <div className="about-production-stat-label">厂房面积（m²）</div>
              </div>
              <div className="about-production-stat" ref={ref300}>
                <div className="about-production-stat-num">{count300}<span style={{ fontSize: '16px' }}>+</span></div>
                <div className="about-production-stat-label">精密加工设备（台）</div>
              </div>
              <div className="about-production-stat" ref={ref1000}>
                <div className="about-production-stat-num">{count1000}<span style={{ fontSize: '16px' }}>+</span></div>
                <div className="about-production-stat-label">年产能（台套）</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 研发实力 ===== */}
        <section className="about-page-section" id="rnd">
          <div className="page-container">
            <h2 className="section-heading">研发实力</h2>
            <div className="about-rnd-grid">
              <div className="about-rnd-text">
                <h3>红运混合技术实验室</h3>
                <p>
                  公司设有省级企业技术中心和专业混合工艺实验室，拥有博士、硕士组成的百人研发团队，长期与多所高校及科研院所保持产学研合作。
                </p>
                <p>
                  累计获得国家专利超100项，主持和参与多项行业标准制定，在双行星搅拌、高速分散、连续制浆等核心技术领域处于国内领先水平。
                </p>
                <Link to="/contact" className="btn-primary" style={{ marginTop: '16px' }}>
                  技术咨询
                  <IconArrowRightOutline24 size={18} />
                </Link>
              </div>
              <div className="about-rnd-images">
                <img src={rndImg} alt="研发实验室" style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} />
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
                  <p className="about-global-branch-address" dangerouslySetInnerHTML={{ __html: branch.address }} />
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

            {/* gridClass 控制列数 */}
            {(() => {
              const gridClass = ['cert', 'patent', 'honor'][activeHonorTab]
              const isHonor = activeHonorTab === 2
              return (
                <div className={`about-honors-grid about-honors-grid--${gridClass}`}>
                  {honorsData[activeHonorTab].map((item, i) => (
                    <div className="about-honors-item" key={i}>
                      <div className="about-honors-card">
                        {isHonor ? (
                          /* 荣誉：直接图片，contain 不裁切 */
                          <img
                            src={item.src}
                            alt={item.alt}
                            className="about-honors-honor-img"
                            loading="lazy"
                          />
                        ) : (
                          /* 资质/专利：证书图片叠在木框上方 */
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
              )
            })()}
          </div>
        </section>

        {/* ===== 合作伙伴 ===== */}
        <section className="about-page-section" id="partners-page">
          <div className="page-container">
            <h2 className="section-heading">合作伙伴</h2>
            <p className="section-desc">
              与宁德时代、比亚迪、中创新航、国轩高科等行业龙头企业建立长期战略合作关系，产品遍布全球30+国家和地区。
            </p>
            <div className="about-partners-grid">
              {[
                { src: '/assets/images/partner/par-logo-01.svg', alt: '埃肯' },
                { src: '/assets/images/partner/par-logo-02.svg', alt: '巴斯夫' },
                { src: '/assets/images/partner/par-logo-03.svg', alt: '华为' },
                { src: '/assets/images/partner/par-logo-04.svg', alt: '陶氏化学' },
                { src: '/assets/images/partner/par-logo-05.svg', alt: '万华' },
                { src: '/assets/images/partner/par-logo-06.svg', alt: '汉高' },
                { src: '/assets/images/partner/par-logo-07.svg', alt: '富乐科梅林' },
                { src: '/assets/images/partner/par-logo-08.svg', alt: '三星' },
                { src: '/assets/images/partner/par-logo-09.svg', alt: 'TDK' },
                { src: '/assets/images/partner/par-logo-10.svg', alt: '特斯拉' },
                { src: '/assets/images/partner/par-logo-11.svg', alt: '远景动力' },
                { src: '/assets/images/partner/par-logo-12.svg', alt: '比亚迪' },
              ].map((partner) => (
                <div className="about-partner-logo-item" key={partner.alt}>
                  <img src={partner.src} alt={partner.alt} className="partner-logo-img" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
