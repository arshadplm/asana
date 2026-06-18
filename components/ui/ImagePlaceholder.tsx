'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  src?: string
  alt: string
  gradient: string
  className?: string
  aspectRatio?: string
  priority?: boolean
  width?: number
  height?: number
  caption?: string
  showIcon?: boolean
  icon?: string
}

export function ImagePlaceholder({
  src,
  alt,
  gradient,
  className,
  aspectRatio,
  priority = false,
  width = 800,
  height = 1000,
  caption,
  showIcon = true,
  icon = '◈',
}: ImagePlaceholderProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const hasRealImage = src && !imageError

  return (
    <div
      className={cn('relative overflow-hidden group', className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Gradient background (shown when no image or loading) */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br transition-opacity duration-700',
          gradient,
          hasRealImage && imageLoaded ? 'opacity-0' : 'opacity-100'
        )}
      >
        {/* Mesh pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(240,235,227,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(240,235,227,1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Icon */}
        {showIcon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-cream/15 select-none"
              style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
            >
              {icon}
            </span>
          </div>
        )}

        {/* Caption */}
        {caption && (
          <div className="absolute bottom-0 inset-x-0 p-4">
            <p className="text-cream/40 text-xs font-body text-center line-clamp-2">{caption}</p>
          </div>
        )}
      </div>

      {/* Real image if provided */}
      {hasRealImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        </motion.div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
