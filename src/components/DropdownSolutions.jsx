import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconXmarkOutline24 } from 'nucleo-core-outline-24'
import { IconCarBatteryOutline24 } from 'nucleo-core-outline-24'
import { IconBatteryChargingOutline24 } from 'nucleo-core-outline-24'
import { IconFlaskOutline24 } from 'nucleo-core-outline-24'
import { IconTestTubeOutline24 } from 'nucleo-core-outline-24'
import { IconFireFlameOutline24 } from 'nucleo-core-outline-24'
import { IconCutleryOutline24 } from 'nucleo-core-outline-24'
import { IconMedicineOutline24 } from 'nucleo-core-outline-24'
import { IconSoapDispenserOutline24 } from 'nucleo-core-outline-24'
import { IconMicrochipOutline24 } from 'nucleo-core-outline-24'
import { IconChevronRightOutline24 } from 'nucleo-core-outline-24'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'

const solutionCategories = [
  {
    Icon: IconCarBatteryOutline24,
    label: '新能源行业',
    id: 'new-energy',
    desc: '面向锂电池正负极浆料制备，提供从投料、制浆到输送的全流程自动化解决方案，已服务宁德时代、比亚迪等头部客户。',
    items: [
      { name: 'PD制浆系统', slug: 'pd-pulping' },
      { name: '高效管线式制浆系统', slug: 'pipeline-pulping' },
      { name: '高速循环制浆系统', slug: 'circulation-pulping' },
      { name: '双螺杆连续制浆系统', slug: 'twin-screw-pulping' },
    ],
  },
  {
    Icon: IconBatteryChargingOutline24,
    label: '固态电池',
    id: 'solid-state-battery',
    desc: '针对固态电池干法电极制备工艺，提供包覆、混合、挤出全套设备方案，助力下一代电池技术产业化落地。',
    items: [
      { name: '干法电极成套设备解决方案', slug: 'dry-powder-mixer' },
      { name: '湿法电极成套设备解决方案', slug: 'wet-electrode-system' },
      { name: '材料包覆机', slug: 'material-coating' },
    ],
  },
  {
    Icon: IconFlaskOutline24,
    label: '化工行业',
    id: 'chemical',
    desc: '为精细化工、涂料、胶粘剂等领域提供自动化混合生产系统，满足高粘度、多组分物料的精准配比与均匀混合需求。',
    items: [
      { name: '红运机械全自动生产系统', slug: 'auto-production' },
    ],
  },
  {
    Icon: IconTestTubeOutline24,
    label: '制胶',
    id: 'adhesive',
    desc: '针对密封胶、结构胶、硅胶等高粘度物料，提供真空脱泡、行星搅拌等专业制胶工艺方案。',
    items: [
      { name: '制胶解决方案', slug: 'adhesive-overview' },
    ],
  },
  {
    Icon: IconFireFlameOutline24,
    label: '火工药剂',
    id: 'pyrotechnics',
    desc: '为烟火药剂、推进剂等含能材料提供防爆、防静电的安全混合生产方案，符合国防军工安全标准。',
    items: [
      { name: '火工药剂方案', slug: 'pyro-overview' },
    ],
  },
  {
    Icon: IconCutleryOutline24,
    label: '食品',
    id: 'food',
    desc: '为调味品、烘焙预拌粉、功能食品等提供符合GMP标准的卫生级混合生产方案，确保食品安全。',
    items: [
      { name: '食品行业方案', slug: 'food-overview' },
    ],
  },
  {
    Icon: IconMedicineOutline24,
    label: '医药',
    id: 'pharma',
    desc: '为制药企业提供符合GMP规范的混合、制粒、包衣等工艺设备，满足药品生产的高精度、高洁净度要求。',
    items: [
      { name: '医药行业方案', slug: 'pharma-overview' },
    ],
  },
  {
    Icon: IconSoapDispenserOutline24,
    label: '化妆品',
    id: 'cosmetics',
    desc: '为乳液、膏霜、粉底等化妆品提供真空乳化、均质混合等专业生产方案，兼顾高效与品质稳定。',
    items: [
      { name: '化妆品行业方案', slug: 'cosmetics-overview' },
    ],
  },
  {
    Icon: IconMicrochipOutline24,
    label: '电子材料',
    id: 'electronics',
    desc: '为电子浆料、导电胶、封装材料等高精度电子材料提供超细研磨、真空脱泡等专业混合工艺。',
    items: [
      { name: '电子材料方案', slug: 'electronics-overview' },
    ],
  },
]

/* 每个行业的预览图：右列展示。新能源保持原通用应用图（hy-dropmenu-application-img.webp, 走下方 fallback），其他用客户提供的领域大图 */
const PREVIEW_IMG = {
  'solid-state-battery': '/assets/images/dropdown-solutions/solid-state-battery.webp',
  'chemical':            '/assets/images/dropdown-solutions/chemical.webp',
  'adhesive':            '/assets/images/dropdown-solutions/adhesive.webp',
  'pyrotechnics':        '/assets/images/dropdown-solutions/pyrotechnics.webp',
  'food':                '/assets/images/dropdown-solutions/food.webp',
  'pharma':              '/assets/images/dropdown-solutions/pharma.webp',
  'cosmetics':           '/assets/images/dropdown-solutions/cosmetics.webp',
  'electronics':         '/assets/images/dropdown-solutions/electronics.webp',
}

/* 与 SolutionsPage 保持一致：仅展示这些行业，其余暂不对外 */
const VISIBLE_INDUSTRY_IDS = ['new-energy', 'solid-state-battery', 'chemical']
const visibleCategories = solutionCategories.filter((cat) => VISIBLE_INDUSTRY_IDS.includes(cat.id))

export default function DropdownSolutions({ active, onClose, cancelClose, scheduleClose }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = visibleCategories[activeIdx]

  return (
    <div
      className={`dropdown-menu${active ? ' active' : ''}`}
      id="dropdownSolutions"
      aria-hidden={!active}
      inert={!active}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <button className="dropdown-close" aria-label="关闭" onClick={onClose}>
        <IconXmarkOutline24 size={24} aria-hidden={true} />
      </button>

      <div className="dropdown-container">
        {/* 左列：行业分类 */}
        <div className="dropdown-col dropdown-col-left">
          {visibleCategories.map((cat, index) => (
            <Link
              to={`/solutions#${cat.id}`}
              key={cat.id}
              className={`dropdown-item${activeIdx === index ? ' active' : ''}`}
              onMouseEnter={() => setActiveIdx(index)}
              onClick={onClose}
            >
              <span className="dropdown-item-content">
                <cat.Icon className="dropdown-icon-svg" size={20} />
                <span>{cat.label}</span>
              </span>
              <span className="dropdown-arrow">
                <IconChevronRightOutline24 size={16} />
              </span>
            </Link>
          ))}
        </div>

        {/* 中列：该行业解决方案子项（动态） */}
        <div className="dropdown-col dropdown-col-middle visible">
          {current.items.map((item) => (
            <Link
              to={`/solutions/${current.id}/${item.slug}`}
              key={item.slug}
              className="dropdown-item"
              onClick={onClose}
            >
              <span className="dropdown-item-content">
                <span>{item.name}</span>
              </span>
              <span className="dropdown-arrow">
                <IconChevronRightOutline24 size={16} />
              </span>
            </Link>
          ))}
        </div>

        {/* 右列：预览（动态） */}
        <div className="dropdown-col dropdown-col-right">
          <div className="dropdown-preview">
            <h3 className="dropdown-preview-title">{current.label}</h3>
            <p className="dropdown-preview-desc">{current.desc}</p>
            <Link to={`/solutions#${current.id}`} className="dropdown-preview-btn" onClick={onClose}>
              了解更多
              <IconArrowRightOutline24 className="dropdown-preview-btn-icon" size={18} />
            </Link>
          </div>
          <div className="dropdown-preview-image">
            <img src={PREVIEW_IMG[current.id] ?? '/assets/images/hy-dropmenu-application-img.webp'} alt={current.label} />
          </div>
        </div>
      </div>
    </div>
  )
}
