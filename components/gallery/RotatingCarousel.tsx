'use client'

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import { GalleryImage } from './GalleryImage'
import { Lightbox } from './Lightbox'
import type { GalleryImageData } from '@/server/gallery'

// ─── Constants ───────────────────────────────────────────────────────────────

const GLOBAL_MAX_ITEMS = 18
const DEFAULT_SPEED   = 0.015   // deg/ms  ≈ 15 deg/s  ≈ 24s per revolution
const WHEEL_ACCEL     = 0.04    // velocity added per wheel event (capped ±0.135)
const MAX_WHEEL_VEL   = 0.135   // 9× default speed at maximum
const WHEEL_DECAY     = 0.0001  // per ms — full decay in ~1.35 s
const FORMATION_MS    = 1700

// ─── Helpers ─────────────────────────────────────────────────────────────────

function easeOutCubic(t: number): number {
  const c = Math.max(0, Math.min(1, t))
  return 1 - (1 - c) ** 3
}

function selectDisplayImages(
  images: GalleryImageData[],
  maxItems: number
): GalleryImageData[] {
  if (images.length <= maxItems) return images
  const byCategory: Record<string, GalleryImageData[]> = {}
  for (const img of images) {
    ;(byCategory[img.category] ??= []).push(img)
  }
  const cats = Object.keys(byCategory).sort()
  const result: GalleryImageData[] = []
  let round = 0
  outer: while (result.length < maxItems) {
    let added = false
    for (const cat of cats) {
      if (result.length >= maxItems) break outer
      if (byCategory[cat][round] !== undefined) {
        result.push(byCategory[cat][round])
        added = true
      }
    }
    round++
    if (!added) break
  }
  return result
}

function getInitialConfig() {
  if (typeof window === 'undefined') {
    return { maxItems: 14, itemWidth: 182, itemHeight: 242, radius: 650 }
  }
  const w = window.innerWidth
  if (w < 480)  return { maxItems: 7,  itemWidth: 115, itemHeight: 152, radius: 230 }
  if (w < 640)  return { maxItems: 9,  itemWidth: 132, itemHeight: 175, radius: 310 }
  if (w < 1024) return { maxItems: 12, itemWidth: 158, itemHeight: 210, radius: 500 }
  return               { maxItems: 16, itemWidth: 182, itemHeight: 242, radius: 650 }
}

// ─── Component ───────────────────────────────────────────────────────────────

export function RotatingCarousel({ images }: { images: GalleryImageData[] }) {
  const [config] = useState(getInitialConfig)
  const { itemWidth, itemHeight } = config

  const displayImages = useMemo(
    () => selectDisplayImages(images, config.maxItems),
    [images, config.maxItems]
  )
  const n = displayImages.length

  // ── DOM refs ────────────────────────────────────────────────────────────
  const ringRef      = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([])

  // ── Animation state refs (mutated in RAF — no re-renders) ───────────────
  const rotationRef       = useRef(0)
  const lastTsRef         = useRef<number | null>(null)
  const hoveredRef        = useRef<number | null>(null)
  const hoverProgress     = useRef<number[]>(Array.from({ length: GLOBAL_MAX_ITEMS }, () => 0))
  const formationRef      = useRef(0)
  const formationStartRef = useRef<number | null>(null)
  const enteredRef        = useRef(false)
  const radiusRef         = useRef(config.radius)
  const rafRef            = useRef<number>(0)

  // ── Wheel velocity state ────────────────────────────────────────────────
  const isOverRef        = useRef(false)
  const wheelVelocityRef = useRef(0)

  // ── Lightbox state ──────────────────────────────────────────────────────
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // ── Responsive radius ───────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      radiusRef.current =
        w < 480  ? 230 :
        w < 640  ? 310 :
        w < 1024 ? 500 : 650
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // ── Entrance trigger ────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => { enteredRef.current = true }, 450)
    return () => clearTimeout(t)
  }, [])

  // ── Wheel event (window-level, gated by isOverRef) ──────────────────────
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!isOverRef.current) return
      e.preventDefault()
      const delta = e.deltaY > 0 ? WHEEL_ACCEL : -WHEEL_ACCEL
      wheelVelocityRef.current = Math.max(
        -MAX_WHEEL_VEL,
        Math.min(MAX_WHEEL_VEL, wheelVelocityRef.current + delta)
      )
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  // ── Main RAF loop ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!n) return

    const animate = (ts: number) => {
      const delta = lastTsRef.current !== null ? ts - lastTsRef.current : 0
      lastTsRef.current = ts

      // Formation entrance
      if (enteredRef.current && formationRef.current < 1) {
        if (formationStartRef.current === null) formationStartRef.current = ts
        formationRef.current = Math.min(
          1,
          (ts - formationStartRef.current) / FORMATION_MS
        )
      }

      // Decay wheel velocity toward 0
      if (Math.abs(wheelVelocityRef.current) > 0.00005 && delta > 0) {
        const decay = WHEEL_DECAY * delta
        wheelVelocityRef.current =
          wheelVelocityRef.current > 0
            ? Math.max(0, wheelVelocityRef.current - decay)
            : Math.min(0, wheelVelocityRef.current + decay)
      }

      // Auto-rotation + wheel boost — starts after formation is 25% done
      if (enteredRef.current && formationRef.current > 0.25 && delta > 0) {
        const speed = DEFAULT_SPEED + wheelVelocityRef.current
        rotationRef.current = (rotationRef.current + delta * speed) % 360
      }

      // Apply ring rotation
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${rotationRef.current.toFixed(3)}deg)`
      }

      const radius = radiusRef.current
      const fp     = formationRef.current

      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i]
        if (!el) continue

        const angleDeg  = (360 / n) * i
        const isHovered = hoveredRef.current === i

        // Staggered entrance
        const staggerDelay = (i / n) * 0.38
        const staggerP     = Math.max(0, fp - staggerDelay)
        const staggerEased = easeOutCubic(staggerP)

        // Hover lerp
        const hpPrev   = hoverProgress.current[i] ?? 0
        const hpTarget = isHovered ? 1 : 0
        const hpNew    = hpPrev + (hpTarget - hpPrev) * Math.min(1, delta * 0.0085)
        hoverProgress.current[i] = hpNew

        // 3D position — hover pushes image forward + scales to 1.08
        const rNow  = radius * staggerEased
        const extraZ = hpNew * 100
        const scale  = 1 + hpNew * 0.08

        el.style.transform =
          `rotateY(${angleDeg}deg) translateZ(${(rNow + extraZ).toFixed(1)}px) scale(${scale.toFixed(4)})`

        // Depth: front bright, rear very faded (stronger contrast than before)
        const worldAngle = ((angleDeg + rotationRef.current) % 360 + 360) % 360
        const cosZ       = Math.cos((worldAngle * Math.PI) / 180)
        const depthT     = (cosZ + 1) / 2

        const depthOpacity = 0.12 + 0.88 * depthT
        const entryOpacity = Math.min(staggerEased * 1.1, 1)
        const baseOpacity  = Math.min(depthOpacity, entryOpacity)
        const finalOpacity = Math.min(1, baseOpacity + hpNew * 0.15)

        el.style.opacity = finalOpacity.toFixed(3)

        const shadowStr = hpNew > 0.05
          ? ` drop-shadow(0 ${(hpNew * 30).toFixed(0)}px ${(hpNew * 52).toFixed(0)}px rgba(0,0,0,0.85))`
          : ''

        el.style.filter =
          `brightness(${(0.38 + 0.62 * depthT + hpNew * 0.75).toFixed(3)})` +
          ` saturate(${(1 + hpNew * 0.18).toFixed(3)})` +
          shadowStr
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [n])

  // ── Lightbox handlers ───────────────────────────────────────────────────
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const nextImage = useCallback(() =>
    setLightboxIndex(p => p === null ? null : (p + 1) % displayImages.length),
    [displayImages.length]
  )
  const prevImage = useCallback(() =>
    setLightboxIndex(p => p === null ? null : (p - 1 + displayImages.length) % displayImages.length),
    [displayImages.length]
  )

  if (!n) return null

  return (
    <>
      {/* Container div — tracks mouse-over for wheel gating */}
      <div
        ref={containerRef}
        style={{ position: 'absolute', inset: 0 }}
        onMouseEnter={() => { isOverRef.current = true }}
        onMouseLeave={() => { isOverRef.current = false }}
      >
        {/* 3D ring — pivot at center of perspective container */}
        <div
          ref={ringRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transformStyle: 'preserve-3d',
            transform: 'rotateY(0deg)',
          }}
        >
          {displayImages.map((image, i) => (
            <GalleryImage
              key={image.src}
              ref={el => { itemRefs.current[i] = el }}
              image={image}
              width={itemWidth}
              height={itemHeight}
              priority={i < 3}
              onMouseEnter={() => { hoveredRef.current = i }}
              onMouseLeave={() => { hoveredRef.current = null }}
              onClick={() => openLightbox(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox — portalled to document.body, outside transform context */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={displayImages}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>
    </>
  )
}
