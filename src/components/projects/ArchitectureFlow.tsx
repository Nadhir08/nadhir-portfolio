import { motion } from 'framer-motion'
import { Server, Database, Layers, Cloud } from 'lucide-react'

interface ArchitectureFlowProps {
  stack: string[]
}

export function ArchitectureFlow({ stack }: ArchitectureFlowProps) {
  // Try to categorize the stack into layers
  const frontend = stack.filter(s => ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'JavaScript'].includes(s))
  const backend = stack.filter(s => ['Django', 'Express.js', 'Supabase'].includes(s))
  const data = stack.filter(s => ['PostgreSQL', 'Redis', 'pgvector'].includes(s))
  const infra = stack.filter(s => ['Docker', 'Celery', 'Stripe', 'Jenkins', 'SonarQube'].includes(s))

  // If categorization fails, just list them all under a generic layer
  const hasLayers = frontend.length > 0 || backend.length > 0 || data.length > 0 || infra.length > 0
  
  if (!hasLayers) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
        {stack.map((tech, i) => (
          <span
            key={tech}
            style={{
              padding: '0.3rem 0.75rem',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    )
  }

  const layers = [
    { title: 'Frontend', items: frontend, icon: <Layers size={14} />, color: '#3B82F6' },
    { title: 'Backend', items: backend, icon: <Server size={14} />, color: '#8B5CF6' },
    { title: 'Data', items: data, icon: <Database size={14} />, color: '#10B981' },
    { title: 'Infra/Services', items: infra, icon: <Cloud size={14} />, color: '#F59E0B' },
  ].filter(l => l.items.length > 0)

  return (
    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {layers.map((layer, idx) => (
        <motion.div
          key={layer.title}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {/* Layer Label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              minWidth: 120,
              color: layer.color,
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {layer.icon}
            {layer.title}
          </div>

          {/* Connection line */}
          <div style={{ flex: 1, height: 1, background: 'var(--border-color)', opacity: 0.5 }} />

          {/* Techs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {layer.items.map(tech => (
              <span
                key={tech}
                style={{
                  padding: '0.2rem 0.6rem',
                  background: `${layer.color}10`,
                  border: `1px solid ${layer.color}30`,
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ArchitectureFlow
