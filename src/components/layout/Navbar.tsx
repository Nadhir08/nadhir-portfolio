import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Globe } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useLang } from '@/context/LangContext'

const sections = ['hero', 'about', 'projects', 'experience', 'contact']

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cvDropdown, setCvDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionToNavLinkMap: Record<string, string> = {
      hero: 'about',
      about: 'about',
      projects: 'projects',
      experience: 'experience',
      contact: 'contact'
    }

    const observers = sections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionToNavLinkMap[id] || id)
          }
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCvDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const scrollTo = (id: string) => {
    const targetId = id === 'about' ? 'hero' : id
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const navLinks = [
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.projects },
    { id: 'experience', label: t.nav.experience },
    { id: 'contact', label: t.nav.contact },
  ]

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: 'background 0.3s, backdrop-filter 0.3s, box-shadow 0.3s',
    background: scrolled ? 'var(--nav-bg)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
  }

  return (
    <nav style={navStyle}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.1rem',
          }}
        >
          <span
            style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Nadhir Baatout
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Full Stack & DevOps Engineer
          </span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem 0.875rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                color: activeSection === link.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                borderRadius: '0.5rem',
                transition: 'color 0.2s, background 0.2s',
                position: 'relative',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)' }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color =
                  activeSection === link.id ? 'var(--accent-blue)' : 'var(--text-secondary)'
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: 4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: 'var(--accent-blue)',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Language toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '999px',
              padding: '0.2rem',
            }}
          >
            <Globe size={12} style={{ color: 'var(--text-muted)', marginLeft: '0.4rem' }} />
            {(['en', 'fr'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase' as const,
                  background: lang === l ? 'var(--accent-blue)' : 'transparent',
                  color: lang === l ? '#fff' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* CV dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }} className="hidden-mobile">
            <button
              onClick={() => setCvDropdown(v => !v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--accent-blue)',
                background: 'rgba(59,130,246,0.08)',
                color: 'var(--accent-blue)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              {t.nav.downloadCV} ▾
            </button>
            <AnimatePresence>
              {cvDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    right: 0,
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.75rem',
                    padding: '0.5rem',
                    minWidth: 180,
                    boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                    zIndex: 100,
                  }}
                >
                  {[
                    { label: '🇬🇧 English PDF', href: '/cv/Nadhir_Baatout_CV_EN.pdf' },
                    { label: '🇫🇷 French PDF', href: '/cv/Nadhir_Baatout_CV_FR.pdf' },
                  ].map(item => (
                    <a
                      key={item.href}
                      href={item.href}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setCvDropdown(false)}
                      style={{
                        display: 'block',
                        padding: '0.65rem 1rem',
                        borderRadius: '0.5rem',
                        color: 'var(--text-primary)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textDecoration: 'none',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            style={{
              display: 'none',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.5rem',
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
            className="show-mobile"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'var(--nav-bg)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--border-color)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left' as const,
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    color: activeSection === link.id ? 'var(--accent-blue)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    borderRadius: '0.5rem',
                  }}
                >
                  {link.label}
                </button>
              ))}
              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                <a
                  href="/cv/Nadhir_Baatout_CV_EN.pdf"
                  download
                  target="_blank"
                  style={{
                    flex: 1,
                    textAlign: 'center' as const,
                    padding: '0.6rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                  }}
                >
                  🇬🇧 EN CV
                </a>
                <a
                  href="/cv/Nadhir_Baatout_CV_FR.pdf"
                  download
                  target="_blank"
                  style={{
                    flex: 1,
                    textAlign: 'center' as const,
                    padding: '0.6rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                  }}
                >
                  🇫🇷 FR CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
