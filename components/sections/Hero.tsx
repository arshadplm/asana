'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Instagram, ChevronDown } from 'lucide-react'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

const TAGLINE_WORDS = ['Creative', 'Soul', '·', 'Lifestyle', 'Enthusiast', '·', 'Storyteller']
const NAME_LINES = ['AFSANA', 'ARSHAD']

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const yContent = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleScrollDown = () => {
    const about = document.getElementById('about')
    about?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #060B17 0%, #091425 40%, #0C1B30 70%, #060B17 100%)',
      }}
    >
      {/* Floating ambient orbs */}
      <FloatingOrbs />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(240,235,227,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,235,227,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden
      />

      {/* Corner accents */}
      <div className="absolute top-24 left-6 w-16 h-16 border-l border-t border-emerald-bright/20 pointer-events-none" />
      <div className="absolute top-24 right-6 w-16 h-16 border-r border-t border-emerald-bright/20 pointer-events-none" />
      <div className="absolute bottom-16 left-6 w-16 h-16 border-l border-b border-gold/20 pointer-events-none" />
      <div className="absolute bottom-16 right-6 w-16 h-16 border-r border-b border-gold/20 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[80vh]">

          {/* Left — text content */}
          <motion.div
            style={{ y: yContent, opacity: opacityContent }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-10 bg-emerald-bright" />
              <span className="text-[0.6rem] font-semibold tracking-[0.4em] uppercase text-emerald-bright font-body">
                Personal Portfolio
              </span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden mb-3">
              {NAME_LINES.map((line, lineIdx) => (
                <div key={line} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.4 + lineIdx * 0.1,
                      duration: 0.9,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="font-display font-light tracking-[0.06em] text-cream leading-[0.95]"
                    style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="origin-left h-[1px] w-40 mb-8"
              style={{
                background: 'linear-gradient(90deg, #15A870, #C9A96E, transparent)',
              }}
            />

            {/* Tagline words */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-8">
              {TAGLINE_WORDS.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.06, duration: 0.5 }}
                  className={
                    word === '·'
                      ? 'text-emerald-bright text-lg'
                      : 'font-body text-sm font-medium tracking-[0.15em] uppercase text-muted'
                  }
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Bio snippet */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
              className="text-muted/80 font-body text-[0.9rem] leading-relaxed max-w-md mb-10"
            >
              A storyteller at heart, a dreamer by nature, and an explorer by choice.
              Sharing a life that is as authentic as it is aspirational — one beautiful frame at a time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase bg-gradient-to-r from-emerald to-emerald-light text-cream rounded-sm border border-emerald-light/30 hover:shadow-[0_8px_32px_rgba(21,168,112,0.4)] transition-all duration-400"
              >
                Explore My World
                <span className="text-emerald-bright" aria-hidden>→</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-cream rounded-sm border border-cream/15 hover:border-cream/30 hover:bg-cream/5 transition-all duration-300"
              >
                Connect with Me
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="flex items-center gap-5"
            >
              <span className="text-[0.55rem] tracking-[0.3em] uppercase text-muted-dark font-body">
                Find me on
              </span>
              <div className="flex items-center gap-4">
                {[
                  { handle: '@afsana.arshad_', url: 'https://www.instagram.com/afsana.arshad_', color: 'emerald' },
                  { handle: '@afsanahheeee', url: 'https://www.instagram.com/afsanahheeee', color: 'gold' },
                ].map(profile => (
                  <motion.a
                    key={profile.handle}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-1.5 group"
                  >
                    <Instagram
                      size={13}
                      className={`${profile.color === 'gold' ? 'text-gold' : 'text-emerald-bright'} group-hover:scale-110 transition-transform`}
                    />
                    <span className="text-[0.65rem] font-body text-muted group-hover:text-cream transition-colors">
                      {profile.handle}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — portrait image */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Glow behind image */}
              <div
                className="absolute -inset-8 rounded-[40px] pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 90% at 50% 50%, rgba(12,94,66,0.3) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />

              {/* Image frame */}
              <div
                className="relative rounded-[32px] overflow-hidden border border-white/[0.07]"
                style={{ aspectRatio: '3/4' }}
              >
                <ImagePlaceholder
                  src="/images/portraits/008_DSX7PXokuOU_1.jpg"
                  alt="Afsana Arshad — portrait"
                  gradient="from-[#0A3D2B] via-[#051A14] to-[#060B17]"
                  icon="✦"
                  caption="Afsana Arshad"
                  priority
                  className="absolute inset-0 w-full h-full"
                />

                {/* Overlay gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 50%, rgba(6,11,23,0.7) 100%)',
                  }}
                />

                {/* Bottom label */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="font-display italic text-cream/70 text-sm">
                    &ldquo;A Story Written in Moments&rdquo;
                  </p>
                </div>
              </div>

              {/* Floating badge — top left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="absolute -left-4 top-16 glass rounded-xl px-4 py-3 border border-white/[0.08]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-bright animate-pulse" />
                  <span className="text-[0.6rem] tracking-widest uppercase text-cream/60 font-body">
                    Lifestyle Creator
                  </span>
                </div>
              </motion.div>

              {/* Floating badge — bottom right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="absolute -right-4 bottom-24 glass rounded-xl px-4 py-3 border border-white/[0.08]"
              >
                <div className="text-center">
                  <p className="font-display text-2xl text-gold">✦</p>
                  <p className="text-[0.55rem] tracking-[0.2em] text-cream/50 font-body uppercase">
                    Storyteller
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
          aria-label="Scroll to next section"
        >
          <span className="text-[0.55rem] tracking-[0.3em] uppercase text-muted/60 font-body group-hover:text-muted transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} className="text-emerald-bright/60 group-hover:text-emerald-bright transition-colors" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
