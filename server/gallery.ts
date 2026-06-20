import fs from 'fs'
import path from 'path'

export interface GalleryImageData {
  category: string
  src: string
  filename: string
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

export function scanGalleryImages(): GalleryImageData[] {
  const root = path.join(process.cwd(), 'public', 'images')
  const images: GalleryImageData[] = []

  let entries: string[]
  try {
    entries = fs.readdirSync(root)
  } catch {
    return images
  }

  const categories = entries
    .filter(name => {
      try {
        return fs.statSync(path.join(root, name)).isDirectory()
      } catch {
        return false
      }
    })
    .sort()

  for (const category of categories) {
    const categoryDir = path.join(root, category)
    try {
      const files = fs
        .readdirSync(categoryDir)
        .filter(f => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
        .sort()
      for (const file of files) {
        images.push({
          category,
          src: `/images/${category}/${file}`,
          filename: file,
        })
      }
    } catch {
      // skip unreadable directory
    }
  }

  return images
}
