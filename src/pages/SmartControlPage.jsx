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
    img: '/ref-images/image_20221013_1665646619_156193.png',
    title: '数据实时采集',
    desc: '全流程工艺参数秒级采集，温度、压力、转速、流量等关键数据实时上传，随时掌握产线运行状态。',
  },
  {
    img: '/ref-images/image_20221013_1665646631_630004.png',
    title: '生产全周期管理',
    desc: '从原料投入到浆料产出的完整生产周期数字化闭环管理，批次追溯清晰，品质可回溯。',
  },
  {
    img: '/ref-images/image_20221013_1665646653_844851.png',
    title: '能源跟踪管理',
    desc: '精准统计各工序能耗，自动识别用能异常，为节能优化与成本管控提供精准数据支撑。',
  },
  {
    img: '/ref-images/image_20221013_1665646590_44974.png',
    title: '生产可视化',
    desc: '大屏实时展示设备状态、产量进度与告警信息，管理层与操作层同步掌握产线全貌。',
  },
]

const customerCases = [
  {
    title: '河南某知名集团锂电池公司工程案例',
    desc: '河南**新能源股份有限公司专业从事高性能二次电池材料的研发、生产和销售，是中国化学与物理电源行业协会副理事长单位，设有国家级企业技术中心、博士后科研工作站、省级高效二次电池材料工程技术研究中心等多个高水平的研发平台。',
    img: '/ref-images/image_20221014_1665711961_98396.jpg',
  },
  {
    title: '安庆某尼龙材料气力输送系统工程案例',
    desc: '安庆**尼龙材料科技有限公司一家生产双向拉伸聚酰胺（BOPA)薄膜的制造型企业，注册资金2.3亿元，计划投资5.1亿元，达产后年产BOPA薄膜2.5万吨，产值10亿元。',
    img: '/ref-images/image_20221014_1665712980_529731.jpg',
  },
  {
    title: '浙江某化工集团气力输送工程案例',
    desc: '**化学集团是一家全球化的功能化学公司，重点聚焦纺织、造纸、塑料与建筑四大行业。坚持化学技术造福人类的信仰，以领先的化学解决方案让基底界面更卓越，致力于成为功能化学领域的全球专家。',
    img: '/ref-images/image_20221014_1665712966_182878.jpg',
  },
]

const industryOptions = [
  '锂电池 / 新能源', '固态电池', '涂料 / 油墨', '化工 / 精细化工',
  '高分子材料', '日用化学品', '其他',
]

export default function SmartControlPage() {
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
            src="/ref-images/upfile_image_20221013_1665664862_757113.jpg"
            alt="智能控制系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb page-container">
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
                <img src="/ref-images/image_20221018_1666077014_304373.jpg" alt="智能控制系统展示" loading="lazy" />
              </div>
              <div className="sub-bento-accent">
                <span className="sub-bento-accent-num">SC</span>
                <span className="sub-bento-accent-label">System Display</span>
                <p className="sub-bento-accent-title">智能制造 全程可控</p>
              </div>
              <div className="sub-bento-secondary">
                <img src="/ref-images/upfile_image_20221013_1665664862_757113.jpg" alt="智能控制系统" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 客户案例 ===== */}
        <section className="page-section page-section--gray">
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
