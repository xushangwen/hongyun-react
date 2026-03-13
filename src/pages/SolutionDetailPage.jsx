import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import { IconCircleMediaPlayFill24 } from 'nucleo-core-fill-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'
import solutionHeroImg from '../assets/img/行业产品.jpg'
import ctaBgImg from '../assets/img/需要了解更多.jpg'

/* ========== 方案数据映射 [AI生成描述] ========== */
const solutionMap = {
  'new-energy': {
    name: '新能源',
    solutions: {
      'pd-pulping': {
        name: 'PD制浆系统',
        intro: '采用行星搅拌+高速分散一体化设计，实现正负极浆料的高效批次制备。系统集成真空脱泡、温控循环、自动清洗等功能，满足锂电池浆料的高一致性和低杂质要求。',
        features: ['行星搅拌+高速分散双动力', '真空脱泡，残留气泡率<0.1%', '全自动温控系统，精度±1℃', 'CIP在线清洗，换料时间<30min'],
        compositions: ['双行星搅拌主机', '粉体输送系统', '液体计量系统', '真空系统'],
        params: [
          { name: '工作容量', value: '300L / 500L / 1000L / 2000L', note: '可定制' },
          { name: '搅拌转速', value: '0~60rpm（公转）', note: '变频调速' },
          { name: '分散转速', value: '0~3000rpm', note: '变频调速' },
          { name: '真空度', value: '≤-0.095MPa', note: '' },
          { name: '温控范围', value: '常温~120℃', note: '夹套循环' },
        ],
      },
      'pipeline-pulping': {
        name: '高效管线式制浆系统',
        intro: '管线式连续制浆工艺，将粉体分散、液体混合、研磨细化集成于管线中完成，实现连续化生产，显著提升产能和浆料一致性。',
        features: ['连续式生产，产能提升3-5倍', '管线式分散研磨，粒径均匀', '密闭系统，无粉尘污染', '全自动PLC控制'],
        compositions: ['预混合罐', '管线式分散机', '在线研磨机', '输送泵组'],
        params: [
          { name: '产能', value: '500~5000L/h', note: '根据配方' },
          { name: '研磨细度', value: 'D50<1μm', note: '' },
          { name: '固含量', value: '≤75%', note: '' },
        ],
      },
      'circulation-pulping': {
        name: '高速循环制浆系统',
        intro: '循环分散+在线研磨工艺，通过高速循环实现物料的多次分散研磨，适用于高固含量、高粘度浆料的高效制备。',
        features: ['高速循环分散，效率高', '在线研磨，粒径可控', '适用于高固含量浆料', '可配合批次或连续工艺'],
        compositions: ['循环分散主机', '在线研磨单元', '循环管路系统', '控制系统'],
        params: [
          { name: '循环流量', value: '5~50m³/h', note: '' },
          { name: '分散转速', value: '0~4500rpm', note: '' },
          { name: '研磨细度', value: 'D50<0.5μm', note: '' },
        ],
      },
      'twin-screw-pulping': {
        name: '双螺杆连续制浆系统',
        intro: '基于双螺杆连续挤出技术的制浆系统，实现粉料的连续投入、浸润、分散和输出，产能大幅提升，特别适合大规模产线。',
        features: ['连续式制浆，产能极高', '螺杆元件组合灵活', '物料停留时间短', '能耗低、效率高'],
        compositions: ['双螺杆挤出主机', '粉体喂料系统', '液体注入系统', '在线检测系统'],
        params: [
          { name: '螺杆直径', value: 'Φ65 / Φ95 / Φ135mm', note: '' },
          { name: '产能', value: '1000~10000L/h', note: '' },
          { name: '长径比', value: 'L/D=32~56', note: '' },
        ],
      },
    },
  },
  'solid-state-battery': {
    name: '固态电池',
    solutions: {
      'material-coating': { name: '材料包覆机', intro: '固态电解质材料精密包覆设备，实现均匀涂层与高附着力，适用于固态电池正极材料的表面改性处理。', features: ['精密包覆，涂层均匀', '干法/湿法工艺可选', '连续化生产', '粒径可控'], compositions: ['包覆反应器', '粉体输送系统', '温控系统', '收集系统'], params: [{ name: '包覆厚度', value: '10~500nm', note: '' }, { name: '产能', value: '10~100kg/h', note: '' }] },
      'dry-powder-mixer': { name: '干法高速粉体混合机', intro: '高速干法混合工艺设备，适用于固态电池电极粉体的均匀分散与混合，确保活性物质、导电剂、粘结剂的充分接触。', features: ['高速剪切混合', '干法工艺无溶剂', '混合均匀度>99%', '批次/连续可选'], compositions: ['高速混合主机', '粉体计量系统', '出料系统', 'PLC控制'], params: [{ name: '转速', value: '0~6000rpm', note: '' }, { name: '批次量', value: '5~200L', note: '' }] },
      'dry-twin-screw-extruder': { name: '干法双螺杆挤出机', intro: '连续挤出成膜工艺设备，支持正极/负极电极膜片的干法制备，是固态电池产业化的关键装备。', features: ['干法连续挤出成膜', '无需溶剂和干燥', '膜厚均匀可控', '产能高、能耗低'], compositions: ['双螺杆挤出主机', '喂料系统', '辊压成膜单元', '在线测厚系统'], params: [{ name: '膜厚范围', value: '50~300μm', note: '' }, { name: '幅宽', value: '300~600mm', note: '' }] },
    },
  },
  'chemical': { name: '化工', solutions: { 'auto-production': { name: '全自动生产系统', intro: '从原料投入到成品输出的一键式全自动化生产线，适用于涂料、胶粘剂、密封胶等化工产品的批量生产。', features: ['全自动投料/配料', '多物料精准计量', '远程监控操作', '数据记录可追溯'], compositions: ['自动投料系统', '计量配料系统', '混合搅拌系统', '灌装输出系统'], params: [{ name: '生产能力', value: '1~20吨/批次', note: '' }, { name: '计量精度', value: '±0.5%', note: '' }] } } },
  'adhesive': { name: '制胶', solutions: { 'adhesive-overview': { name: '制胶解决方案', intro: '针对密封胶、结构胶、硅胶等高粘度物料，提供真空脱泡、行星搅拌等专业制胶工艺方案，产品气泡含量低、一致性高。', features: ['真空行星搅拌', '高粘度物料适用', '自动出料灌装', '温控精准'], compositions: ['双行星搅拌机', '真空系统', '温控系统', '出料灌装机'], params: [{ name: '工作粘度', value: '≤2,000,000mPa·s', note: '' }, { name: '真空度', value: '≤-0.098MPa', note: '' }] } } },
  'pyrotechnics': { name: '火工药剂', solutions: { 'pyro-overview': { name: '火工药剂方案', intro: '为含能材料提供防爆、防静电的安全混合生产方案，全封闭设计，远程操控，符合国防军工安全标准。', features: ['防爆防静电设计', '远程操控', '全封闭混合', '符合军工标准'], compositions: ['防爆捏合机', '防爆控制系统', '安全监控系统', '远程操作台'], params: [{ name: '防爆等级', value: 'ExdIIBT4', note: '' }] } } },
  'food': { name: '食品', solutions: { 'food-overview': { name: '食品行业方案', intro: '为调味品、烘焙预拌粉、功能食品等提供符合GMP标准的卫生级混合生产方案，全不锈钢设计。', features: ['全不锈钢卫生设计', 'CIP在线清洗', '符合食品安全标准', '粉体/液体均适用'], compositions: ['卫生级混合机', 'CIP清洗系统', '计量配料系统', '包装输出系统'], params: [{ name: '材质', value: 'SUS304/316L', note: '' }] } } },
  'pharma': { name: '医药', solutions: { 'pharma-overview': { name: '医药行业方案', intro: '为制药企业提供符合GMP规范的混合、制粒、包衣等工艺设备，满足高精度、高洁净度要求。', features: ['GMP合规设计', '洁净室级密封', '全过程可追溯', '在线清洗验证'], compositions: ['GMP混合机', '洁净室对接系统', '在线监测系统', '数据追溯系统'], params: [{ name: '洁净等级', value: 'C级/D级', note: '' }] } } },
  'cosmetics': { name: '化妆品', solutions: { 'cosmetics-overview': { name: '化妆品行业方案', intro: '为乳液、膏霜、粉底等化妆品提供真空乳化、均质混合生产方案，产品细腻稳定、色泽均匀。', features: ['真空均质乳化', '产品细腻稳定', '色泽均匀一致', '温控精准'], compositions: ['真空乳化机', '均质机', '温控系统', '灌装系统'], params: [{ name: '均质细度', value: '≤2μm', note: '' }] } } },
  'electronics': { name: '电子材料', solutions: { 'electronics-overview': { name: '电子材料方案', intro: '为电子浆料、导电胶、封装材料等提供超细研磨、真空脱泡等专业混合工艺，满足纳米级粒径要求。', features: ['超细研磨分散', '纳米级粒径控制', '真空脱泡', '高洁净度'], compositions: ['纳米研磨机', '真空脱泡机', '精密过滤系统', '在线粒径检测'], params: [{ name: '研磨细度', value: 'D50<100nm', note: '' }] } } },
}

export default function SolutionDetailPage() {
  const { industryId, solutionId } = useParams()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [industryId, solutionId])

  const industry = solutionMap[industryId]
  const solution = industry?.solutions?.[solutionId]
  const solutionName = solution?.name || '方案详情'
  const industryName = industry?.name || '行业'

  return (
    <>
      <PageHero
        title={solutionName}
        subtitle={industryName}
        bgImage={solutionHeroImg}
      />

      <div className="page-body">
        <div className="page-container">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: industryName, path: `/solutions#${industryId}` },
            { label: solutionName },
          ]} />
        </div>

        {/* ===== 方案概览 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading">方案概览</h2>
            <div className="detail-intro-grid">
              <div className="detail-intro-text">
                <p>
                  {solution?.intro || `${solutionName}详细介绍内容待补充。`}
                </p>
              </div>
              <div className="detail-intro-image">
                <ImagePlaceholder height="340px" label={`${solutionName} 系统图`} />
              </div>
            </div>
          </div>
        </section>

        {/* ===== 系统介绍 / 视频 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading">系统介绍</h2>
            <div className="detail-video-wrapper">
              <ImagePlaceholder height="460px" label={`${solutionName} 视频介绍`} />
              <button className="about-video-play" aria-label="播放视频">
                <IconCircleMediaPlayFill24 size={36} />
              </button>
            </div>
            {solution?.features && (
              <div className="detail-features" style={{ marginTop: '48px' }}>
                <h3 className="detail-subtitle">方案特点</h3>
                <div className="detail-features-grid">
                  {solution.features.map((feat, i) => (
                    <div className="detail-feature-card" key={i}>
                      <div className="detail-feature-index">{String(i + 1).padStart(2, '0')}</div>
                      <p>{feat}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ===== 系统组成 ===== */}
        {solution?.compositions && (
          <section className="page-section">
            <div className="page-container">
              <h2 className="section-heading">系统组成</h2>
              <p className="section-desc">
                {solutionName}由以下核心单元组成，各单元协同运行，确保系统的高效与稳定。
              </p>
              <div className="detail-composition-grid">
                {solution.compositions.map((comp, i) => (
                  <div className="detail-composition-card" key={i}>
                    <ImagePlaceholder height="180px" label={comp} />
                    <span className="detail-composition-name">{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== 系统参数 ===== */}
        {solution?.params && (
          <section className="page-section page-section--gray">
            <div className="page-container">
              <h2 className="section-heading">系统参数</h2>
              <div className="detail-params-table">
                <table className="params-table">
                  <thead>
                    <tr>
                      <th>参数名称</th>
                      <th>参数值</th>
                      <th>备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solution.params.map((row, i) => (
                      <tr key={i}>
                        <td>{row.name}</td>
                        <td>{row.value}</td>
                        <td>{row.note || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ===== 客户案例 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading">客户案例</h2>
            <div className="detail-cases-grid">
              {[1, 2, 3].map((i) => (
                <div className="detail-case-card" key={i}>
                  <ImagePlaceholder height="180px" label={`${industryName}客户案例 ${i}`} />
                  <p>客户案例详情待补充</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 联系CTA - 全宽暗色 ===== */}
        <div className="detail-contact-cta">
          <div className="detail-contact-inner" style={{ backgroundImage: `url(${ctaBgImg})` }}>
            <h2 className="detail-contact-title">需要了解更多？</h2>
            <p className="detail-contact-desc">我们的专业团队随时为您提供技术咨询和定制化解决方案，助力您的生产工艺升级。</p>
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
