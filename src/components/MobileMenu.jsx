import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconChevronRightOutline24 } from 'nucleo-core-outline-24'
import { IconChevronLeftOutline24 } from 'nucleo-core-outline-24'
import { IconXmarkOutline24 } from 'nucleo-core-outline-24'
import { IconOffice2Outline24 } from 'nucleo-core-outline-24'
import { IconCircleMediaPlayOutline24 } from 'nucleo-core-outline-24'
import { IconTargetOutline24 } from 'nucleo-core-outline-24'
import { IconHistoryOutline24 } from 'nucleo-core-outline-24'
import { IconGearNodesOutline24 } from 'nucleo-core-outline-24'
import { IconAtomOutline24 } from 'nucleo-core-outline-24'
import { IconGlobeOutline24 } from 'nucleo-core-outline-24'
import { IconAwardPlaqueOutline24 } from 'nucleo-core-outline-24'
import { IconUsersShakingHandsOutline24 } from 'nucleo-core-outline-24'
import { IconCarBatteryOutline24 } from 'nucleo-core-outline-24'
import { IconBatteryChargingOutline24 } from 'nucleo-core-outline-24'
import { IconFlaskOutline24 } from 'nucleo-core-outline-24'
import { IconTestTubeOutline24 } from 'nucleo-core-outline-24'
import { IconFireFlameOutline24 } from 'nucleo-core-outline-24'
import { IconCutleryOutline24 } from 'nucleo-core-outline-24'
import { IconMedicineOutline24 } from 'nucleo-core-outline-24'
import { IconSoapDispenserOutline24 } from 'nucleo-core-outline-24'
import { IconMicrochipOutline24 } from 'nucleo-core-outline-24'
import { IconPhoneOutline24 } from 'nucleo-core-outline-24'

const menuData = [
  {
    label: '关于红运',
    Icon: IconOffice2Outline24,
    children: [
      { Icon: IconOffice2Outline24,           label: '公司简介',  href: '/about#company-intro' },
      { Icon: IconCircleMediaPlayOutline24,   label: '企业宣传片', href: '/about#promo-video' },
      { Icon: IconTargetOutline24,            label: '企业文化',  href: '/about#culture' },
      { Icon: IconHistoryOutline24,           label: '发展历程',  href: '/about#history' },
      { Icon: IconGearNodesOutline24,         label: '生产实力',  href: '/about#production' },
      { Icon: IconAtomOutline24,              label: '研发实力',  href: '/about#rnd' },
      { Icon: IconGlobeOutline24,             label: '全球化布局', href: '/about#global' },
      { Icon: IconAwardPlaqueOutline24,       label: '资质 / 荣誉', href: '/about#honors' },
      { Icon: IconUsersShakingHandsOutline24, label: '合作伙伴',  href: '/about#partners-page' },
    ],
  },
  {
    label: '行业解决方案',
    Icon: IconCarBatteryOutline24,
    children: [
      { Icon: IconCarBatteryOutline24,       label: '新能源',   href: '/solutions#new-energy' },
      { Icon: IconBatteryChargingOutline24,   label: '固态电池', href: '/solutions#solid-state-battery' },
      { Icon: IconFlaskOutline24,           label: '化工',     href: '/solutions#chemical' },
      { Icon: IconTestTubeOutline24,        label: '制胶',     href: '/solutions#adhesive' },
      { Icon: IconFireFlameOutline24,       label: '火工药剂', href: '/solutions#pyrotechnics' },
      { Icon: IconCutleryOutline24,         label: '食品',     href: '/solutions#food' },
      { Icon: IconMedicineOutline24,        label: '医药',     href: '/solutions#pharma' },
      { Icon: IconSoapDispenserOutline24,   label: '化妆品',   href: '/solutions#cosmetics' },
      { Icon: IconMicrochipOutline24,       label: '电子材料', href: '/solutions#electronics' },
    ],
  },
  {
    label: '产品中心',
    Icon: IconGearNodesOutline24,
    children: [
      { Icon: IconCarBatteryOutline24,       label: '新能源',   href: '/products#products-new-energy' },
      { Icon: IconBatteryChargingOutline24,   label: '固态电池', href: '/products#products-solid-state-battery' },
      { Icon: IconFlaskOutline24,           label: '化工',     href: '/products#products-chemical' },
      { Icon: IconTestTubeOutline24,        label: '制胶',     href: '/products#products-adhesive' },
      { Icon: IconFireFlameOutline24,       label: '火工药剂', href: '/products#products-pyrotechnics' },
      { Icon: IconCutleryOutline24,         label: '食品',     href: '/products#products-food' },
      { Icon: IconSoapDispenserOutline24,   label: '化妆品',   href: '/products#products-cosmetics' },
      { Icon: IconMicrochipOutline24,       label: '电子材料', href: '/products#products-electronics' },
    ],
  },
  {
    label: '联系我们',
    Icon: IconPhoneOutline24,
    href: '/contact',
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
                    <Link to={item.href} className="mobile-menu-link" onClick={handleClose}>
                      <span className="mobile-menu-link-inner">
                        <item.Icon size={20} className="mobile-menu-icon" />
                        <span className="mobile-menu-label">{item.label}</span>
                      </span>
                    </Link>
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
                      <Link to={child.href} className="mobile-menu-link" onClick={handleClose}>
                        <span className="mobile-menu-link-inner">
                          <child.Icon size={20} className="mobile-menu-icon" />
                          <span className="mobile-menu-label">{child.label}</span>
                        </span>
                      </Link>
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
