'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TIMELINE_EVENTS } from '@/lib/constants'

export function Journey() {
  return (
    <section
      id="journey"
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060B17 0%, #0A1428 50%, #060B17 100%)' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 100% 50%, rgba(12,94,66,0.1) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <SectionHeader
          label="My Journey"
          title={
            <>
              Every Chapter
              <br />
              <em className="italic">Has a Story</em>
            </>
          }
          subtitle="From the first frame to today — the milestones, the growth, and the moments that shaped who I am."
          align="center"
          className="mb-20"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full h-full origin-top"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(21,168,112,0.4) 10%, rgba(21,168,112,0.4) 90%, transparent 100%)',
              }}
            />
          </div>

          {/* Events */}
          <div className="flex flex-col gap-12">
            {TIMELINE_EVENTS.map((event, i) => {
              const isLeft = i % 2 === 0
              return (
                <TimelineCard key={event.id} event={event} isLeft={isLeft} index={i} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineCardProps {
  event: (typeof TIMELINE_EVENTS)[0]
  isLeft: boolean
  index: number
}

function TimelineCard({ event, isLeft, index }: TimelineCardProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col md:flex-row`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative md:w-[calc(50%-40px)] w-full group"
      >
        <div className="relative bg-[rgba(9,20,37,0.6)] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 hover:border-emerald-bright/20 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
          {/* Inner shine */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)',
            }}
          />

          {/* Year badge */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="font-display text-5xl font-light tracking-[-0.02em]"
              style={{
                background: 'linear-gradient(135deg, rgba(240,235,227,0.9), rgba(240,235,227,0.3))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {event.year}
            </span>
            <span className="text-2xl text-emerald-bright/60">{event.icon}</span>
          </div>

          {/* Content */}
          <h3 className="font-display text-xl font-light text-cream mb-3 leading-snug">
            {event.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed font-body">{event.description}</p>

          {/* Tags */}
          {event.tags && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {event.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[0.6rem] tracking-[0.1em] text-cream/40 bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1 font-body"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Connector arrow for desktop */}
        <div
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${
            isLeft ? '-right-10' : '-left-10'
          } w-8 h-px bg-gradient-to-r ${
            isLeft ? 'from-emerald-bright/30 to-transparent' : 'from-transparent to-emerald-bright/30'
          }`}
        />
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: 'spring', stiffness: 300 }}
        className="hidden md:flex relative z-10 items-center justify-center w-10 h-10 rounded-full bg-deep-navy border-2 border-emerald-bright/40 flex-shrink-0"
      >
        <div className="w-3 h-3 rounded-full bg-emerald-bright" />
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-emerald-bright/20 animate-ping" />
      </motion.div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block md:w-[calc(50%-40px)]" />
    </div>
  )
}
