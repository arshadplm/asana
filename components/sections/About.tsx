'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

const TRAITS = [
  { label: 'Travel', icon: '✈' },
  { label: 'Fashion', icon: '◈' },
  { label: 'Photography', icon: '⬡' },
  { label: 'Family', icon: '❋' },
  { label: 'Creativity', icon: '✦' },
  { label: 'Storytelling', icon: '○' },
]

const STATS = [
  { value: '8+', label: 'Years of Storytelling' },
  { value: '20+', label: 'Destinations' },
  { value: '1K+', label: 'Moments Shared' },
  { value: '2', label: 'Instagram Worlds' },
]

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060B17 0%, #091425 50%, #060B17 100%)' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 0% 50%, rgba(12,94,66,0.12) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — image column */}
          <AnimatedSection direction="left" className="relative order-2 lg:order-1">
            <motion.div style={{ y: imageY }} className="relative">
              {/* Primary portrait */}
              <div
                className="relative rounded-3xl overflow-hidden border border-white/[0.07]"
                style={{ aspectRatio: '3/4' }}
              >
                <ImagePlaceholder
                  src="/images/portraits/007_DUkrn6hEmIw_6.jpg"
                  alt="Afsana Arshad — about portrait"
                  gradient="from-[#0A3D2B] via-[#051A14] to-[#0A1428]"
                  icon="◈"
                  className="w-full h-full"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 60%, rgba(6,11,23,0.8) 100%)',
                  }}
                />
              </div>

              {/* Secondary image — floating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="absolute -right-8 -bottom-8 w-40 h-52 rounded-2xl overflow-hidden border-2 border-obsidian shadow-2xl"
              >
                <ImagePlaceholder
                  src="/images/lifestyle/010_DRj4cgFEuMz_1.jpg"
                  alt="A lifestyle moment"
                  gradient="from-[#14100A] via-[#2E2014] to-[#0A0814]"
                  icon="✦"
                  className="w-full h-full"
                  showIcon={false}
                />
              </motion.div>

              {/* Trait pills — floating top left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -left-4 top-12 glass rounded-2xl p-4 border border-white/[0.08] max-w-[160px]"
              >
                <p className="text-[0.55rem] tracking-[0.25em] uppercase text-emerald-bright font-body mb-3">
                  Passions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TRAITS.slice(0, 3).map(t => (
                    <span
                      key={t.label}
                      className="text-[0.6rem] text-cream/60 bg-white/5 rounded-full px-2 py-0.5 flex items-center gap-1"
                    >
                      <span className="text-emerald-bright">{t.icon}</span> {t.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatedSection>

          {/* Right — content column */}
          <div className="order-1 lg:order-2">
            <SectionHeader
              label="About Me"
              title={
                <>
                  A Life Told
                  <br />
                  <em className="italic font-light">Through Story</em>
                </>
              }
              align="left"
              className="mb-10"
            />

            <StaggerContainer staggerDelay={0.12} delay={0.2} className="space-y-5">
              {[
                'I am Afsana — a storyteller at heart, a dreamer by nature, and an explorer by choice. My journey has been shaped by the beauty of quiet moments, the warmth of family, and the endless wonder of the world around me.',
                'Through two lenses — one curated, one intimate — I share a life that is as authentic as it is aspirational. Whether it is the way light falls on an afternoon or the laughter shared over a family meal, I believe every moment deserves to be preserved.',
                'Fashion, travel, photography, family — these are not just interests. They are the chapters of my story. And this portfolio is where all those chapters live.',
              ].map((para, i) => (
                <StaggerItem key={i}>
                  <p className="text-muted text-[0.9rem] leading-[1.9] font-body">{para}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Trait badges */}
            <AnimatedSection delay={0.4} className="mt-8 mb-10">
              <div className="flex flex-wrap gap-2">
                {TRAITS.map(trait => (
                  <motion.span
                    key={trait.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-body font-medium text-cream/70 bg-white/[0.05] border border-white/[0.08] hover:border-emerald-bright/30 hover:text-cream transition-all duration-300"
                  >
                    <span className="text-emerald-bright text-[10px]">{trait.icon}</span>
                    {trait.label}
                  </motion.span>
                ))}
              </div>
            </AnimatedSection>

            {/* Stats row */}
            <AnimatedSection delay={0.6}>
              <div className="pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                    className="text-center lg:text-left"
                  >
                    <p className="font-display text-3xl font-light text-cream mb-1">{stat.value}</p>
                    <p className="text-[0.65rem] font-body text-muted leading-tight">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Social CTA */}
            <AnimatedSection delay={0.8} className="mt-10 flex flex-wrap gap-3">
              <motion.a
                href="https://www.instagram.com/afsana.arshad_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-obsidian bg-emerald-bright rounded-sm hover:bg-emerald-glow transition-all duration-300"
              >
                <Instagram size={13} />
                @afsana.arshad_
              </motion.a>
              <motion.a
                href="https://www.instagram.com/afsanahheeee"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-cream border border-gold/30 rounded-sm hover:border-gold/60 hover:bg-gold/10 transition-all duration-300"
              >
                <Instagram size={13} className="text-gold" />
                @afsanahheeee
              </motion.a>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
