export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: 'lifestyle' | 'fashion' | 'travel' | 'family' | 'memories' | 'featured' | 'portrait'
  width: number
  height: number
  caption?: string
  gradient?: string
}

export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  image?: string
  gradient: string
  icon: string
  tags?: string[]
}

export interface Passion {
  id: string
  title: string
  description: string
  icon: string
  gradient: string
  accentColor: string
  stat?: string
  statLabel?: string
}

export interface Quote {
  id: string
  text: string
  attribution?: string
  emoji?: string
}

export interface Highlight {
  id: string
  title: string
  value: string
  description: string
  icon: string
  gradient: string
  accentColor: string
}

export interface SocialProfile {
  platform: string
  handle: string
  url: string
  followers: string
  posts: string
  bio: string
  category: string
  gradient: string
  accentColor: string
}

export interface FeaturedPost {
  id: string
  src?: string
  gradient: string
  caption: string
  category: string
  size: 'small' | 'medium' | 'large' | 'tall' | 'wide'
}

export interface Memory {
  id: string
  year: string
  title: string
  description: string
  gradient: string
  emoji: string
  image?: string
  tags?: string[]
}

export interface NavLink {
  label: string
  href: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
