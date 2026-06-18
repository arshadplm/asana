'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { HIGHLIGHTS } from '@/lib/constants'

export function Highlights() {
  return (
    <section
      id="highlights"
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060B17 0%, #0C1B30 40%, #060B17 100%)' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(12,94,66,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Personal Highlights"
          title={
            <>
              Numbers That
              <br />
              <em className="italic">Tell My Story</em>
            </>
          }
          subtitle="Not just statistics — these are milestones in a life lived with intention."
          className="mb-16"
          accentColor="gold"
        />

        <StaggerContainer
          staggerDelay={0.12}
          delay={0.2}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {HIGHLIGHTS.map(highlight => (
            <StaggerItem key={highlight.id}>
              <HighlightCard highlight={highlight} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Quote strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-16 relative rounded-3xl overflow-hidden border border-white/[0.07] p-10 text-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(12,94,66,0.15) 0%, rgba(9,20,37,0.8) 50%, rgba(201,169,110,0.08) 100%)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)',
            }}
          />
          <div className="relative">
            <span className="font-display text-7xl text-emerald-bright/20 leading-none">&ldquo;</span>
            <p className="font-display italic text-2xl md:text-3xl text-cream/80 font-light leading-relaxed -mt-4">
              Every number behind me is a story I lived fully.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-emerald-bright/40" />
              <span className="text-[0.6rem] tracking-[0.3em] text-emerald-bright uppercase font-body">
                Afsana Arshad
              </span>
              <div className="h-px w-8 bg-emerald-bright/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function HighlightCard({ highlight }: { highlight: (typeof HIGHLIGHTS)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.005 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative group rounded-2xl overflow-hidden border border-white/[0.08] bg-[rgba(9,20,37,0.5)] backdrop-blur-xl hover:border-white/[0.16] transition-all duration-500"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />

      {/* Glow on hover */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${highlight.accentColor}15 0%, transparent 70%)`,
        }}
      />

      <div className="relative p-8 flex gap-6 items-start">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl border border-white/[0.08]"
          style={{ background: `${highlight.accentColor}15` }}
        >
          <span style={{ color: highlight.accentColor }}>{highlight.icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-display text-xl font-light text-cream leading-snug">
              {highlight.title}
            </h3>
            <span
              className="font-display text-3xl font-light flex-shrink-0"
              style={{ color: highlight.accentColor }}
            >
              {highlight.value}
            </span>
          </div>
          <p className="text-muted text-sm leading-relaxed font-body">{highlight.description}</p>
        </div>
      </div>

      {/* Bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: `linear-gradient(90deg, transparent, ${highlight.accentColor}60, transparent)`,
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  )
}
