import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6'
import { useLang } from '@/context/LangContext'
import SectionLabel from '@/components/ui/SectionLabel'

export function Contact() {
  const { t } = useLang()

  const contacts = [
    {
      id: 'email',
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'nadhir.baatout@gmail.com',
      href: 'mailto:nadhir.baatout@gmail.com',
      color: '#3B82F6',
    },
    {
      id: 'location',
      icon: <MapPin size={24} />,
      label: 'Location',
      value: t.contact.location,
      href: 'https://maps.google.com/?q=Ariana,+Tunisia',
      color: '#06B6D4',
    },
    {
      id: 'whatsapp',
      icon: <FaWhatsapp size={24} />,
      label: 'WhatsApp',
      value: '+21651819917',
      href: 'https://wa.me/21651819917',
      color: '#25D366',
    },
    {
      id: 'linkedin',
      icon: <FaLinkedin size={24} />,
      label: 'LinkedIn',
      value: 'nadhirbaatout',
      href: 'https://linkedin.com/in/nadhirbaatout',
      color: '#0A66C2',
    },
    {
      id: 'github',
      icon: <FaGithub size={24} />,
      label: 'GitHub',
      value: 'Nadhir08',
      href: 'https://github.com/Nadhir08',
      color: 'var(--text-primary)',
    },
    {
      id: 'instagram',
      icon: <FaInstagram size={24} />,
      label: 'Instagram',
      value: '@nadhir_baatout',
      href: 'https://www.instagram.com/nadhir_baatout',
      color: '#E1306C',
    },
  ]

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      <div className="container-custom" style={{ maxWidth: 1000 }}>
        <SectionLabel number="05" title={t.contact.title} subtitle={t.contact.subtitle} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1.75rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '1rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = contact.color === 'var(--text-primary)' ? 'var(--accent-blue)' : contact.color;
                e.currentTarget.style.boxShadow = `0 12px 24px ${contact.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '1rem',
                  background: contact.color === 'var(--text-primary)' ? 'rgba(255,255,255,0.05)' : `${contact.color}15`,
                  color: contact.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.3s ease',
                }}
              >
                {contact.icon}
              </div>

              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                  {contact.label}
                </div>
                <div style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                  {contact.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
