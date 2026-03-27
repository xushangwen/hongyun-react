import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  IconArrowRightOutline24,
  IconGearNodesOutline24,
  IconTargetOutline24,
  IconAtomOutline24,
  IconAwardPlaqueOutline24,
  IconTestTubeOutline24,
  IconFireFlameOutline24,
  IconFlaskOutline24,
  IconCarBatteryOutline24,
  IconMedicineOutline24,
  IconCutleryOutline24,
  IconMicrochipOutline24,
  IconArrowsInfinityOutline24,
  IconRotateCubeOutline24,
  IconShieldLockOutline24,
  IconNetworkNodesOutline24,
  IconNeuralGridOutline24,
} from 'nucleo-core-outline-24'
import { IconGreenhouseOutline48, IconRotateCubeOutline48, IconFirewallOutline48 } from 'nucleo-core-outline-48'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ctaBgImg from '../assets/img/需要了解更多.jpg'
import productHeroImg from '../assets/img/Generated Image March 20, 2026 - 10_16PM.jpg'

/* ========== 技术参数数据 ========== */
const allModels = [
  { model: 'HY-XJ-5L',    designVol: '7.4L',   workVol: '5L',    tankDim: 'Φ250↓150',   mixerKW: '1.5',  revSpeed: '0-40',  ownSpeed: '0-86',  dissolverKW: '1.5',  dissolverRPM: '0-5800', linearSpeed: '16.7' },
  { model: 'HY-XJ-10L',   designVol: '14L',    workVol: '10L',   tankDim: 'Φ300↓200',   mixerKW: '2.2',  revSpeed: '0-42',  ownSpeed: '0-72',  dissolverKW: '3',    dissolverRPM: '0-5000', linearSpeed: '18.3' },
  { model: 'HY-XJ-30L',   designVol: '44L',    workVol: '30L',   tankDim: 'Φ400↓350',   mixerKW: '3',    revSpeed: '0-34',  ownSpeed: '0-70',  dissolverKW: '5.5',  dissolverRPM: '0-4000', linearSpeed: '21'   },
  { model: 'HY-XJ-60L',   designVol: '88L',    workVol: '60L',   tankDim: 'Φ500↓450',   mixerKW: '5.5',  revSpeed: '0-34',  ownSpeed: '0-68',  dissolverKW: '7.5',  dissolverRPM: '0-3300', linearSpeed: '21'   },
  { model: 'HY-XJ-100L',  designVol: '149L',   workVol: '100L',  tankDim: 'Φ650↓450',   mixerKW: '15',   revSpeed: '0-34',  ownSpeed: '0-56',  dissolverKW: '18.5', dissolverRPM: '0-2930', linearSpeed: '23'   },
  { model: 'HY-XJ-200L',  designVol: '265L',   workVol: '200L',  tankDim: 'Φ750↓650',   mixerKW: '22',   revSpeed: '0-33',  ownSpeed: '0-53',  dissolverKW: '30',   dissolverRPM: '0-2750', linearSpeed: '23'   },
  { model: 'HY-XJ-300L',  designVol: '369L',   workVol: '300L',  tankDim: 'Φ850↓650',   mixerKW: '30',   revSpeed: '0-33',  ownSpeed: '0-53',  dissolverKW: '37',   dissolverRPM: '0-2200', linearSpeed: '23'   },
  { model: 'HY-XJ-650L',  designVol: '822L',   workVol: '650L',  tankDim: 'Φ1100↓865',  mixerKW: '45',   revSpeed: '0-28',  ownSpeed: '0-47',  dissolverKW: '55',   dissolverRPM: '0-1750', linearSpeed: '23'   },
  { model: 'HY-XJ-900L',  designVol: '1390L',  workVol: '900L',  tankDim: 'Φ1300↓1050', mixerKW: '75',   revSpeed: '0-24',  ownSpeed: '0-32',  dissolverKW: '75',   dissolverRPM: '0-1450', linearSpeed: '23'   },
  { model: 'HY-XJ-1200L', designVol: '2126L',  workVol: '1200L', tankDim: 'Φ1500↓1150', mixerKW: '90',   revSpeed: '0-18',  ownSpeed: '0-28',  dissolverKW: '90',   dissolverRPM: '0-1375', linearSpeed: '23'   },
  { model: 'HY-XJ-1500L', designVol: '2300L',  workVol: '1500L', tankDim: 'Φ1500↓1300', mixerKW: '110',  revSpeed: '0-18',  ownSpeed: '0-28',  dissolverKW: '110',  dissolverRPM: '0-1375', linearSpeed: '23'   },
]

/* ========== 产品型号展示数据 ========== */
const productModels = [
  {
    name: '实验室型',
    fullName: '实验室型双行星动力混合机',
    img: '/assets/img/prd-02.jpg',
    desc: '适用于研发、小批量实验及工艺验证，紧凑轻便，操作简洁，与量产机型保持工艺一致性。',
  },
  {
    name: '桶体翻转型',
    fullName: '桶体翻转型双行星动力混合机',
    img: '/assets/img/prd-01.jpg',
    desc: '桶体可翻转出料，适用于高粘度物料的便捷出料作业，显著减少残料损耗与清洗时间。',
  },
  {
    name: '450L 小型',
    fullName: '450L 小型双行星动力混合机',
    img: '/assets/img/prd-03.jpeg',
    desc: '面向中小批量生产设计，集成液压升降系统，兼顾产能与灵活性，是量产产线的高性价比之选。',
  },
]

/* ========== 客户案例数据 ========== */
const cases = [
  {
    group: '全自动加投料系统解决方案',
    images: [
      { src: '/assets/images/products/pd-mixer/case-system-1.jpg', alt: '全自动加投料系统设备' },
      { src: '/assets/images/products/pd-mixer/case-system-2.jpg', alt: '全自动加投料系统现场', className: 'pdm-case-img--fill-height' },
    ],
  },
  {
    group: 'EV 电池匀浆车间',
    images: [
      { src: '/assets/images/products/pd-mixer/case-ev-equipment.jpg', alt: 'EV电池匀浆车间设备' },
      { src: '/assets/images/products/pd-mixer/case-ev-site.jpg',      alt: 'EV电池匀浆车间现场照' },
      { src: '/assets/images/products/pd-mixer/case-ev-full.jpg',      alt: 'EV电池匀浆车间全套设备' },
    ],
  },
  {
    group: '3C 电池匀浆车间',
    images: [
      { src: '/assets/images/products/pd-mixer/case-3c-equipment.jpg', alt: '3C电池匀浆车间半自动加投料系统设备' },
      { src: '/assets/images/products/pd-mixer/case-3c-site.jpg',      alt: '3C电池匀浆车间现场照' },
    ],
  },
]

/* ========== 参数表组件 ========== */
function ParamsTable({ data }) {
  return (
    <div className="detail-params-table">
      <table className="params-table pdm-params-table">
        <thead>
          <tr>
            <th>型号<br /><span className="th-sub">Model</span></th>
            <th>设计容积<br /><span className="th-sub">Design volume</span></th>
            <th>使用容积<br /><span className="th-sub">Working volume</span></th>
            <th>搅拌桶内尺寸<br /><span className="th-sub">Tank dim (mm)</span></th>
            <th>公转电机<br /><span className="th-sub">Mixer motor (kW)</span></th>
            <th>公转转速<br /><span className="th-sub">Rev. speed (rpm)</span></th>
            <th>搅拌转速<br /><span className="th-sub">Own speed (rpm)</span></th>
            <th>分散电机<br /><span className="th-sub">Disperser motor (kW)</span></th>
            <th>分散转速<br /><span className="th-sub">Disperser RPM</span></th>
            <th>线速度<br /><span className="th-sub">Linear speed (m/s)</span></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              <td className="td-model-code">{row.model}</td>
              <td>{row.designVol}</td>
              <td>{row.workVol}</td>
              <td>{row.tankDim}</td>
              <td>{row.mixerKW}</td>
              <td>{row.revSpeed}</td>
              <td>{row.ownSpeed}</td>
              <td>{row.dissolverKW}</td>
              <td>{row.dissolverRPM}</td>
              <td>{row.linearSpeed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function DualPlanetaryMixerPage() {
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
        title="双行星动力™混合机"
        subtitle="PD 搅拌机 · 新能源行业核心装备"
        bgImage={productHeroImg}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products' },
          { label: '新能源行业', path: '/products#products-new-energy' },
          { label: '双行星动力混合机' },
        ]} />

        {/* ===== 产品展示 + 产品介绍（合并） ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">产品介绍</h2>
            <div className="pdm-intro-grid">
              <div className="pdm-intro-content">
                <span className="pdm-intro-label fade-up">新能源行业核心装备</span>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">
                  双行星动力<sup>™</sup>混合机
                </h2>
                <div className="pdm-intro-rule fade-up fade-up-delay-1"></div>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  双行星动力混合机（PD搅拌机）通常具有一个或多个搅拌桨和分散盘，它们围绕釜体轴线公转的同时，也围绕自身轴线自转。通过搅拌桨和分散盘的行星运动，使物料受到剪切和捏合作用，实现混合。是一种<strong>无死角的动力混合、分散设备</strong>。
                </p>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  广泛应用于新能源浆料制备、粘合剂、化工涂料、塑料、制药、食品等行业的固-固相、固-液相、液-液相物料的混合、反应、分散、溶解、均质、乳化等工艺过程。
                </p>
                <div className="pdm-intro-apps fade-up fade-up-delay-3">
                  {[
                    { name: '新能源浆料', icon: IconCarBatteryOutline24 },
                    { name: '粘合剂', icon: IconTestTubeOutline24 },
                    { name: '化工涂料', icon: IconFlaskOutline24 },
                    { name: '制药', icon: IconMedicineOutline24 },
                    { name: '食品加工', icon: IconCutleryOutline24 },
                    { name: '电子材料', icon: IconMicrochipOutline24 },
                  ].map((item, i) => (
                    <span key={i} className="pdm-app-tag">
                      <item.icon size={16} />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pdm-intro-visual fade-up fade-up-delay-2">
                <div className="pdm-intro-image-frame">
                  <img
                    src="/ref-images/image_20240117_1705480936_405786.png"
                    alt="双行星动力™混合机（PD搅拌机）"
                    className="pdm-intro-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 产品特点 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">产品特点</h2>
            <div className="cp-features-grid">
              {[
                { img: '/ref-images/image_20221017_1666000188_388257.png', title: '性能稳定，故障偶发率大幅降低', desc: '经长期量产验证，传动结构可靠，运转平稳，故障偶发率大幅降低，保障产线持续稳定运行。' },
                { img: '/ref-images/image_20221013_1665646397_724591.png', title: '投料无粉尘，搅拌过程密封防尘', desc: '密封投料设计，搅拌过程中粉尘不外溢，有效优化使用环境，保障操作人员安全健康。' },
                { img: '/ref-images/image_20221013_1665646460_98462.png', title: '搅拌均匀无死角，浆料均匀度提升', desc: '桨自转轨迹不重复，搅拌均匀无死角，大幅提升浆料均匀度，批次间一致性卓越。' },
                { img: '/ref-images/image_20221013_1665645490_953123.png', title: '智能控制，无需人工干预', desc: '全自动 PLC 控制系统，工艺参数数字化设定与执行，无需人工操作，降低人工错误风险。' },
                { img: '/ref-images/image_20221013_1665647940_132723.png', title: '不增加磁性异物，浆料洁净有保障', desc: '严格的材质选型与密封设计，全流程不引入磁性金属异物，电池浆料洁净度达标。' },
                { img: '/ref-images/image_20221013_1665646501_164542.png', title: '高精度配料系统，配比精度高', desc: '配置高精度配料系统，计量精度≤±0.1%，确保每批次配方精准复现，品质稳定可控。' },
              ].map((feat, i) => (
                <div key={i} className={`cp-feature-card fade-up fade-up-delay-${(i % 3) + 1}`}>
                  <div className="cp-feature-img-wrap">
                    <img src={feat.img} alt={feat.title} className="cp-feature-img" loading="lazy" />
                  </div>
                  <div className="cp-feature-body">
                    <h3 className="cp-feature-title">{feat.title}</h3>
                    <p className="cp-feature-desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 产品优势 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">产品优势</h2>
            <div className="detail-features-grid fade-up fade-up-delay-1">
              <div className="detail-feature-card">
                <span className="detail-feature-index">01</span>
                <div className="pdm-adv-icon"><IconArrowsInfinityOutline24 size={28} /></div>
                <h3 className="pdm-adv-title">高效混合</h3>
                <p>行星公转+自转+高速分散三重动力，实现高粘度物料无死角均匀混合。</p>
              </div>
              <div className="detail-feature-card">
                <span className="detail-feature-index">02</span>
                <div className="pdm-adv-icon"><IconTargetOutline24 size={28} /></div>
                <h3 className="pdm-adv-title">精准控制</h3>
                <p>变频调速，公转、自转、分散转速独立可调，工艺参数精准复现。</p>
              </div>
              <div className="detail-feature-card">
                <span className="detail-feature-index">03</span>
                <div className="pdm-adv-icon"><IconNeuralGridOutline24 size={28} /></div>
                <h3 className="pdm-adv-title">强剪切分散</h3>
                <p>高速分散盘产生强剪切力，有效破碎团聚体，分散均匀度≥99%。</p>
              </div>
              <div className="detail-feature-card">
                <span className="detail-feature-index">04</span>
                <div className="pdm-adv-icon"><IconNetworkNodesOutline24 size={28} /></div>
                <h3 className="pdm-adv-title">稳定搅拌</h3>
                <p>液压升降、真空密封、防污染设计，长期运行零故障，保障生产连续性。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 产品型号展示 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">产品型号</h2>
            <div className="pdm-models-grid">
              {productModels.map((m, i) => (
                <div key={i} className={`pdm-model-card fade-up fade-up-delay-${i + 1}`}>
                  <div className="pdm-model-image-wrap">
                    <img src={m.img} alt={m.fullName} className="pdm-model-img" />
                    <span className="pdm-model-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="pdm-model-info">
                    <span className="pdm-model-badge">{m.name}</span>
                    <h3 className="pdm-model-title">{m.fullName}</h3>
                    <p className="pdm-model-desc">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 技术参数 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">技术参数</h2>
            <h3 className="pdm-table-subtitle fade-up fade-up-delay-1">
              双行星动力™混合机覆盖5 L–1500 L全系列规格，满足从实验室验证到GWh量产的全场景需求。
            </h3>
            <div className="fade-up fade-up-delay-2">
              <ParamsTable data={allModels} />
            </div>
            <p className="pdm-table-note fade-up fade-up-delay-3">
              * 以上参数仅供参考，实际规格以合同为准。可根据客户工艺需求进行定制化设计。
            </p>
          </div>
        </section>

        {/* ===== 客户案例 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">客户案例</h2>
            <p className="section-desc fade-up fade-up-delay-1">
              服务全球新能源头部客户，从实验室验证到 GWh 量产产线，红运机械全程提供装备保障。
            </p>
            {cases.map((c, gi) => (
              <div key={gi} className={`pdm-case-group fade-up fade-up-delay-${gi + 2}`}>
                <div className="pdm-case-group-header">
                  <span className="pdm-case-group-index">{String(gi + 1).padStart(2, '0')}</span>
                  <h3 className="pdm-case-group-title">{c.group}</h3>
                </div>
                <div className={`pdm-case-images pdm-case-images--${c.images.length}`}>
                  {c.images.map((img, ii) => (
                    <div key={ii} className="pdm-case-image-wrap">
                      <img src={img.src} alt={img.alt} className={`pdm-case-img ${img.className || ''}`} loading="lazy" />
                      <div className="pdm-case-image-overlay">
                        <span>{img.alt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 联系 CTA ===== */}
        <div className="detail-contact-cta">
          <div className="detail-contact-inner" style={{ backgroundImage: `url(${ctaBgImg})` }}>
            <h2 className="detail-contact-title">获取专属解决方案</h2>
            <p className="detail-contact-desc">
              我们的专业团队随时为您提供技术咨询和定制化解决方案，<br />
              助力您的生产工艺升级。
            </p>
            <Link to="/contact" className="btn-primary">
              联系我们
              <IconArrowRightOutline24 size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
