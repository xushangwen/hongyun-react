import { useEffect, useRef } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap'

export default function SearchOverlay({ active, onClose }) {
  const inputRef = useRef(null)
  const overlayRef = useRef(null)
  useFocusTrap(overlayRef, active)

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
      const siblings = [...(overlayRef.current?.parentElement?.children || [])]
        .filter((element) => element !== overlayRef.current)
      siblings.forEach((element) => { element.inert = true })
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => {
        siblings.forEach((element) => { element.inert = false })
        document.body.style.overflow = ''
      }
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && active) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [active, onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`search-overlay${active ? ' active' : ''}`}
      id="searchOverlay"
      ref={overlayRef}
      role="dialog"
      aria-modal={active ? 'true' : undefined}
      aria-label="站内搜索"
      aria-hidden={!active}
      inert={!active}
      onClick={handleOverlayClick}
    >
      <button className="search-close" aria-label="关闭搜索" onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div className="search-container">
        <form className="search-input-wrapper" action="/search" method="get" onSubmit={onClose}>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="搜索产品、解决方案..."
            name="q"
            autoComplete="off"
          />
          <button type="submit" className="search-submit" aria-label="搜索">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.75 20.75L15.25 15.25" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="square" />
              <path d="M10.25 17.25C14.116 17.25 17.25 14.116 17.25 10.25C17.25 6.38401 14.116 3.25 10.25 3.25C6.38401 3.25 3.25 6.38401 3.25 10.25C3.25 14.116 6.38401 17.25 10.25 17.25Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="square" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}
