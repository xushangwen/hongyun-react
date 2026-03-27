import React, { useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import BentoGallerySection from '../components/BentoGallerySection'
import CustomerCasesSection from '../components/CustomerCasesSection'
import TechInquirySection from '../components/TechInquirySection'

const features = [
  {
    img: '/ref-images/image_20221013_1665648467_224398.png',
    title: '清除管道内浆料沉积，预防管道堵塞',
    desc: '智能清管系统定期清除管道内壁浆料沉积，有效预防堵管风险，保障系统长期稳定运行。',
  },
  {
    img: '/ref-images/image_20221013_1665646413_822138.png',
    title: '管道中端及末端回收产品，自动回收清管球',
    desc: '中端及末端回收设计，清管球全自动回收，减少物料浪费，大幅提升整体产品回收率。',
  },
  {
    img: '/ref-images/image_20221013_1665645490_953123.png',
    title: '空气 / 工艺产品推球，匀速控制，在线追踪',
    desc: '采用空气或工艺介质推动清管球，匀速精准控制，支持在线实时追踪清管球位置，安全可靠。',
  },
  {
    img: '/ref-images/image_20221013_1665646501_164542.png',
    title: '配套气力输送管道除尘，中央除尘 + 单点除尘',
    desc: '可为气力输送系统配套设计管道除尘系统，中央除尘系统与单点除尘设备协同工作，全面洁净。',
  },
  {
    img: '/ref-images/image_20221006_1665024186_35048.png',
    title: '可用于配方快速切换，确保无交叉污染',
    desc: '清洁系统支持产品配方快速切换场景，确保产品之间无交叉污染，适合多品种柔性生产线。',
  },
  {
    img: '/ref-images/image_20221013_1665646305_313637.png',
    title: '大大降低粉尘外扬，提供良好工作环境',
    desc: '全密封清洁方案大幅降低粉尘外扬可能性，为操作人员提供洁净安全的生产工作环境。',
  },
]

const includedEquipment = [
  { name: '清管球系统', img: '/ref-images/image_20221104_1667522683_673154.png' },
]

const customerCases = [
  {
    tag: '工程案例 · 新能源',
    client: '河南某知名集团锂电池公司',
    desc: '河南**新能源股份有限公司专业从事高性能二次电池材料的研发、生产和销售，是中国化学与物理电源行业协会副理事长单位，设有国家级企业技术中心、博士后科研工作站等多个高水平研发平台。',
    img: '/ref-images/image_20221014_1665711961_98396.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 高分子材料',
    client: '安庆某尼龙材料企业',
    desc: '安庆**尼龙材料科技有限公司一家生产双向拉伸聚酰胺（BOPA)薄膜的制造型企业，注册资金2.3亿元，计划投资5.1亿元，达产后年产BOPA薄膜2.5万吨，产值10亿元。',
    img: '/ref-images/image_20221014_1665712980_529731.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 化工',
    client: '浙江某化工集团',
    desc: '**化学集团是一家全球化的功能化学公司，重点聚焦纺织、造纸、塑料与建筑四大行业，以领先的化学解决方案让基底界面更卓越，致力于成为功能化学领域的全球专家。',
    img: '/ref-images/image_20221014_1665712966_182878.jpg',
    metrics: [],
  },
]

export default function DustCleaningPage() {
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
            src="/ref-images/upfile_image_20221013_1665665043_123976.jpg"
            alt="除尘清洁系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: '新能源行业', path: '/solutions#new-energy' },
            { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
            { label: '除尘清洁系统' },
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
            <h1 className="cp-sol-hero-title fade-up fade-up-delay-1">除尘清洁系统</h1>
            <p className="cp-intro-desc fade-up fade-up-delay-2">
              除尘清洁系统通过清管球系统与中央除尘管网的协同配合，实现管道内浆料残留的自动清除与粉尘抑制，保障生产环境洁净、产品配方无交叉污染。
            </p>
            <div className="cp-sol-hero-pills fade-up fade-up-delay-3">
              <span>清管球系统</span>
              <span>中央除尘</span>
              <span>无交叉污染</span>
              <span>在线追踪</span>
              <span>匀速控制</span>
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
            '/ref-images/image_20240315_1710484488_686402.jpg',
            '/ref-images/upfile_image_20221013_1665665043_123976.jpg',
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
