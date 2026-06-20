'use client'

import { forwardRef } from 'react'
import Image from 'next/image'
import type { GalleryImageData } from '@/server/gallery'

interface GalleryImageProps {
  image: GalleryImageData
  width: number
  height: number
  priority?: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

export const GalleryImage = forwardRef<HTMLDivElement, GalleryImageProps>(
  function GalleryImage(
    { image, width, height, priority = false, onMouseEnter, onMouseLeave, onClick },
    ref
  ) {
    return (
      // Outer div — 3D-positioned by RotatingCarousel's RAF loop.
      // Initial opacity 0; RAF controls transform / opacity / filter each frame.
      <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={{
          position: 'absolute',
          width,
          height,
          left: '50%',
          top: '50%',
          marginLeft: -width / 2,
          marginTop: -height / 2,
          cursor: 'pointer',
          willChange: 'transform, opacity, filter',
          opacity: 0,
        }}
        aria-label={`${image.category} photograph — click to enlarge`}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      >
        {/* Inner container — clips image to rounded rect; overflow here, not on 3D element */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '13px',
            overflow: 'hidden',
            boxShadow: '0 18px 54px rgba(0,0,0,0.75), 0 3px 10px rgba(0,0,0,0.45)',
          }}
        >
          <Image
            src={image.src}
            alt={`${image.category} photograph`}
            fill
            sizes="(max-width: 640px) 115px, (max-width: 1024px) 145px, 165px"
            className="object-cover select-none pointer-events-none"
            draggable={false}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            style={{ objectPosition: 'center center' }}
          />
        </div>
      </div>
    )
  }
)
