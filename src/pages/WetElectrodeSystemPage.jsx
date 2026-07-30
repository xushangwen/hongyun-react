import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import CoreEquipmentSection from '../components/CoreEquipmentSection'
import TechInquirySection from '../components/TechInquirySection'
import CmsCaseListSection from '../components/CmsCaseListSection'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import CmsParameterTableSection from '../components/CmsParameterTableSection'

const PD_IMG = '/assets/images/solutions/pd-pulping/main-product.webp'
const IMG = '/assets/images/solutions/wet-electrode-system'

const coreDevices = [
  {
    name: '双行星动力混合机（PD搅拌机）',
    img: PD_IMG,
    imgAlt: '双行星动力混合机（PD搅拌机）',
    paragraphs: [
      {
        title: '',
        text: '以双行星动力混合机（PD搅拌机）为核心，集成行星公转、自转与高速分散三重动力，实现高粘度浆料无死角均匀混合，适用于锂电池正负极浆料批次生产。',
      },
      {
        title: '',
        text: '系统覆盖从实验室级（1L）到工业量产级（3400L）全系列规格，搅拌桨与分散盘的行星运动使物料受到充分剪切和捏合，确保浆料均匀性与批次一致性。',
      },
    ],
  },
  {
    name: '管线式混合机',
    img: `${IMG}/pipeline-mixer.webp`,
    imgAlt: '管线式混合机',
  },
]

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
        bgImage="/assets/images/solutions/battery-manufacturing.webp"
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '固态电池行业', path: '/solutions#solid-state-battery' },
          { label: '湿法电极成套设备解决方案' },
        ]} />

        {/* ===== 系统介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ maxWidth: '46%' }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">红运湿法电极成套设备解决方案</h2>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  适用于全固态电池湿法混合工艺、电解质膜前期混料，实现从"混合"到"完美分散"的跨越，湿法双行星混合机——高粘度浆料的终极解决方案，精准匹配湿法、干法混合工艺路径。
                </p>
              </div>
              {/* 系统图：三台核心设备拼合展示 */}
              <div className="fade-up fade-up-delay-2" style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
                <img
                  src={PD_IMG}
                  alt="双行星动力混合机"
                  style={{ flex: 1, minWidth: 0, height: '400px', objectFit: 'contain', objectPosition: 'bottom' }}
                  loading="lazy"
                />
                <img
                  src={`${IMG}/pipeline-mixer.webp`}
                  alt="管线式混合机"
                  style={{ flex: 1, minWidth: 0, height: '400px', objectFit: 'contain', objectPosition: 'bottom' }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 系统特点 ===== */}
        <SystemFeaturesSection features={[]} enLabel="System Features" />

        {/* ===== 核心设备 ===== */}
        <CoreEquipmentSection devices={coreDevices} />

        {/* ===== 参数汇总 ===== */}
        <CmsParameterTableSection fallbackTitle="湿法电极成套设备型号参数" />

        {/* ===== 客户案例 ===== */}
        <CmsCaseListSection />

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
