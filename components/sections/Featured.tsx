'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Heart, MessageCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FEATURED_POSTS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const GRID_SPANS: Record<string, string> = {
  large: 'col-span-2 row-span-2',
  tall: 'col-span-1 row-span-2',
  wide: 'col-span-2 row-span-1',
  medium: 'col-span-1 row-span-1',
  small: 'col-span-1 row-span-1',
}

const ASPECT_RATIOS: Record<string, string> = {
  large: '1/1',
  tall: '9/16',
  wide: '16/7',
  medium: '4/5',
  small: '1/1',
}

// Stable engagement numbers seeded by post id — avoids hydration mismatch from Math.random()
function engagementFromId(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  return { likes: 100 + (hash % 900), comments: 5 + (hash % 45) }
}

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

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-3 lg:gap-4">
          {FEATURED_POSTS.map((post, i) => (
            <FeaturedCard key={post.id} post={post} index={i} />
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

function FeaturedCard({ post, index }: { post: (typeof FEATURED_POSTS)[0]; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { likes, comments } = engagementFromId(post.id)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative overflow-hidden rounded-2xl group cursor-pointer border border-white/[0.06]"
      style={{ aspectRatio: ASPECT_RATIOS[post.size] }}
    >
      {/* Gradient base */}
      <div className={cn('absolute inset-0 bg-gradient-to-br', post.gradient)} />

      {/* Mesh texture — visible while no image loaded */}
      {(!imgLoaded || imgError) && (
        <>
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(240,235,227,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,227,1) 1px, transparent 1px)`,
              backgroundSize: '25px 25px',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-cream text-6xl font-display">◈</span>
          </div>
        </>
      )}

      {/* Actual image */}
      {post.src && !imgError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: imgLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={post.src}
            alt={post.caption}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        </motion.div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <Instagram size={11} className="text-emerald-bright" />
          <span className="text-[0.6rem] tracking-[0.2em] uppercase text-emerald-bright font-body">
            {post.category}
          </span>
        </div>

        {/* Caption */}
        <p className="font-display italic text-cream/90 text-sm leading-snug line-clamp-3 mb-3">
          &ldquo;{post.caption}&rdquo;
        </p>

        {/* Engagement */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[0.6rem] text-cream/40 font-body">
            <Heart size={10} className="fill-cream/40 text-cream/40" />
            {likes}
          </span>
          <span className="flex items-center gap-1.5 text-[0.6rem] text-cream/40 font-body">
            <MessageCircle size={10} />
            {comments}
          </span>
        </div>
      </div>

      {/* Top category pill (always visible) */}
      <div className="absolute top-4 left-4">
        <span className="text-[0.55rem] tracking-[0.15em] uppercase text-cream/40 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1 font-body">
          {post.category}
        </span>
      </div>
    </motion.div>
  )
}
