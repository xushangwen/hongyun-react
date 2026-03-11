import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconXmarkOutline24 } from 'nucleo-core-outline-24'
import { IconOffice2Outline24 } from 'nucleo-core-outline-24'
import { IconHistoryOutline24 } from 'nucleo-core-outline-24'
import { IconAwardPlaqueOutline24 } from 'nucleo-core-outline-24'
import { IconMessageBubbleUserOutline24 } from 'nucleo-core-outline-24'
import { IconUsersPlusOutline24 } from 'nucleo-core-outline-24'
import { IconNewspaperOutline24 } from 'nucleo-core-outline-24'
import { IconTargetOutline24 } from 'nucleo-core-outline-24'
import { IconNodes2Outline24 } from 'nucleo-core-outline-24'
import { IconGlobeOutline24 } from 'nucleo-core-outline-24'
import { IconUsersShakingHandsOutline24 } from 'nucleo-core-outline-24'
import { IconChevronRightOutline24 } from 'nucleo-core-outline-24'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'

const leftItems = [
  { Icon: IconOffice2Outline24, label: '公司介绍', hasMiddle: true, to: '/about#company-intro' },
  { Icon: IconHistoryOutline24, label: '发展历程', hasMiddle: false, to: '/about#history' },
  { Icon: IconAwardPlaqueOutline24, label: '荣誉资质', hasMiddle: false, to: '/about#honors' },
  { Icon: IconMessageBubbleUserOutline24, label: '联系我们', hasMiddle: false, to: '/contact' },
  { Icon: IconUsersPlusOutline24, label: '加入我们', hasMiddle: false, to: '/about' },
]

const middleItems = [
  { Icon: IconNewspaperOutline24, label: '简介', to: '/about#company-intro' },
  { Icon: IconTargetOutline24, label: '企业使命', to: '/about#culture' },
  { Icon: IconNodes2Outline24, label: '企业愿景', to: '/about#culture' },
  { Icon: IconGlobeOutline24, label: '企业价值观', to: '/about#culture' },
  { Icon: IconUsersShakingHandsOutline24, label: '合作伙伴', to: '/about#partners-page' },
]

export default function DropdownAbout({ active, onClose, cancelClose, scheduleClose }) {
  const [activeLeftIndex, setActiveLeftIndex] = useState(0)

  const showMiddle = activeLeftIndex === 0

  return (
    <div
      className={`dropdown-menu${active ? ' active' : ''}`}
      id="dropdownAbout"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <button className="dropdown-close" aria-label="关闭" onClick={onClose}>
        <IconXmarkOutline24 size={24} aria-hidden={true} />
      </button>
      <div className="dropdown-container">
        {/* Left Column */}
        <div className="dropdown-col dropdown-col-left">
          {leftItems.map((item, index) => (
            <Link
              to={item.to}
              key={item.label}
              className={`dropdown-item${activeLeftIndex === index ? ' active' : ''}`}
              onMouseEnter={() => setActiveLeftIndex(index)}
              onClick={onClose}
            >
              <span className="dropdown-item-content">
                <item.Icon className="dropdown-icon-svg" size={20} />
                <span>{item.label}</span>
              </span>
              <span className="dropdown-arrow">
                <IconChevronRightOutline24 size={16} />
              </span>
            </Link>
          ))}
        </div>

        {/* Middle Column */}
        <div className={`dropdown-col dropdown-col-middle${showMiddle ? ' visible' : ''}`}>
          {middleItems.map((item) => (
            <Link to={item.to} key={item.label} className="dropdown-item" onClick={onClose}>
              <span className="dropdown-item-content">
                <item.Icon className="dropdown-icon-svg" size={20} />
                <span>{item.label}</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Right Column - Preview */}
        <div className="dropdown-col dropdown-col-right">
          <div className="dropdown-preview">
            <h3 className="dropdown-preview-title">关于红运</h3>
            <p className="dropdown-preview-desc">
              红运机械自1993年成立以来，专注于混合设备的研究、开发与制造，始终以技术创新为核心驱动力。
            </p>
            <Link to="/about" className="dropdown-preview-btn">
              了解更多
              <IconArrowRightOutline24 className="dropdown-preview-btn-icon" size={18} />
            </Link>
          </div>
          <div className="dropdown-preview-image">
            <img src="/assets/images/hy-dropmenu-about-img.jpg" alt="关于红运" />
          </div>
        </div>
      </div>
    </div>
  )
}
