import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import type { SkillDomain } from '@/types'
import { useLang } from '@/context/LangContext'
import GlowCard from '@/components/ui/GlowCard'
import SkillNode from './SkillNode'

interface DomainHubProps {
  domain: SkillDomain
  isActive: boolean
  onClick: () => void
}

export function DomainHub({ domain, isActive, onClick }: DomainHubProps) {
  const { lang, t } = useLang()
  const Icon = (Icons as any)[domain.icon] || Icons.Code

  const label = lang === 'fr' ? domain.labelFr : domain.label

  return (
    <div style={{ position: 'relative' }}>
      <GlowCard
        className="domain-card"
        noPadding
        style={{
          cursor: 'pointer',
          borderColor: isActive ? domain.color : 'var(--border-color)',
          boxShadow: isActive ? `0 0 0 1px ${domain.color}40, 0 0 20px ${domain.color}20` : undefined,
          transform: isActive ? 'translateY(-4px)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div
          onClick={onClick}
          style={{
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '0.75rem',
              background: `${domain.color}15`,
              color: domain.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {label}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {domain.skills.length} {t.architecture.stats.technologiesLabel.toLowerCase()}
            </p>
          </div>
        </div>
      </GlowCard>

      {/* Expanded skills area (Mobile inline, desktop handled by parent) */}
      <div className="show-mobile" style={{ marginTop: isActive ? '1rem' : 0 }}>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  padding: '1.5rem',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '1rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {domain.skills.map((skill, idx) => (
                  <SkillNode key={skill.name} skill={skill} index={idx} color={domain.color} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DomainHub
