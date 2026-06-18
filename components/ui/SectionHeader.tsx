'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  title: string | React.ReactNode
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  titleClassName?: string
  accentColor?: 'emerald' | 'gold' | 'rose'
}

const accentColors = {
  emerald: 'text-emerald-bright',
  gold: 'text-gold',
  rose: 'text-rose',
}

const decoGradients = {
  emerald: 'from-transparent via-emerald-bright/60 to-transparent',
  gold: 'from-transparent via-gold/60 to-transparent',
  rose: 'from-transparent via-rose/60 to-transparent',
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  accentColor = 'emerald',
}: SectionHeaderProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn('flex flex-col', alignClasses[align], className)}
    >
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: align === 'right' ? 20 : -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
        className={cn('flex items-center gap-3 mb-4', align === 'center' && 'justify-center')}
      >
        <div className={cn('h-px w-8', `bg-${accentColor === 'emerald' ? 'emerald-bright' : accentColor}`)} />
        <span className={cn('section-label', accentColors[accentColor])}>{label}</span>
        <div className={cn('h-px w-8', `bg-${accentColor === 'emerald' ? 'emerald-bright' : accentColor}`)} />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.7 }}
        className={cn(
          'font-display font-light text-cream',
          'text-[clamp(2.5rem,5vw,4.5rem)]',
          'leading-[1.05] tracking-[-0.02em]',
          titleClassName
        )}
      >
        {title}
      </motion.h2>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'h-px mt-5 origin-center',
          align === 'left' && 'origin-left',
          align === 'right' && 'origin-right',
          align === 'center' ? 'w-32' : 'w-24'
        )}
        style={{
          background: `linear-gradient(90deg, transparent, ${
            accentColor === 'gold' ? '#C9A96E' : accentColor === 'rose' ? '#C4868A' : '#15A870'
          }, transparent)`,
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-5 text-muted font-body text-base leading-relaxed max-w-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
