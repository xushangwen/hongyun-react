import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import SolutionContactForm from '../components/SolutionContactForm'

const features = [
  {
    img: '/ref-images/image_20221006_1665021397_909515.png',
    title: '中央集尘系统，投料无扬尘',
    desc: '中央集尘系统与单点除尘器配套使用，投料过程无粉尘外溢，保障操作环境洁净安全。',
  },
  {
    img: '/ref-images/image_20221006_1665021328_209225.png',
    title: '生产资源条码化管理',
    desc: '原料条码扫描与系统关联，确保投料品种、批次、数量准确无误，实现全程可追溯管理。',
  },
  {
    img: '/ref-images/image_20221006_1665021306_491928.png',
    title: '智能化控制，数据实时采集',
    desc: '智能控制系统自动记录投料时间、品种、重量等数据，实时上传至 MES，便于生产管理。',
  },
  {
    img: '/ref-images/image_20221006_1665021259_749694.png',
    title: '针对特殊物料的个性化控制',
    desc: '针对吸水性强、流动性差、气味刺激等特殊物料特性进行专项控制设计，保障投料安全顺畅。',
  },
  {
    img: '/ref-images/image_20221019_1666173416_566373.png',
    title: '个性化规划设计，适配多种车间环境',
    desc: '根据客户需求及车间实际布局进行个性化规划，灵活适配不同厂房结构与生产工艺。',
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

export default function UnpackingFeedingPage() {
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
        title="解包投料系统"
        subtitle="高效循环制浆系统 · 原料上料自动化单元"
        bgImage="/ref-images/image_20221024_1666581538_32528.jpg"
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '新能源行业', path: '/solutions#new-energy' },
          { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
          { label: '解包投料系统' },
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
                src="/ref-images/image_20221018_1666077038_329607.jpg"
                alt="解包投料系统展示"
                className="sub-display-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">核心设备</h2>
            <p className="section-desc fade-up fade-up-delay-1">
              解包投料系统配置多种类型的解包站与包装机，适应小袋、吨袋等不同包装形式的原料上料需求。
            </p>
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

        <section className="page-section page-section--gray">
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
                  为某锂电池材料企业提供解包投料系统整体解决方案，实现吨袋与小袋原料的自动化拆包、投料及除尘，大幅降低人工操作强度，提升车间安全性与生产效率。
                </p>
              </div>
            </div>
          </div>
        </section>

        <SolutionContactForm solutionName="解包投料系统" />
      </div>
    </>
  )
}
