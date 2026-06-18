import type {
  TimelineEvent,
  Passion,
  Quote,
  Highlight,
  SocialProfile,
  FeaturedPost,
  Memory,
  NavLink,
} from '@/types'
import { IMAGE_CATALOG, buildGalleryImage } from '@/lib/images'
import type { GalleryImage } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Passions', href: '#passions' },
  { label: 'Memories', href: '#memories' },
  { label: 'Connect', href: '#contact' },
]

// Gallery images built from the full image catalog — all jpg-only files per category.
// Travel photos every 4th item are displayed as landscape; memories as square.
export const GALLERY_IMAGES: GalleryImage[] = [
  ...IMAGE_CATALOG.lifestyle.map((src, i) => buildGalleryImage(src, 'lifestyle', i)),
  ...IMAGE_CATALOG.fashion.map((src, i) => buildGalleryImage(src, 'fashion', i)),
  ...IMAGE_CATALOG.travel.map((src, i) =>
    buildGalleryImage(src, 'travel', i, { landscape: i % 4 === 3 })
  ),
  ...IMAGE_CATALOG.family.map((src, i) => buildGalleryImage(src, 'family', i)),
  ...IMAGE_CATALOG.memories.map((src, i) =>
    buildGalleryImage(src, 'memories', i, { square: true })
  ),
]

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't1',
    year: '2015',
    title: 'The First Frame',
    description:
      'Every storyteller has a beginning. Mine started with a single photo that made me realize — the world is more beautiful when you pause to look at it through your own lens.',
    gradient: 'from-emerald-deep to-midnight',
    icon: '✦',
    tags: ['Photography', 'Beginnings'],
  },
  {
    id: 't2',
    year: '2017',
    title: 'Finding My Aesthetic',
    description:
      'A year of experimenting, learning, and discovering that cool tones and deep shadows speak my creative language. I found my visual identity and never looked back.',
    gradient: 'from-navy to-obsidian',
    icon: '◈',
    tags: ['Style', 'Identity'],
  },
  {
    id: 't3',
    year: '2019',
    title: 'Building Community',
    description:
      'Sharing became connecting. What started as personal expression grew into a community of beautiful souls who saw the world the way I did. Every follower became a friend.',
    gradient: 'from-emerald-dark to-deep-navy',
    icon: '❋',
    tags: ['Community', 'Growth'],
  },
  {
    id: 't4',
    year: '2020',
    title: 'Stillness & Reflection',
    description:
      'The world paused. So did I. In the quiet, I discovered what truly matters — family, moments of warmth, and the art of finding extraordinary beauty in the ordinary.',
    gradient: 'from-[#1A0808] to-midnight',
    icon: '○',
    tags: ['Family', 'Reflection'],
  },
  {
    id: 't5',
    year: '2022',
    title: 'A Deeper Story',
    description:
      'Launched my second chapter — @afsanahheeee — a more intimate space for unfiltered moments, personal truths, and the beautiful messiness of real life.',
    gradient: 'from-gold-dark/20 to-midnight',
    icon: '⟡',
    tags: ['Authenticity', 'NewChapter'],
  },
  {
    id: 't6',
    year: '2024',
    title: 'Living Fully',
    description:
      'This chapter is dedicated to embracing every dimension of life — fashion, travel, family, creativity. No filters. Just genuine, luxurious, intentional living.',
    gradient: 'from-emerald-dark to-navy',
    icon: '✧',
    tags: ['Lifestyle', 'Authenticity'],
  },
]

export const PASSIONS: Passion[] = [
  {
    id: 'p1',
    title: 'Travel & Discovery',
    description:
      'Every new destination rewrites a piece of my story. I collect places the way others collect memories — with intention, wonder, and a hunger for the unknown.',
    icon: '✈',
    gradient: 'from-[#061425] to-[#0A2E40]',
    accentColor: '#22C87B',
    stat: '20+',
    statLabel: 'Destinations',
  },
  {
    id: 'p2',
    title: 'Fashion & Style',
    description:
      "Clothes are a language I've been speaking fluently for years. Every outfit is a mood, a statement, a small act of art I wear out into the world.",
    icon: '◈',
    gradient: 'from-[#14100A] to-[#2E2014]',
    accentColor: '#C9A96E',
    stat: '5+',
    statLabel: 'Years of Styling',
  },
  {
    id: 'p3',
    title: 'Photography',
    description:
      "I don't take photos. I steal moments from time and preserve them forever. The camera is just the medium — the emotion is always the subject.",
    icon: '⬡',
    gradient: 'from-[#0A1428] to-[#122038]',
    accentColor: '#A8BCCE',
    stat: '1K+',
    statLabel: 'Moments Captured',
  },
  {
    id: 'p4',
    title: 'Family & Love',
    description:
      'Before every aesthetic, before every curated feed — there is family. They are my foundation, my constant, the warmth that makes all the beauty possible.',
    icon: '❋',
    gradient: 'from-[#180A0A] to-[#301016]',
    accentColor: '#C4868A',
    stat: '∞',
    statLabel: 'Love Shared',
  },
  {
    id: 'p5',
    title: 'Creative Expression',
    description:
      'Whether it is styling a shot, curating a feed, or writing a caption that captures exactly the right feeling — creativity is the thread woven through everything I do.',
    icon: '✦',
    gradient: 'from-[#051F16] to-[#0C3D2A]',
    accentColor: '#15A870',
    stat: '8+',
    statLabel: 'Years Creating',
  },
  {
    id: 'p6',
    title: 'Mindful Living',
    description:
      'Luxury is not about things. It is about intention. The slow morning. The chosen company. The moment you decide to live fully in the now.',
    icon: '○',
    gradient: 'from-[#0C0A1A] to-[#1A1430]',
    accentColor: '#7A90A8',
    stat: '∞',
    statLabel: 'Moments of Peace',
  },
]

export const FEATURED_POSTS: FeaturedPost[] = [
  {
    id: 'f1',
    src: IMAGE_CATALOG.featured[0],
    gradient: 'from-[#0A3D2B] via-[#051A14] to-[#060B17]',
    caption: 'In every frame, I look for the feeling, not just the image. ✦',
    category: 'Photography',
    size: 'large',
  },
  {
    id: 'f2',
    src: IMAGE_CATALOG.featured[1],
    gradient: 'from-[#2E1A00] via-[#1A0E00] to-[#060B17]',
    caption: 'Golden hour has a way of making everything feel right.',
    category: 'Lifestyle',
    size: 'small',
  },
  {
    id: 'f3',
    src: IMAGE_CATALOG.featured[2],
    gradient: 'from-[#0F1F35] via-[#0A1428] to-[#060B17]',
    caption: 'Style is about knowing who you are and saying it without words.',
    category: 'Fashion',
    size: 'tall',
  },
  {
    id: 'f4',
    src: IMAGE_CATALOG.featured[3],
    gradient: 'from-[#1A0A0C] via-[#2E1014] to-[#100614]',
    caption: 'The people you love are the greatest places you will ever visit.',
    category: 'Family',
    size: 'medium',
  },
  {
    id: 'f5',
    src: IMAGE_CATALOG.featured[4],
    gradient: 'from-[#051A12] via-[#0A3828] to-[#060B17]',
    caption: 'Wanderlust is not a choice. It is a calling.',
    category: 'Travel',
    size: 'wide',
  },
  {
    id: 'f6',
    src: IMAGE_CATALOG.featured[5],
    gradient: 'from-[#14100A] via-[#3D2A08] to-[#0A0814]',
    caption: 'There is art in every ordinary moment, if you know where to look.',
    category: 'Lifestyle',
    size: 'small',
  },
]

export const MEMORIES: Memory[] = [
  {
    id: 'm1',
    year: '2015',
    title: 'The First Story',
    description: 'A single photograph that started everything. I remember holding the phone and thinking — this is how I want to see the world.',
    gradient: 'from-[#051A12] to-[#0A1428]',
    emoji: '📸',
    image: IMAGE_CATALOG.memories[0],
    tags: ['Beginnings', 'Photography'],
  },
  {
    id: 'm2',
    year: '2017',
    title: 'Discovering Myself',
    description: 'The year I stopped trying to look like everyone else and started creating a world that was unmistakably mine.',
    gradient: 'from-[#1A0A0C] to-[#0A1428]',
    emoji: '✨',
    image: IMAGE_CATALOG.memories[1],
    tags: ['Growth', 'Identity'],
  },
  {
    id: 'm3',
    year: '2018',
    title: 'First Adventure',
    description: 'Packed my bags, left comfort behind, and fell in love with the world beyond my doorstep. Travel rewrote me entirely.',
    gradient: 'from-[#061825] to-[#0A3040]',
    emoji: '✈️',
    image: IMAGE_CATALOG.memories[2],
    tags: ['Travel', 'Adventure'],
  },
  {
    id: 'm4',
    year: '2020',
    title: 'Choosing Stillness',
    description: 'When the world went quiet, I learned that the most beautiful story happens right at home, surrounded by the people who matter most.',
    gradient: 'from-[#18080A] to-[#0A1428]',
    emoji: '🏡',
    image: IMAGE_CATALOG.memories[3],
    tags: ['Family', 'Reflection'],
  },
  {
    id: 'm5',
    year: '2022',
    title: 'A New Chapter',
    description: 'Some stories deserve a fresh page. I opened a new chapter to share what the curated feed never could — the real, messy, beautiful truth.',
    gradient: 'from-[#14100A] to-[#0A1428]',
    emoji: '📖',
    image: IMAGE_CATALOG.memories[4],
    tags: ['Authenticity', 'NewBeginnings'],
  },
  {
    id: 'm6',
    year: '2024',
    title: 'Living the Story',
    description: 'No longer waiting for life to become worth documenting. Every single day is the story. Every moment is the chapter.',
    gradient: 'from-[#051A12] to-[#0C1428]',
    emoji: '🌿',
    image: IMAGE_CATALOG.memories[5],
    tags: ['Present', 'Intention'],
  },
]

export const QUOTES: Quote[] = [
  {
    id: 'q1',
    text: 'Life is a story worth telling beautifully. Make every chapter count.',
    emoji: '✦',
  },
  {
    id: 'q2',
    text: 'The most beautiful moments are the ones we almost didn\'t capture. Always pause. Always notice.',
    emoji: '◈',
  },
  {
    id: 'q3',
    text: 'Home is not a place. It is wherever the people I love are.',
    emoji: '❋',
  },
  {
    id: 'q4',
    text: 'There is art in the ordinary, if only you dare to pause and see it.',
    emoji: '○',
  },
  {
    id: 'q5',
    text: 'Style is the visible autobiography of the soul. Dress accordingly.',
    emoji: '◇',
  },
  {
    id: 'q6',
    text: 'Every destination I visit adds a verse to the poem of my life.',
    emoji: '✈',
  },
]

export const HIGHLIGHTS: Highlight[] = [
  {
    id: 'h1',
    title: 'Destinations Explored',
    value: '20+',
    description: 'Countries and cities that have left their mark on my story',
    icon: '✈',
    gradient: 'from-[#051A12] to-[#0A1428]',
    accentColor: '#22C87B',
  },
  {
    id: 'h2',
    title: 'Years of Storytelling',
    value: '8+',
    description: 'Crafting visual stories that connect, inspire, and endure',
    icon: '◈',
    gradient: 'from-[#14100A] to-[#0A1428]',
    accentColor: '#C9A96E',
  },
  {
    id: 'h3',
    title: 'Moments Shared',
    value: '1K+',
    description: 'Photographs, videos, and stories shared across both platforms',
    icon: '⬡',
    gradient: 'from-[#0F1F35] to-[#060B17]',
    accentColor: '#A8BCCE',
  },
  {
    id: 'h4',
    title: 'Hearts Connected',
    value: '∞',
    description: 'The relationships and connections that make every story worth telling',
    icon: '❋',
    gradient: 'from-[#1A0808] to-[#0A1428]',
    accentColor: '#C4868A',
  },
]

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    platform: 'Instagram',
    handle: '@afsana.arshad_',
    url: 'https://www.instagram.com/afsana.arshad_',
    followers: 'Personal',
    posts: 'Curated Life',
    bio: 'A curated window into my world — the travels, the style, the golden moments that deserve to be preserved.',
    category: 'Lifestyle & Fashion',
    gradient: 'from-[#0A3D2B] via-[#051A14] to-[#0A1428]',
    accentColor: '#22C87B',
  },
  {
    platform: 'Instagram',
    handle: '@afsanahheeee',
    url: 'https://www.instagram.com/afsanahheeee',
    followers: 'Personal',
    posts: 'Real Moments',
    bio: 'The unfiltered, intimate side. Where the real stories live — raw emotions, genuine laughter, and everyday magic.',
    category: 'Personal & Authentic',
    gradient: 'from-[#2E1A00] via-[#1A1008] to-[#0A1428]',
    accentColor: '#C9A96E',
  },
]
