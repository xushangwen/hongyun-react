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
    img: '/ref-images/image_20221006_1665021397_909515.png',
    title: '中央集尘系统与单点除尘器配套，投料无扬尘',
    desc: '中央集尘系统与单点除尘器协同工作，投料全程无粉尘外溢，为操作人员创造洁净安全的生产环境。',
  },
  {
    img: '/ref-images/image_20221006_1665021328_209225.png',
    title: '生产资源条码化管理，确保投料准确可追溯',
    desc: '原料条码扫描与系统关联，确保投料品种、批次、数量准确无误，实现从原料到成品的全程可追溯管理。',
  },
  {
    img: '/ref-images/image_20221006_1665021306_491928.png',
    title: '智能化控制，数据实时采集上传',
    desc: '智能控制系统自动记录投料时间、品种、重量等关键数据，实时上传至 MES 系统，支持精细化生产管理。',
  },
  {
    img: '/ref-images/image_20221006_1665021259_749694.png',
    title: '针对特殊物料的个性化专项控制',
    desc: '针对吸水性强、流动性差、气味刺激等特殊物料特性进行专项控制设计，保障各类物料投料安全顺畅。',
  },
  {
    img: '/ref-images/image_20221019_1666173416_566373.png',
    title: '个性化规划设计，适配多种车间环境',
    desc: '根据客户需求及车间实际布局进行个性化规划，灵活适配不同厂房结构与生产工艺，实现最优布局方案。',
  },
]

const coreEquipment = [
  {
    name: '小袋解包站',
    img: '/ref-images/image_20240118_1705565893_80363.png',
  },
  {
    name: '吨袋解包站',
    img: '/ref-images/image_20221014_1665732359_503939.png',
  },
  {
    name: 'FFS 重膜包装机',
    img: '/ref-images/image_20241206_1733452669_188551.png',
  },
]

const customerCases = [
  {
    title: '河南某知名集团锂电池公司工程案例',
    desc: '河南**新能源股份有限公司专业从事高性能二次电池材料的研发、生产和销售，是中国化学与物理电源行业协会副理事长单位。',
    img: '/ref-images/image_20221014_1665711961_98396.jpg',
  },
  {
    title: '安庆某尼龙材料解包投料系统工程案例',
    desc: '安庆**尼龙材料科技有限公司一家生产BOPA薄膜的制造型企业，计划投资5.1亿元，达产后年产BOPA薄膜2.5万吨。',
    img: '/ref-images/image_20221014_1665712980_529731.jpg',
  },
  {
    title: '浙江某化工集团解包投料工程案例',
    desc: '**化学集团是一家全球化的功能化学公司，重点聚焦纺织、造纸、塑料与建筑四大行业。',
    img: '/ref-images/image_20221014_1665712966_182878.jpg',
  },
]

const industryOptions = [
  '锂电池 / 新能源', '固态电池', '涂料 / 油墨', '化工 / 精细化工', '高分子材料', '其他',
]

export default function UnpackingFeedingPage() {
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
            src="/ref-images/upfile_image_20221013_1665664957_254781.jpg"
            alt="解包投料系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb page-container">
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
              解包投料系统实现小袋与吨袋原料的自动拆包、无尘投料及数据采集。配备中央集尘系统与条码化管理，大幅降低人工强度，全程可追溯，为浆料制备的原料端提供精准、洁净的自动化保障。
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
                <img src="/ref-images/image_20221018_1666077038_329607.jpg" alt="解包投料系统展示" loading="lazy" />
              </div>
              <div className="sub-bento-accent">
                <span className="sub-bento-accent-num">UF</span>
                <span className="sub-bento-accent-label">System Display</span>
                <p className="sub-bento-accent-title">自动拆包 无尘上料</p>
              </div>
              <div className="sub-bento-secondary">
                <img src="/ref-images/upfile_image_20221013_1665664957_254781.jpg" alt="解包投料系统" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 核心设备 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">核心设备</h2>
            <div className="sub-equipment-grid">
              {coreEquipment.map((eq, i) => (
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
