import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { IconGlobeOutline24 } from 'nucleo-core-outline-24'
import { IconMagnifierOutline24 } from 'nucleo-core-outline-24'
import MobileMenu from './MobileMenu'
import DropdownContact from './DropdownContact'

export default function Header({ activeDropdown, openDropdown, scheduleClose, cancelClose, closeDropdown, onSearchOpen, forceScrolled = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeLang, setActiveLang] = useState('zh')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // 在 body 顶部插入 50px 哨兵，用 IO 替代 scroll 事件，避免每帧触发 setState
    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    sentinel.style.cssText = 'position:absolute;top:50px;left:0;width:1px;height:1px;pointer-events:none;'
    document.body.appendChild(sentinel)

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)

    return () => { observer.disconnect(); sentinel.remove() }
  }, [])

  const isHeaderWhite = forceScrolled || scrolled || activeDropdown

  const handleNavEnter = useCallback((name) => {
    openDropdown(name)
  }, [openDropdown])

  const handleNavLeave = useCallback(() => {
    scheduleClose()
  }, [scheduleClose])

  return (
    <header className={`header${isHeaderWhite ? ' scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/assets/images/hy-logo-ch-h.svg" alt="红运机械" className="logo-img" />
        </Link>

        <nav className="nav">
          <ul className="nav-list">
            <li
              className={`nav-item has-dropdown${activeDropdown === 'about' ? ' active' : ''}`}
              onMouseEnter={() => handleNavEnter('about')}
              onMouseLeave={handleNavLeave}
            >
              <Link to="/about" className="nav-link">关于红运</Link>
            </li>
            <li
              className={`nav-item has-dropdown${activeDropdown === 'solutions' ? ' active' : ''}`}
              id="navSolutions"
              onMouseEnter={() => handleNavEnter('solutions')}
              onMouseLeave={handleNavLeave}
            >
              <Link to="/solutions" className="nav-link">行业解决方案</Link>
            </li>
            <li
              className={`nav-item has-dropdown${activeDropdown === 'products' ? ' active' : ''}`}
              id="navProducts"
              onMouseEnter={() => handleNavEnter('products')}
              onMouseLeave={handleNavLeave}
            >
              <Link to="/products" className="nav-link">产品中心</Link>
            </li>
            <li
              className={`nav-item has-dropdown${activeDropdown === 'contact' ? ' active' : ''}`}
              onMouseEnter={() => handleNavEnter('contact')}
              onMouseLeave={handleNavLeave}
            >
              <Link to="/contact" className="nav-link">联系我们</Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="globe-lang-group">
            <button className="btn-icon" aria-label="全球站点">
              <IconGlobeOutline24 size={20} aria-hidden={true} />
            </button>
            <div className="lang-switch">
              <button
                className={`lang-btn${activeLang === 'zh' ? ' active' : ''}`}
                onClick={() => setActiveLang('zh')}
              >
                中
              </button>
              <span className="lang-divider">/</span>
              <button
                className={`lang-btn${activeLang === 'en' ? ' active' : ''}`}
                onClick={() => setActiveLang('en')}
              >
                EN
              </button>
            </div>
          </div>
          <button className="btn-icon btn-search" aria-label="搜索" onClick={onSearchOpen}>
            <IconMagnifierOutline24 size={20} aria-hidden={true} />
          </button>
          <button
            className="btn-icon btn-hamburger"
            aria-label="菜单"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>
      <DropdownContact 
        isActive={activeDropdown === 'contact'} 
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}
