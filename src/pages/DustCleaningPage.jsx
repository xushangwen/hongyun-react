import React, { useEffect, useState } from 'react'
import {
  IconChevronLeftOutline24,
  IconChevronRightOutline24,
  IconCircleCheckOutline24,
} from 'nucleo-core-outline-24'
import Breadcrumb from '../components/Breadcrumb'
import inquiryBgImg from '../assets/img/CleanShot 2026-03-13 at 12.57.12@2x.png'

const features = [
  {
    img: '/ref-images/image_20221013_1665648467_224398.png',
    title: '清除管道内浆料沉积，预防管道堵塞',
    desc: '智能清管系统定期清除管道内壁浆料沉积，有效预防堵管风险，保障系统长期稳定运行。',
  },
  {
    img: '/ref-images/image_20221013_1665646413_822138.png',
    title: '管道中端及末端回收产品，自动回收清管球',
    desc: '中端及末端回收设计，清管球全自动回收，减少物料浪费，大幅提升整体产品回收率。',
  },
  {
    img: '/ref-images/image_20221013_1665645490_953123.png',
    title: '空气 / 工艺产品推球，匀速控制，在线追踪',
    desc: '采用空气或工艺介质推动清管球，匀速精准控制，支持在线实时追踪清管球位置，安全可靠。',
  },
  {
    img: '/ref-images/image_20221013_1665646501_164542.png',
    title: '配套气力输送管道除尘，中央除尘 + 单点除尘',
    desc: '可为气力输送系统配套设计管道除尘系统，中央除尘系统与单点除尘设备协同工作，全面洁净。',
  },
  {
    img: '/ref-images/image_20221006_1665024186_35048.png',
    title: '可用于配方快速切换，确保无交叉污染',
    desc: '清洁系统支持产品配方快速切换场景，确保产品之间无交叉污染，适合多品种柔性生产线。',
  },
  {
    img: '/ref-images/image_20221013_1665646305_313637.png',
    title: '大大降低粉尘外扬，提供良好工作环境',
    desc: '全密封清洁方案大幅降低粉尘外扬可能性，为操作人员提供洁净安全的生产工作环境。',
  },
]

const includedEquipment = [
  { name: '清管球系统', img: '/ref-images/image_20221104_1667522683_673154.png' },
]

const customerCases = [
  {
    title: '河南某知名集团锂电池公司工程案例',
    desc: '河南**新能源股份有限公司专业从事高性能二次电池材料的研发、生产和销售，是中国化学与物理电源行业协会副理事长单位，设有国家级企业技术中心、博士后科研工作站等多个高水平研发平台。',
    img: '/ref-images/image_20221014_1665711961_98396.jpg',
  },
  {
    title: '安庆某尼龙材料气力输送系统工程案例',
    desc: '安庆**尼龙材料科技有限公司一家生产双向拉伸聚酰胺（BOPA)薄膜的制造型企业，注册资金2.3亿元，计划投资5.1亿元，达产后年产BOPA薄膜2.5万吨，产值10亿元。',
    img: '/ref-images/image_20221014_1665712980_529731.jpg',
  },
  {
    title: '浙江某化工集团气力输送工程案例',
    desc: '**化学集团是一家全球化的功能化学公司，重点聚焦纺织、造纸、塑料与建筑四大行业，以领先的化学解决方案让基底界面更卓越，致力于成为功能化学领域的全球专家。',
    img: '/ref-images/image_20221014_1665712966_182878.jpg',
  },
]

const industryOptions = [
  '锂电池 / 新能源', '固态电池', '涂料 / 油墨', '化工 / 精细化工',
  '高分子材料', '日用化学品', '其他',
]

export default function DustCleaningPage() {
  const [caseIndex, setCaseIndex] = useState(0)
  const [formData, setFormData] = useState({ name: '', phone: '', company: '', email: '', industry: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const prevCase = () => setCaseIndex((i) => (i - 1 + customerCases.length) % customerCases.length)
  const nextCase = () => setCaseIndex((i) => (i + 1) % customerCases.length)
  const handleFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const handleFormSubmit = (e) => { e.preventDefault(); setFormSubmitted(true) }

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="cp-sol-hero">
        <div className="cp-sol-hero-img-full">
          <img
            src="/ref-images/upfile_image_20221013_1665665043_123976.jpg"
            alt="除尘清洁系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb page-container">
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
              除尘清洁系统通过清管球系统与中央除尘管网的协同配合，实现管道内浆料残留的自动清除与粉尘抑制，保障生产环境洁净、产品配方无交叉污染。
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
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading section-heading--center fade-up">系统特点</h2>
            <div className="cp-feat-icon-grid">
              {features.map((feat, i) => (
                <div key={i} className={`cp-feat-icon-card fade-up fade-up-delay-${(i % 3) + 1}`}>
                  <div className="cp-feat-icon-wrap">
                    <img src={feat.img} alt={feat.title} className="cp-feat-icon-img" loading="lazy" />
                  </div>
                  <h3 className="cp-feat-icon-title">{feat.title}</h3>
                  <p className="cp-feat-icon-desc">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 系统展示 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">系统展示</h2>
            <div className="sub-bento-grid fade-up fade-up-delay-1">
              <div className="sub-bento-main">
                <img src="/ref-images/image_20240315_1710484488_686402.jpg" alt="除尘清洁系统展示" loading="lazy" />
              </div>
              <div className="sub-bento-accent">
                <span className="sub-bento-accent-num">DC</span>
                <span className="sub-bento-accent-label">System Display</span>
                <p className="sub-bento-accent-title">洁净生产 零污染切换</p>
              </div>
              <div className="sub-bento-secondary">
                <img src="/ref-images/upfile_image_20221013_1665665043_123976.jpg" alt="除尘清洁系统" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 包含设备 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">包含设备</h2>
            <div className="sub-equipment-grid">
              {includedEquipment.map((eq, i) => (
                <div key={i} className={`sub-equipment-card sub-equipment-card--static fade-up fade-up-delay-${i + 1}`}>
                  <div className="sub-equipment-img-wrap">
                    <img src={eq.img} alt={eq.name} className="sub-equipment-img" loading="lazy" />
                  </div>
                  <div className="sub-equipment-info">
                    <h3 className="sub-equipment-name">{eq.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 客户案例 ===== */}
        <section className="page-section">
          <div className="page-container">
            <div className="cp-carousel-header fade-up">
              <h2 className="section-heading cp-carousel-heading">客户案例</h2>
              <div className="cp-carousel-nav">
                <span className="cp-carousel-count">
                  {String(caseIndex + 1).padStart(2, '0')} / {String(customerCases.length).padStart(2, '0')}
                </span>
                <button className="cp-carousel-btn" onClick={prevCase} aria-label="上一个案例">
                  <IconChevronLeftOutline24 />
                </button>
                <button className="cp-carousel-btn" onClick={nextCase} aria-label="下一个案例">
                  <IconChevronRightOutline24 />
                </button>
              </div>
            </div>
            <div className="cp-carousel-body" key={caseIndex}>
              <div className="cp-carousel-img-col">
                <img src={customerCases[caseIndex].img} alt={customerCases[caseIndex].title} className="cp-carousel-img" loading="lazy" />
              </div>
              <div className="cp-carousel-content-col">
                <h3 className="cp-carousel-client">{customerCases[caseIndex].title}</h3>
                <p className="cp-carousel-desc">{customerCases[caseIndex].desc}</p>
              </div>
            </div>
            <div className="cp-carousel-dots">
              {customerCases.map((_, i) => (
                <button key={i} className={`cp-carousel-dot${i === caseIndex ? ' cp-carousel-dot--active' : ''}`} onClick={() => setCaseIndex(i)} aria-label={`案例 ${i + 1}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== 技术咨询 ===== */}
        <section className="cp-inquiry-section">
          <div className="page-container">
            <div className="cp-inquiry-inner">
              <div className="contact-brand-panel" style={{ backgroundImage: `url(${inquiryBgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="contact-brand-content">
                  <p className="contact-brand-eyebrow fade-up">技术咨询</p>
                  <h2 className="contact-brand-title fade-up fade-up-delay-1">获取专属解决方案</h2>
                  <p className="contact-brand-desc fade-up fade-up-delay-2">填写需求信息，红运机械技术团队将在 1 个工作日内与您联系，提供针对性的系统方案建议。</p>
                  <ul className="contact-brand-checklist fade-up fade-up-delay-3">
                    {['一站式工程咨询', '定制化系统设计', '专业技术支持'].map((item) => (
                      <li key={item}><IconCircleCheckOutline24 /><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="sol-form-card fade-up fade-up-delay-1">
                {formSubmitted ? (
                  <div className="sol-form-success">
                    <IconCircleCheckOutline24 />
                    <h3>提交成功</h3>
                    <p>感谢您的咨询，我们将尽快与您联系。</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} autoComplete="off">
                    <h3 className="sol-form-title">发送询问</h3>
                    <div className="sol-form-row sol-form-row--2col">
                      <div className="sol-form-group">
                        <label className="sol-form-label">姓名 <span>*</span></label>
                        <input className="sol-form-input" name="name" value={formData.name} onChange={handleFormChange} required />
                      </div>
                      <div className="sol-form-group">
                        <label className="sol-form-label">联系电话 <span>*</span></label>
                        <input className="sol-form-input" name="phone" value={formData.phone} onChange={handleFormChange} required />
                      </div>
                    </div>
                    <div className="sol-form-row sol-form-row--2col">
                      <div className="sol-form-group">
                        <label className="sol-form-label">公司名称 <span>*</span></label>
                        <input className="sol-form-input" name="company" value={formData.company} onChange={handleFormChange} required />
                      </div>
                      <div className="sol-form-group">
                        <label className="sol-form-label">邮箱</label>
                        <input className="sol-form-input" name="email" value={formData.email} onChange={handleFormChange} />
                      </div>
                    </div>
                    <div className="sol-form-group">
                      <label className="sol-form-label">所属行业</label>
                      <select className="sol-form-input sol-form-select" name="industry" value={formData.industry} onChange={handleFormChange}>
                        <option value="">请选择</option>
                        {industryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="sol-form-group">
                      <label className="sol-form-label">留言内容 <span>*</span></label>
                      <textarea className="sol-form-input sol-form-textarea" name="message" rows={4} value={formData.message} onChange={handleFormChange} required />
                    </div>
                    <button type="submit" className="sol-form-submit">提交咨询</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
