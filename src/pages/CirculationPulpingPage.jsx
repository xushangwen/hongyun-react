import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  IconArrowRightOutline24,
  IconFindReplaceOutline24,
  IconLockOutline24,
  IconSortBottomToTopOutline24,
  IconLayersOutline24,
  IconFanOutline24,
  IconTemperature2Outline24,
  IconArrowsInfinityOutline24,
  IconShieldLockOutline24,
  IconTargetOutline24,
  IconRotateCubeOutline24,
} from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ctaBgImg from '../assets/img/需要了解更多.jpg'

const IMG = '/assets/images/solutions/circulation-pulping'

/* ========== 产品型号参数（OCR）========== */
const modelParams = [
  { model: 'HY-HXF60',   output: 60,   batchVol: 120,  flowRate: 40,   motorKW: 37,  linearSpeed: 30 },
  { model: 'HY-HXF120',  output: 120,  batchVol: 240,  flowRate: 80,   motorKW: 55,  linearSpeed: 30 },
  { model: 'HY-HXF300',  output: 300,  batchVol: 600,  flowRate: 200,  motorKW: 75,  linearSpeed: 30 },
  { model: 'HY-HXF600',  output: 600,  batchVol: 1200, flowRate: 400,  motorKW: 132, linearSpeed: 30 },
  { model: 'HY-HXF900',  output: 900,  batchVol: 1800, flowRate: 600,  motorKW: 185, linearSpeed: 30 },
  { model: 'HY-HXF1200', output: 1200, batchVol: 2400, flowRate: 800,  motorKW: 200, linearSpeed: 30 },
  { model: 'HY-HXF1500', output: 1500, batchVol: 3000, flowRate: 1000, motorKW: 250, linearSpeed: 30 },
  { model: 'HY-HXF1800', output: 1800, batchVol: 3600, flowRate: 1200, motorKW: 300, linearSpeed: 30 },
]

/* ========== 工艺验证测试步骤（OCR）========== */
const processSteps = [
  { step: '投料到A罐',                     material: 'NMP',             addAmount: '45.699 kg',  pumpFlow: '—',  stirSpeed: '—',  disperseSpeed: '—',    linearSpeed: '—',    time: '—',   note: '手动投料' },
  { step: 'A罐与主机循环',                  material: '—',               addAmount: '—',          pumpFlow: '27', stirSpeed: '35', disperseSpeed: '1500', linearSpeed: '11.4', time: '10',  note: '' },
  { step: '粉体投料到储罐',                  material: 'LFP / SP / PVDF', addAmount: '90.00 / 0.928 / 1.856 kg', pumpFlow: '—', stirSpeed: '—', disperseSpeed: '—', linearSpeed: '—', time: '—', note: '负压上料至预混仓' },
  { step: '粉体在储罐预混',                  material: '—',               addAmount: '—',          pumpFlow: '—',  stirSpeed: '35', disperseSpeed: '—',    linearSpeed: '—',    time: '10',  note: '粉体混合' },
  { step: 'A罐与主机循环\n（循环时粉体下料）', material: '—',               addAmount: '—',          pumpFlow: '27', stirSpeed: '—', disperseSpeed: '2000', linearSpeed: '15.2', time: '50',  note: '' },
  { step: '粉体下料结束后\nA罐与主机循环',    material: '—',               addAmount: '—',          pumpFlow: '27', stirSpeed: '—', disperseSpeed: '2000', linearSpeed: '15.2', time: '6',   note: '每个循环记录\n电流、压力、温度' },
  { step: '转B罐分散',                       material: '—',               addAmount: '—',          pumpFlow: '—',  stirSpeed: '—', disperseSpeed: '—',    linearSpeed: '—',    time: '—',   note: '' },
  { step: 'B罐自循环',                       material: '—',               addAmount: '—',          pumpFlow: '27', stirSpeed: '—', disperseSpeed: '2000', linearSpeed: '15.7', time: '30',  note: '根据实际情况增加循环次数，每个循环记录电流、压力、温度' },
]

/* ========== 参数表组件 ========== */
function ParamsTable() {
  return (
    <div className="detail-params-table">
      <table className="params-table pdm-params-table cp-params-table">
        <thead>
          <tr>
            <th>型号<br /><span className="th-sub">Model</span></th>
            <th>产出要求<br /><span className="th-sub">Output (L/H)</span></th>
            <th>批次循环时间<br /><span className="th-sub">Cycle time (min)</span></th>
            <th>工艺时间<br /><span className="th-sub">Process time (h)</span></th>
            <th>批次量<br /><span className="th-sub">Batch volume (L)</span></th>
            <th>循环流量<br /><span className="th-sub">Flow rate (L/min)</span></th>
            <th>电机功率<br /><span className="th-sub">Motor power (kW)</span></th>
            <th>转子线速度<br /><span className="th-sub">Linear speed (m/s)</span></th>
          </tr>
        </thead>
        <tbody>
          {modelParams.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              <td className="td-model-code">{row.model}</td>
              <td>{row.output}</td>
              <td>3</td>
              <td>2</td>
              <td>{row.batchVol}</td>
              <td>{row.flowRate}</td>
              <td>{row.motorKW}</td>
              <td>{row.linearSpeed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ========== 工艺验证表格组件 ========== */
function ProcessTable() {
  return (
    <div className="detail-params-table">
      <table className="params-table pdm-params-table cp-process-table">
        <thead>
          <tr>
            <th>工步</th>
            <th>物料</th>
            <th>加料</th>
            <th>循环泵流量<br /><span className="th-sub">(L/min)</span></th>
            <th>搅拌转速<br /><span className="th-sub">(rpm)</span></th>
            <th>分散机转速<br /><span className="th-sub">(rpm)</span></th>
            <th>分散机线速度<br /><span className="th-sub">(m/s)</span></th>
            <th>时间<br /><span className="th-sub">(min)</span></th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          {processSteps.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              <td className="td-model-code" style={{ whiteSpace: 'pre-line' }}>{row.step}</td>
              <td>{row.material}</td>
              <td>{row.addAmount}</td>
              <td>{row.pumpFlow}</td>
              <td>{row.stirSpeed}</td>
              <td>{row.disperseSpeed}</td>
              <td>{row.linearSpeed}</td>
              <td>{row.time}</td>
              <td className="cp-note-cell" style={{ whiteSpace: 'pre-line' }}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ========== 主页面 ========== */
export default function CirculationPulpingPage() {
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
        title="高效循环制浆系统"
        subtitle="新能源行业 · 高固含量浆料高效制备解决方案"
        bgImage={`${IMG}/hero-bg.jpg`}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '新能源行业', path: '/solutions#new-energy' },
          { label: '高速循环制浆系统' },
        ]} />

        {/* ===== 系统介绍 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">系统介绍</h2>
            <div className="pdm-intro-grid">
              <div className="pdm-intro-content">
                <span className="pdm-intro-label fade-up">新能源行业 · 高效制浆解决方案</span>
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">
                  高效循环制浆系统
                </h2>
                <div className="pdm-intro-rule fade-up fade-up-delay-1"></div>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  <strong>自主研发专利技术</strong>，采用独特分散模块实现粉体与溶剂的快速充分混合。其独立的自循环分散系统可高效完成浆料均匀混合，确保稳定性和一致性。
                </p>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  系统采用简便传动结构，在保证高扭矩输出的同时显著降低故障率，极大提高了匀浆效率和设备稼动率。
                </p>
                <div className="pdm-intro-apps fade-up fade-up-delay-3">
                  {[
                    { name: '高效自循环分散', icon: IconArrowsInfinityOutline24 },
                    { name: '专利气密密封', icon: IconShieldLockOutline24 },
                    { name: '物料温度可控', icon: IconTargetOutline24 },
                    { name: '高稼动率', icon: IconRotateCubeOutline24 },
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
                    src={`${IMG}/hero.jpeg`}
                    alt="高效循环制浆系统"
                    className="pdm-intro-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 设备配置图 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">设备配置</h2>
            <p className="section-desc fade-up fade-up-delay-1">高效循环制浆系统各单元协同运行，实现粉体预混、高速分散、循环研磨、在线检测全流程集成。</p>
            <div className="cp-diagram-wrap fade-up fade-up-delay-2">
              <img
                src={`${IMG}/equipment-config.svg`}
                alt="高效循环制浆系统设备配置图"
                className="cp-diagram-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ===== 高速分散机 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">高速分散机</h2>

            {/* 主要特点 */}
            <div className="cp-subheading-wrapper fade-up fade-up-delay-1">
              <h3 className="cp-subheading">主要特点</h3>
            </div>
            <div className="cp-disperser-features fade-up fade-up-delay-2">
              {[
                { icon: IconFindReplaceOutline24,    title: '一体化预混分散', desc: '集预混分散一体，设计线速度30m/s，伺服电机驱动，效率卓越' },
                { icon: IconLockOutline24,           title: '专利机械密封',   desc: '采用自主专利设计机械密封，保障设备持续高气密性' },
                { icon: IconSortBottomToTopOutline24, title: '侧面螺杆喂料',  desc: '侧面螺杆喂料，液料下进上出，进料连续顺畅' },
                { icon: IconLayersOutline24,         title: '双层分散剪切',  desc: '分散腔体设计双层分散剪切，带增压叶片，分散效率倍增' },
                { icon: IconFanOutline24,            title: '专利设计叶轮',  desc: '预混腔采用自主专利叶轮，可迅速将粉液预混并快速排出' },
                { icon: IconTemperature2Outline24,   title: '温度在线监控', desc: '带冷却水夹套，物料温度在线监测，全程保障物料温度可控' },
              ].map((item, i) => (
                <div key={i} className="cp-disperser-feat-card">
                  <div className="cp-disperser-feat-icon"><item.icon size={22} /></div>
                  <div className="cp-disperser-feat-body">
                    <h4 className="cp-disperser-feat-title">{item.title}</h4>
                    <p className="cp-disperser-feat-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 结构示意图 + 工作原理 */}
            <div className="cp-disperser-diagrams fade-up fade-up-delay-3">
              <div className="cp-disperser-diagram-block">
                <div className="cp-subheading-wrapper">
                  <h3 className="cp-subheading">结构示意图</h3>
                </div>
                <div className="cp-diagram-card">
                  <img src={`${IMG}/disperser-structure.svg`} alt="高速分散机结构示意图" className="cp-diagram-img" loading="lazy" />
                </div>
              </div>
              <div className="cp-disperser-diagram-block">
                <div className="cp-subheading-wrapper">
                  <h3 className="cp-subheading">工作原理</h3>
                </div>
                <div className="cp-diagram-card">
                  <img src={`${IMG}/disperser-principle.svg`} alt="高速分散机工作原理" className="cp-diagram-img" loading="lazy" />
                  <div className="cp-principle-card">
                    <ol className="cp-principle-list">
                      <li>下层离心转子的弧形叶片在高速旋转下产生强大离心流场，在转子中心形成相对低压区，浆料从定转子中心被吸入，在离心力作用下由中心向四周扩散，二次加压通过定子齿槽，将浆料进行首次分散剪切；</li>
                      <li>首次分散剪切后的浆料再聚拢进入上层分散腔，进行第二次分散剪切，浆料得到再次离心散开，聚拢后由出料口排出。</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 循环罐 A & B ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">循环罐组成</h2>
            <p className="section-desc fade-up fade-up-delay-1">
              系统由循环罐A与循环罐B协同工作，分别承担预混循环与在线分散功能，实现浆料的充分均质。
            </p>
            <div className="cp-tanks-grid">
              {/* 循环罐A */}
              <div className="cp-tank-block fade-up fade-up-delay-2">
                <div className="cp-tank-header">
                  <span className="cp-tank-badge">A</span>
                  <div>
                    <span className="cp-tank-type">循环罐A</span>
                    <h3 className="cp-tank-title">主要特点</h3>
                  </div>
                </div>
                <ul className="cp-tank-features">
                  {[
                    '带慢速搅拌，转速0–40rpm/min，锚式搅拌桨，变频电机驱动',
                    '带冷却水夹套，桶内物料温度在线监测，保障物料温度可控',
                    '采用自主专利设计机械密封，保障设备高气密性',
                    '桶底锥形夹角60°设计，物料上进下出，保障物料100%循环分散',
                  ].map((feat, i) => (
                    <li key={i} className="cp-tank-feat-item">
                      <span className="cp-tank-feat-num">{i + 1}</span>
                      <span className="cp-tank-feat-text">{feat}</span>
                    </li>
                  ))}
                </ul>
                <div className="cp-tank-diagram-wrap">
                  <img src={`${IMG}/tank-a.svg`} alt="循环罐A结构示意图" className="cp-tank-img" loading="lazy" />
                </div>
              </div>

              {/* 循环罐B */}
              <div className="cp-tank-block fade-up fade-up-delay-3">
                <div className="cp-tank-header">
                  <span className="cp-tank-badge cp-tank-badge--b">B</span>
                  <div>
                    <span className="cp-tank-type">循环罐B</span>
                    <h3 className="cp-tank-title">主要特点</h3>
                  </div>
                </div>
                <ul className="cp-tank-features">
                  {[
                    '带在线分散功能，设计线速度30m/s，双层剪切，定转子间隙2mm，伺服电机驱动',
                    '采用自主专利设计机械密封，保障设备高气密性',
                    '桶底锥形夹角60°设计，保障物料100%分散，无死区残留',
                    '带冷却水夹套，桶内物料温度在线监测，保障物料温度可控',
                  ].map((feat, i) => (
                    <li key={i} className="cp-tank-feat-item">
                      <span className="cp-tank-feat-num">{i + 1}</span>
                      <span className="cp-tank-feat-text">{feat}</span>
                    </li>
                  ))}
                </ul>
                <div className="cp-tank-diagram-wrap">
                  <img src={`${IMG}/tank-b.svg`} alt="循环罐B结构示意图" className="cp-tank-img" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 产品型号参数 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">产品型号参数</h2>
            <h3 className="cp-table-subtitle fade-up fade-up-delay-1">
              高速循环制浆系统覆盖60–1800 L/H全系列规格，转子线速度统一30m/s，满足不同量产产能需求。
            </h3>
            <div className="fade-up fade-up-delay-2">
              <ParamsTable />
            </div>
            <p className="cp-table-note fade-up fade-up-delay-3">
              * 以上参数仅供参考，实际规格以合同为准。可根据客户工艺需求进行定制化设计。
            </p>
          </div>
        </section>

        {/* ===== 客户案例——正极生产流程图 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading fade-up">客户案例</h2>
            <p className="section-desc fade-up fade-up-delay-1">
              高效循环制浆系统正极生产流程图
            </p>
            <div className="cp-case-flow-wrap fade-up fade-up-delay-2">
              <img
                src={`${IMG}/case-flow-diagram.png`}
                alt="高效循环制浆系统正极生产流程图"
                className="cp-case-flow-img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ===== 工艺验证结果 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading fade-up">某客户量产线与红运高速循环工艺验证结果</h2>

            {/* 1. 来料信息 */}
            <div className="cp-verify-block fade-up fade-up-delay-1">
              <h3 className="cp-verify-subheading">
                <span className="cp-verify-num">01</span>来料信息
              </h3>
              <div className="cp-incoming-grid">
                <div className="cp-incoming-item">
                  <span className="cp-incoming-label">材料体系</span>
                  <span className="cp-incoming-value">LFP：D50 = 0.5–1μm、SP、PVDF、分散剂</span>
                </div>
                <div className="cp-incoming-item">
                  <span className="cp-incoming-label">浆料粘度</span>
                  <span className="cp-incoming-value">9000 ± 3000 mPa·s</span>
                </div>
                <div className="cp-incoming-item">
                  <span className="cp-incoming-label">细度</span>
                  <span className="cp-incoming-value">≤ 20 μm</span>
                </div>
                <div className="cp-incoming-item">
                  <span className="cp-incoming-label">固含量</span>
                  <span className="cp-incoming-value">65%</span>
                </div>
              </div>
            </div>

            {/* 2. 单次循环测试步骤表 */}
            <div className="cp-verify-block fade-up fade-up-delay-2">
              <h3 className="cp-verify-subheading">
                <span className="cp-verify-num">02</span>红运高速循环工艺单次循环测试
              </h3>
              <p className="cp-verify-note">此次验证配方中无添加分散剂</p>
              <ProcessTable />
            </div>

            {/* 3. 工艺过程数据 */}
            <div className="cp-verify-block fade-up fade-up-delay-3">
              <h3 className="cp-verify-subheading">
                <span className="cp-verify-num">03</span>红运高效循环制浆系统工艺过程数据
              </h3>
              <ol className="cp-data-steps">
                <li>粉体从储罐下料到高速分散主机 <strong>50min</strong>；</li>
                <li>粉体下料结束后，A罐与主机循环2次，总 <strong>6min</strong>，温度最高 <strong>59.6℃</strong>，循环2次后粘度 <strong>265,600 mPa·s</strong>，主机分散线速度为 <strong>15.2m/s</strong>；</li>
                <li>A罐与主机循环结束后浆料进入B罐自循环10次，共 <strong>30min</strong>，最终粘度 <strong>14,720 mPa·s</strong>，浆料固含量 <strong>65.5%</strong>，细度 <strong>6μm</strong>（每个循环测试都是6μm）；</li>
              </ol>
              <div className="cp-charts-grid-5">
                {[
                  { src: `${IMG}/chart-7.jpg`,  label: '01', caption: '粘度变化曲线（mPa·s）' },
                  { src: `${IMG}/chart-8.jpg`,  label: '02', caption: '分散电流变化曲线' },
                  { src: `${IMG}/chart-9.jpg`,  label: '03', caption: '粒径 D50 变化曲线' },
                  { src: `${IMG}/chart-11.jpg`, label: '04', caption: '分散口压力变化（bar）' },
                  { src: `${IMG}/chart-10.jpg`, label: '05', caption: '过程温度变化（℃）' },
                ].map((chart, i) => (
                  <div key={i} className="cp-chart-card fade-up" style={{ transitionDelay: `${0.06 * (i + 1)}s` }}>
                    <div className="cp-chart-img-wrap">
                      <img src={chart.src} alt={chart.caption} className="cp-chart-img" loading="lazy" />
                    </div>
                    <p className="cp-chart-caption">
                      <span className="cp-chart-label-num">{chart.label}</span>
                      {chart.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. 浆料流变性 */}
            <div className="cp-verify-block fade-up fade-up-delay-4">
              <h3 className="cp-verify-subheading">
                <span className="cp-verify-num">04</span>浆料流变性
              </h3>
              <div className="cp-charts-grid-3">
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/chart-12.jpg`} alt="剪切速率曲线" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">剪切速率：过程剪切无突变，非牛顿流体特征</p>
                </div>
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/chart-13.jpg`} alt="三区间及触变环图1" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">三区间及触变环（一）</p>
                </div>
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/chart-14.jpg`} alt="三区间及触变环图2" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">三区间及触变环（二）：浆料具备一定的触变恢复性，利于涂布</p>
                </div>
              </div>
            </div>

            {/* 5. 浆料稳定性 */}
            <div className="cp-verify-block fade-up fade-up-delay-5">
              <h3 className="cp-verify-subheading" style={{ marginTop: '56px' }}>
                <span className="cp-verify-num">05</span>浆料稳定性数据
              </h3>
              <div className="cp-charts-grid-3">
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/chart-15.jpg`} alt="背散射光曲线" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">背散射光曲线：浆料测试过程未出现颗粒团聚和沉降</p>
                </div>
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/chart-16.jpg`} alt="稳定性指数图1" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">稳定性指数（一）</p>
                </div>
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/chart-17.jpg`} alt="稳定性指数图2" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">稳定性指数（二）：TSI = 0.08（行业内 &lt;0.2 为准）</p>
                </div>
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/chart-18.jpg`} alt="粒子迁移率" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">粒子迁移率</p>
                </div>
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/chart-19.jpg`} alt="分散均匀性指数" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">分散均匀性指数：0.0925（行业内 &lt;2 为最佳）</p>
                </div>
              </div>
            </div>

            {/* 6. 极片电镜 */}
            <div className="cp-verify-block fade-up fade-up-delay-6">
              <h3 className="cp-verify-subheading" style={{ marginTop: '56px' }}>
                <span className="cp-verify-num">06</span>红运高速循环制浆极片电镜
              </h3>
              <div className="cp-sem-grid">
                <div className="cp-sem-card">
                  <div className="cp-sem-img-wrap">
                    <img src={`${IMG}/chart-20.jpg`} alt="极片SEM 20000倍" className="cp-sem-img" loading="lazy" />
                  </div>
                  <p className="cp-sem-caption">20,000× 倍 · 比例尺 1μm</p>
                </div>
                <div className="cp-sem-card">
                  <div className="cp-sem-img-wrap">
                    <img src={`${IMG}/chart-21.jpg`} alt="极片SEM 50000倍" className="cp-sem-img" loading="lazy" />
                  </div>
                  <p className="cp-sem-caption">50,000× 倍 · 比例尺 500nm</p>
                </div>
              </div>
            </div>
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
