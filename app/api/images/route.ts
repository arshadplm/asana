import { NextResponse } from 'next/server'
import { scanGalleryImages } from '@/server/gallery'

export async function GET() {
  const images = scanGalleryImages()
  return NextResponse.json(images, {
    headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' },
  })
}
