import React, { useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import BentoGallerySection from '../components/BentoGallerySection'
import CustomerCasesSection from '../components/CustomerCasesSection'
import TechInquirySection from '../components/TechInquirySection'

const features = [
  {
    img: '/ref-images/image_20221013_1665646226_231750.png',
    title: '专业的气力输送设计团队，提供精准输送参数',
    desc: '专业设计团队根据物料特性量身定制输送方案，精准计算输送参数，确保输送过程物料损耗极低。',
  },
  {
    img: '/ref-images/image_20221013_1665646254_567586.png',
    title: '全密闭式管道输送，无尘、不易泄露',
    desc: '全密闭管道设计杜绝粉尘外溢与物料泄漏，为操作人员提供洁净安全的生产工作环境。',
  },
  {
    img: '/ref-images/image_20221013_1665646305_313637.png',
    title: '清管装置配合双层管设计，降低粘壁堵管风险',
    desc: '入料口采用清管装置，配合双层管道设计，有效降低高粘性物料粘壁及堵管风险，系统运行更稳定。',
  },
]

const includedEquipment = [
  { name: '正压稀相气力输送', img: '/ref-images/image_20221104_1667522586_485596.png' },
]

const customerCases = [
  {
    tag: '工程案例 · 新能源',
    client: '河南某知名集团锂电池公司',
    desc: '河南**新能源股份有限公司专业从事高性能二次电池材料的研发、生产和销售，是中国化学与物理电源行业协会副理事长单位。气力输送系统助力全流程无尘自动化输送，物料损耗大幅降低。',
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

export default function PneumaticConveyingPage() {
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
            src="/ref-images/upfile_image_20221013_1665665001_862038.jpg"
            alt="气力输送系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: '新能源行业', path: '/solutions#new-energy' },
            { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
            { label: '气力输送系统' },
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
            <h1 className="cp-sol-hero-title fade-up fade-up-delay-1">气力输送系统</h1>
            <p className="cp-intro-desc fade-up fade-up-delay-2">
              气力输送系统采用正压稀相输送原理，实现粉体原料从储仓到制浆机的全密闭自动化输送。专业团队精准设计输送参数，配备清管装置防止堵管，全程无尘、无泄漏，保障粉体输送品质与生产安全。
            </p>
            <div className="cp-sol-hero-pills fade-up fade-up-delay-3">
              <span>全密闭输送</span>
              <span>物料损耗低</span>
              <span>清管防堵</span>
              <span>无尘无泄漏</span>
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
            '/ref-images/image_20221013_1665648798_928908.jpg',
            '/ref-images/upfile_image_20221013_1665665001_862038.jpg',
          ]}
        />

        {/* ===== 包含设备 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">包含设备</h2>
            <div className="sub-equipment-grid">
              {includedEquipment.map((eq, i) => (
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
