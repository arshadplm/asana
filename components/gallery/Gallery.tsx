'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RotatingCarousel } from './RotatingCarousel'
import type { GalleryImageData } from '@/server/gallery'

export function Gallery() {
  const [images, setImages]   = useState<GalleryImageData[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    fetch('/api/images')
      .then(r => r.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setImages(data as GalleryImageData[])
        } else if (data && typeof data === 'object') {
          const legacy = data as Record<string, string[]>
          const imgs: GalleryImageData[] = []
          for (const [cat, srcs] of Object.entries(legacy)) {
            for (const src of srcs) {
              imgs.push({ category: cat, src, filename: src.split('/').pop() ?? '' })
            }
          }
          setImages(imgs)
        }
      })
      .catch(() => {})
      .finally(() => setIsReady(true))
  }, [])

  return (
    <section
      id="gallery"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050A15 0%, #060E1F 50%, #050A15 100%)' }}
    >
      {/* ── Ambient atmosphere ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 44%, rgba(10,22,60,0.7) 0%, transparent 65%)',
            'radial-gradient(ellipse 40% 28% at 22% 72%, rgba(12,94,66,0.06) 0%, transparent 55%)',
            'radial-gradient(ellipse 35% 26% at 78% 20%, rgba(120,90,18,0.05) 0%, transparent 55%)',
          ].join(', '),
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 130% 100% at 50% 50%, transparent 50%, rgba(5,10,21,0.85) 100%)',
        }}
      />

      {/* Subtle moving orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute rounded-full opacity-[0.03]"
          style={{
            width: '45%', height: '55%', background: '#15A870',
            top: '15%', right: '-5%', filter: 'blur(100px)',
            animation: 'orbDrift 28s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full opacity-[0.025]"
          style={{
            width: '38%', height: '48%', background: '#8B6914',
            bottom: '10%', left: '-8%', filter: 'blur(90px)',
            animation: 'orbDriftAlt 34s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* ── Main layout ────────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col items-center justify-center"
        style={{ minHeight: '100svh', paddingTop: '5rem', paddingBottom: '4rem' }}
      >
        {/* ── Scene wrapper — three depth layers inside here ────────────── */}
        <div
          className="relative w-full"
          style={{ height: 'clamp(500px, 75svh, 820px)' }}
        >
          {/* ── Center glow behind title ──────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(380px, 58vw, 780px)',
              height: 'clamp(180px, 32vh, 380px)',
              background: 'radial-gradient(ellipse at center, rgba(22,44,110,0.5) 0%, transparent 72%)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

          {/* ── LAYER 1: Ghost background title ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.4 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            style={{ zIndex: 2 }}
            aria-hidden="true"
          >
            <span
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(5.5rem, 16vw, 14rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.12)',
                filter: 'blur(14px)',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                letterSpacing: '-0.01em',
                display: 'block',
              }}
            >
              My Photographs
            </span>
          </motion.div>

          {/* ── LAYER 2: Perspective container + Carousel ────────────── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              perspective: '2500px',
              perspectiveOrigin: '50% 50%',
              zIndex: 3,
            }}
          >
            {isReady && <RotatingCarousel images={images} />}
          </div>

          {/* ── LAYER 3: Foreground title — always above carousel ────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3, delay: 0.25 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ zIndex: 30 }}
            aria-label="Gallery title"
          >
            <div className="text-center select-none">
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, letterSpacing: '0.46em' }}
                transition={{ duration: 2, delay: 0.55, ease: 'easeOut' }}
                className="font-body uppercase text-white/35 mb-3.5 md:mb-5"
                style={{ fontSize: 'clamp(0.55rem, 1.2vw, 0.65rem)' }}
              >
                A Selection Of
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-display italic text-white/92 leading-none tracking-tight"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(3rem, 8.5vw, 7.8rem)',
                  textShadow:
                    '0 4px 48px rgba(255,255,255,0.12), 0 0 140px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.8)',
                }}
              >
                My Photographs
              </motion.h2>
            </div>
          </motion.div>
        </div>

        {/* ── Footer hint ──────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="text-white/20 text-[0.58rem] tracking-[0.42em] uppercase font-body mt-10 select-none"
          aria-hidden="true"
        >
          Scroll to spin · Click any image to explore ✦
        </motion.p>
      </div>
    </section>
  )
}
