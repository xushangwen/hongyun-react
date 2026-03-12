import { useState, useEffect } from 'react'
import { IconPhoneOutline24, IconMapPinOutline24, IconMessageBubbleUserOutline24, IconUsersShakingHandsOutline24 } from 'nucleo-core-outline-24'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'

/* ========== 联系方式数据 [部分AI生成] ========== */
const contactCards = [
  {
    Icon: IconPhoneOutline24,
    title: '全国服务热线',
    items: [
      { label: '全国客服', value: '400 915 3366', isPhone: true },
      { label: '常州总部', value: '0519-8888 8888', isPhone: true },
      { label: '广州基地', value: '020-8888 8888', isPhone: true },
    ],
  },
  {
    Icon: IconMapPinOutline24,
    title: '公司地址',
    items: [
      { label: '常州总部', value: '江苏省常州市新北区（详细地址待确认）' },
      { label: '广州基地', value: '广东省广州市增城区（详细地址待确认）' },
    ],
  },
  {
    Icon: IconMessageBubbleUserOutline24,
    title: '商务邮箱',
    items: [
      { label: '商务合作', value: 'business@hongyun.com' },
      { label: '技术咨询', value: 'tech@hongyun.com' },
    ],
  },
  {
    Icon: IconUsersShakingHandsOutline24,
    title: '工作时间',
    items: [
      { label: '周一至周五', value: '08:30 - 17:30' },
      { label: '周末/节假日', value: '技术支持热线照常服务' },
    ],
  },
]

/* ========== 行业选项 ========== */
const industryOptions = [
  '新能源 / 锂电池',
  '固态电池',
  '化工 / 涂料',
  '制胶 / 密封胶',
  '食品',
  '医药',
  '化妆品',
  '电子材料',
  '其他行业',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    email: '',
    industry: '',
    needs: '',
  })

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: 表单提交逻辑
  }

  return (
    <>
      <PageHero
        title="联系我们"
        subtitle="专业团队随时为您提供技术支持与商务咨询"
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="page-body">
        <div className="page-container">
          <Breadcrumb items={[{ label: '联系我们' }]} />
        </div>

        {/* ===== 联系方式展示 ===== */}
        <section className="contact-page-section">
          <div className="page-container">
            <h2 className="section-heading">联系方式</h2>
            <div className="contact-info-grid">
              {contactCards.map((card, index) => (
                <div className="contact-info-card" key={index}>
                  <div className="contact-info-card-icon">
                    <card.Icon size={24} />
                  </div>
                  <h3 className="contact-info-card-title">{card.title}</h3>
                  <div className="contact-info-card-items">
                    {card.items.map((item, i) => (
                      <div className="contact-info-item" key={i}>
                        {item.label && <span className="contact-info-label">{item.label}</span>}
                        <span className="contact-info-value">
                          {item.isPhone ? (
                            <a href={`tel:${item.value.replace(/\s/g, '')}`}>{item.value}</a>
                          ) : (
                            item.value
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 地图占位 */}
            <div className="contact-map-section">
              <ImagePlaceholder height="360px" label="公司位置地图 / 百度地图嵌入" />
            </div>
          </div>
        </section>

        {/* ===== 技术咨询表单 ===== */}
        <section className="contact-page-section contact-page-section--gray" id="inquiry">
          <div className="page-container">
            <h2 className="section-heading">技术咨询</h2>
            <div className="contact-form-wrapper">
              {/* 左侧品牌面板 */}
              <div className="contact-brand-panel">
                <div className="contact-brand-logo">红运<span>机械</span></div>
                <p className="contact-brand-tagline">专注混合工艺<br />三十年技术积淀</p>
                <div className="contact-brand-divider" />
                <div className="contact-brand-items">
                  <div className="contact-brand-item">
                    <span className="contact-brand-item-label">响应时效</span>
                    <span className="contact-brand-item-value">24小时内技术团队回复</span>
                  </div>
                  <div className="contact-brand-item">
                    <span className="contact-brand-item-label">服务热线</span>
                    <span className="contact-brand-item-value">400 915 3366</span>
                  </div>
                  <div className="contact-brand-item">
                    <span className="contact-brand-item-label">商务邮箱</span>
                    <span className="contact-brand-item-value">business@hongyun.com</span>
                  </div>
                </div>
              </div>
              {/* 右侧表单 */}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="contact-name">姓名 *</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className="contact-form-input"
                      placeholder="您的姓名"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="contact-phone">联系电话 *</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      className="contact-form-input"
                      placeholder="您的电话号码"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="contact-email">电子邮箱</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className="contact-form-input"
                      placeholder="您的邮箱（选填）"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="contact-company">公司名称 *</label>
                    <input
                      type="text"
                      id="contact-company"
                      name="company"
                      className="contact-form-input"
                      placeholder="您所在的公司"
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="contact-industry">所属行业</label>
                    <select
                      id="contact-industry"
                      name="industry"
                      className="contact-form-select"
                      value={formData.industry}
                      onChange={handleChange}
                    >
                      <option value="">请选择行业</option>
                      {industryOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="contact-form-field" />
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="contact-needs">需求描述 *</label>
                  <textarea
                    id="contact-needs"
                    name="needs"
                    className="contact-form-textarea"
                    placeholder="请简要描述您的工艺需求、物料类型、产能要求等信息"
                    rows={6}
                    value={formData.needs}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  提交咨询
                  <IconArrowRightOutline24 size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
