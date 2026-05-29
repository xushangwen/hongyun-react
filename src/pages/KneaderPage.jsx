import React, { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'
const HERO_IMG = '/assets/images/solutions/robot-assembly.webp'

const PP_IMG = '/assets/images/solutions/pipeline-pulping'
const SIM_IMG = '/assets/images/products/kneader'

const modelParams = [
  { vol: 55,   id: 400,  len: 460,  ratio: 1.150, designVol: 58,   mixKw: 3,  mixRpm: 150, slurryV: 3.14, gap: '3±1', dispKw: 3,  rotorDia: 70,  dispRpm: 6300, lineV: 23 },
  { vol: 80,   id: 450,  len: 520,  ratio: 1.156, designVol: 83,   mixKw: 4,  mixRpm: 120, slurryV: 2.83, gap: '3±1', dispKw: 4,  rotorDia: 100, dispRpm: 4400, lineV: 23 },
  { vol: 150,  id: 560,  len: 650,  ratio: 1.161, designVol: 160,  mixKw: 4,  mixRpm: 100, slurryV: 2.93, gap: '4±1', dispKw: 4,  rotorDia: 100, dispRpm: 4400, lineV: 23 },
  { vol: 180,  id: 600,  len: 690,  ratio: 1.150, designVol: 195,  mixKw: 5.5,mixRpm: 100, slurryV: 3.14, gap: '4±1', dispKw: 5.5,rotorDia: 120, dispRpm: 3700, lineV: 23 },
  { vol: 230,  id: 650,  len: 750,  ratio: 1.154, designVol: 249,  mixKw: 7.5,mixRpm: 90,  slurryV: 3.06, gap: '4±1', dispKw: 7.5,rotorDia: 120, dispRpm: 3700, lineV: 23 },
  { vol: 280,  id: 700,  len: 900,  ratio: 1.286, designVol: 346,  mixKw: 7.5,mixRpm: 90,  slurryV: 3.3,  gap: '4±1', dispKw: 7.5,rotorDia: 150, dispRpm: 2950, lineV: 23 },
  { vol: 350,  id: 750,  len: 870,  ratio: 1.160, designVol: 384,  mixKw: 7.5,mixRpm: 75,  slurryV: 2.95, gap: '5±1', dispKw: 7.5,rotorDia: 150, dispRpm: 2950, lineV: 23 },
  { vol: 550,  id: 870,  len: 1000, ratio: 1.149, designVol: 594,  mixKw: 11, mixRpm: 75,  slurryV: 3.42, gap: '5±1', dispKw: 11, rotorDia: 150, dispRpm: 2950, lineV: 23 },
  { vol: 630,  id: 900,  len: 1040, ratio: 1.156, designVol: 661,  mixKw: 11, mixRpm: 75,  slurryV: 3.53, gap: '5±1', dispKw: 11, rotorDia: 150, dispRpm: 2950, lineV: 23 },
  { vol: 850,  id: 1000, len: 1150, ratio: 1.150, designVol: 903,  mixKw: 15, mixRpm: 75,  slurryV: 3.93, gap: '7±2', dispKw: 15, rotorDia: 200, dispRpm: 2200, lineV: 23 },
  { vol: 1200, id: 1120, len: 1290, ratio: 1.152, designVol: 1270, mixKw: 22, mixRpm: 60,  slurryV: 3.52, gap: '7±2', dispKw: 22, rotorDia: 200, dispRpm: 2200, lineV: 23 },
  { vol: 1500, id: 1210, len: 1400, ratio: 1.157, designVol: 1609, mixKw: 30, mixRpm: 60,  slurryV: 3.8,  gap: '7±2', dispKw: 30, rotorDia: 200, dispRpm: 2200, lineV: 23 },
  { vol: 1700, id: 1260, len: 1450, ratio: 1.151, designVol: 1807, mixKw: 37, mixRpm: 60,  slurryV: 3.96, gap: '7±2', dispKw: 37, rotorDia: 200, dispRpm: 2200, lineV: 23 },
  { vol: 2100, id: 1350, len: 1560, ratio: 1.156, designVol: 2232, mixKw: 45, mixRpm: 52,  slurryV: 3.68, gap: '8±2', dispKw: 45, rotorDia: 250, dispRpm: 1760, lineV: 23 },
  { vol: 2300, id: 1400, len: 1610, ratio: 1.150, designVol: 2477, mixKw: 45, mixRpm: 52,  slurryV: 3.81, gap: '8±2', dispKw: 45, rotorDia: 250, dispRpm: 1760, lineV: 23 },
  { vol: 3000, id: 1520, len: 1750, ratio: 1.151, designVol: 3174, mixKw: 55, mixRpm: 45,  slurryV: 3.58, gap: '10±2',dispKw: 55, rotorDia: 250, dispRpm: 1760, lineV: 23 },
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

export default function KneaderPage() {
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
        title="管线捏合罐"
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '产品中心', path: '/products' },
          { label: '新能源行业', path: '/products#products-new-energy' },
          { label: '管线捏合罐' },
        ]} />

        {/* ===== 产品介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="fade-up" style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', maxWidth: '1040px', margin: '0 auto' }}>
              <div style={{ flex: '0 0 50%', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={`${PP_IMG}/tank-main.webp`}
                  alt="管线捏合罐"
                  style={{ display: 'block', height: '100%', width: 'auto', objectFit: 'contain' }}
                  loading="eager"
                />
              </div>
              <div style={{ flex: '1 1 0', minWidth: 0 }}>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">管线捏合罐</h2>
                <ul className="cp-core-device-features fade-up fade-up-delay-2">
                  <li>设备稼动率高：传动系统全面简化，维护及保养成本低</li>
                  <li>精准温控系统，出料温度可控</li>
                  <li>紧凑型设计，占用空间小</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 三视图 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <p className="section-en-label fade-up">Three Views</p>
            <h2 className="section-heading section-heading--center fade-up">三视图</h2>
            <p className="cp-core-device-tbd fade-up fade-up-delay-1">三视图内容待提供</p>
          </div>
        </section>

        {/* ===== 管线式匀浆机流体仿真 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">CFD Simulation</p>
            <h2 className="section-heading section-heading--center fade-up">管线式匀浆机流体仿真</h2>

            {/* 01 粘度云图 */}
            <div className="cp-verify-block fade-up fade-up-delay-1">
              <h3 className="cp-verify-subheading">「捏合罐」粘度云图</h3>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: '0 0 66%', padding: '28px 24px', borderRight: '1px solid #e2e8f0', background: '#fff' }}>
                    <img
                      src={`${SIM_IMG}/cfd-viscosity.webp`}
                      alt="捏合罐粘度云图"
                      style={{ display: 'block', width: '80%', height: 'auto', margin: '0 auto' }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ flex: 1, padding: '28px 24px', display: 'flex', alignItems: 'center' }}>
                    <ul className="cp-core-device-features">
                      <li>假塑性流体在高剪切下，粘度降低；</li>
                      <li>此模型中静止未受剪切的流体粘度约 14000 CP；</li>
                      <li>30 rpm 匀速搅拌下，最低粘度约 3500 cP。</li>
                      <li>（由 STAR-CCM+ 仿真模拟）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 02 剪切应力云图 */}
            <div className="cp-verify-block fade-up fade-up-delay-2">
              <h3 className="cp-verify-subheading">「捏合罐」剪切应力云图</h3>

              {/* 2行×(左图区+右文字区) grid */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>

                {/* Row 1: 壁面 + 搅拌桨表面 | 2条要点 */}
                <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ flex: '0 0 66%', padding: '28px 24px', borderRight: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'stretch', background: '#fff' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>罐体壁面剪切应力</span>
                      <img
                        src={`${SIM_IMG}/cfd-shear-wall.png`}
                        alt="罐体壁面剪切应力云图"
                        style={{ display: 'block', width: '100%', height: 'auto' }}
                        loading="lazy"
                      />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>搅拌桨表面剪切应力</span>
                      <img
                        src={`${SIM_IMG}/cfd-shear-blade-surface.webp`}
                        alt="搅拌桨表面剪切应力云图"
                        style={{ flex: 1, minHeight: 0, width: 'auto', maxWidth: '100%', objectFit: 'contain', objectPosition: 'top left' }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div style={{ flex: 1, padding: '28px 24px', display: 'flex', alignItems: 'center' }}>
                    <ul className="cp-core-device-features">
                      <li>罐体壁面浆料受到搅拌桨的周期性剪切应力；</li>
                      <li>搅拌桨外边缘线速度越大，搅拌桨表面流体受到的剪切应力越大。</li>
                    </ul>
                  </div>
                </div>

                {/* Row 2: 截面分析 4图 | 5条要点 */}
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: '0 0 66%', padding: '28px 24px', borderRight: '1px solid #e2e8f0', background: '#fff' }}>
                    <img
                      src={`${SIM_IMG}/cfd-shear-blade.webp`}
                      alt="搅拌桨截面剪切应力云图"
                      style={{ display: 'block', width: '80%', height: 'auto', margin: '0 auto' }}
                      loading="lazy"
                    />
                  </div>
                  <div style={{ flex: 1, padding: '28px 24px', display: 'flex', alignItems: 'center' }}>
                    <ul className="cp-core-device-features">
                      <li>前后桨叶对浆料产生强剪切；</li>
                      <li>正转阶段，Section A 与 Section B 的汇聚作用不断将罐体内两侧浆料推入该关键截面，使浆料在此处充分捏合。</li>
                      <li>匀速阶段转速为 30 rpm，搅拌桨转动一周的时间为 2 秒；</li>
                      <li>匀速转动后，截面上的流体流动周期为 0.5 秒；</li>
                      <li>正转阶段，此截面上，搅拌桨以 0.5 秒的周期，持续把两侧浆料推向中间剪切捏合，并将上侧浆料推入底部。</li>
                    </ul>
                  </div>
                </div>

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
