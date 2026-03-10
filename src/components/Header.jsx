import { useState, useEffect, useCallback } from 'react'
import { IconGlobeOutline24 } from 'nucleo-core-outline-24'
import { IconMagnifierOutline24 } from 'nucleo-core-outline-24'
import MobileMenu from './MobileMenu'

export default function Header({ activeDropdown, openDropdown, scheduleClose, cancelClose, closeDropdown, onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [contactHovered, setContactHovered] = useState(false)
  const [activeLang, setActiveLang] = useState('zh')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHeaderWhite = scrolled || activeDropdown || contactHovered

  const handleNavEnter = useCallback((name) => {
    openDropdown(name)
  }, [openDropdown])

  const handleNavLeave = useCallback(() => {
    scheduleClose()
  }, [scheduleClose])

  const handleContactEnter = useCallback(() => {
    setContactHovered(true)
    cancelClose()
    closeDropdown()
  }, [cancelClose, closeDropdown])

  const handleContactLeave = useCallback(() => {
    setContactHovered(false)
  }, [])

  return (
    <header className={`header${isHeaderWhite ? ' scrolled' : ''}`}>
      <div className="header-container">
        <a href="/" className="logo">
          <img src="/assets/images/hy-logo-ch-h.svg" alt="红运机械" className="logo-img" />
        </a>

        <nav className="nav">
          <ul className="nav-list">
            <li
              className={`nav-item has-dropdown${activeDropdown === 'about' ? ' active' : ''}`}
              onMouseEnter={() => handleNavEnter('about')}
              onMouseLeave={handleNavLeave}
            >
              <a href="#about" className="nav-link">关于红运</a>
            </li>
            <li
              className={`nav-item has-dropdown${activeDropdown === 'solutions' ? ' active' : ''}`}
              id="navSolutions"
              onMouseEnter={() => handleNavEnter('solutions')}
              onMouseLeave={handleNavLeave}
            >
              <a href="#solutions" className="nav-link">行业解决方案</a>
            </li>
            <li
              className={`nav-item has-dropdown${activeDropdown === 'products' ? ' active' : ''}`}
              id="navProducts"
              onMouseEnter={() => handleNavEnter('products')}
              onMouseLeave={handleNavLeave}
            >
              <a href="#products" className="nav-link">产品中心</a>
            </li>
            <li
              className="nav-item"
              onMouseEnter={handleContactEnter}
              onMouseLeave={handleContactLeave}
            >
              <a href="#contact" className="nav-link">联系我们</a>
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
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}
