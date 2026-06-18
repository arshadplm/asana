'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { QUOTES } from '@/lib/constants'

export function Quotes() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = (dir = 1) => {
    setDirection(dir)
    setActiveIndex(i => (i + dir + QUOTES.length) % QUOTES.length)
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => next(1), 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleManualNav = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setDirection(i > activeIndex ? 1 : -1)
    setActiveIndex(i)
    intervalRef.current = setInterval(() => next(1), 5000)
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  return (
    <section
      id="quotes"
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060B17 0%, #091425 50%, #060B17 100%)' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <SectionHeader
          label="Words to Live By"
          title={
            <>
              Words That
              <br />
              <em className="italic">Inspire Me</em>
            </>
          }
          className="mb-16"
          accentColor="gold"
        />

        {/* Quote carousel */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center max-w-3xl mx-auto">
                {/* Decorative quote mark */}
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="block font-display text-[120px] leading-none text-gold/10 -mb-8 select-none"
                >
                  &ldquo;
                </motion.span>

                {/* Quote text */}
                <blockquote className="font-display italic text-[clamp(1.4rem,3.5vw,2.5rem)] font-light text-cream/90 leading-[1.3] mb-8">
                  {QUOTES[activeIndex].text}
                </blockquote>

                {/* Emoji & attribution */}
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
                  <span className="text-xl">{QUOTES[activeIndex].emoji}</span>
                  {QUOTES[activeIndex].attribution && (
                    <span className="text-[0.65rem] tracking-[0.25em] uppercase text-muted font-body">
                      {QUOTES[activeIndex].attribution}
                    </span>
                  )}
                  <span className="text-xl">{QUOTES[activeIndex].emoji}</span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2.5 mt-6">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManualNav(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex
                  ? 'w-8 h-1.5 bg-gold'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>

        {/* All quotes grid — revealed below */}
        <AnimatedSection delay={0.3} className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUOTES.map((quote, i) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="relative p-6 rounded-2xl border border-white/[0.07] bg-[rgba(9,20,37,0.4)] backdrop-blur-lg hover:border-gold/20 transition-all duration-400 group"
              >
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.05) 0%, transparent 60%)' }}
                />
                <span className="block font-display text-4xl text-gold/20 leading-none mb-3">
                  &ldquo;
                </span>
                <p className="font-display italic text-cream/70 text-base leading-snug -mt-3">
                  {quote.text}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-px w-4 bg-gold/30" />
                  <span className="text-lg">{quote.emoji}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
