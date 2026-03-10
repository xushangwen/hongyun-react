import { useState } from 'react'
import { IconChevronRightOutline24 } from 'nucleo-core-outline-24'
import { IconChevronLeftOutline24 } from 'nucleo-core-outline-24'
import { IconXmarkOutline24 } from 'nucleo-core-outline-24'
import { IconOffice2Outline24 } from 'nucleo-core-outline-24'
import { IconHistoryOutline24 } from 'nucleo-core-outline-24'
import { IconAwardPlaqueOutline24 } from 'nucleo-core-outline-24'
import { IconMessageBubbleUserOutline24 } from 'nucleo-core-outline-24'
import { IconUsersPlusOutline24 } from 'nucleo-core-outline-24'
import { IconBoltSpeedOutline24 } from 'nucleo-core-outline-24'
import { IconFlaskOutline24 } from 'nucleo-core-outline-24'
import { IconHighlighterOutline24 } from 'nucleo-core-outline-24'
import { IconNodes2Outline24 } from 'nucleo-core-outline-24'
import { IconCutleryOutline24 } from 'nucleo-core-outline-24'
import { IconMedicineOutline24 } from 'nucleo-core-outline-24'
import { IconSoapDispenserOutline24 } from 'nucleo-core-outline-24'
import { IconMicrochipOutline24 } from 'nucleo-core-outline-24'
import { IconScrollVerticalOutline24 } from 'nucleo-core-outline-24'
import { IconGearNodesOutline24 } from 'nucleo-core-outline-24'
import { IconAiOutline24 } from 'nucleo-core-outline-24'
import { IconPhoneOutline24 } from 'nucleo-core-outline-24'

const menuData = [
  {
    label: '关于红运',
    Icon: IconOffice2Outline24,
    children: [
      { Icon: IconOffice2Outline24, label: '公司介绍', href: '#' },
      { Icon: IconHistoryOutline24, label: '发展历程', href: '#' },
      { Icon: IconAwardPlaqueOutline24, label: '荣誉资质', href: '#' },
      { Icon: IconMessageBubbleUserOutline24, label: '联系我们', href: '#' },
      { Icon: IconUsersPlusOutline24, label: '加入我们', href: '#' },
    ],
  },
  {
    label: '行业解决方案',
    Icon: IconBoltSpeedOutline24,
    children: [
      { Icon: IconBoltSpeedOutline24, label: '新能源行业', href: '#' },
      { Icon: IconFlaskOutline24, label: '化工行业', href: '#' },
      { Icon: IconHighlighterOutline24, label: '制胶行业', href: '#' },
      { Icon: IconNodes2Outline24, label: '火工药剂', href: '#' },
      { Icon: IconCutleryOutline24, label: '食品行业', href: '#' },
      { Icon: IconMedicineOutline24, label: '医药行业', href: '#' },
      { Icon: IconSoapDispenserOutline24, label: '化妆品行业', href: '#' },
      { Icon: IconMicrochipOutline24, label: '电子材料行业', href: '#' },
    ],
  },
  {
    label: '产品中心',
    Icon: IconGearNodesOutline24,
    children: [
      { Icon: IconScrollVerticalOutline24, label: '计量输送系统', href: '#' },
      { Icon: IconGearNodesOutline24, label: '核心设备', href: '#' },
      { Icon: IconAiOutline24, label: '集成系统', href: '#' },
    ],
  },
  {
    label: '联系我们',
    Icon: IconPhoneOutline24,
    href: '#contact',
  },
]

export default function MobileMenu({ isOpen, onClose }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  const handleClose = () => {
    setActiveSubmenu(null)
    onClose()
  }

  const handleBack = () => {
    setActiveSubmenu(null)
  }

  const activeItem = activeSubmenu !== null ? menuData[activeSubmenu] : null

  return (
    <>
      <div
        className={`mobile-menu-overlay${isOpen ? ' active' : ''}`}
        onClick={handleClose}
      />

      <div className={`mobile-menu${isOpen ? ' active' : ''}`}>
        {/* 顶栏 */}
        <div className="mobile-menu-header">
          {activeSubmenu !== null ? (
            <button className="mobile-menu-back-btn" onClick={handleBack} aria-label="返回">
              <IconChevronLeftOutline24 size={20} />
              <span>{activeItem.label}</span>
            </button>
          ) : (
            <img src="/assets/images/hy-logo-ch-h.svg" alt="红运机械" className="mobile-menu-logo" />
          )}
          <button className="mobile-menu-close" onClick={handleClose} aria-label="关闭">
            <IconXmarkOutline24 size={22} />
          </button>
        </div>

        {/* 菜单内容区 */}
        <div className="mobile-menu-body">
          {/* 一级菜单 */}
          <nav className={`mobile-menu-panel${activeSubmenu === null ? ' active' : ''}`}>
            <ul className="mobile-menu-list">
              {menuData.map((item, index) => (
                <li key={item.label} className="mobile-menu-item">
                  {item.children ? (
                    <button
                      className="mobile-menu-link"
                      onClick={() => setActiveSubmenu(index)}
                    >
                      <span className="mobile-menu-link-inner">
                        <item.Icon size={20} className="mobile-menu-icon" />
                        <span className="mobile-menu-label">{item.label}</span>
                      </span>
                      <IconChevronRightOutline24 size={16} className="mobile-menu-chevron" />
                    </button>
                  ) : (
                    <a href={item.href} className="mobile-menu-link" onClick={handleClose}>
                      <span className="mobile-menu-link-inner">
                        <item.Icon size={20} className="mobile-menu-icon" />
                        <span className="mobile-menu-label">{item.label}</span>
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* 二级子菜单 */}
          {menuData.map((item, index) =>
            item.children ? (
              <nav
                key={item.label}
                className={`mobile-menu-panel${activeSubmenu === index ? ' active' : ''}`}
              >
                <ul className="mobile-menu-list">
                  {item.children.map((child) => (
                    <li key={child.label} className="mobile-menu-item">
                      <a href={child.href} className="mobile-menu-link" onClick={handleClose}>
                        <span className="mobile-menu-link-inner">
                          <child.Icon size={20} className="mobile-menu-icon" />
                          <span className="mobile-menu-label">{child.label}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null
          )}
        </div>

        {/* 底部信息 */}
        <div className="mobile-menu-footer">
          <span className="mobile-menu-hotline-label">全国统一服务热线</span>
          <a href="tel:4009153366" className="mobile-menu-hotline-number">400 915 3366</a>
        </div>
      </div>
    </>
  )
}
