import { useEffect, useState, useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const navigationItems = [
  { label: 'Product', href: '#product-showcase' },
  { label: 'How it works', href: '#committee-pipeline' },
  { label: 'The committee', href: '#committee-intro' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { domRef, isVisible } = useIntersectionObserver()
  
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  const handleBrandClick = () => {
    const now = Date.now()
    if (now - lastClickTime > 2000) {
      setClickCount(1)
      setLastClickTime(now)
    } else {
      const newCount = clickCount + 1
      setClickCount(newCount)
      setLastClickTime(now)
      if (newCount === 5) {
        setShowEasterEgg(true)
        setClickCount(0)
        
        if (timerRef.current) window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => {
          setShowEasterEgg(false)
        }, 2000)
      }
    }
  }

  return (
    <header 
      ref={domRef as React.RefObject<HTMLElement>}
      className={`site-header ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container site-header__inner">
        <a 
          className="brand" 
          href="#main-content" 
          aria-label="The Investment Committee home"
          onClick={handleBrandClick}
        >
          <svg className="brand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <path d="M 45 20 A 35 35 0 0 0 45 90 Z" fill="currentColor" />
            <path d="M 55 10 A 35 35 0 0 1 55 80 Z" fill="var(--color-accent)" />
          </svg>
          <div className="brand-text">
            <span>The</span>
            <strong>Investment Committee</strong>
          </div>
          {showEasterEgg && (
            <span className="easter-egg" aria-hidden="true">
              Committee convened
            </span>
          )}
        </a>
        
        <div aria-live="polite" className="sr-only">
          {showEasterEgg ? 'Committee convened' : ''}
        </div>

        <nav className="site-nav reveal-fade" style={{ transitionDelay: '150ms' }} aria-label="Primary navigation">
          {navigationItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>

        <a className="header-cta reveal-fade" style={{ transitionDelay: '300ms' }} href="#convene">Convene the committee <span aria-hidden="true">↗</span></a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="sr-only">{isMenuOpen ? 'Close' : 'Open'} navigation menu</span>
          <span aria-hidden="true">{isMenuOpen ? '×' : 'Menu'}</span>
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`} id="mobile-navigation" hidden={!isMenuOpen}>
        <nav className="container mobile-menu__inner" aria-label="Mobile navigation">
          {navigationItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>)}
          <a className="button button--primary" href="#convene" onClick={closeMenu}>Convene the committee <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  )
}
