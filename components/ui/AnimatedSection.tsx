'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  once?: boolean
  threshold?: number
  as?: 'div' | 'section' | 'article' | 'aside'
}

const directionVariants = {
  up: { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -60 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 } },
  none: { initial: { opacity: 0 }, animate: { opacity: 1 } },
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.7,
  once = true,
  threshold = 0.15,
  as = 'div',
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount: threshold })
  const variants = directionVariants[direction]
  const Component = motion[as]

  return (
    <Component
      ref={ref}
      initial={variants.initial}
      animate={inView ? variants.animate : variants.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(className)}
    >
      {children}
    </Component>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delay = 0,
}: StaggerContainerProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right' | 'none'
}) {
  const variants = directionVariants[direction]

  return (
    <motion.div
      variants={{
        hidden: variants.initial,
        visible: {
          ...variants.animate,
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
