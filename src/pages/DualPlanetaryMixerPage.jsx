import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ctaBgImg from '../assets/img/需要了解更多.jpg'
import productHeroImg from '../assets/img/行业产品.jpg'

/* ========== 技术参数数据（每个型号一个对象）========== */
const allModels = [
  { model: 'HY-DLH1.5L',  liftType: '手摇升降', workVol: '1L',    designVol: '1.5L',  tankDim: 'Φ140×100',   mixerMotor: '0.75', revSpeed: '6-60',   ownSpeed: '17-170',  dissolverKW: '0.75', dissolverType: '伺服电机', dissolverRPM: '800-11000', dissolverLinear: '1-18m/s',  weight: '280kg',    dimension: '880×480×930'    },
  { model: 'HY-DLH3L',    liftType: '手摇升降', workVol: '2L',    designVol: '3L',    tankDim: 'Φ180×120',   mixerMotor: '0.75', revSpeed: '7-75',   ownSpeed: '18-250',  dissolverKW: '1.5',  dissolverType: '伺服电机', dissolverRPM: '800-11000', dissolverLinear: '1-18m/s',  weight: '303kg',    dimension: '920×520×1100'   },
  { model: 'HY-DLH4.5L',  liftType: '手摇升降', workVol: '3L',    designVol: '4.5L',  tankDim: 'Φ200×135',   mixerMotor: '1.0',  revSpeed: '6-63',   ownSpeed: '18-185',  dissolverKW: '1.5',  dissolverType: '伺服电机', dissolverRPM: '800-11000', dissolverLinear: '1-21m/s',  weight: '330kg',    dimension: '1100×520×1100'  },
  { model: 'HY-DLH7.4L',  liftType: '手摇升降', workVol: '5L',    designVol: '7.4L',  tankDim: 'Φ250×150',   mixerMotor: '1.5',  revSpeed: '6-69',   ownSpeed: '16-210',  dissolverKW: '2.2',  dissolverType: '伺服电机', dissolverRPM: '800-9000',  dissolverLinear: '1-22m/s',  weight: '415kg',    dimension: '1200×520×1100'  },
  { model: 'HY-DLH14L',   liftType: '电动升降', workVol: '10L',   designVol: '14L',   tankDim: 'Φ300×200',   mixerMotor: '2.2',  revSpeed: '0-48',   ownSpeed: '0-148',   dissolverKW: '2.2',  dissolverType: '变频电机', dissolverRPM: '0-7000',    dissolverLinear: '0-23m/s',  weight: '550kg',    dimension: '1300×800×1800'  },
  { model: 'HY-DLH24L',   liftType: '电动升降', workVol: '15L',   designVol: '24L',   tankDim: 'Φ350×250',   mixerMotor: '2.2',  revSpeed: '0-44',   ownSpeed: '0-142',   dissolverKW: '3',    dissolverType: '变频电机', dissolverRPM: '0-5900',    dissolverLinear: '0-23m/s',  weight: '770kg',    dimension: '1500×800×1750'  },
  { model: 'HY-DLH28L',   liftType: '电动升降', workVol: '20L',   designVol: '28L',   tankDim: 'Φ350×300',   mixerMotor: '2.2',  revSpeed: '0-45',   ownSpeed: '0-142',   dissolverKW: '3',    dissolverType: '变频电机', dissolverRPM: '0-5900',    dissolverLinear: '0-23m/s',  weight: '820kg',    dimension: '1500×800×2000'  },
  { model: 'HY-DLH43L',   liftType: '电动升降', workVol: '30L',   designVol: '43L',   tankDim: 'Φ420×320',   mixerMotor: '4',    revSpeed: '0-44',   ownSpeed: '0-108',   dissolverKW: '4',    dissolverType: '变频电机', dissolverRPM: '0-5500',    dissolverLinear: '0-23m/s',  weight: '900kg',    dimension: '1700×660×1750'  },
  { model: 'HY-DLH88L',   liftType: '液压升降', workVol: '60L',   designVol: '88L',   tankDim: 'Φ530×400',   mixerMotor: '5.5',  revSpeed: '0-41',   ownSpeed: '0-104',   dissolverKW: '7.5',  dissolverType: '变频电机', dissolverRPM: '0-4500',    dissolverLinear: '0-23m/s',  weight: '1700kg',   dimension: '1800×1100×2300' },
  { model: 'HY-DLH149L',  liftType: '液压升降', workVol: '100L',  designVol: '149L',  tankDim: 'Φ650×450',   mixerMotor: '7.5',  revSpeed: '0-35',   ownSpeed: '0-90',    dissolverKW: '11',   dissolverType: '变频电机', dissolverRPM: '0-3700',    dissolverLinear: '0-23m/s',  weight: '2700kg',   dimension: '2200×1300×2500' },
  { model: 'HY-DLH287L',  liftType: '液压升降', workVol: '200L',  designVol: '287L',  tankDim: 'Φ750×650',   mixerMotor: '15',   revSpeed: '0-25',   ownSpeed: '0-60',    dissolverKW: '22',   dissolverType: '变频电机', dissolverRPM: '0-2800',    dissolverLinear: '0-23m/s',  weight: '4200kg',   dimension: '2400×1600×3100' },
  { model: 'HY-DLH368L',  liftType: '液压升降', workVol: '300L',  designVol: '368L',  tankDim: 'Φ850×650',   mixerMotor: '30',   revSpeed: '0-32',   ownSpeed: '0-82',    dissolverKW: '30',   dissolverType: '变频电机', dissolverRPM: '0-2200',    dissolverLinear: '0-23m/s',  weight: '7200kg',   dimension: '3400×1300×3500' },
  { model: 'HY-DLH450L',  liftType: '液压升降', workVol: '350L',  designVol: '450L',  tankDim: 'Φ900×710',   mixerMotor: '30',   revSpeed: '0-26',   ownSpeed: '0-66',    dissolverKW: '37',   dissolverType: '变频电机', dissolverRPM: '0-2200',    dissolverLinear: '0-23m/s',  weight: '7200kg',   dimension: '2870×1800×3400' },
  { model: 'HY-DLH670L',  liftType: '液压升降', workVol: '500L',  designVol: '670L',  tankDim: 'Φ1000×850',  mixerMotor: '45',   revSpeed: '0-23',   ownSpeed: '0-59',    dissolverKW: '45',   dissolverType: '变频电机', dissolverRPM: '0-2000',    dissolverLinear: '0-23m/s',  weight: '10500kg',  dimension: '3500×1500×4000' },
  { model: 'HY-DLH820L',  liftType: '液压升降', workVol: '650L',  designVol: '820L',  tankDim: 'Φ1100×865',  mixerMotor: '45',   revSpeed: '0-23',   ownSpeed: '0-59',    dissolverKW: '45',   dissolverType: '变频电机', dissolverRPM: '0-2000',    dissolverLinear: '0-23m/s',  weight: '12500kg',  dimension: '3600×1600×4100' },
  { model: 'HY-DLH1327L', liftType: '液压升降', workVol: '1000L', designVol: '1327L', tankDim: 'Φ1300×1000', mixerMotor: '75',   revSpeed: '0-18',   ownSpeed: '0-45',    dissolverKW: '75',   dissolverType: '变频电机', dissolverRPM: '0-1700',    dissolverLinear: '0-23m/s',  weight: '25000kg',  dimension: '4170×1800×4780' },
  { model: 'HY-DLH1690L', liftType: '液压升降', workVol: '1200L', designVol: '1690L', tankDim: 'Φ1400×1100', mixerMotor: '75',   revSpeed: '0-18',   ownSpeed: '0-45',    dissolverKW: '75',   dissolverType: '变频电机', dissolverRPM: '0-1700',    dissolverLinear: '0-24m/s',  weight: '30000kg',  dimension: '5376×1874×5366' },
  { model: 'HY-DLH2100L', liftType: '液压升降', workVol: '1500L', designVol: '2100L', tankDim: 'Φ1500×1200', mixerMotor: '90',   revSpeed: '0-18',   ownSpeed: '0-45',    dissolverKW: '90',   dissolverType: '变频电机', dissolverRPM: '0-1700',    dissolverLinear: '0-24m/s',  weight: '33000kg',  dimension: '4726×1870×5500' },
  { model: 'HY-DLH2300L', liftType: '液压升降', workVol: '1600L', designVol: '2300L', tankDim: 'Φ1560×1210', mixerMotor: '110',  revSpeed: '0-19',   ownSpeed: '0-46',    dissolverKW: '110',  dissolverType: '变频电机', dissolverRPM: '0-1550',    dissolverLinear: '0-24m/s',  weight: '35000kg',  dimension: '5380×1930×5700' },
  { model: 'HY-DLH3400L', liftType: '液压升降', workVol: '3000L', designVol: '3400L', tankDim: 'Φ1700×1500', mixerMotor: '132',  revSpeed: '0-12',   ownSpeed: '0-30',    dissolverKW: '132',  dissolverType: '变频电机', dissolverRPM: '0-1000',    dissolverLinear: '0-23m/s',  weight: '42000kg',  dimension: '5800×2300×6000' },
]

/* ========== 产品型号展示数据 ========== */
const productModels = [
  {
    name: '实验室型',
    fullName: '实验室型双行星动力混合机',
    img: '/assets/images/products/pd-mixer/model-lab.jpg',
    desc: '适用于研发、小批量实验及工艺验证，紧凑轻便，操作简洁，与量产机型保持工艺一致性。',
  },
  {
    name: '桶体翻转型',
    fullName: '桶体翻转型双行星动力混合机',
    img: '/assets/images/products/pd-mixer/model-flip.jpg',
    desc: '桶体可翻转出料，适用于高粘度物料的便捷出料作业，显著减少残料损耗与清洗时间。',
  },
  {
    name: '450L 小型',
    fullName: '450L 小型双行星动力混合机',
    img: '/assets/images/products/pd-mixer/model-450l.jpg',
    desc: '面向中小批量生产设计，集成液压升降系统，兼顾产能与灵活性，是量产产线的高性价比之选。',
  },
]

/* ========== 客户案例数据 ========== */
const cases = [
  {
    group: '全自动加投料系统解决方案',
    images: [
      { src: '/assets/images/products/pd-mixer/case-system-1.jpg', alt: '全自动加投料系统设备' },
      { src: '/assets/images/products/pd-mixer/case-system-2.jpg', alt: '全自动加投料系统现场' },
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
            <th>工作容积<br />设计容积<br /><span className="th-sub">Work volume<br />Design volume</span></th>
            <th>桶体内尺寸<br /><span className="th-sub">Tank internal<br />dimension (mm)</span></th>
            <th>公转电机<br /><span className="th-sub">Mixer motor<br />(KW)</span></th>
            <th>公转转速<br />浆转速<br /><span className="th-sub">Revolution speed<br />Own speed (Rpm)</span></th>
            <th>分散电机<br /><span className="th-sub">Dissolver motor<br />(KW)</span></th>
            <th>分散转速<br /><span className="th-sub">Dissolver speed<br />(Rpm)</span></th>
            <th>重量<br />外形尺寸<br /><span className="th-sub">Weight<br />Dimension (mm)</span></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <React.Fragment key={i}>
              <tr className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
                <td className="td-model-code">{row.model}</td>
                <td>{row.workVol}</td>
                <td rowSpan={2} className="td-span">{row.tankDim}</td>
                <td rowSpan={2} className="td-span">{row.mixerMotor}</td>
                <td>{row.revSpeed}</td>
                <td>{row.dissolverKW}</td>
                <td>{row.dissolverRPM}</td>
                <td>{row.weight}</td>
              </tr>
              <tr className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
                <td className="td-lift-type">{row.liftType}</td>
                <td>{row.designVol}</td>
                <td>{row.ownSpeed}</td>
                <td>{row.dissolverType}</td>
                <td>{row.dissolverLinear}</td>
                <td>{row.dimension}</td>
              </tr>
            </React.Fragment>
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
      { threshold: 0.12 }
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

        {/* ===== 产品展示 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">产品展示</h2>
            <div className="pdm-showcase fade-up fade-up-delay-1">
              <img
                src="/assets/images/products/pd-mixer/main-product.jpg"
                alt="双行星动力™混合机（PD搅拌机）"
                className="pdm-showcase-img"
              />
            </div>
          </div>
        </section>

        {/* ===== 产品介绍 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">产品介绍</h2>
            <div className="pdm-intro-layout">
              <div className="pdm-intro-text fade-up fade-up-delay-1">
                <p>
                  双行星动力混合机（PD搅拌机）通常具有一个或多个搅拌桨和分散盘，它们围绕釜体轴线公转的同时，也围绕自身轴线自转。通过搅拌桨和分散盘的行星运动，使物料受到剪切和捏合作用，实现混合。是一种<strong>无死角的动力混合、分散设备</strong>。
                </p>
                <p>
                  广泛应用于新能源浆料制备、粘合剂、化工涂料、塑料、制药、食品等行业的固-固相、固-液相、液-液相物料的混合、反应、分散、溶解、均质、乳化等工艺过程。
                </p>
              </div>
              <div className="pdm-intro-tags fade-up fade-up-delay-2">
                {['新能源浆料', '粘合剂', '化工涂料', '制药', '食品加工', '电子材料'].map((tag, i) => (
                  <span key={i} className="pdm-app-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 可靠性承诺（产品特点） ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">可靠性承诺</h2>
            <p className="section-desc fade-up fade-up-delay-1">
              经长期生产验证，红运机械的双行星动力混合机以其卓越的可靠性保障生产安全，创下三项"从未"记录：
            </p>
            <div className="pdm-reliability-grid fade-up fade-up-delay-2">
              <div className="pdm-reliability-card">
                <div className="pdm-reliability-index">01</div>
                <div className="pdm-reliability-content">
                  <h3>金属零污染</h3>
                  <p>从未因金属污染（铜、锌、镍、铁）、搅拌机刮壁、漏油而导致浆料报废。</p>
                </div>
              </div>
              <div className="pdm-reliability-card">
                <div className="pdm-reliability-index">02</div>
                <div className="pdm-reliability-content">
                  <h3>桶体结构稳定</h3>
                  <p>从未出现因桶身内胆及桶底内胆变形导致的漏水问题。</p>
                </div>
              </div>
              <div className="pdm-reliability-card">
                <div className="pdm-reliability-index">03</div>
                <div className="pdm-reliability-content">
                  <h3>电气安全防护</h3>
                  <p>从未出现因粉尘进入电柜引起的电气火灾。</p>
                </div>
              </div>
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
                <div className="pdm-adv-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.2-6.8-2.1 2.1M7.3 16.7l-2.1 2.1m0-12.8 2.1 2.1m9.4 9.4 2.1 2.1"/>
                  </svg>
                </div>
                <p>高效混合——行星公转+自转+高速分散三重动力，实现高粘度物料无死角均匀混合。</p>
              </div>
              <div className="detail-feature-card">
                <span className="detail-feature-index">02</span>
                <div className="pdm-adv-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>
                  </svg>
                </div>
                <p>精准控制——变频调速，公转、自转、分散转速独立可调，工艺参数精准复现。</p>
              </div>
              <div className="detail-feature-card">
                <span className="detail-feature-index">03</span>
                <div className="pdm-adv-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m13 2-2 2.5h3L12 7"/><path d="M10 14c.5.5 1.5 1 2 1.5 1 1 1 2 .5 2.5s-1.5.5-2-.5l-1-2"/><path d="M16 12c1 1.5 2 3.5 1 5-.5 1.5-2 2-3 1.5"/><path d="m7 11 2 2m4-10-1 1"/><path d="M11 4c-1 1.5-2 4 0 6l2 2c2 2 5 2 6 0 1.5-2 .5-5-1-6.5"/><path d="M5 19c-1-1-1.5-3 0-4l3-3"/>
                  </svg>
                </div>
                <p>强剪切分散——高速分散盘产生强剪切力，有效破碎团聚体，分散均匀度≥99%。</p>
              </div>
              <div className="detail-feature-card">
                <span className="detail-feature-index">04</span>
                <div className="pdm-adv-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <p>稳定搅拌——液压升降、真空密封、防污染设计，长期运行零故障，保障生产连续性。</p>
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
            <p className="section-desc fade-up fade-up-delay-1">
              双行星动力™混合机（PD搅拌机）覆盖从实验室级到工业级全系列规格，满足不同产线需求。
            </p>

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
                <h3 className="pdm-case-group-title">{c.group}</h3>
                <div className={`pdm-case-images pdm-case-images--${c.images.length}`}>
                  {c.images.map((img, ii) => (
                    <div key={ii} className="pdm-case-image-wrap">
                      <img src={img.src} alt={img.alt} className="pdm-case-img" />
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
            <h2 className="detail-contact-title">需要了解更多？</h2>
            <p className="detail-contact-desc">
              我们的专业团队随时为您提供技术咨询和定制化解决方案，助力您的生产工艺升级。
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
