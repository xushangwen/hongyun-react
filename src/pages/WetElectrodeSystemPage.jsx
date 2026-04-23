import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'
import ImagePlaceholder from '../components/ImagePlaceholder'

export default function WetElectrodeSystemPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <PageHero
        title="行业解决方案"
        subtitle="Industry Solutions"
        bgImage="/assets/images/solutions/circulation-pulping/hero-bg-new.jpg"
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '固态电池行业', path: '/solutions#solid-state-battery' },
          { label: '湿法电极系统' },
        ]} />

        {/* ===== 系统介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '56px' }}>
              <div style={{ maxWidth: '46%' }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">红运湿法电极系统</h2>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  适用于全固态电池湿法混合工艺、电解质膜前期混料，实现从"混合"到"完美分散"的跨越，湿法双行星混合机——高粘度浆料的终极解决方案，精准匹配湿法、干法混合工艺路径。
                </p>
              </div>
              <div className="fade-up fade-up-delay-2">
                <ImagePlaceholder height="480px" label="湿法电极系统 系统图" />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 系统特点 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <p className="section-en-label fade-up">System Features</p>
            <h2 className="section-heading section-heading--center fade-up">系统特点</h2>
            <p className="cp-core-device-tbd fade-up fade-up-delay-1">系统特点内容待补充</p>
          </div>
        </section>

        {/* ===== 核心设备 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Core Equipment</p>
            <h2 className="section-heading section-heading--center fade-up">核心设备</h2>

            <div className="cp-core-section">
              {[
                { name: '双行星动力混合机（PD搅拌机）' },
                { name: '管线式混合机' },
                { name: '多功能混合机' },
                { name: '高压清洗机' },
              ].map((device, i) => (
                <div key={i}>
                  {i > 0 && <hr className="cp-core-divider" />}
                  <div className="cp-core-device-row fade-up fade-up-delay-1">
                    <div className="cp-core-device-img-wrap">
                      <ImagePlaceholder height="260px" label={device.name} />
                    </div>
                    <div className="cp-core-device-info">
                      <div className="cp-core-device-badge">
                        <h3 className="cp-core-device-name">{device.name}</h3>
                      </div>
                      <div className="cp-core-device-divider" />
                      <p className="cp-core-device-tbd">设备介绍内容待补充</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 参数汇总 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <p className="section-en-label fade-up">Parameters Overview</p>
            <h2 className="section-heading section-heading--center fade-up">参数汇总</h2>
            <p className="cp-core-device-tbd fade-up fade-up-delay-1">参数内容待补充</p>
          </div>
        </section>

        {/* ===== 客户案例 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Case</p>
            <h2 className="section-heading section-heading--center fade-up">客户案例</h2>
            <p className="cp-core-device-tbd fade-up fade-up-delay-1">客户案例内容待补充</p>
          </div>
        </section>

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
