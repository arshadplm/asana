'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsVisible(false), 600)
          return 100
        }
        return prev + Math.random() * 12 + 4
      })
    }, 80)

    return () => clearInterval(timer)
  }, [])

  const letters = 'AFSANA'.split('')

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-obsidian"
          style={{
            background: 'linear-gradient(135deg, #060B17 0%, #091425 50%, #0C1B30 100%)',
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(12,94,66,0.25) 0%, transparent 70%)',
            }}
          />

          {/* Name animation */}
          <div className="relative flex items-end gap-1 mb-4">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="font-display text-[clamp(3rem,10vw,7rem)] font-light tracking-[0.15em] text-cream"
                style={{ perspective: '600px' }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-[0.6rem] tracking-[0.5em] uppercase text-emerald-bright font-body font-medium mb-12"
          >
            A Story Written in Moments
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-48 h-[1px] bg-white/5 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-y-0 left-0 origin-left"
              style={{
                background: 'linear-gradient(90deg, #0C5E42, #22C87B, #C9A96E)',
                width: `${Math.min(progress, 100)}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Progress label */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 text-[0.55rem] tracking-[0.3em] text-muted font-body uppercase"
          >
            {Math.round(Math.min(progress, 100))}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
