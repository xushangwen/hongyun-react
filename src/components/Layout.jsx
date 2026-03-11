import { useState, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import DropdownAbout from './DropdownAbout'
import DropdownSolutions from './DropdownSolutions'
import DropdownProducts from './DropdownProducts'
import Footer from './Footer'
import SearchOverlay from './SearchOverlay'
import FixedSideButtons from './FixedSideButtons'

export default function Layout({ children }) {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const dropdownTimeoutRef = useRef(null)
  const location = useLocation()

  const cancelClose = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
  }, [])

  const openDropdown = useCallback((name) => {
    cancelClose()
    setActiveDropdown(name)
  }, [cancelClose])

  const closeDropdown = useCallback(() => {
    cancelClose()
    setActiveDropdown(null)
  }, [cancelClose])

  const scheduleClose = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }, [])

  // 非首页时 header 始终白底
  const isHome = location.pathname === '/'

  return (
    <>
      <Header
        activeDropdown={activeDropdown}
        openDropdown={openDropdown}
        scheduleClose={scheduleClose}
        cancelClose={cancelClose}
        closeDropdown={closeDropdown}
        onSearchOpen={() => setSearchOpen(true)}
        forceScrolled={!isHome}
      />

      <div
        className={`dropdown-overlay${activeDropdown ? ' active' : ''}`}
        onClick={closeDropdown}
      />

      <DropdownAbout
        active={activeDropdown === 'about'}
        onClose={closeDropdown}
        cancelClose={cancelClose}
        scheduleClose={scheduleClose}
      />
      <DropdownSolutions
        active={activeDropdown === 'solutions'}
        onClose={closeDropdown}
        cancelClose={cancelClose}
        scheduleClose={scheduleClose}
      />
      <DropdownProducts
        active={activeDropdown === 'products'}
        onClose={closeDropdown}
        cancelClose={cancelClose}
        scheduleClose={scheduleClose}
      />

      <main>{children}</main>

      <Footer />

      <SearchOverlay
        active={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <FixedSideButtons />
    </>
  )
}
