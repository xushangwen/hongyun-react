import { useState, useCallback, useRef } from 'react'
import Header from './components/Header'
import DropdownAbout from './components/DropdownAbout'
import DropdownSolutions from './components/DropdownSolutions'
import DropdownProducts from './components/DropdownProducts'
import HeroCarousel from './components/HeroCarousel'
import NewsSection from './components/NewsSection'
import AboutSection from './components/AboutSection'
import StrengthSection from './components/StrengthSection'
import PartnersSection from './components/PartnersSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import SearchOverlay from './components/SearchOverlay'
import FixedSideButtons from './components/FixedSideButtons'

function App() {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const dropdownTimeoutRef = useRef(null)

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

  return (
    <>
      <Header
        activeDropdown={activeDropdown}
        openDropdown={openDropdown}
        scheduleClose={scheduleClose}
        cancelClose={cancelClose}
        closeDropdown={closeDropdown}
        onSearchOpen={() => setSearchOpen(true)}
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

      <HeroCarousel />
      <NewsSection />
      <AboutSection />
      <StrengthSection />
      <PartnersSection />
      <ContactSection />
      <Footer />

      <SearchOverlay
        active={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      <FixedSideButtons />
    </>
  )
}

export default App
