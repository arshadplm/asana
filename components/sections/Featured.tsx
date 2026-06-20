'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { IMAGE_CATALOG, CATEGORY_GRADIENTS } from '@/lib/images'
import { cn } from '@/lib/utils'

// ─── Masonry items ────────────────────────────────────────────────────────────

interface MasonryItem {
  id: string
  src: string
  category: string
  gradient: string
  aspectRatio: string
}

// Varied aspect ratios cycle — creates masonry height diversity
const ASPECTS = ['3/4', '4/5', '3/4', '1/1', '3/4', '2/3', '4/5', '3/4', '4/5', '1/1']

function makeItems(): MasonryItem[] {
  const groups: MasonryItem[][] = [
    [...IMAGE_CATALOG.featured].map((src, i) => ({
      id: `ft${i}`, src, category: 'portrait',
      gradient: CATEGORY_GRADIENTS.featured,
      aspectRatio: ASPECTS[i % ASPECTS.length],
    })),
    [...IMAGE_CATALOG.lifestyle].slice(0, 9).map((src, i) => ({
      id: `ls${i}`, src, category: 'lifestyle',
      gradient: CATEGORY_GRADIENTS.lifestyle,
      aspectRatio: ASPECTS[(i + 1) % ASPECTS.length],
    })),
    [...IMAGE_CATALOG.fashion].map((src, i) => ({
      id: `fa${i}`, src, category: 'fashion',
      gradient: CATEGORY_GRADIENTS.fashion,
      aspectRatio: ASPECTS[(i + 2) % ASPECTS.length],
    })),
    [...IMAGE_CATALOG.travel].slice(0, 8).map((src, i) => ({
      id: `tr${i}`, src, category: 'travel',
      gradient: CATEGORY_GRADIENTS.travel,
      aspectRatio: ASPECTS[(i + 3) % ASPECTS.length],
    })),
    [...IMAGE_CATALOG.family].slice(0, 7).map((src, i) => ({
      id: `fm${i}`, src, category: 'family',
      gradient: CATEGORY_GRADIENTS.family,
      aspectRatio: ASPECTS[(i + 4) % ASPECTS.length],
    })),
    [...IMAGE_CATALOG.memories].slice(0, 5).map((src, i) => ({
      id: `mm${i}`, src, category: 'memories',
      gradient: CATEGORY_GRADIENTS.memories,
      aspectRatio: ASPECTS[(i + 5) % ASPECTS.length],
    })),
  ]

  // Interleave groups round-robin so all categories are represented
  const result: MasonryItem[] = []
  for (let round = 0; ; round++) {
    let added = false
    for (const group of groups) {
      if (group[round] !== undefined) {
        result.push(group[round])
        added = true
      }
    }
    if (!added) break
  }
  return result.slice(0, 30)
}

const MASONRY_ITEMS = makeItems()

// ─── Component ───────────────────────────────────────────────────────────────

export function Featured() {
  return (
    <section
      id="featured"
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060B17 0%, #091425 60%, #060B17 100%)' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(12,94,66,0.12) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Featured Moments"
          title={
            <>
              Frames That
              <br />
              <em className="italic">Tell a Story</em>
            </>
          }
          subtitle="Selected highlights from both Instagram worlds — the curated and the candid."
          className="mb-14"
          accentColor="emerald"
        />

        {/* Premium masonry grid — CSS columns */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-x-2">
          {MASONRY_ITEMS.map((item, i) => (
            <MasonryCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="https://www.instagram.com/afsana.arshad_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-obsidian bg-emerald-bright rounded-sm hover:bg-emerald-glow transition-all duration-300 hover:shadow-[0_8px_32px_rgba(21,168,112,0.4)]"
          >
            <Instagram size={13} />
            See More on Instagram
          </a>
          <a
            href="https://www.instagram.com/afsanahheeee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-cream border border-gold/30 rounded-sm hover:border-gold/60 hover:bg-gold/10 transition-all duration-300"
          >
            <Instagram size={13} className="text-gold" />
            &amp; @afsanahheeee
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Masonry card ─────────────────────────────────────────────────────────────

function MasonryCard({ item, index }: { item: MasonryItem; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError,  setImgError]  = useState(false)

  return (
    // Plain div wrapper — owns column layout properties
    <div style={{ breakInside: 'avoid', marginBottom: '8px', display: 'block' }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{
          delay: (index % 10) * 0.04,
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          scale: 1.04,
          y: -5,
          transition: { duration: 0.38, ease: [0.34, 1.56, 0.64, 1] },
        }}
        className="group relative overflow-hidden rounded-xl cursor-pointer border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-500"
        style={{ aspectRatio: item.aspectRatio }}
      >
        {/* Gradient base */}
        <div className={cn('absolute inset-0 bg-gradient-to-br', item.gradient)} />

        {/* Shimmer placeholder while loading */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-white/[0.012] animate-pulse" />
        )}

        {/* Image */}
        {!imgError && (
          <Image
            src={item.src}
            alt={`${item.category} photograph`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover select-none pointer-events-none"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        )}

        {/* Hover dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category label — slides up on hover */}
        <div className="absolute bottom-0 inset-x-0 px-3 pb-3 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-[0.52rem] tracking-[0.14em] uppercase text-white/65 font-body capitalize">
            {item.category}
          </span>
        </div>

        {/* Inset highlight ring on hover */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-white/[0.09] transition-all duration-500" />

        {/* Subtle corner accent */}
        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-white/0 group-hover:bg-white/20 transition-all duration-300" />
      </motion.div>
    </div>
  )
}
