'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryImageData } from '@/server/gallery'

interface LightboxProps {
  images: GalleryImageData[]
  index: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function Lightbox({ images, index, onClose, onNext, onPrev }: LightboxProps) {
  const image = images[index]
  const touchStartXRef = useRef(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onNext()
      else if (e.key === 'ArrowLeft') onPrev()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose, onNext, onPrev])

  // Touch swipe navigation
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartXRef.current
      if (Math.abs(dx) > 48) {
        if (dx > 0) onPrev()
        else onNext()
      }
    }
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [onNext, onPrev])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-[500] flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/96 backdrop-blur-2xl" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
        aria-label="Close lightbox"
      >
        <X size={17} className="text-white/80" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-white/30 text-[0.58rem] tracking-[0.38em] uppercase font-body select-none">
        {index + 1} of {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        className="absolute left-3 md:left-8 z-20 w-12 h-12 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/18 transition-colors duration-200"
        aria-label="Previous image"
      >
        <ChevronLeft size={22} className="text-white/70" />
      </button>

      {/* Image with cross-fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={image.src}
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={e => e.stopPropagation()}
          className="relative z-10"
          style={{
            width: 'min(88vw, 520px)',
            maxHeight: '84vh',
            aspectRatio: '3 / 4',
          }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_40px_120px_rgba(0,0,0,0.85)]">
            <Image
              src={image.src}
              alt={`${image.category} photograph`}
              fill
              sizes="(max-width: 768px) 88vw, 520px"
              className="object-cover"
              priority
            />
            {/* Caption bar */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-5 pt-10 pb-5">
              <span className="text-[0.58rem] tracking-[0.38em] uppercase text-white/45 font-body capitalize">
                {image.category}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        className="absolute right-3 md:right-8 z-20 w-12 h-12 rounded-full bg-white/8 border border-white/10 flex items-center justify-center hover:bg-white/18 transition-colors duration-200"
        aria-label="Next image"
      >
        <ChevronRight size={22} className="text-white/70" />
      </button>
    </motion.div>,
    document.body
  )
}
