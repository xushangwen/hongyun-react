import React, { useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import BentoGallerySection from '../components/BentoGallerySection'
import CustomerCasesSection from '../components/CustomerCasesSection'
import TechInquirySection from '../components/TechInquirySection'

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
  { name: '小袋解包站', img: '/ref-images/image_20240118_1705565893_80363.png' },
  { name: '吨袋解包站', img: '/ref-images/image_20221014_1665732359_503939.png' },
  { name: 'FFS 重膜包装机', img: '/ref-images/image_20241206_1733452669_188551.png' },
]

const customerCases = [
  {
    tag: '工程案例 · 新能源',
    client: '河南某知名集团锂电池公司',
    desc: '河南**新能源股份有限公司专业从事高性能二次电池材料的研发、生产和销售，是中国化学与物理电源行业协会副理事长单位。解包投料系统实现无尘自动投料，大幅降低人工强度。',
    img: '/ref-images/image_20221014_1665711961_98396.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 高分子材料',
    client: '安庆某尼龙材料企业',
    desc: '安庆**尼龙材料科技有限公司一家生产BOPA薄膜的制造型企业，计划投资5.1亿元，达产后年产BOPA薄膜2.5万吨。',
    img: '/ref-images/image_20221014_1665712980_529731.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 化工',
    client: '浙江某化工集团',
    desc: '**化学集团是一家全球化的功能化学公司，重点聚焦纺织、造纸、塑料与建筑四大行业。',
    img: '/ref-images/image_20221014_1665712966_182878.jpg',
    metrics: [],
  },
]

export default function UnpackingFeedingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="cp-sol-hero cp-sol-hero--sc">
        <div className="cp-sol-hero-img-full">
          <img
            src="/ref-images/upfile_image_20221013_1665664957_254781.jpg"
            alt="解包投料系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb">
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
        <SystemFeaturesSection features={features} />

        {/* ===== 系统展示 ===== */}
        <BentoGallerySection
          title="系统展示"
          grayBg={false}
          images={[
            '/ref-images/image_20221018_1666077038_329607.jpg',
            '/ref-images/upfile_image_20221013_1665664957_254781.jpg',
          ]}
        />

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
        <CustomerCasesSection cases={customerCases} />

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
