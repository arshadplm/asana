'use client'

import { motion } from 'framer-motion'

interface OrbConfig {
  size: number
  x: string
  y: string
  color: string
  opacity: number
  duration: number
  delay: number
}

const defaultOrbs: OrbConfig[] = [
  {
    size: 600,
    x: '-10%',
    y: '-20%',
    color: 'rgba(12, 94, 66, 0.35)',
    opacity: 0.5,
    duration: 18,
    delay: 0,
  },
  {
    size: 500,
    x: '70%',
    y: '10%',
    color: 'rgba(201, 169, 110, 0.18)',
    opacity: 0.4,
    duration: 22,
    delay: -6,
  },
  {
    size: 400,
    x: '20%',
    y: '60%',
    color: 'rgba(12, 94, 66, 0.25)',
    opacity: 0.35,
    duration: 15,
    delay: -3,
  },
  {
    size: 350,
    x: '85%',
    y: '65%',
    color: 'rgba(196, 134, 138, 0.12)',
    opacity: 0.3,
    duration: 20,
    delay: -10,
  },
]

interface FloatingOrbsProps {
  orbs?: OrbConfig[]
  className?: string
}

export function FloatingOrbs({ orbs = defaultOrbs, className }: FloatingOrbsProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ''}`}
      aria-hidden
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            opacity: orb.opacity,
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 40, -20, 0],
            scale: [1, 1.08, 0.94, 1.04, 1],
            opacity: [orb.opacity, orb.opacity * 1.3, orb.opacity * 0.7, orb.opacity * 1.1, orb.opacity],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
