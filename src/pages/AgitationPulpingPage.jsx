import React, { useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import BentoGallerySection from '../components/BentoGallerySection'
import CustomerCasesSection from '../components/CustomerCasesSection'
import TechInquirySection from '../components/TechInquirySection'

const features = [
  {
    img: '/ref-images/image_20221013_1665646501_164542.png',
    title: '产品一致性更好，适用固含量更高',
    desc: '满足高品质电池浆料的生产需求，批次间稳定性卓越，适用固含量范围更宽，品质更稳定。',
  },
  {
    img: '/ref-images/image_20241108_1731050682_604876.png',
    title: '系统能耗更低，有助于降低生产成本',
    desc: '优化传动结构与分散工艺，在保证制浆品质的同时显著降低单位能耗，为客户持续节约生产成本。',
  },
  {
    img: '/ref-images/image_20221013_1665647753_100782.png',
    title: '系统型号多样，突破产能瓶颈',
    desc: '覆盖实验室到 GWh 量产全系列规格，满足不同阶段产能扩张需求，满足大规模生产要求。',
  },
  {
    img: '/ref-images/image_20241108_1731050590_145811.png',
    title: '金属 Particle 控制更佳',
    desc: '全流程密封设计，有效控制磁性金属异物引入，保障浆料洁净度，满足高品质电芯生产要求。',
  },
  {
    img: '/ref-images/image_20241108_1731050619_29870.png',
    title: '通过设计优化，降低设备投资与运营成本',
    desc: '模块化结构简化维护流程，减少停机时间，综合 TCO 大幅下降，提升整体投资回报率。',
  },
  {
    img: '/ref-images/image_20241108_1731050658_651083.png',
    title: '性能稳定，无排料堵料、过载等问题',
    desc: '针对高粘度浆料优化的结构设计，长期运行稳定可靠，彻底解决排料堵料、过载等常见故障。',
  },
]

const coreEquipment = [
  { name: '双行星动力搅拌机', img: '/ref-images/image_20240117_1705480936_405786.png' },
  { name: '双螺杆连续制浆机', img: '/ref-images/image_20240117_1705478717_273925.png' },
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

export default function AgitationPulpingPage() {
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
            src="/ref-images/upfile_image_20221014_1665726401_879383.jpg"
            alt="搅拌制浆系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: '新能源行业', path: '/solutions#new-energy' },
            { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
            { label: '搅拌制浆系统' },
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
            <h1 className="cp-sol-hero-title fade-up fade-up-delay-1">搅拌制浆系统</h1>
            <p className="cp-intro-desc fade-up fade-up-delay-2">
              搅拌制浆系统采用多层堆积模块化设计，实现高固含量浆料的高效稳定制备。覆盖双行星动力搅拌机与双螺杆连续制浆机，产能从实验室到 GWh 量产线性扩展，无堵料、低能耗、金属污染严格管控。
            </p>
            <div className="cp-sol-hero-pills fade-up fade-up-delay-3">
              <span>高固含量</span>
              <span>多型号适配</span>
              <span>低能耗</span>
              <span>无金属污染</span>
              <span>性能稳定</span>
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
            '/ref-images/image_20221013_1665648976_715374.jpg',
            '/ref-images/upfile_image_20221014_1665726401_879383.jpg',
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
