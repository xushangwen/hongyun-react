import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import { IconCircleMediaPlayFill24 } from 'nucleo-core-fill-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'

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

/* ========== 发展历程数据 [AI生成] ========== */
const timelineData = [
  { year: '1993', title: '红运机械成立', desc: '公司在常州创立，专注混合设备研发制造，开启三十余年的技术积累之路。' },
  { year: '2001', title: '首条产线交付', desc: '成功交付首套自动化混合生产线，标志着从单机设备向系统集成方向转型。' },
  { year: '2008', title: '广州基地建成', desc: '广州生产基地投产运营，生产规模与产能实现大幅提升，服务辐射华南地区。' },
  { year: '2013', title: '技术研发突破', desc: '双行星动力混合技术取得重大突破，核心专利突破50项，确立行业技术领先地位。' },
  { year: '2018', title: '新能源战略布局', desc: '全面进军新能源锂电池制浆领域，推出PD制浆系统，迅速获得头部电池厂商认可。' },
  { year: '2022', title: '智能制造升级', desc: '建成数字化智能工厂，引入MES系统与工业物联网，实现全流程智能管控。' },
  { year: '2025', title: '固态电池新赛道', desc: '率先布局固态电池生产设备，推出干法电极连续挤出机等前沿产品，抢占技术制高点。' },
]

/* ========== 全球化布局数据 [AI生成] ========== */
const globalBranches = [
  { name: '常州总部', address: '江苏省常州市新北区', role: '集团总部 · 研发中心 · 核心生产基地', index: '01' },
  { name: '广州基地', address: '广东省广州市增城区', role: '华南生产基地 · 区域服务中心', index: '02' },
  { name: '海外服务', address: '覆盖东南亚、欧洲、北美', role: '全球技术支持 · 售后服务网络', index: '03' },
]

/* ========== 企业文化数据 [AI生成] ========== */
const cultureItems = [
  { title: '企业使命', content: '以技术创新驱动混合工艺变革，为全球客户提供高效、安全、智能的工艺解决方案。', icon: '01' },
  { title: '企业愿景', content: '成为全球领先的混合设备与工艺系统集成服务商，推动行业向智能化、绿色化方向发展。', icon: '02' },
  { title: '核心价值观', content: '追求完美，做到极致。以客户为中心，以品质为根本，以创新为动力，以共赢为目标。', icon: '03' },
]

/* ========== 荣誉资质 Tab ========== */
const honorsTabs = ['资质认证', '专利技术', '荣誉奖项']

export default function AboutPage() {
  const [activeHonorTab, setActiveHonorTab] = useState(0)

  const [count30, ref30] = useCountUp(30)
  const [count100, ref100] = useCountUp(100)
  const [count2000, ref2000] = useCountUp(2000)
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
        bgImage="https://images.unsplash.com/photo-1624027492684-327af1fb7559?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="page-body">
        {/* ===== 面包屑 ===== */}
        <div className="page-container">
          <Breadcrumb items={[{ label: '关于红运' }]} />
        </div>

        {/* ===== 公司简介 ===== */}
        <section className="about-page-section" id="company-intro">
          <div className="page-container">
            <h2 className="section-heading">公司简介</h2>
            <div className="about-intro-grid">
              <div className="about-intro-text">
                <p>
                  红运机械自1993年成立以来，专注于混合设备的研究、开发与制造，始终以技术创新为核心驱动力。经过三十余年的发展，已成长为集研发、设计、制造、安装、调试为一体的混合设备领域专业企业。
                  <span className="generated-tag">AI</span>
                </p>
                <p>
                  公司总部位于江苏常州，并在广州设有大型生产基地，拥有现代化厂房及数百台精密加工设备。产品广泛应用于新能源、化工、食品、医药、化妆品、电子材料等多个行业领域，为众多世界500强企业及行业龙头提供整线解决方案。
                  <span className="generated-tag">AI</span>
                </p>
                <div className="about-intro-stats">
                  <div ref={ref30}>
                    <div className="about-intro-stat-number">{count30}<span style={{ fontSize: '20px' }}>+</span></div>
                    <div className="about-intro-stat-unit">年技术积累</div>
                  </div>
                  <div ref={ref100}>
                    <div className="about-intro-stat-number">{count100}<span style={{ fontSize: '20px' }}>+</span></div>
                    <div className="about-intro-stat-unit">专利技术</div>
                  </div>
                  <div ref={ref2000}>
                    <div className="about-intro-stat-number">{count2000}<span style={{ fontSize: '20px' }}>+</span></div>
                    <div className="about-intro-stat-unit">服务客户</div>
                  </div>
                </div>
              </div>
              <div className="about-intro-image">
                <ImagePlaceholder height="400px" label="公司外景 / 厂区鸟瞰图" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 企业宣传片 ===== */}
        <section className="about-page-section" id="promo-video">
          <div className="page-container">
            <h2 className="section-heading">企业宣传片</h2>
            <div className="about-video-wrapper">
              <div className="about-video-placeholder">
                <ImagePlaceholder height="520px" label="企业宣传片封面 16:9" />
                <button className="about-video-play" aria-label="播放宣传片">
                  <IconCircleMediaPlayFill24 size={36} />
                </button>
              </div>
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
                  <div className="about-culture-card-icon">{item.icon}</div>
                  <h3 className="about-culture-card-title">
                    {item.title}
                    <span className="generated-tag">AI</span>
                  </h3>
                  <p className="about-culture-card-desc">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 发展历程 ===== */}
        <section className="about-page-section" id="history">
          <div className="page-container">
            <h2 className="section-heading">
              发展历程
              <span className="generated-tag">AI</span>
            </h2>
            <div className="about-timeline">
              <div className="about-timeline-line" />
              {timelineData.map((item, index) => (
                <div className={`about-timeline-item fade-up ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
                  <div className="about-timeline-dot" />
                  <div className="about-timeline-content">
                    <span className="about-timeline-year">{item.year}</span>
                    <h4 className="about-timeline-title">{item.title}</h4>
                    <p className="about-timeline-desc">{item.desc}</p>
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
              公司拥有常州、广州两大现代化生产基地，配备数百台精密加工设备，年产能超千台套，为客户提供从设计到交付的一站式服务。
              <span className="generated-tag">AI</span>
            </p>
            <div className="about-production-grid">
              <div className="about-production-card">
                <ImagePlaceholder height="260px" label="常州生产基地鸟瞰" />
                <div className="about-production-card-info">
                  <h3>常州总部基地</h3>
                  <p>集团总部所在地，承担核心设备的研发设计与精密制造，配备大型数控加工中心与智能装配车间。</p>
                </div>
              </div>
              <div className="about-production-card">
                <ImagePlaceholder height="260px" label="广州生产基地鸟瞰" />
                <div className="about-production-card-info">
                  <h3>广州生产基地</h3>
                  <p>华南核心制造基地，辐射珠三角及东南亚市场，专注于大型成套设备的制造与系统集成。</p>
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
                <h3>
                  红运混合技术实验室
                  <span className="generated-tag">AI</span>
                </h3>
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
                <ImagePlaceholder height="320px" label="研发实验室 / 测试设备" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 全球化布局 ===== */}
        <section className="about-page-section" id="global">
          <div className="page-container">
            <h2 className="section-heading">全球化布局</h2>
            <div className="about-global-map">
              <ImagePlaceholder height="420px" label="全球布局地图 / 业务覆盖区域" />
            </div>
            <div className="about-global-branches">
              {globalBranches.map((branch, index) => (
                <div className={`about-global-branch fade-up fade-up-delay-${index + 1}`} key={index}>
                  <span className="about-global-branch-index font-din">{branch.index}</span>
                  <h3 className="about-global-branch-name">{branch.name}</h3>
                  <p className="about-global-branch-address">{branch.address}</p>
                  <p className="about-global-branch-role">{branch.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 资质/荣誉 ===== */}
        <section className="about-page-section" id="honors">
          <div className="page-container">
            <h2 className="section-heading">资质 / 荣誉</h2>
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
            <div className="about-honors-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div className="about-honors-item" key={i}>
                  <ImagePlaceholder height="180px" label={`${honorsTabs[activeHonorTab]} ${i}`} />
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
              与宁德时代、比亚迪、中创新航、国轩高科等行业龙头企业建立长期战略合作关系，产品遍布全球30+国家和地区。
              <span className="generated-tag">AI</span>
            </p>
            <div className="about-partners-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <div className="about-partner-logo-item" key={i}>
                  <ImagePlaceholder height="80px" label={`合作伙伴 Logo ${i}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
