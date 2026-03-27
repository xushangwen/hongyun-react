import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import SolutionContactForm from '../components/SolutionContactForm'

/* ========== 系统特点数据 ========== */
const features = [
  {
    img: '/ref-images/image_20221013_1665646501_164542.png',
    title: '产品一致性更好，固含量适用范围更高',
    desc: '满足高品质电池浆料的生产需求，批次间稳定性卓越，品质更稳定。',
  },
  {
    img: '/ref-images/image_20241108_1731050682_604876.png',
    title: '系统能耗更低，有助于降低生产成本',
    desc: '优化的传动结构与分散工艺，在保证制浆品质的同时显著降低单位能耗。',
  },
  {
    img: '/ref-images/image_20221013_1665647753_100782.png',
    title: '系统型号多样，突破产能瓶颈',
    desc: '覆盖实验室到 GWh 量产全系列规格，满足不同阶段产能扩张需求。',
  },
  {
    img: '/ref-images/image_20241108_1731050590_145811.png',
    title: '金属 Particle 控制更佳',
    desc: '全流程密封设计，有效控制磁性金属异物引入，保障浆料洁净度。',
  },
  {
    img: '/ref-images/image_20241108_1731050619_29870.png',
    title: '通过设计优化，降低设备投资与运营成本',
    desc: '模块化结构简化维护流程，减少停机时间，综合 TCO 大幅下降。',
  },
  {
    img: '/ref-images/image_20241108_1731050658_651083.png',
    title: '性能稳定，无排料堵料、过载等问题',
    desc: '针对高粘度浆料优化的结构设计，长期运行稳定可靠，故障率极低。',
  },
]

/* ========== 核心设备数据 ========== */
const coreEquipment = [
  {
    name: '双行星动力搅拌机',
    img: '/ref-images/image_20240117_1705480936_405786.png',
    path: '/products/new-energy/dual-planetary-mixer',
    linkable: true,
  },
  {
    name: '双螺杆连续制浆机',
    img: '/ref-images/image_20240117_1705478717_273925.png',
    path: null,
    linkable: false,
  },
]

/* ========== 主页面 ========== */
export default function AgitationPulpingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <PageHero
        title="搅拌制浆系统"
        subtitle="高效循环制浆系统 · 核心制浆单元"
        bgImage="/ref-images/image_20220930_1664527410_882630.jpg"
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '新能源行业', path: '/solutions#new-energy' },
          { label: '高效循环制浆系统', path: '/solutions/new-energy/circulation-pulping' },
          { label: '搅拌制浆系统' },
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
                src="/ref-images/image_20221013_1665648976_715374.jpg"
                alt="搅拌制浆系统展示"
                className="sub-display-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ===== 核心设备 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">核心设备</h2>
            <p className="section-desc fade-up fade-up-delay-1">
              搅拌制浆系统以双行星动力搅拌机为核心，配合双螺杆连续制浆机，实现高粘度浆料的高效均匀制备。
            </p>
            <div className="sub-equipment-grid">
              {coreEquipment.map((eq, i) => (
                eq.linkable ? (
                  <Link
                    key={i}
                    to={eq.path}
                    className={`sub-equipment-card fade-up fade-up-delay-${i + 1}`}
                  >
                    <div className="sub-equipment-img-wrap">
                      <img src={eq.img} alt={eq.name} className="sub-equipment-img" loading="lazy" />
                    </div>
                    <div className="sub-equipment-info">
                      <h3 className="sub-equipment-name">{eq.name}</h3>
                      <span className="sub-equipment-link-icon">
                        <IconArrowRightOutline24 size={18} />
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div
                    key={i}
                    className={`sub-equipment-card sub-equipment-card--static fade-up fade-up-delay-${i + 1}`}
                  >
                    <div className="sub-equipment-img-wrap">
                      <img src={eq.img} alt={eq.name} className="sub-equipment-img" loading="lazy" />
                    </div>
                    <div className="sub-equipment-info">
                      <h3 className="sub-equipment-name">{eq.name}</h3>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </section>

        {/* ===== 客户案例 ===== */}
        <section className="page-section page-section--gray">
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
                  河南**新能源股份有限公司专业从事高性能二次电池材料的研发、生产和销售，是中国化学与物理电源行业协会副理事长单位，设有国家级企业技术中心、博士后科研工作站等多个高水平研发平台。
                </p>
                <p className="cp-case-desc">
                  公司为其提供搅拌制浆系统整体解决方案，以双行星动力搅拌机为核心，配套完整的制浆工艺体系，实现高品质正负极浆料的稳定量产。
                </p>
                <Link to="/contact" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                  了解详情
                  <IconArrowRightOutline24 size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SolutionContactForm solutionName="搅拌制浆系统" />
      </div>
    </>
  )
}
