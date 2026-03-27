import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import SolutionContactForm from '../components/SolutionContactForm'

const features = [
  {
    img: '/ref-images/image_20221013_1665646371_696441.png',
    title: '喂料精度高，产品品质稳定',
    desc: '高精度失重秤配料系统，计量误差控制在±0.1%以内，确保每批次配方精准复现。',
  },
  {
    img: '/ref-images/image_20221013_1665646383_904574.png',
    title: '模块化设计，满足多配方快速切换',
    desc: '快拆型结构支持工艺配方的快速切换，适应多品种、多配方柔性生产需求。',
  },
  {
    img: '/ref-images/image_20221013_1665646397_724591.png',
    title: '投料无尘，换料清理残留少',
    desc: '密封投料设计，粉尘零外溢。快拆结构便于彻底清洁，换料残留量极低，防止交叉污染。',
  },
  {
    img: '/ref-images/image_20221013_1665646413_822138.png',
    title: '支持小批量配方自动配料',
    desc: '兼容从实验室级到大批量量产的配料需求，单台设备覆盖多种生产规模。',
  },
]

export default function MeteringDosingPage() {
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
        title="计量配料系统"
        subtitle="高效循环制浆系统 · 精准配比控制单元"
        bgImage="/ref-images/image_20220930_1664527668_108218.jpg"
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '新能源行业', path: '/solutions#new-energy' },
          { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
          { label: '计量配料系统' },
        ]} />

        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">系统特点</h2>
            <div className="sub-features-grid">
              {features.map((feat, i) => (
                <div key={i} className={`sub-feature-card fade-up fade-up-delay-${(i % 2) + 1}`}>
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
                src="/ref-images/image_20221018_1666077014_304373.jpg"
                alt="计量配料系统展示"
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
                  为某锂电池材料企业提供计量配料系统整体解决方案，实现多种固体粉末及液体原料的高精度自动配比，批次重复精度达到±0.1%，显著提升产品一致性。
                </p>
              </div>
            </div>
          </div>
        </section>

        <SolutionContactForm solutionName="计量配料系统" />
      </div>
    </>
  )
}
