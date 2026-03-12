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

const leftItems = [
  { Icon: IconCarBatteryOutline24,       label: '新能源',   to: '/solutions#new-energy' },
  { Icon: IconBatteryChargingOutline24,   label: '固态电池', to: '/solutions#solid-state-battery' },
  { Icon: IconFlaskOutline24,           label: '化工',     to: '/solutions#chemical' },
  { Icon: IconTestTubeOutline24,        label: '制胶',     to: '/solutions#adhesive' },
  { Icon: IconFireFlameOutline24,       label: '火工药剂', to: '/solutions#pyrotechnics' },
]

const middleItems = [
  { Icon: IconCutleryOutline24,       label: '食品',   to: '/solutions#food' },
  { Icon: IconMedicineOutline24,      label: '医药',   to: '/solutions#pharma' },
  { Icon: IconSoapDispenserOutline24, label: '化妆品', to: '/solutions#cosmetics' },
  { Icon: IconMicrochipOutline24,     label: '电子材料', to: '/solutions#electronics' },
]

export default function DropdownSolutions({ active, onClose, cancelClose, scheduleClose }) {
  const renderItem = (item) => (
    <Link to={item.to} key={item.label} className="dropdown-item" onClick={onClose}>
      <span className="dropdown-item-content">
        <item.Icon className="dropdown-icon-svg" size={20} />
        <span>{item.label}</span>
      </span>
      <span className="dropdown-arrow">
        <IconChevronRightOutline24 size={16} />
      </span>
    </Link>
  )

  return (
    <div
      className={`dropdown-menu${active ? ' active' : ''}`}
      id="dropdownSolutions"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <button className="dropdown-close" aria-label="关闭" onClick={onClose}>
        <IconXmarkOutline24 size={24} aria-hidden={true} />
      </button>
      <div className="dropdown-container">
        <div className="dropdown-col dropdown-col-left">
          {leftItems.map(renderItem)}
        </div>

        <div className="dropdown-col dropdown-col-middle visible">
          {middleItems.map(renderItem)}
        </div>

        <div className="dropdown-col dropdown-col-right">
          <div className="dropdown-preview">
            <h3 className="dropdown-preview-title">行业解决方案</h3>
            <p className="dropdown-preview-desc">
              深耕新能源、固态电池、化工等多个行业，提供可靠高效的混合与工艺解决方案，以技术创新推动产业智能化发展。
            </p>
            <Link to="/solutions" className="dropdown-preview-btn" onClick={onClose}>
              了解更多
              <IconArrowRightOutline24 className="dropdown-preview-btn-icon" size={18} />
            </Link>
          </div>
          <div className="dropdown-preview-image">
            <img src="/assets/images/hy-dropmenu-application-img.jpg" alt="行业解决方案" />
          </div>
        </div>
      </div>
    </div>
  )
}
