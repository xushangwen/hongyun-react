import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  IconArrowRightOutline24,
  IconCarBatteryOutline24,
  IconBatteryChargingOutline24,
  IconFlaskOutline24,
  IconTestTubeOutline24,
  IconFireFlameOutline24,
  IconCutleryOutline24,
  IconMedicineOutline24,
  IconSoapDispenserOutline24,
  IconMicrochipOutline24,
} from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import ParallaxCta from '../components/ParallaxCta'
import Breadcrumb from '../components/Breadcrumb'
import solutionsHeroImg from '../assets/img/IMG_4366.webp'
import prdSysImg from '../assets/img/prd-sys.webp'
import ctaBgImg from '../assets/img/IMG_4292.webp'

/* ========== 行业数据 [AI生成描述] ========== */
const industries = [
  {
    id: 'new-energy',
    Icon: IconCarBatteryOutline24,
    name: '新能源行业',
    desc: '面向锂电池正负极浆料制备，提供从投料、制浆到输送的全流程自动化解决方案，已服务宁德时代、比亚迪等头部客户。',
    solutions: [
      { name: 'PD制浆系统', slug: 'pd-pulping', brief: '行星搅拌+高速分散一体化制浆，适用于正负极浆料批次生产。', image: '/assets/images/solutions/pd-pulping/system.webp' },
      { name: '高效管线式制浆系统', slug: 'pipeline-pulping', brief: '管线式连续制浆工艺，生产效率高，浆料一致性好。', image: '/assets/images/solutions/pipeline-pulping/main-product.webp' },
      { name: '高速循环制浆系统', slug: 'circulation-pulping', brief: '循环分散+在线研磨，实现高固含量浆料高效制备。', image: prdSysImg },
      { name: '双螺杆连续制浆系统', slug: 'twin-screw-pulping', brief: '双螺杆连续式工艺，产能大幅提升，适合规模化产线。', image: '/assets/images/solutions/twin-screw-pulping/product.webp' },
    ],
  },
  {
    id: 'solid-state-battery',
    Icon: IconBatteryChargingOutline24,
    name: '固态电池',
    desc: '针对固态电池干法电极制备工艺，提供包覆、混合、挤出全套设备方案，助力下一代电池技术产业化落地。',
    solutions: [
      { name: '干法电极成套设备解决方案', slug: 'dry-powder-mixer', brief: '高速干法混合工艺，适用于电极粉体的均匀分散。', image: '/assets/images/solutions/dry-powder-mixer/干法电极系统-01.webp' },
      { name: '湿法电极成套设备解决方案', slug: 'wet-electrode-system', brief: '湿法双行星混合工艺，精准匹配湿法、干法混合工艺路径。', images: ['/assets/images/solutions/pd-pulping/main-product.webp', '/assets/images/solutions/wet-electrode-system/pipeline-mixer.webp'] },
    ],
  },
  {
    id: 'chemical',
    Icon: IconFlaskOutline24,
    name: '化工行业',
    desc: '为精细化工、涂料、胶粘剂等领域提供自动化混合生产系统，满足高粘度、多组分物料的精准配比与均匀混合需求。',
    solutions: [
      { name: '全自动生产系统', slug: 'auto-production', brief: '从原料投入到成品输出的一键式全自动化生产线。', image: '/assets/images/solutions/chemical/main-product.webp' },
    ],
  },
  {
    id: 'adhesive',
    Icon: IconTestTubeOutline24,
    name: '制胶',
    desc: '针对密封胶、结构胶、硅胶等高粘度物料，提供真空脱泡、行星搅拌等专业制胶工艺方案。',
    solutions: [
      { name: '制胶解决方案', slug: 'adhesive-overview', brief: '真空行星搅拌制胶工艺，气泡含量低，产品一致性高。' },
    ],
  },
  {
    id: 'pyrotechnics',
    Icon: IconFireFlameOutline24,
    name: '火工药剂',
    desc: '为烟火药剂、推进剂等含能材料提供防爆、防静电的安全混合生产方案，符合国防军工安全标准。',
    solutions: [
      { name: '火工药剂方案', slug: 'pyro-overview', brief: '全封闭防爆混合系统，远程操控，确保生产安全可靠。' },
    ],
  },
  {
    id: 'food',
    Icon: IconCutleryOutline24,
    name: '食品',
    desc: '为调味品、烘焙预拌粉、功能食品等提供符合GMP标准的卫生级混合生产方案，确保食品安全。',
    solutions: [
      { name: '食品行业方案', slug: 'food-overview', brief: '全不锈钢卫生设计，CIP在线清洗，满足食品安全要求。' },
    ],
  },
  {
    id: 'pharma',
    Icon: IconMedicineOutline24,
    name: '医药',
    desc: '为制药企业提供符合GMP规范的混合、制粒、包衣等工艺设备，满足药品生产的高精度、高洁净度要求。',
    solutions: [
      { name: '医药行业方案', slug: 'pharma-overview', brief: 'GMP合规设计，洁净室级别密封，全过程可追溯。' },
    ],
  },
  {
    id: 'cosmetics',
    Icon: IconSoapDispenserOutline24,
    name: '化妆品',
    desc: '为乳液、膏霜、粉底等化妆品提供真空乳化、均质混合等专业生产方案，兼顾高效与品质稳定。',
    solutions: [
      { name: '化妆品行业方案', slug: 'cosmetics-overview', brief: '真空均质乳化工艺，产品细腻稳定，色泽均匀。' },
    ],
  },
  {
    id: 'electronics',
    Icon: IconMicrochipOutline24,
    name: '电子材料',
    desc: '为电子浆料、导电胶、封装材料等高精度电子材料提供超细研磨、真空脱泡等专业混合工艺。',
    solutions: [
      { name: '电子材料方案', slug: 'electronics-overview', brief: '超细研磨分散工艺，满足电子级材料纳米级粒径要求。' },
    ],
  },
]

/* 当前对外展示的行业；其余行业内容已就绪但暂不展示，把 id 加回此白名单即可恢复 */
const VISIBLE_INDUSTRY_IDS = ['new-energy', 'solid-state-battery', 'chemical', 'pyrotechnics']
const visibleIndustries = industries.filter((ind) => VISIBLE_INDUSTRY_IDS.includes(ind.id))

export default function SolutionsPage() {
  /* 初始选中行业：优先取 URL hash，否则第一个可见行业 */
  const hashId = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
  const initialId = visibleIndustries.some((i) => i.id === hashId) ? hashId : visibleIndustries[0]?.id
  const [activeId, setActiveId] = useState(initialId)

  const activeIndex = Math.max(0, visibleIndustries.findIndex((i) => i.id === activeId))
  const activeIndustry = visibleIndustries[activeIndex]

  /* 已在本页时，响应 Footer / 导航下拉的 #hash 链接切换 Tab */
  const location = useLocation()
  useEffect(() => {
    const id = location.hash.replace('#', '')
    if (id && visibleIndustries.some((i) => i.id === id)) setActiveId(id)
  }, [location.hash])

  /* 切 Tab 后只渲染选中行业，新内容需重新触发 fade-up 动画 */
  useEffect(() => {
    const fadeObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => fadeObserver.observe(el))
    return () => fadeObserver.disconnect()
  }, [activeId])

  const handleTab = (id) => {
    setActiveId(id)
    if (typeof window !== 'undefined') window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <>
      <PageHero
        title="行业解决方案"
        subtitle="深耕多行业工艺场景，提供一站式系统集成方案"
        bgImage={solutionsHeroImg}
      />

      <div className="page-body">
        <Breadcrumb items={[{ label: '行业解决方案' }]} />

        {/* 行业快速导航 - sticky 全宽 */}
        <div className="page-sticky-nav">
          <div className="page-container">
            <nav className="solutions-nav">
              {visibleIndustries.map((ind) => (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => handleTab(ind.id)}
                  className={`solutions-nav-item${activeId === ind.id ? ' active' : ''}`}
                >
                  <ind.Icon size={14} />
                  {ind.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 选中行业板块（Tab 切换，只渲染当前行业） */}
        {activeIndustry && (() => {
          const industry = activeIndustry
          const idx = activeIndex
          return (
          <section className="solutions-industry" id={industry.id} key={industry.id}>
            <div className="page-container">
              <div className="solutions-industry-header">
                <div className="solutions-industry-index">{String(idx + 1).padStart(2, '0')}</div>
                <h2 className="solutions-industry-title">{industry.name}</h2>
              </div>

              {industry.id !== 'new-energy' && (
                <p className="solutions-industry-desc">
                  {industry.desc}
                </p>
              )}

              <div className="solutions-cards">
                {industry.solutions.map((sol) => {
                  const hasImage = Boolean(sol.image || sol.images)
                  return (
                  <Link
                    to={sol.customPath || `/solutions/${industry.id}/${sol.slug}`}
                    className={`solutions-card${hasImage ? '' : ' solutions-card--text-only'}`}
                    key={sol.slug}
                  >
                    {hasImage && (
                      <div className="solutions-card-image">
                        {sol.images ? (
                          <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', gap: '4px', padding: '12px' }}>
                            {sol.images.map((src, i) => (
                              <img key={i} src={src} alt={sol.name} loading="lazy" style={{ flex: 1, minWidth: 0, height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                            ))}
                          </div>
                        ) : (
                          <img src={sol.image} alt={sol.name} loading="lazy" />
                        )}
                      </div>
                    )}
                    <div className="solutions-card-content">
                      <div className="solutions-card-text">
                        <h3 className="solutions-card-title">{sol.name}</h3>
                        {sol.brief && <p className="solutions-card-desc">{sol.brief}</p>}
                      </div>
                      <span className="solutions-card-more">
                        了解更多
                        <IconArrowRightOutline24 size={16} />
                      </span>
                    </div>
                  </Link>
                  )
                })}
              </div>
            </div>
          </section>
          )
        })()}
      </div>

      {/* ===== 联系 CTA ===== */}
      <ParallaxCta
        bgImage={ctaBgImg}
        title="获取专属解决方案"
        desc="我们的专业团队随时为您提供技术咨询和定制化解决方案，<br />助力您的生产工艺升级。"
      />
    </>
  )
}
