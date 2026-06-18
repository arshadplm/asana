'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { MEMORIES } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Memories() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="memories"
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060B17 0%, #091425 50%, #060B17 100%)' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(196,134,138,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Memories"
            title={
              <>
                Chapters I
                <br />
                <em className="italic">Never Want to Forget</em>
              </>
            }
            subtitle="The moments that defined me. The memories that shaped my story."
            className="mb-16"
            accentColor="rose"
          />
        </div>

        {/* Horizontal scroll timeline */}
        <div
          ref={scrollRef}
          className="overflow-x-auto no-scrollbar px-6 pb-8"
        >
          <div className="flex gap-5 w-max mx-auto px-6">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-[calc(50%+40px)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            {MEMORIES.map((memory, i) => (
              <MemoryCard key={memory.id} memory={memory} index={i} />
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="max-w-7xl mx-auto px-6 mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-white/10" />
          <p className="text-[0.6rem] tracking-[0.3em] uppercase text-muted/40 font-body">
            Scroll to explore
          </p>
          <div className="h-px w-8 bg-white/10" />
        </div>
      </div>

      {/* Grid view — below scroll on mobile */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MEMORIES.map((memory, i) => (
              <MemoryGridCard key={`grid-${memory.id}`} memory={memory} index={i} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function MemoryCard({ memory, index }: { memory: (typeof MEMORIES)[0]; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative w-64 flex-shrink-0"
    >
      {/* Polaroid style card */}
      <div
        className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[rgba(9,20,37,0.7)] backdrop-blur-xl"
        style={{
          boxShadow: '0 20px 60px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Image area */}
        <div
          className={cn('relative bg-gradient-to-br', memory.gradient)}
          style={{ aspectRatio: '1' }}
        >
          {/* Gradient fallback texture */}
          {(!imgLoaded || imgError) && (
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(240,235,227,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,227,1) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
          )}

          {/* Real photo */}
          {memory.image && !imgError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: imgLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={memory.image}
                alt={memory.title}
                fill
                sizes="256px"
                className="object-cover"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            </motion.div>
          )}

          {/* Gradient overlay on image */}
          {imgLoaded && !imgError && (
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent" />
          )}

          {/* Emoji badge */}
          <div className="absolute bottom-2 right-3 text-2xl drop-shadow-lg">{memory.emoji}</div>
        </div>

        {/* Polaroid content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display text-sm text-cream/50">{memory.year}</span>
            {memory.tags && (
              <span className="text-[0.55rem] tracking-[0.1em] text-emerald-bright font-body uppercase">
                #{memory.tags[0]}
              </span>
            )}
          </div>
          <h3 className="font-display text-base text-cream font-light leading-snug">
            {memory.title}
          </h3>
        </div>
      </div>

      {/* Timeline dot */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <div className="w-3 h-3 rounded-full border-2 border-emerald-bright/40 bg-obsidian" />
        <div className="w-px h-4 bg-emerald-bright/20" />
      </div>
    </motion.div>
  )
}

function MemoryGridCard({ memory, index }: { memory: (typeof MEMORIES)[0]; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="relative group rounded-2xl overflow-hidden border border-white/[0.08] bg-[rgba(9,20,37,0.5)] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-500"
    >
      {/* Photo header */}
      {memory.image && !imgError && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image
            src={memory.image}
            alt={memory.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              'object-cover transition-all duration-700 group-hover:scale-105',
              imgLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
          {/* Bottom fade into card body */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(9,20,37,0.9)]" />

          {/* Fallback gradient while loading */}
          {!imgLoaded && (
            <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50', memory.gradient)} />
          )}
        </div>
      )}

      {/* Background gradient (always present; hidden behind image when loaded) */}
      {(!memory.image || imgError) && (
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50', memory.gradient)} />
      )}

      <div className="relative p-6">
        {/* Emoji */}
        <div className="text-4xl mb-4">{memory.emoji}</div>

        {/* Year & tags */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-3xl font-light text-cream/30">{memory.year}</span>
          {memory.tags && (
            <div className="flex flex-wrap gap-1">
              {memory.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[0.55rem] tracking-[0.1em] text-cream/30 bg-white/5 rounded-full px-2 py-0.5 font-body"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-light text-cream mb-3 leading-snug">
          {memory.title}
        </h3>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed font-body line-clamp-3">
          {memory.description}
        </p>

        {/* Bottom line */}
        <motion.div
          className="mt-5 h-px bg-gradient-to-r from-rose/40 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  )
}
