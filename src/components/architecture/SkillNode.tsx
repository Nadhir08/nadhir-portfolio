import { motion } from 'framer-motion'
import type { Skill } from '@/types'

interface SkillNodeProps {
  skill: Skill
  index: number
  color: string
}

export function SkillNode({ skill, index, color }: SkillNodeProps) {
  const levelOpacities = {
    expert: 1,
    advanced: 0.75,
    proficient: 0.5,
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem 0.8rem',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: 'var(--text-primary)',
        transition: 'all 0.2s',
      }}
      whileHover={{ y: -2, borderColor: color, boxShadow: `0 4px 12px ${color}20` }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          opacity: levelOpacities[skill.level],
        }}
      />
      {skill.name}
    </motion.div>
  )
}

export default SkillNode
