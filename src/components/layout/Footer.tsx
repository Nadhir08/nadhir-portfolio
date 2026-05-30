import { Mail } from 'lucide-react'
import { FiGithub as Github, FiLinkedin as Linkedin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa6'
import { useLang } from '@/context/LangContext'

export function Footer() {
  const { t } = useLang()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border-color)',
        padding: '4rem 1.5rem 2rem',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
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
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              Navigation
            </h4>
            {[
              { id: 'about', label: t.nav.about },
              { id: 'projects', label: t.nav.projects },
              { id: 'experience', label: t.nav.experience },
              { id: 'contact', label: t.nav.contact },
            ].map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              Connect
            </h4>
            {[
              { href: 'https://github.com/Nadhir08', icon: <Github size={16} />, label: 'GitHub' },
              { href: 'https://linkedin.com/in/nadhirbaatout', icon: <Linkedin size={16} />, label: 'LinkedIn' },
              { href: 'https://wa.me/21651819917', icon: <FaWhatsapp size={16} />, label: 'WhatsApp' },
              { href: 'mailto:nadhir.baatout@gmail.com', icon: <Mail size={16} />, label: 'Email' },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent-cyan)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>{t.footer.rights}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
            {t.footer.builtBy}{' '}
            <span style={{ color: 'var(--accent-blue)' }}>❤</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
