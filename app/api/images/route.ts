import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const CATEGORIES = ['portraits', 'lifestyle', 'travel', 'fashion', 'family', 'memories', 'featured']

export async function GET() {
  const publicDir = path.join(process.cwd(), 'public', 'images')
  const catalog: Record<string, string[]> = {}

  for (const category of CATEGORIES) {
    const dir = path.join(publicDir, category)
    try {
      const files = fs
        .readdirSync(dir)
        .filter(f => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
        .sort()
        .map(f => `/images/${category}/${f}`)
      catalog[category] = files
    } catch {
      catalog[category] = []
    }
  }

  return NextResponse.json(catalog, {
    headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' },
  })
}
