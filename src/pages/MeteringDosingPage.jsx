import React, { useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import BentoGallerySection from '../components/BentoGallerySection'
import CustomerCasesSection from '../components/CustomerCasesSection'
import TechInquirySection from '../components/TechInquirySection'

const features = [
  {
    img: '/ref-images/image_20221013_1665646371_696441.png',
    title: '喂料精度高，产品品质稳定',
    desc: '高精度失重秤配料系统，计量误差极低，确保每批次配方精准复现，产品品质高度稳定。',
  },
  {
    img: '/ref-images/image_20221013_1665646383_904574.png',
    title: '模块化设计及快拆型结构，满足多配方快速切换',
    desc: '模块化结构与快拆设计相结合，支持工艺配方的快速切换，满足多品种、多配方柔性生产的工艺要求。',
  },
  {
    img: '/ref-images/image_20221013_1665646397_724591.png',
    title: '投料无尘，换料清理容易、残留少',
    desc: '密封投料设计实现粉尘零外溢，快拆结构便于彻底清洁，换料残留量极低，有效防止交叉污染。',
  },
  {
    img: '/ref-images/image_20221013_1665646413_822138.png',
    title: '可进行小批量配方自动配料',
    desc: '系统兼容从实验室级小批量到大规模量产的配料需求，单台设备灵活覆盖多种生产规模。',
  },
]

const coreEquipment = [
  { name: '多组分吸料计量秤', img: '/ref-images/image_20221020_1666250832_565622.png' },
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
    desc: '安庆**尼龙材料科技有限公司一家生产双向拉伸聚酰胺（BOPA)薄膜的制造型企业，计划投资5.1亿元，达产后年产BOPA薄膜2.5万吨，产值10亿元。',
    img: '/ref-images/image_20221014_1665712980_529731.jpg',
    metrics: [],
  },
  {
    tag: '工程案例 · 化工',
    client: '浙江某化工集团',
    desc: '**化学集团是一家全球化的功能化学公司，重点聚焦纺织、造纸、塑料与建筑四大行业，以领先的化学解决方案让基底界面更卓越。',
    img: '/ref-images/image_20221014_1665712966_182878.jpg',
    metrics: [],
  },
]

export default function MeteringDosingPage() {
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
            src="/ref-images/upfile_image_20221013_1665665118_553568.jpg"
            alt="计量配料系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: '新能源行业', path: '/solutions#new-energy' },
            { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
            { label: '计量配料系统' },
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
            <h1 className="cp-sol-hero-title fade-up fade-up-delay-1">计量配料系统</h1>
            <p className="cp-intro-desc fade-up fade-up-delay-2">
              计量配料系统采用高精度失重秤配料模块，实现多组分粉体与液体的自动计量与投料。模块化快拆结构支持配方快速切换，密封无尘设计防交叉污染，平均计量误差极低。
            </p>
            <div className="cp-sol-hero-pills fade-up fade-up-delay-3">
              <span>高精度计量</span>
              <span>模块化快拆</span>
              <span>无尘投料</span>
              <span>自动配料</span>
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
            '/ref-images/image_20221013_1665648816_134250.jpg',
            '/ref-images/upfile_image_20221013_1665665118_553568.jpg',
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
