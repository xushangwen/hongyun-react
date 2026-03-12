import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconXmarkOutline24 } from 'nucleo-core-outline-24'
import { IconCarBatteryOutline24 } from 'nucleo-core-outline-24'
import { IconBatteryChargingOutline24 } from 'nucleo-core-outline-24'
import { IconFlaskOutline24 } from 'nucleo-core-outline-24'
import { IconTestTubeOutline24 } from 'nucleo-core-outline-24'
import { IconFireFlameOutline24 } from 'nucleo-core-outline-24'
import { IconCutleryOutline24 } from 'nucleo-core-outline-24'
import { IconSoapDispenserOutline24 } from 'nucleo-core-outline-24'
import { IconMicrochipOutline24 } from 'nucleo-core-outline-24'
import { IconChevronRightOutline24 } from 'nucleo-core-outline-24'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'

const categories = [
  {
    Icon: IconCarBatteryOutline24,
    label: '新能源', id: 'new-energy',
    desc: '面向锂电池正负极浆料制备的核心装备，覆盖搅拌、分散、捏合、制浆全工艺环节。',
    products: [
      { name: '双行星动力混合机', slug: 'dual-planetary-mixer' },
      { name: '高速分散机',       slug: 'high-speed-disperser' },
      { name: '捏合机',           slug: 'kneader' },
      { name: '双螺杆制浆机',     slug: 'twin-screw-pulper' },
    ],
  },
  {
    Icon: IconBatteryChargingOutline24,
    label: '固态电池', id: 'solid-state-battery',
    desc: '面向下一代固态电池干法电极制备工艺的前沿装备，涵盖包覆、混合、挤出等关键工序。',
    products: [
      { name: '湿法PD搅拌机',         slug: 'wet-pd-mixer' },
      { name: '干法电极粉体高速混合机', slug: 'dry-electrode-mixer' },
      { name: '双螺杆干法电极连续挤出机', slug: 'twin-screw-dry-extruder' },
      { name: '固态电解质包覆机',      slug: 'solid-electrolyte-coater' },
    ],
  },
  {
    Icon: IconFlaskOutline24,
    label: '化工', id: 'chemical',
    desc: '适用于涂料、胶粘剂等高粘度多组分物料的专业混合搅拌设备。',
    products: [
      { name: '双行星动力混合机',       slug: 'chem-dual-planetary' },
      { name: '往复式混合搅拌机',       slug: 'reciprocating-mixer' },
      { name: '双行星混合搅拌机',       slug: 'dual-planetary-stirrer' },
      { name: '行星蝶式混合搅拌机',     slug: 'planetary-butterfly' },
      { name: '立式捏合机',            slug: 'vertical-kneader' },
      { name: '压料机、倾倒机',         slug: 'press-dumper' },
    ],
  },
  {
    Icon: IconTestTubeOutline24,
    label: '制胶', id: 'adhesive',
    desc: '针对密封胶、结构胶等高粘度物料的真空搅拌与脱泡专用装备。',
    products: [
      { name: '制胶核心设备', slug: 'adhesive-core' },
    ],
  },
  {
    Icon: IconFireFlameOutline24,
    label: '火工药剂', id: 'pyrotechnics',
    desc: '符合国防安全标准的防爆型混合搅拌设备，适用于含能材料安全生产。',
    products: [
      { name: '捏合机', slug: 'pyro-kneader' },
    ],
  },
  {
    Icon: IconCutleryOutline24,
    label: '食品', id: 'food',
    desc: '符合食品安全标准的卫生级混合设备，全不锈钢设计，支持CIP在线清洗。',
    products: [
      { name: '食品级混合设备', slug: 'food-core' },
    ],
  },
  {
    Icon: IconSoapDispenserOutline24,
    label: '化妆品', id: 'cosmetics',
    desc: '适用于乳液、膏霜等化妆品生产的真空乳化均质混合设备。',
    products: [
      { name: '化妆品级混合设备', slug: 'cosmetics-core' },
    ],
  },
  {
    Icon: IconMicrochipOutline24,
    label: '电子材料', id: 'electronics',
    desc: '满足电子级材料纳米级粒径要求的超细研磨与真空脱泡混合装备。',
    products: [
      { name: '电子材料混合设备', slug: 'electronics-core' },
    ],
  },
]

export default function DropdownProducts({ active, onClose, cancelClose, scheduleClose }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = categories[activeIdx]

  return (
    <div
      className={`dropdown-menu${active ? ' active' : ''}`}
      id="dropdownProducts"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <button className="dropdown-close" aria-label="关闭" onClick={onClose}>
        <IconXmarkOutline24 size={24} aria-hidden={true} />
      </button>

      <div className="dropdown-container">
        {/* 左列：行业分类 */}
        <div className="dropdown-col dropdown-col-left">
          {categories.map((cat, index) => (
            <Link
              to={`/products#products-${cat.id}`}
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

        {/* 中列：该行业产品列表（动态） */}
        <div className="dropdown-col dropdown-col-middle visible">
          {current.products.map((product) => (
            <Link
              to={`/products/${current.id}/${product.slug}`}
              key={product.slug}
              className="dropdown-item"
              onClick={onClose}
            >
              <span className="dropdown-item-content">
                <span>{product.name}</span>
              </span>
              <span className="dropdown-arrow">
                <IconChevronRightOutline24 size={16} />
              </span>
            </Link>
          ))}
        </div>

        {/* 右列：预览 */}
        <div className="dropdown-col dropdown-col-right">
          <div className="dropdown-preview">
            <h3 className="dropdown-preview-title">{current.label}</h3>
            <p className="dropdown-preview-desc">{current.desc}</p>
            <Link to={`/products#products-${current.id}`} className="dropdown-preview-btn" onClick={onClose}>
              查看全部
              <IconArrowRightOutline24 className="dropdown-preview-btn-icon" size={18} />
            </Link>
          </div>
          <div className="dropdown-preview-image">
            <img src="/assets/images/hy-dropmenu-product-img.jpg" alt="产品中心" />
          </div>
        </div>
      </div>
    </div>
  )
}
