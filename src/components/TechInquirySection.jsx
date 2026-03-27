import React, { useState } from 'react'
import { IconArrowRightOutline24, IconCircleCheckOutline24 } from 'nucleo-core-outline-24'
import inquiryBgImg from '../assets/img/CleanShot 2026-03-13 at 12.57.12@2x.png'

const defaultIndustryOptions = [
  '新能源行业 / 锂电池', '固态电池', '化工行业 / 涂料', '制胶 / 密封胶',
  '食品', '医药', '化妆品', '电子材料', '其他行业',
]

export default function TechInquirySection({ industryOptions = defaultIndustryOptions }) {
  const [formData, setFormData] = useState({
    name: '', phone: '', company: '', email: '', industry: '', needs: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleFormSubmit = (e) => { e.preventDefault(); setFormSubmitted(true) }

  return (
    <section className="page-section cp-inquiry-section">
      <div className="page-container">
        <h2 className="section-heading section-heading--center fade-up">技术咨询</h2>
        <p className="section-desc section-desc--center fade-up fade-up-delay-1">
          留下您的联系方式，专业技术团队将在 24 小时内与您联系，<br />为您量身定制解决方案。
        </p>
        {formSubmitted ? (
          <div className="contact-submit-success fade-up">
            <IconCircleCheckOutline24 size={56} className="contact-success-icon" />
            <h3>咨询已提交！</h3>
            <p>感谢您的咨询，我们的技术团队将在24小时内与您联系。</p>
            <button className="btn-primary" onClick={() => setFormSubmitted(false)}>继续咨询</button>
          </div>
        ) : (
          <div className="contact-form-wrapper fade-up fade-up-delay-2">
            <div
              className="contact-brand-panel"
              style={{ backgroundImage: `url(${inquiryBgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
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
                  <span className="contact-brand-item-value">hy@gzhy.cn</span>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="inq-name">姓名 *</label>
                  <input type="text" id="inq-name" name="name" className="contact-form-input" placeholder="您的姓名" value={formData.name} onChange={handleFormChange} required />
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="inq-phone">联系电话 *</label>
                  <input type="tel" id="inq-phone" name="phone" className="contact-form-input" placeholder="您的电话号码" value={formData.phone} onChange={handleFormChange} required />
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="inq-email">电子邮箱</label>
                  <input type="email" id="inq-email" name="email" className="contact-form-input" placeholder="您的邮箱（选填）" value={formData.email} onChange={handleFormChange} />
                </div>
              </div>
              <div className="contact-form-row">
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="inq-company">公司名称 *</label>
                  <input type="text" id="inq-company" name="company" className="contact-form-input" placeholder="您所在的公司" value={formData.company} onChange={handleFormChange} required />
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="inq-industry">所属行业</label>
                  <select id="inq-industry" name="industry" className="contact-form-select" value={formData.industry} onChange={handleFormChange}>
                    <option value="">请选择行业</option>
                    {industryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="contact-form-field" />
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="inq-needs">需求描述 *</label>
                <textarea
                  id="inq-needs" name="needs" className="contact-form-textarea"
                  placeholder="请简要描述您的工艺需求、物料类型、产能要求等信息"
                  rows={6} value={formData.needs} onChange={handleFormChange} required
                />
              </div>
              <button type="submit" className="btn-primary">
                提交咨询
                <IconArrowRightOutline24 size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
