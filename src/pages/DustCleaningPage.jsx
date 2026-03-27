import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import SolutionContactForm from '../components/SolutionContactForm'

const features = [
  {
    img: '/ref-images/image_20221013_1665648467_224398.png',
    title: '清除管道内浆料沉积，预防管道堵塞',
    desc: '智能清管系统定期清除管道内壁浆料沉积，有效预防堵管风险，保障系统长期稳定运行。',
  },
  {
    img: '/ref-images/image_20221013_1665646413_822138.png',
    title: '管道末端回收产品，自动回收清管球',
    desc: '中端及末端回收设计，清管球自动回收，减少物料浪费，提升整体产品回收率。',
  },
  {
    img: '/ref-images/image_20221013_1665645490_953123.png',
    title: '空气/工艺产品推球，在线追踪',
    desc: '采用空气或工艺介质推动清管球，匀速控制，支持在线实时追踪清管球位置，安全可靠。',
  },
  {
    img: '/ref-images/image_20221013_1665646501_164542.png',
    title: '配套气力输送系统，中央除尘方案',
    desc: '可为气力输送系统配套设计管道除尘系统，中央除尘系统与单点除尘设备协同工作。',
  },
  {
    img: '/ref-images/image_20221006_1665024186_35048.png',
    title: '产品配方快速切换，无交叉污染',
    desc: '清洁系统支持快速配方切换，确保产品之间无交叉污染，适合多品种柔性生产。',
  },
  {
    img: '/ref-images/image_20221013_1665646305_313637.png',
    title: '降低粉尘外扬，改善工作环境',
    desc: '大大降低粉尘外扬的可能性，为操作人员提供良好的工作环境，符合工业卫生标准。',
  },
]

export default function DustCleaningPage() {
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
        title="除尘清洁系统"
        subtitle="高效循环制浆系统 · 洁净生产保障单元"
        bgImage="/ref-images/image_20220930_1664527583_572990.jpg"
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '新能源行业', path: '/solutions#new-energy' },
          { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
          { label: '除尘清洁系统' },
        ]} />

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

        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">系统展示</h2>
            <div className="sub-display-wrap fade-up fade-up-delay-1">
              <img
                src="/ref-images/image_20240315_1710484488_686402.jpg"
                alt="除尘清洁系统展示"
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
                  为某锂电池材料企业提供除尘清洁系统整体解决方案，实现中央除尘与单点除尘协同管控，粉尘浓度降至行业最优水平，显著改善车间操作环境。
                </p>
              </div>
            </div>
          </div>
        </section>

        <SolutionContactForm solutionName="除尘清洁系统" />
      </div>
    </>
  )
}
