'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GALLERY_IMAGES } from '@/lib/constants'
import { buildGalleryFromCatalog } from '@/lib/images'
import type { GalleryImage } from '@/types'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'fashion', label: 'Fashion' },
  { key: 'travel', label: 'Travel' },
  { key: 'family', label: 'Family' },
  { key: 'memories', label: 'Memories' },
] as const

type Category = (typeof CATEGORIES)[number]['key']

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(GALLERY_IMAGES)

  // Dynamic discovery: merge any newly added images from the API
  useEffect(() => {
    fetch('/api/images')
      .then(r => r.json())
      .then((catalog: Record<string, string[]>) => {
        const discovered = buildGalleryFromCatalog(catalog)
        setGalleryImages(prev => {
          const knownSrcs = new Set(prev.map(img => img.src))
          const additions = discovered.filter(img => !knownSrcs.has(img.src))
          return additions.length > 0 ? [...prev, ...additions] : prev
        })
      })
      .catch(() => {})
  }, [])

  const filtered =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === activeCategory)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filtered.length)
  }, [lightboxIndex, filtered.length])

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
  }, [lightboxIndex, filtered.length])

  return (
    <section
      id="gallery"
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060B17 0%, #091425 60%, #060B17 100%)' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(12,94,66,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Gallery"
          title={
            <>
              Moments
              <br />
              <em className="italic">Worth Keeping</em>
            </>
          }
          subtitle="A curated collection of life's most beautiful frames — each image a sentence in the story."
          className="mb-14"
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat.key}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                'px-5 py-2 rounded-full text-xs font-body font-semibold tracking-[0.12em] uppercase transition-all duration-300',
                activeCategory === cat.key
                  ? 'bg-emerald-bright text-obsidian'
                  : 'text-muted border border-white/[0.08] hover:text-cream hover:border-white/20 bg-transparent'
              )}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3"
          >
            {filtered.map((image, i) => (
              <GalleryItem key={image.id} image={image} index={i} onOpen={() => openLightbox(i)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load more hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted/50 text-[0.65rem] tracking-[0.3em] uppercase font-body mt-12"
        >
          Follow on Instagram for more ✦
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            image={filtered[lightboxIndex]}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
            current={lightboxIndex + 1}
            total={filtered.length}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryItem({
  image,
  index,
  onOpen,
}: {
  image: GalleryImage
  index: number
  onOpen: () => void
}) {
  const isPortrait = image.height > image.width
  const isWide = image.width > image.height * 1.3
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: (index % 6) * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="break-inside-avoid mb-3"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.35 }}
        onClick={onOpen}
        className="relative overflow-hidden rounded-xl group cursor-pointer"
        style={{
          aspectRatio: isPortrait ? '4/5' : isWide ? '16/9' : '1',
        }}
      >
        {/* Gradient background (fallback / loading state) */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br transition-opacity duration-700',
            image.gradient ?? 'from-[#0A1428] to-[#060B17]',
            imgLoaded && !imgError ? 'opacity-0' : 'opacity-100'
          )}
        />

        {/* Mesh overlay — only when no image */}
        {(!imgLoaded || imgError) && (
          <>
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `linear-gradient(rgba(240,235,227,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,227,1) 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="text-cream text-4xl select-none">◈</span>
            </div>
          </>
        )}

        {/* Actual image */}
        {!imgError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: imgLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          </motion.div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Hover content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {image.caption && (
            <p className="font-display italic text-cream/90 text-sm leading-snug mb-2 line-clamp-2">
              &ldquo;{image.caption}&rdquo;
            </p>
          )}
          <span className="text-[0.6rem] tracking-[0.2em] uppercase text-emerald-bright font-body capitalize">
            {image.category}
          </span>
        </div>

        {/* Zoom icon */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
          <ZoomIn size={14} className="text-cream" />
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-[0.55rem] tracking-[0.2em] uppercase text-cream/70 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 font-body capitalize">
            {image.category}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Lightbox({
  image,
  onClose,
  onNext,
  onPrev,
  current,
  total,
}: {
  image: GalleryImage
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  current: number
  total: number
}) {
  const [imgLoaded, setImgLoaded] = useState(false)

  // Reset loading state when image changes
  useEffect(() => {
    setImgLoaded(false)
  }, [image.id])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 backdrop-blur-2xl"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        aria-label="Close"
      >
        <X size={18} className="text-cream" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.3em] text-cream/40 font-body">
        {current} / {total}
      </div>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        aria-label="Previous"
      >
        <ChevronLeft size={20} className="text-cream" />
      </button>

      {/* Image */}
      <motion.div
        key={image.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
        className="relative mx-4 md:mx-16 rounded-2xl overflow-hidden border border-white/[0.08]"
        style={{ width: 'min(100%, 520px)', maxHeight: '82vh', aspectRatio: '3/4' }}
      >
        {/* Gradient fallback */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br transition-opacity duration-500',
            image.gradient ?? 'from-[#0A1428] to-[#060B17]',
            imgLoaded ? 'opacity-0' : 'opacity-100'
          )}
        />

        {/* Actual image */}
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 90vw, 520px"
          className={cn(
            'object-cover transition-opacity duration-500',
            imgLoaded ? 'opacity-100' : 'opacity-0'
          )}
          priority
          onLoad={() => setImgLoaded(true)}
        />

        {/* Caption overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-midnight/80 via-transparent to-transparent">
          {image.caption && (
            <p className="font-display italic text-cream/80 text-base mb-2">
              &ldquo;{image.caption}&rdquo;
            </p>
          )}
          <span className="text-[0.65rem] tracking-[0.2em] uppercase text-emerald-bright font-body capitalize">
            {image.category}
          </span>
        </div>
      </motion.div>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        aria-label="Next"
      >
        <ChevronRight size={20} className="text-cream" />
      </button>

      {/* Caption */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-muted/50 text-xs font-body">{image.alt}</p>
      </div>
    </motion.div>
  )
}
