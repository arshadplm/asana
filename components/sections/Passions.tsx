'use client'

import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { PASSIONS } from '@/lib/constants'

export function Passions() {
  return (
    <section
      id="passions"
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060B17 0%, #0C1B30 50%, #060B17 100%)' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 100% 100%, rgba(201,169,110,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Passions & Interests"
          title={
            <>
              What Makes
              <br />
              <em className="italic">My Heart Sing</em>
            </>
          }
          subtitle="The things I love most — not just hobbies, but the very forces that shape who I am."
          className="mb-16"
          accentColor="gold"
        />

        <StaggerContainer
          staggerDelay={0.1}
          delay={0.2}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PASSIONS.map(passion => (
            <StaggerItem key={passion.id}>
              <PassionCard passion={passion} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function PassionCard({ passion }: { passion: (typeof PASSIONS)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative group rounded-2xl overflow-hidden border border-white/[0.08] bg-[rgba(9,20,37,0.5)] backdrop-blur-xl hover:border-white/[0.15] transition-all duration-500 cursor-default"
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${passion.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
      />

      {/* Animated glow */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
        style={{
          background: `radial-gradient(ellipse at center, ${passion.accentColor}20 0%, transparent 70%)`,
        }}
      />

      {/* Inner shine */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)' }}
      />

      <div className="relative p-7">
        {/* Icon */}
        <div className="flex items-start justify-between mb-6">
          <motion.span
            className="text-4xl"
            style={{ color: passion.accentColor }}
            whileHover={{ scale: 1.2, rotate: 15 }}
            transition={{ duration: 0.3 }}
          >
            {passion.icon}
          </motion.span>

          {/* Stat */}
          {passion.stat && (
            <div className="text-right">
              <p
                className="font-display text-2xl font-light"
                style={{ color: passion.accentColor }}
              >
                {passion.stat}
              </p>
              <p className="text-[0.55rem] tracking-[0.2em] uppercase text-muted font-body">
                {passion.statLabel}
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <h3 className="font-display text-2xl font-light text-cream mb-3 leading-snug">
          {passion.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed font-body">{passion.description}</p>

        {/* Bottom accent line */}
        <motion.div
          className="mt-6 h-px"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: `linear-gradient(90deg, ${passion.accentColor}60, transparent)`,
            transformOrigin: 'left',
          }}
        />
      </div>
    </motion.div>
  )
}
