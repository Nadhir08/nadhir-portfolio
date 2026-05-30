import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  as?: 'button' | 'a'
  href?: string
  target?: string
  download?: string | boolean
}

const sizeStyles = {
  sm: { padding: '0.5rem 1rem', fontSize: '0.875rem', gap: '0.375rem' },
  md: { padding: '0.75rem 1.5rem', fontSize: '0.9375rem', gap: '0.5rem' },
  lg: { padding: '0.875rem 2rem', fontSize: '1rem', gap: '0.5rem' },
}

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading,
  children,
  className,
  as: Tag = 'button',
  href,
  target,
  download,
  ...props
}: ButtonProps) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeStyles[size].gap,
    padding: sizeStyles[size].padding,
    fontSize: sizeStyles[size].fontSize,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    borderRadius: '0.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.25s ease',
    whiteSpace: 'nowrap' as const,
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, var(--accent-blue), #1d4ed8)',
      color: '#ffffff',
      boxShadow: '0 0 0 1px rgba(59,130,246,0.3)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--accent-blue)',
      border: '1px solid transparent',
    },
  }

  const style = { ...base, ...variants[variant] }

  const content = (
    <>
      {loading ? (
        <span
          style={{
            width: 16,
            height: 16,
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }}
        />
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </>
  )

  if (Tag === 'a') {
    return (
      <motion.a
        href={href}
        target={target}
        download={download}
        style={style}
        className={cn(className)}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        onMouseEnter={e => {
          if (variant === 'primary') {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(59,130,246,0.5)'
          } else if (variant === 'secondary') {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)'
          }
        }}
        onMouseLeave={e => {
          if (variant === 'primary') {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(59,130,246,0.3)'
          } else if (variant === 'secondary') {
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)'
          }
        }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      style={style}
      className={cn(className)}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      disabled={loading}
      onMouseEnter={e => {
        if (variant === 'primary') {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(59,130,246,0.5)'
        } else if (variant === 'secondary') {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-blue)'
        }
      }}
      onMouseLeave={e => {
        if (variant === 'primary') {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(59,130,246,0.3)'
        } else if (variant === 'secondary') {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)'
        }
      }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {content}
    </motion.button>
  )
}

export default Button
