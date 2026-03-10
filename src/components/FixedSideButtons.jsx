import { useState, useEffect } from 'react'
import { IconUsersChatOutline24 } from 'nucleo-core-outline-24'
import { IconChevronUpOutline24 } from 'nucleo-core-outline-24'

export default function FixedSideButtons() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const heroEl = document.querySelector('.hero')
    const heroHeight = heroEl?.offsetHeight || 660

    const handleScroll = () => {
      setVisible(window.scrollY > heroHeight)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`fixed-side-btns${visible ? ' visible' : ''}`}>
      <a href="#contact" className="fixed-btn fixed-btn-contact" aria-label="联系我们">
        <IconUsersChatOutline24 size={24} aria-hidden={true} />
      </a>
      <button className="fixed-btn fixed-btn-top" aria-label="回到顶部" onClick={scrollToTop}>
        <IconChevronUpOutline24 size={24} aria-hidden={true} />
      </button>
    </div>
  )
}
