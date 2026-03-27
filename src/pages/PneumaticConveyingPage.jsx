import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import SolutionContactForm from '../components/SolutionContactForm'

const features = [
  {
    img: '/ref-images/image_20221013_1665646226_231750.png',
    title: '专业团队，精准输送参数',
    desc: '专业的气力输送设计团队，提供精准输送参数，输送过程物料损耗小，保障粉体品质不受影响。',
  },
  {
    img: '/ref-images/image_20221013_1665646254_567586.png',
    title: '全密闭管道输送，无尘无泄漏',
    desc: '全密闭式管道输送，无粉尘外溢，不易泄露，为操作人员提供洁净安全的工作环境。',
  },
  {
    img: '/ref-images/image_20221013_1665646305_313637.png',
    title: '清管装置，降低堵管风险',
    desc: '入料口采用清管装置，配合双层管设计，降低物料粘壁、堵管风险，系统运行更稳定可靠。',
  },
]

export default function PneumaticConveyingPage() {
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
        title="气力输送系统"
        subtitle="高效循环制浆系统 · 粉体密闭输送单元"
        bgImage="/ref-images/image_20220930_1664527738_591730.jpg"
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '新能源行业', path: '/solutions#new-energy' },
          { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
          { label: '气力输送系统' },
        ]} />

        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">系统特点</h2>
            <div className="sub-features-grid">
              {features.map((feat, i) => (
                <div key={i} className={`sub-feature-card fade-up fade-up-delay-${i + 1}`}>
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

        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">系统展示</h2>
            <div className="sub-display-wrap fade-up fade-up-delay-1">
              <img
                src="/ref-images/image_20221013_1665648798_928908.jpg"
                alt="气力输送系统展示"
                className="sub-display-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">客户案例</h2>
            <div className="cp-case-block fade-up fade-up-delay-1">
              <div className="cp-case-img-wrap">
                <img
                  src="/ref-images/image_20221014_1665711961_98396.jpg"
                  alt="工程案例"
                  className="cp-case-img"
                  loading="lazy"
                />
              </div>
              <div className="cp-case-content">
                <span className="cp-case-tag">工程案例</span>
                <h3 className="cp-case-title">河南某知名集团锂电池公司</h3>
                <p className="cp-case-desc">
                  为某锂电池材料企业提供气力输送系统整体解决方案，实现粉体原料从储仓到制浆机的全密闭无尘输送，彻底消除粉尘污染隐患，提升车间生产环境品质。
                </p>
              </div>
            </div>
          </div>
        </section>

        <SolutionContactForm solutionName="气力输送系统" />
      </div>
    </>
  )
}
