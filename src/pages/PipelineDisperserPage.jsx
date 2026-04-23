import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'
import productHeroImg from '../assets/img/Generated Image March 20, 2026 - 10_16PM.jpg'

const IMG = '/assets/images/solutions/pipeline-pulping'

const modelParams = [
  { vol: 55,   id: 400,  len: 460,  ratio: 1.150, designVol: 58,   mixKw: 3,  mixRpm: 150, slurryV: 3.14, gap: '3±1',  dispKw: 3,  rotorDia: 70,  dispRpm: 6300, lineV: 23 },
  { vol: 80,   id: 450,  len: 520,  ratio: 1.156, designVol: 83,   mixKw: 4,  mixRpm: 120, slurryV: 2.83, gap: '3±1',  dispKw: 4,  rotorDia: 100, dispRpm: 4400, lineV: 23 },
  { vol: 150,  id: 560,  len: 650,  ratio: 1.161, designVol: 160,  mixKw: 4,  mixRpm: 100, slurryV: 2.93, gap: '4±1',  dispKw: 4,  rotorDia: 100, dispRpm: 4400, lineV: 23 },
  { vol: 180,  id: 600,  len: 690,  ratio: 1.150, designVol: 195,  mixKw: 5.5,mixRpm: 100, slurryV: 3.14, gap: '4±1',  dispKw: 5.5,rotorDia: 120, dispRpm: 3700, lineV: 23 },
  { vol: 230,  id: 650,  len: 750,  ratio: 1.154, designVol: 249,  mixKw: 7.5,mixRpm: 90,  slurryV: 3.06, gap: '4±1',  dispKw: 7.5,rotorDia: 120, dispRpm: 3700, lineV: 23 },
  { vol: 280,  id: 700,  len: 900,  ratio: 1.286, designVol: 346,  mixKw: 7.5,mixRpm: 90,  slurryV: 3.3,  gap: '4±1',  dispKw: 7.5,rotorDia: 150, dispRpm: 2950, lineV: 23 },
  { vol: 350,  id: 750,  len: 870,  ratio: 1.160, designVol: 384,  mixKw: 7.5,mixRpm: 75,  slurryV: 2.95, gap: '5±1',  dispKw: 7.5,rotorDia: 150, dispRpm: 2950, lineV: 23 },
  { vol: 550,  id: 870,  len: 1000, ratio: 1.149, designVol: 594,  mixKw: 11, mixRpm: 75,  slurryV: 3.42, gap: '5±1',  dispKw: 11, rotorDia: 150, dispRpm: 2950, lineV: 23 },
  { vol: 630,  id: 900,  len: 1040, ratio: 1.156, designVol: 661,  mixKw: 11, mixRpm: 75,  slurryV: 3.53, gap: '5±1',  dispKw: 11, rotorDia: 150, dispRpm: 2950, lineV: 23 },
  { vol: 850,  id: 1000, len: 1150, ratio: 1.150, designVol: 903,  mixKw: 15, mixRpm: 75,  slurryV: 3.93, gap: '7±2',  dispKw: 15, rotorDia: 200, dispRpm: 2200, lineV: 23 },
  { vol: 1200, id: 1120, len: 1290, ratio: 1.152, designVol: 1270, mixKw: 22, mixRpm: 60,  slurryV: 3.52, gap: '7±2',  dispKw: 22, rotorDia: 200, dispRpm: 2200, lineV: 23 },
  { vol: 1500, id: 1210, len: 1400, ratio: 1.157, designVol: 1609, mixKw: 30, mixRpm: 60,  slurryV: 3.8,  gap: '7±2',  dispKw: 30, rotorDia: 200, dispRpm: 2200, lineV: 23 },
  { vol: 1700, id: 1260, len: 1450, ratio: 1.151, designVol: 1807, mixKw: 37, mixRpm: 60,  slurryV: 3.96, gap: '7±2',  dispKw: 37, rotorDia: 200, dispRpm: 2200, lineV: 23 },
  { vol: 2100, id: 1350, len: 1560, ratio: 1.156, designVol: 2232, mixKw: 45, mixRpm: 52,  slurryV: 3.68, gap: '8±2',  dispKw: 45, rotorDia: 250, dispRpm: 1760, lineV: 23 },
  { vol: 2300, id: 1400, len: 1610, ratio: 1.150, designVol: 2477, mixKw: 45, mixRpm: 52,  slurryV: 3.81, gap: '8±2',  dispKw: 45, rotorDia: 250, dispRpm: 1760, lineV: 23 },
  { vol: 3000, id: 1520, len: 1750, ratio: 1.151, designVol: 3174, mixKw: 55, mixRpm: 45,  slurryV: 3.58, gap: '10±2', dispKw: 55, rotorDia: 250, dispRpm: 1760, lineV: 23 },
]

function ParamsTable() {
  return (
    <div className="detail-params-table">
      <table className="params-table pdm-params-table dpm-params-table">
        <thead>
          <tr>
            <th>规格(L)<br /><span className="th-sub">Volume</span></th>
            <th>内径(mm)<br /><span className="th-sub">Inner Dia.</span></th>
            <th>长度(mm)<br /><span className="th-sub">Length</span></th>
            <th>长径比<br /><span className="th-sub">L/D Ratio</span></th>
            <th>设计容积(L)<br /><span className="th-sub">Design Vol.</span></th>
            <th>搅拌功率(kW)<br /><span className="th-sub">Mix Motor</span></th>
            <th>搅拌转速(rpm)<br /><span className="th-sub">Mix RPM</span></th>
            <th>浆线速(m/s)<br /><span className="th-sub">Blade Speed</span></th>
            <th>浆与壁间隙(mm)<br /><span className="th-sub">Gap</span></th>
            <th>分散功(kW)<br /><span className="th-sub">Disp. Motor</span></th>
            <th>转子直径(mm)<br /><span className="th-sub">Rotor Dia.</span></th>
            <th>分散转速(rpm)<br /><span className="th-sub">Disp. RPM</span></th>
            <th>线速度(m/s)<br /><span className="th-sub">Linear Speed</span></th>
          </tr>
        </thead>
        <tbody>
          {modelParams.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              <td className="td-model-code">{row.vol}</td>
              <td>{row.id}</td>
              <td>{row.len}</td>
              <td>{row.ratio}</td>
              <td>{row.designVol}</td>
              <td>{row.mixKw}</td>
              <td>{row.mixRpm}</td>
              <td>{row.slurryV}</td>
              <td>{row.gap}</td>
              <td>{row.dispKw}</td>
              <td>{row.rotorDia}</td>
              <td>{row.dispRpm}</td>
              <td>{row.lineV}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PipelineDisperserPage() {
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
        title="管线分散罐"
        subtitle="Pipeline Disperser · 新能源行业核心装备"
        bgImage={productHeroImg}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products/new-energy' },
          { label: '新能源行业', path: '/products/new-energy' },
          { label: '管线分散罐' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'center', marginTop: '56px' }}>
              <div style={{ flex: '0 0 50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${IMG}/disperser-02.svg`}
                  alt="管线分散罐"
                  style={{ display: 'block', width: '70%', height: 'auto' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">管线分散罐</h2>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  管线分散罐基本构成由搅拌系统模块、密封系统模块、分散系统模块及水冷系统组成，主体设备有观察口、加料口、进料口、抽真空口、放空口、取样口、出料口等，桶体带冷却夹套。控制系统包含：搅拌系统 1 套、定转子高速分散剪切系统 1 套、恒温控制系统 1 套。
                </p>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  搅拌桨正向旋转时，搅拌桨轴向将罐内两端的物料推向罐体中间，便于中部位置的高速分散系统将浆料进行分散。螺旋形桨叶将分散好的浆料径向散开，形成浆料大循环流动；分散系统定子的弧形叶片在高速旋转下，产生强大的离心流场，在转子中心形成相对低压区，浆料从定转子中心被吸入，在离心力的作用下，物料被分散剪切，由中心向四周扩散，配合螺旋搅拌桨的旋转，进行浆料循环分散。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 参数汇总 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <p className="section-en-label fade-up">Parameters Overview</p>
            <h2 className="section-heading section-heading--center fade-up">参数汇总</h2>
            <div className="fade-up fade-up-delay-1">
              <ParamsTable />
            </div>
            <p className="cp-table-note fade-up fade-up-delay-3">
              * 以上参数仅供参考，实际规格以合同为准。可根据客户工艺需求进行定制化设计。
            </p>
          </div>
        </section>

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
