import React, { useState } from 'react'
import {
  IconPhoneOutline24,
  IconEnvelopeContentOutline24,
  IconMapPinOutline24,
  IconArrowRightOutline24,
  IconCircleCheckOutline24,
} from 'nucleo-core-outline-24'

const companyInfo = [
  {
    Icon: IconPhoneOutline24,
    label: '全国服务热线',
    value: '400 915 3366',
    link: 'tel:4009153366',
  },
  {
    Icon: IconEnvelopeContentOutline24,
    label: '商务邮箱',
    value: 'hy@gzhy.cn',
    link: 'mailto:hy@gzhy.cn',
  },
  {
    Icon: IconMapPinOutline24,
    label: '总部地址',
    value: '江苏省常州市武进高新区南湖西路8-8号',
    link: null,
  },
]

export default function SolutionContactForm({ solutionName = '制浆解决方案' }) {
  const [form, setForm] = useState({ name: '', phone: '', company: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = '请填写姓名'
    if (!form.phone.trim()) errs.phone = '请填写联系电话'
    else if (!/^[\d\s\-+]{7,15}$/.test(form.phone.trim())) errs.phone = '请输入有效电话号码'
    if (!form.company.trim()) errs.company = '请填写公司名称'
    if (!form.message.trim()) errs.message = '请填写留言内容'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitting(true)
    // 模拟提交（实际对接后端 API 时替换此处）
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 900)
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <section className="sol-form-section">
      <div className="page-container">
        <div className="sol-form-layout">
          {/* ── 左侧：公司信息 ── */}
          <div className="sol-form-info">
            <span className="sol-form-eyebrow">联系我们</span>
            <h2 className="sol-form-title">获取{solutionName}方案</h2>
            <p className="sol-form-subtitle">
              填写需求信息，我们的专业工程师将在 1 个工作日内与您联系，
              提供一对一技术咨询和定制化解决方案。
            </p>

            <div className="sol-form-contacts">
              {companyInfo.map(({ Icon, label, value, link }, i) => (
                <div key={i} className="sol-form-contact-item">
                  <div className="sol-form-contact-icon">
                    <Icon size={20} />
                  </div>
                  <div className="sol-form-contact-content">
                    <span className="sol-form-contact-label">{label}</span>
                    {link ? (
                      <a href={link} className="sol-form-contact-value">{value}</a>
                    ) : (
                      <span className="sol-form-contact-value">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="sol-form-company-card">
              <p className="sol-form-company-name">江苏红运智能装备有限公司</p>
              <p className="sol-form-company-sub">广州红尚机械制造有限公司</p>
              <p className="sol-form-company-hours">工作时间：周一至周五 08:30–17:30</p>
            </div>
          </div>

          {/* ── 右侧：表单 ── */}
          <div className="sol-form-card">
            {submitted ? (
              <div className="sol-form-success">
                <div className="sol-form-success-icon">
                  <IconCircleCheckOutline24 size={48} />
                </div>
                <h3 className="sol-form-success-title">提交成功！</h3>
                <p className="sol-form-success-desc">
                  感谢您的咨询，我们的工程师将在 1 个工作日内联系您。
                </p>
                <button
                  className="sol-form-reset-btn"
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', company: '', email: '', message: '' }) }}
                >
                  再次提交
                </button>
              </div>
            ) : (
              <form className="sol-form-inner" onSubmit={handleSubmit} noValidate>
                <div className="sol-form-row sol-form-row--2col">
                  <div className={`sol-form-field ${errors.name ? 'sol-form-field--error' : ''}`}>
                    <label className="sol-form-label">姓名 <span className="sol-form-required">*</span></label>
                    <input
                      type="text"
                      className="sol-form-input"
                      placeholder="请输入您的姓名"
                      value={form.name}
                      onChange={handleChange('name')}
                    />
                    {errors.name && <span className="sol-form-error-msg">{errors.name}</span>}
                  </div>
                  <div className={`sol-form-field ${errors.phone ? 'sol-form-field--error' : ''}`}>
                    <label className="sol-form-label">联系电话 <span className="sol-form-required">*</span></label>
                    <input
                      type="tel"
                      className="sol-form-input"
                      placeholder="请输入手机或固话"
                      value={form.phone}
                      onChange={handleChange('phone')}
                    />
                    {errors.phone && <span className="sol-form-error-msg">{errors.phone}</span>}
                  </div>
                </div>

                <div className="sol-form-row sol-form-row--2col">
                  <div className={`sol-form-field ${errors.company ? 'sol-form-field--error' : ''}`}>
                    <label className="sol-form-label">公司名称 <span className="sol-form-required">*</span></label>
                    <input
                      type="text"
                      className="sol-form-input"
                      placeholder="请输入公司全称"
                      value={form.company}
                      onChange={handleChange('company')}
                    />
                    {errors.company && <span className="sol-form-error-msg">{errors.company}</span>}
                  </div>
                  <div className="sol-form-field">
                    <label className="sol-form-label">邮箱</label>
                    <input
                      type="email"
                      className="sol-form-input"
                      placeholder="选填"
                      value={form.email}
                      onChange={handleChange('email')}
                    />
                  </div>
                </div>

                <div className={`sol-form-field ${errors.message ? 'sol-form-field--error' : ''}`}>
                  <label className="sol-form-label">留言内容 <span className="sol-form-required">*</span></label>
                  <textarea
                    className="sol-form-textarea"
                    rows={5}
                    placeholder={`请简述您对${solutionName}的需求，例如产线规模、工艺要求等`}
                    value={form.message}
                    onChange={handleChange('message')}
                  />
                  {errors.message && <span className="sol-form-error-msg">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className={`sol-form-submit ${submitting ? 'sol-form-submit--loading' : ''}`}
                  disabled={submitting}
                >
                  {submitting ? '提交中…' : (
                    <>提交需求 <IconArrowRightOutline24 size={18} /></>
                  )}
                </button>

                <p className="sol-form-privacy">
                  提交即表示您同意我们将联系信息用于商务咨询回复，不会泄露给第三方。
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
