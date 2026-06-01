import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useLang } from '@/context/LangContext'
import { principles } from '@/data/philosophy'
import SectionLabel from '@/components/ui/SectionLabel'

export function Philosophy() {
  const { lang, t } = useLang()

  return (
    <section id="philosophy" className="section-padding">
      <div className="container-custom">
        <SectionLabel title={t.philosophy.title} subtitle={t.philosophy.subtitle} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {principles.map((principle, index) => {
            const Icon = (Icons as any)[principle.icon] || Icons.Circle
            const title = lang === 'fr' ? principle.titleFr : principle.title
            const description = lang === 'fr' ? principle.descriptionFr : principle.description

            return (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  padding: '2rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                {/* Large background number */}
                <span
                  style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    fontSize: '8rem',
                    fontWeight: 900,
                    color: 'var(--bg-elevated)',
                    fontFamily: 'JetBrains Mono, monospace',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                >
                  {principle.number}
                </span>

                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '0.75rem',
                    background: 'rgba(59,130,246,0.1)',
                    color: 'var(--accent-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}
                >
                  <Icon size={24} />
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', zIndex: 1 }}>
                  {title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, zIndex: 1 }}>
                  {description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Philosophy
