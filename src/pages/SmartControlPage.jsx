import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import SolutionContactForm from '../components/SolutionContactForm'

const features = [
  {
    img: '/ref-images/image_20221013_1665646619_156193.png',
    title: '数据实时采集',
    desc: '全流程工艺参数实时采集，温度、压力、转速、流量等关键数据秒级上传，随时掌握生产状态。',
  },
  {
    img: '/ref-images/image_20221013_1665646631_630004.png',
    title: '生产全周期管理',
    desc: '从原料投入到浆料产出的完整生产周期数字化管理，批次追溯清晰，品质可回溯。',
  },
  {
    img: '/ref-images/image_20221013_1665646653_844851.png',
    title: '能源跟踪管理',
    desc: '精准统计各工序能耗，识别用能异常，为节能优化和成本控制提供数据支撑。',
  },
  {
    img: '/ref-images/image_20221013_1665646590_44974.png',
    title: '生产可视化',
    desc: '大屏实时展示设备状态、产量进度、告警信息，管理层与操作层同步掌握产线全貌。',
  },
]

export default function SmartControlPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <PageHero
        title="智能控制系统"
        subtitle="高效循环制浆系统 · 数字化管控中枢"
        bgImage="/ref-images/image_20220930_1664527235_947013.jpg"
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '新能源行业', path: '/solutions#new-energy' },
          { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
          { label: '智能控制系统' },
        ]} />

        {/* ===== 系统特点 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">系统特点</h2>
            <div className="sub-features-grid">
              {features.map((feat, i) => (
                <div key={i} className={`sub-feature-card fade-up fade-up-delay-${(i % 3) + 1}`}>
                  <div className="sub-feature-img-wrap">
                    <img src={feat.img} alt={feat.title} className="sub-feature-img" loading="lazy" />
                  </div>
                  <div className="sub-feature-body">
                    <h3 className="sub-feature-title">{feat.title}</h3>
                    <p className="sub-feature-desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 系统展示 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">系统展示</h2>
            <div className="sub-display-wrap fade-up fade-up-delay-1">
              <img
                src="/ref-images/image_20221018_1666077014_304373.jpg"
                alt="智能控制系统展示"
                className="sub-display-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ===== 客户案例 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">客户案例</h2>
            <div className="cp-case-block fade-up fade-up-delay-1">
              <div className="cp-case-img-wrap">
                <img
                  src="/ref-images/image_20221014_1665711961_98396.jpg"
                  alt="河南某知名集团锂电池公司工程案例"
                  className="cp-case-img"
                  loading="lazy"
                />
              </div>
              <div className="cp-case-content">
                <span className="cp-case-tag">工程案例</span>
                <h3 className="cp-case-title">河南某知名集团锂电池公司</h3>
                <p className="cp-case-desc">
                  为某头部锂电池材料企业提供完整的智能控制系统解决方案，实现制浆全流程数据采集、工艺参数闭环管控、异常预警与远程监控，显著提升产线管理效率。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 联系 CTA ===== */}
        <SolutionContactForm solutionName="智能控制系统" />
      </div>
    </>
  )
}
