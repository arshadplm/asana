'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
  glowColor?: 'emerald' | 'gold' | 'rose' | 'none'
  variant?: 'default' | 'dark' | 'emerald' | 'gold'
  onClick?: () => void
}

const glowColors = {
  emerald: 'hover:shadow-[0_0_40px_rgba(21,168,112,0.25)]',
  gold: 'hover:shadow-[0_0_40px_rgba(201,169,110,0.2)]',
  rose: 'hover:shadow-[0_0_40px_rgba(196,134,138,0.2)]',
  none: '',
}

const variants = {
  default: 'bg-[rgba(9,20,37,0.6)] border-[rgba(122,144,168,0.12)]',
  dark: 'bg-[rgba(6,11,23,0.8)] border-[rgba(122,144,168,0.08)]',
  emerald: 'bg-[rgba(12,94,66,0.12)] border-[rgba(21,168,112,0.2)]',
  gold: 'bg-[rgba(201,169,110,0.08)] border-[rgba(201,169,110,0.15)]',
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  glowColor = 'none',
  variant = 'default',
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -6, scale: 1.005 } : undefined}
      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl border backdrop-blur-xl overflow-hidden',
        'transition-shadow duration-500',
        variants[variant],
        glowColors[glowColor],
        hoverEffect && 'cursor-pointer',
        className
      )}
    >
      {/* Inner highlight */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
        }}
        aria-hidden
      />
      {children}
    </motion.div>
  )
}
