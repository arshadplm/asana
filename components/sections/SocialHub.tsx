'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, ExternalLink, Heart, Image as ImageIcon, Users } from 'lucide-react'
import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import { SOCIAL_PROFILES } from '@/lib/constants'
import { IMAGE_CATALOG } from '@/lib/images'
import { cn } from '@/lib/utils'

// ─── Real images per profile — curated from local catalog ────────────────────
// Portraits are confirmed present; fallback renders gracefully if any are absent.

const PROFILE_IMAGES: Record<string, readonly string[]> = {
  '@afsana.arshad_': [
    IMAGE_CATALOG.portraits[1],  // 008_1
    IMAGE_CATALOG.portraits[2],  // 008_2
    IMAGE_CATALOG.portraits[0],  // 007_6
    IMAGE_CATALOG.portraits[3],  // 008_3
    IMAGE_CATALOG.portraits[4],  // 008_4
    IMAGE_CATALOG.portraits[5],  // 008_5
  ],
  '@afsanahheeee': [
    IMAGE_CATALOG.family[0],     // 001
    IMAGE_CATALOG.family[2],     // 007_1
    IMAGE_CATALOG.memories[0],   // 003_2
    IMAGE_CATALOG.family[3],     // 007_2
    IMAGE_CATALOG.family[1],     // 005
    IMAGE_CATALOG.memories[2],   // 004
  ],
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function SocialHub() {
  return (
    <section
      id="social"
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060B17 0%, #0C1B30 50%, #060B17 100%)' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(12,94,66,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Social Hub"
          title={
            <>
              Two Worlds,
              <br />
              <em className="italic">One Story</em>
            </>
          }
          subtitle="I live across two Instagram accounts — one curated, one candid. Both are authentically me."
          className="mb-16"
          accentColor="emerald"
        />

        <StaggerContainer
          staggerDelay={0.15}
          delay={0.2}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {SOCIAL_PROFILES.map(profile => (
            <StaggerItem key={profile.handle}>
              <SocialCard profile={profile} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted text-sm font-body mb-6 max-w-lg mx-auto leading-relaxed">
            Every post is an invitation into my world. Follow both accounts for the full picture — the curated beauty and the unfiltered truth.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/afsana.arshad_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.15em] uppercase text-obsidian bg-emerald-bright rounded-sm hover:bg-emerald-glow transition-all duration-300"
            >
              <Instagram size={13} />
              Follow @afsana.arshad_
            </a>
            <a
              href="https://www.instagram.com/afsanahheeee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.15em] uppercase text-cream border border-gold/30 rounded-sm hover:border-gold hover:bg-gold/10 transition-all duration-300"
            >
              <Instagram size={13} className="text-gold" />
              Follow @afsanahheeee
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Social card ─────────────────────────────────────────────────────────────

function SocialCard({ profile }: { profile: (typeof SOCIAL_PROFILES)[0] }) {
  const profileImages = PROFILE_IMAGES[profile.handle] ?? []

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[rgba(9,20,37,0.6)] backdrop-blur-xl group"
    >
      {/* Gradient overlay */}
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-40', profile.gradient)} />

      {/* Glow */}
      <div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${profile.accentColor}20 0%, transparent 70%)` }}
      />

      {/* Header strip */}
      <div
        className="relative h-24 flex items-end pb-0"
        style={{ background: `linear-gradient(135deg, ${profile.accentColor}25 0%, transparent 60%)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(240,235,227,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,227,1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Profile section */}
      <div className="relative px-6 pb-6">
        {/* Avatar + Follow */}
        <div className="flex items-end justify-between -mt-10 mb-4">
          <div
            className="w-20 h-20 rounded-full border-4 border-obsidian flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${profile.accentColor}50, ${profile.accentColor}20)` }}
          >
            <Instagram size={28} style={{ color: profile.accentColor }} />
          </div>
          <motion.a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-5 py-2 text-[0.65rem] font-semibold tracking-[0.12em] uppercase rounded-full border transition-all duration-300"
            style={{ borderColor: `${profile.accentColor}50`, color: profile.accentColor }}
          >
            Follow
            <ExternalLink size={10} />
          </motion.a>
        </div>

        {/* Name & handle */}
        <div className="mb-4">
          <h3 className="font-display text-xl font-light text-cream mb-0.5">{profile.handle}</h3>
          <p
            className="text-[0.65rem] tracking-[0.15em] uppercase font-body"
            style={{ color: profile.accentColor }}
          >
            {profile.category}
          </p>
        </div>

        {/* Bio */}
        <p className="text-muted text-sm leading-relaxed font-body mb-5 line-clamp-3">
          {profile.bio}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-5 py-4 border-y border-white/[0.06]">
          <StatItem
            icon={<ImageIcon size={13} />}
            value={profile.posts}
            label="Content"
            color={profile.accentColor}
          />
          <StatItem
            icon={<Users size={13} />}
            value={profile.followers}
            label="Focus"
            color={profile.accentColor}
          />
          <StatItem
            icon={<Heart size={13} />}
            value="∞"
            label="Love"
            color={profile.accentColor}
          />
        </div>

        {/* ── 3×2 real-image grid — replaces colored block placeholders ── */}
        <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden">
          {profileImages.slice(0, 6).map((src, i) => (
            <PostThumbnail
              key={src}
              src={src}
              alt={`${profile.handle} post ${i + 1}`}
              accentColor={profile.accentColor}
              index={i}
            />
          ))}
        </div>

        {/* View full profile */}
        <motion.a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          className="flex items-center gap-2 mt-5 text-xs font-body font-medium"
          style={{ color: profile.accentColor }}
        >
          View full profile
          <ExternalLink size={11} />
        </motion.a>
      </div>
    </motion.div>
  )
}

// ─── Post thumbnail ───────────────────────────────────────────────────────────

function PostThumbnail({
  src,
  alt,
  accentColor,
  index,
}: {
  src: string
  alt: string
  accentColor: string
  index: number
}) {
  const [loaded, setLoaded]   = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer">
      {/* Skeleton shimmer — visible until image loads */}
      {!loaded && !errored && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: 'rgba(255,255,255,0.025)' }}
        />
      )}

      {/* Fallback — shown if image fails to load */}
      {errored && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, ${accentColor}12 0%, rgba(255,255,255,0.015) 100%)`,
          }}
        >
          <Instagram size={14} style={{ color: `${accentColor}55` }} />
        </div>
      )}

      {/* Real photo — fades in on load, scales + brightens on hover */}
      {!errored && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 30vw, 150px"
            className="object-cover select-none pointer-events-none transition-[transform,filter] duration-500 group-hover:scale-[1.09] group-hover:brightness-110"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
          />
        </motion.div>
      )}

      {/* Accent tint overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}18 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}

// ─── Stat item ────────────────────────────────────────────────────────────────

function StatItem({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode
  value: string
  label: string
  color: string
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span style={{ color }} className="opacity-70">
        {icon}
      </span>
      <span className="font-display text-lg font-light text-cream">{value}</span>
      <span className="text-[0.55rem] tracking-[0.15em] uppercase text-muted font-body">
        {label}
      </span>
    </div>
  )
}
