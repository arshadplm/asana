import type { GalleryImage } from '@/types'

export const CATEGORY_GRADIENTS: Record<string, string> = {
  lifestyle: 'from-[#051C14] via-[#0A3A2A] to-[#060B17]',
  fashion: 'from-[#14100A] via-[#2E2412] to-[#100C1A]',
  travel: 'from-[#060E1A] via-[#0C2038] to-[#060B17]',
  family: 'from-[#180A0A] via-[#301010] to-[#0A0614]',
  memories: 'from-[#10080A] via-[#281418] to-[#0A060C]',
  featured: 'from-[#0A3D2B] via-[#051A14] to-[#060B17]',
  portrait: 'from-[#0A3D2B] via-[#051A14] to-[#060B17]',
}

const CATEGORY_CAPTIONS: Record<string, string[]> = {
  lifestyle: [
    'Finding beauty in every ordinary morning',
    'Golden hour never gets old',
    'Peace found in the smallest things',
    'Living slowly, loving deeply',
    'The quiet moments are the loudest memories',
    'Every day is a story worth telling',
    'Simplicity is the ultimate sophistication',
    'Life is better when you slow down',
    'In the in-between, there is beauty',
    'Gratitude changes everything',
    'Choosing presence over perfection',
    'Small rituals, big meaning',
  ],
  fashion: [
    'Style is the poetry of the soul',
    'Dressed for the story I am telling',
    'Every outfit tells a story',
    'Elegance is a language without words',
    'Wear your heart on your sleeve',
    'Fashion is what you buy. Style is what you have.',
    'Clothes are a form of self-expression',
  ],
  travel: [
    'Every destination writes a new chapter',
    'The world is full of beautiful stories',
    'Not all who wander are lost',
    'Wanderlust is not a choice. It is a calling.',
    'Adventure is the best teacher',
    'Collecting places, not things',
    'The road is always worth taking',
    'New places, new stories',
    'Leave footprints everywhere',
  ],
  family: [
    'The heart of every story',
    'With the ones who make life worth living',
    'Home is where the love is',
    'Family — the best adventure',
    'Love, laughter, and everything in between',
    'The greatest gift is time together',
    'These are the moments I treasure',
    'Together is the only place I want to be',
  ],
  memories: [
    'Moments I never want to forget',
    'A chapter worth remembering',
    'Keeping these close to my heart',
    'The beauty of looking back',
    'Time captured in light',
    'Every memory is a treasure',
  ],
  featured: [
    'In every frame, I look for the feeling',
    'Golden hour has a way of making everything right',
    'Style is about knowing who you are',
    'The people you love are the greatest places',
    'Wanderlust is not a choice',
    'There is art in every ordinary moment',
  ],
}

export const IMAGE_CATALOG = {
  // Indices 0–10 kept stable — SocialHub references portraits[0..5] by position.
  portraits: [
    '/images/portraits/007_DUkrn6hEmIw_6.jpg',   // 0
    '/images/portraits/008_DSX7PXokuOU_1.jpg',    // 1
    '/images/portraits/008_DSX7PXokuOU_2.jpg',    // 2
    '/images/portraits/008_DSX7PXokuOU_3.jpg',    // 3
    '/images/portraits/008_DSX7PXokuOU_4.jpg',    // 4
    '/images/portraits/008_DSX7PXokuOU_5.jpg',    // 5
    '/images/portraits/008_DSX7PXokuOU_6.jpg',
    '/images/portraits/008_DSX7PXokuOU_7.jpg',
    '/images/portraits/008_DSX7PXokuOU_8.jpg',
    '/images/portraits/008_DSX7PXokuOU_9.jpg',
    '/images/portraits/008_DSX7PXokuOU_10.jpg',
    '/images/portraits/007_DUkrn6hEmIw_1.jpg',
    '/images/portraits/007_DUkrn6hEmIw_2.jpg',
  ],
  lifestyle: [
    '/images/lifestyle/003_DWyfQzEGiri_1.jpg',
    '/images/lifestyle/004_DWOySAMGmGM_2.jpg',
    '/images/lifestyle/004_DWOySAMGmGM_3.jpg',
    '/images/lifestyle/004_DWOySAMGmGM_4.jpg',
    '/images/lifestyle/017_C9ngK4pNqrE_1.jpg',
    '/images/lifestyle/017_C9ngK4pNqrE_2.jpg',
    '/images/lifestyle/018_C9UioE-tWDW_1.jpg',
  ],
  travel: [
    '/images/travel/005_DVeMYj5kiMn_1.jpg',
    '/images/travel/005_DVeMYj5kiMn_3.jpg',
    '/images/travel/005_DVeMYj5kiMn_7.jpg',
    '/images/travel/009_DSESf0VkjDv_1.jpg',
    '/images/travel/009_DSESf0VkjDv_2.jpg',
    '/images/travel/009_DSESf0VkjDv_3.jpg',
    '/images/travel/009_DSESf0VkjDv_5.jpg',
    '/images/travel/010_DRj4cgFEuMz_1.jpg',
    '/images/travel/010_DRj4cgFEuMz_2.jpg',
    '/images/travel/010_DRj4cgFEuMz_6.jpg',
  ],
  // fashion/ directory removed — images moved to portraits/
  fashion: [
    '/images/portraits/002_DXis8giGu_e_1.jpg',
    '/images/portraits/002_DXis8giGu_e_2.jpg',
    '/images/portraits/002_DXis8giGu_e_3.jpg',
    '/images/portraits/002_DXis8giGu_e_4.jpg',
    '/images/portraits/002_DXis8giGu_e_5.jpg',
    '/images/portraits/002_DXis8giGu_e_6.jpg',
  ],
  family: [
    '/images/family/001_DENBIV3v_uP_2.jpg',
    '/images/family/005_DCMtBP_yJst.jpg',
    '/images/family/007_DBThuuOyqPB_1.jpg',
    '/images/family/007_DBThuuOyqPB_2.jpg',
    '/images/family/007_DBThuuOyqPB_3.jpg',
    '/images/family/009_DBAy-qkSCAN_11.jpg',
    '/images/family/009_DBAy-qkSCAN_4.jpg',
    '/images/family/009_DBAy-qkSCAN_6.jpg',
    '/images/family/009_DBAy-qkSCAN_7.jpg',
    '/images/family/010_DARx9HPTgbA_1.jpg',
    '/images/family/010_DARx9HPTgbA_2.jpg',
    '/images/family/010_DARx9HPTgbA_5.jpg',
    '/images/family/011_DAKrixmyfRH_5.jpg',
    '/images/family/012_DAJGypAyyJ8.jpg',
    '/images/family/013_C_THqVNNdnN_3.jpg',
    '/images/family/021_C72Kw_rNfPv.jpg',
    '/images/family/022_C7v9adPNRfb.jpg',
    '/images/family/023_C7uHETPtz1u.jpg',
  ],
  memories: [
    '/images/memories/003_DWyfQzEGiri_2.jpg',
    '/images/memories/003_DWyfQzEGiri_3.jpg',
    '/images/memories/004_DWOySAMGmGM_1.jpg',
    '/images/memories/005_DVeMYj5kiMn_9.jpg',
    '/images/memories/006_DUyKq8qkofM_1.jpg',
    '/images/memories/006_DUyKq8qkofM_2.jpg',
    '/images/memories/006_DUyKq8qkofM_4.jpg',
    '/images/memories/006_DUyKq8qkofM_5.jpg',
    '/images/memories/007_DUkrn6hEmIw_3.jpg',
    '/images/memories/007_DUkrn6hEmIw_5.jpg',
    '/images/memories/011_DRhIRgAEkR9_2.jpg',
    '/images/memories/011_DRhIRgAEkR9_3.jpg',
    '/images/memories/011_DRhIRgAEkR9_4.jpg',
    '/images/memories/011_DRhIRgAEkR9_5.jpg',
  ],
  // featured/ directory removed — images moved to portraits/
  featured: [
    '/images/portraits/006_DUyKq8qkofM_3.jpg',
    '/images/portraits/006_DUyKq8qkofM_6.jpg',
    '/images/portraits/006_DUyKq8qkofM_7.jpg',
    '/images/portraits/006_DUyKq8qkofM_8.jpg',
    '/images/portraits/006_DUyKq8qkofM_9.jpg',
    '/images/portraits/007_DUkrn6hEmIw_1.jpg',
    '/images/portraits/007_DUkrn6hEmIw_2.jpg',
    '/images/portraits/007_DUkrn6hEmIw_6.jpg',
  ],
} as const

export type ImageCategoryKey = keyof typeof IMAGE_CATALOG

export function getImages(category: ImageCategoryKey): readonly string[] {
  return IMAGE_CATALOG[category]
}

export function getImage(category: ImageCategoryKey, index = 0): string {
  const images = IMAGE_CATALOG[category] as readonly string[]
  return images[index % images.length]
}

export function buildGalleryImage(
  src: string,
  category: GalleryImage['category'],
  index: number,
  options?: { landscape?: boolean; square?: boolean }
): GalleryImage {
  const captions = CATEGORY_CAPTIONS[category] ?? []
  return {
    id: `${category}-${index}`,
    src,
    alt: `${category} moment`,
    category,
    width: options?.landscape ? 1067 : options?.square ? 800 : 800,
    height: options?.landscape ? 800 : options?.square ? 800 : 1000,
    gradient: CATEGORY_GRADIENTS[category] ?? 'from-[#0A1428] to-[#060B17]',
    caption: captions[index % captions.length],
  }
}

export function buildGalleryFromCatalog(
  catalog: Record<string, string[]>
): GalleryImage[] {
  const GALLERY_CATS = ['lifestyle', 'fashion', 'travel', 'family', 'memories'] as const
  return GALLERY_CATS.flatMap(key => {
    const images = (catalog[key] ?? []).filter(src =>
      /\.(jpg|jpeg|png|webp|avif)$/i.test(src)
    )
    return images.map((src, i) =>
      buildGalleryImage(src, key as GalleryImage['category'], i, {
        landscape: key === 'travel' && i % 4 === 3,
        square: key === 'memories',
      })
    )
  })
}
