import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronRight, CheckCircle2 } from 'lucide-react'
import { FiGithub as Github } from 'react-icons/fi'
import type { Project } from '@/types'
import { useLang } from '@/context/LangContext'
import Badge from '@/components/ui/Badge'
import GlowCard from '@/components/ui/GlowCard'
import ArchitectureFlow from './ArchitectureFlow'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { lang, t } = useLang()
  const [isExpanded, setIsExpanded] = useState(false)

  const isEven = index % 2 === 0

  const name = lang === 'fr' ? project.nameFr || project.name : project.nameEn || project.name
  const category = lang === 'fr' ? project.categoryFr : project.category
  const role = lang === 'fr' ? project.roleFr : project.role
  const impact = lang === 'fr' ? project.impactFr : project.impact
  const description = (project as any)[lang === 'fr' ? 'descriptionFr' : 'description'] || project.impact
  const architecture = lang === 'fr' ? project.architectureFr : project.architecture

  return (
    <GlowCard noPadding className="project-card" style={{ marginBottom: '4rem', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          ...(window.innerWidth >= 1024 ? {
            flexDirection: isEven ? 'row' : 'row-reverse',
          } : {}),
        }}
      >
        {/* Image side */}
        <div
          style={{
            flex: '1 1 50%',
            position: 'relative',
            background: 'var(--bg-surface)',
            borderRight: window.innerWidth >= 1024 && isEven ? '1px solid var(--border-color)' : 'none',
            borderLeft: window.innerWidth >= 1024 && !isEven ? '1px solid var(--border-color)' : 'none',
            borderBottom: window.innerWidth < 1024 ? '1px solid var(--border-color)' : 'none',
            overflow: 'hidden',
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                minHeight: 320,
                opacity: 0.9,
                transition: 'transform 0.6s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
              onError={e => {
                const target = e.currentTarget
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, var(--bg-surface), var(--bg-base))'
                  parent.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;min-height:320px;color:var(--text-muted);font-family:JetBrains Mono,monospace;font-size:1.5rem;font-weight:600;opacity:0.3">sys.render(${project.id})</div>`
                }
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: 320,
                background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-base))',
                color: 'var(--text-muted)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.5rem',
                fontWeight: 600,
                opacity: 0.3,
              }}
            >
              sys.render({project.id})
            </div>
          )}

          {/* Floating period badge */}
          <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
            <Badge variant="type" color="#F0F6FF" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.2)' }}>
              {project.period}
            </Badge>
          </div>
        </div>

        {/* Content side */}
        <div style={{ flex: '1 1 50%', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Badge variant="category">{category}</Badge>
            <Badge variant="status" status={project.status}>
              {(t.projects.status as any)[project.status] || project.status}
            </Badge>
          </div>

          <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            {name}
          </h3>

          <p style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={16} />
            {role}
          </p>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            {impact}
          </p>

          {/* Links */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                  color: '#fff',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 16px rgba(59,130,246,0.4)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(59,130,246,0.3)';
                }}
              >
                <ExternalLink size={16} />
                {t.projects.liveDemo}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--accent-blue)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }}
              >
                <Github size={16} />
                {t.projects.viewCode}
              </a>
            )}
          </div>

          <div style={{ marginTop: 'auto' }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
            >
              {isExpanded ? 'Hide Details' : t.projects.caseStudy}
              <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronRight size={16} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '1.5rem', background: 'rgba(5,10,19,0.3)', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {description}
                    </p>
                    
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t.projects.architecture}
                    </h4>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {architecture.map((item, i) => (
                        <li key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--accent-blue)', marginTop: '0.2rem' }}>▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {t.projects.stack}
                    </h4>
                    <ArchitectureFlow stack={project.stack} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </GlowCard>
  )
}

export default ProjectCard
