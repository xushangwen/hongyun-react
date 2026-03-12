import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'

/* ========== 行业数据 [AI生成描述] ========== */
const industries = [
  {
    id: 'new-energy',
    name: '新能源',
    desc: '面向锂电池正负极浆料制备，提供从投料、制浆到输送的全流程自动化解决方案，已服务宁德时代、比亚迪等头部客户。',
    solutions: [
      { name: 'PD制浆系统', slug: 'pd-pulping', brief: '行星搅拌+高速分散一体化制浆，适用于正负极浆料批次生产。' },
      { name: '高效管线式制浆系统', slug: 'pipeline-pulping', brief: '管线式连续制浆工艺，生产效率高，浆料一致性好。' },
      { name: '高速循环制浆系统', slug: 'circulation-pulping', brief: '循环分散+在线研磨，实现高固含量浆料高效制备。' },
      { name: '双螺杆连续制浆系统', slug: 'twin-screw-pulping', brief: '双螺杆连续式工艺，产能大幅提升，适合规模化产线。' },
    ],
  },
  {
    id: 'solid-state-battery',
    name: '固态电池',
    desc: '针对固态电池干法电极制备工艺，提供包覆、混合、挤出全套设备方案，助力下一代电池技术产业化落地。',
    solutions: [
      { name: '材料包覆机', slug: 'material-coating', brief: '固态电解质材料精密包覆，实现均匀涂层与高附着力。' },
      { name: '干法高速粉体混合机', slug: 'dry-powder-mixer', brief: '高速干法混合工艺，适用于电极粉体的均匀分散。' },
      { name: '干法双螺杆挤出机', slug: 'dry-twin-screw-extruder', brief: '连续挤出成膜工艺，支持正极/负极电极膜片生产。' },
    ],
  },
  {
    id: 'chemical',
    name: '化工',
    desc: '为精细化工、涂料、胶粘剂等领域提供自动化混合生产系统，满足高粘度、多组分物料的精准配比与均匀混合需求。',
    solutions: [
      { name: '全自动生产系统', slug: 'auto-production', brief: '从原料投入到成品输出的一键式全自动化生产线。' },
    ],
  },
  {
    id: 'adhesive',
    name: '制胶',
    desc: '针对密封胶、结构胶、硅胶等高粘度物料，提供真空脱泡、行星搅拌等专业制胶工艺方案。',
    solutions: [
      { name: '制胶解决方案', slug: 'adhesive-overview', brief: '真空行星搅拌制胶工艺，气泡含量低，产品一致性高。' },
    ],
  },
  {
    id: 'pyrotechnics',
    name: '火工药剂',
    desc: '为烟火药剂、推进剂等含能材料提供防爆、防静电的安全混合生产方案，符合国防军工安全标准。',
    solutions: [
      { name: '火工药剂方案', slug: 'pyro-overview', brief: '全封闭防爆混合系统，远程操控，确保生产安全可靠。' },
    ],
  },
  {
    id: 'food',
    name: '食品',
    desc: '为调味品、烘焙预拌粉、功能食品等提供符合GMP标准的卫生级混合生产方案，确保食品安全。',
    solutions: [
      { name: '食品行业方案', slug: 'food-overview', brief: '全不锈钢卫生设计，CIP在线清洗，满足食品安全要求。' },
    ],
  },
  {
    id: 'pharma',
    name: '医药',
    desc: '为制药企业提供符合GMP规范的混合、制粒、包衣等工艺设备，满足药品生产的高精度、高洁净度要求。',
    solutions: [
      { name: '医药行业方案', slug: 'pharma-overview', brief: 'GMP合规设计，洁净室级别密封，全过程可追溯。' },
    ],
  },
  {
    id: 'cosmetics',
    name: '化妆品',
    desc: '为乳液、膏霜、粉底等化妆品提供真空乳化、均质混合等专业生产方案，兼顾高效与品质稳定。',
    solutions: [
      { name: '化妆品行业方案', slug: 'cosmetics-overview', brief: '真空均质乳化工艺，产品细腻稳定，色泽均匀。' },
    ],
  },
  {
    id: 'electronics',
    name: '电子材料',
    desc: '为电子浆料、导电胶、封装材料等高精度电子材料提供超细研磨、真空脱泡等专业混合工艺。',
    solutions: [
      { name: '电子材料方案', slug: 'electronics-overview', brief: '超细研磨分散工艺，满足电子级材料纳米级粒径要求。' },
    ],
  },
]

export default function SolutionsPage() {
  const [activeId, setActiveId] = useState(industries[0]?.id)

  useEffect(() => {
    const fadeObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => fadeObserver.observe(el))

    /* 滚动高亮导航 */
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    industries.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    })

    return () => { fadeObserver.disconnect(); sectionObserver.disconnect() }
  }, [])

  return (
    <>
      <PageHero
        title="行业解决方案"
        subtitle="深耕多行业工艺场景，提供一站式系统集成方案"
        bgImage="https://plus.unsplash.com/premium_photo-1661883301669-d86c4430f718?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="page-body">
        <div className="page-container">
          <Breadcrumb items={[{ label: '行业解决方案' }]} />
        </div>

        {/* 行业快速导航 - sticky 全宽 */}
        <div className="page-sticky-nav">
          <div className="page-container">
            <nav className="solutions-nav">
              {industries.map((ind) => (
                <a
                  key={ind.id}
                  href={`#${ind.id}`}
                  className={`solutions-nav-item${activeId === ind.id ? ' active' : ''}`}
                >
                  {ind.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* 各行业板块 */}
        {industries.map((industry, idx) => (
          <section className="solutions-industry" id={industry.id} key={industry.id}>
            <div className="page-container">
              <div className="solutions-industry-header">
                <div className="solutions-industry-index">{String(idx + 1).padStart(2, '0')}</div>
                <h2 className="solutions-industry-title">{industry.name}</h2>
              </div>

              <p className="solutions-industry-desc">
                {industry.desc}
                <span className="generated-tag">AI</span>
              </p>

              <div className="solutions-cards">
                {industry.solutions.map((sol) => (
                  <Link
                    to={`/solutions/${industry.id}/${sol.slug}`}
                    className="solutions-card"
                    key={sol.slug}
                  >
                    <div className="solutions-card-image">
                      <ImagePlaceholder height="220px" label={sol.name} />
                    </div>
                    <div className="solutions-card-content">
                      <h3 className="solutions-card-title">{sol.name}</h3>
                      {sol.brief && <p className="solutions-card-desc">{sol.brief}</p>}
                      <span className="solutions-card-more">
                        了解更多
                        <IconArrowRightOutline24 size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
