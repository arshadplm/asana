# Afsana Arshad — Personal Portfolio Website

A world-class luxury personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## ✦ Design System

**Aesthetic:** Dark luxury — deep navy, rich emerald, warm gold  
**Fonts:** Cormorant Garamond (headings) · Plus Jakarta Sans (body)  
**Palette:**
- Background: `#060B17` (Obsidian)
- Surface: `#091425` (Midnight)
- Emerald: `#0C5E42` → `#22C87B`
- Gold: `#C9A96E`
- Rose: `#C4868A`
- Text: `#F0EBE3` (Cream)

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/
│   ├── api/contact/route.ts     # Contact form API
│   ├── globals.css               # Design system & global styles
│   ├── layout.tsx                # Root layout + metadata
│   ├── page.tsx                  # Main page (all sections)
│   ├── sitemap.ts                # Auto-generated sitemap
│   └── robots.ts                 # SEO robots
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Floating glassmorphic navbar
│   │   └── Footer.tsx            # Elegant footer
│   ├── sections/
│   │   ├── Hero.tsx              # Full-screen hero
│   │   ├── About.tsx             # Biography + stats
│   │   ├── Journey.tsx           # Animated timeline
│   │   ├── Gallery.tsx           # Masonry gallery + lightbox
│   │   ├── Passions.tsx          # Passion cards
│   │   ├── Featured.tsx          # Featured Instagram moments
│   │   ├── Memories.tsx          # Memories scroll + grid
│   │   ├── Highlights.tsx        # Life highlights
│   │   ├── Quotes.tsx            # Quote carousel
│   │   ├── SocialHub.tsx         # Instagram profile cards
│   │   └── Contact.tsx           # Contact form
│   └── ui/
│       ├── AnimatedSection.tsx   # Scroll-triggered animations
│       ├── FloatingOrbs.tsx      # Ambient orb effects
│       ├── GlassCard.tsx         # Glassmorphism card
│       ├── ImagePlaceholder.tsx  # Smart image component
│       ├── LoadingScreen.tsx     # Cinematic loading intro
│       └── SectionHeader.tsx     # Reusable section headers
│
├── hooks/
│   ├── useScrollDirection.ts     # Navbar hide/show logic
│   ├── useScrollProgress.ts      # Page scroll progress
│   └── useInView.ts              # Intersection observer hook
│
├── lib/
│   ├── constants.ts              # All content data
│   └── utils.ts                  # Utility functions
│
├── public/
│   └── images/                   # Add Instagram photos here
│       ├── portraits/
│       ├── lifestyle/
│       ├── fashion/
│       ├── travel/
│       ├── family/
│       └── memories/
│
└── types/index.ts                # TypeScript interfaces
```

---

## 🖼️ Adding Real Instagram Photos

1. Download photos from Instagram manually or via a tool
2. Place them in the appropriate folder under `public/images/`
3. Name the hero portrait: `public/images/portraits/hero.jpg`
4. Name the about portrait: `public/images/portraits/about.jpg`
5. The gallery images should follow: `lifestyle/01.jpg`, `fashion/01.jpg`, etc.

The site will automatically use real photos when available, falling back to the premium gradient placeholders otherwise.

---

## 🚀 Deploying to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the GitHub repository to Vercel for automatic deployments.

**Required environment variables on Vercel:**
- `NEXT_PUBLIC_SITE_URL` — your domain
- `RESEND_API_KEY` — for contact form (or use Formspree)
- `CONTACT_EMAIL` — email to receive messages

---

## 🎨 Customizing Content

All content is in `lib/constants.ts`:
- Timeline events → `TIMELINE_EVENTS`
- Gallery images → `GALLERY_IMAGES`
- Passions → `PASSIONS`
- Quotes → `QUOTES`
- Highlights → `HIGHLIGHTS`
- Social profiles → `SOCIAL_PROFILES`
- Featured posts → `FEATURED_POSTS`
- Memories → `MEMORIES`

---

## 📊 Performance Targets

- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- Lighthouse SEO: 100
- Core Web Vitals: All green

**Optimizations included:**
- Dynamic imports (code splitting)
- Next/Image optimization
- Font optimization (next/font)
- Lazy loading
- Scroll-triggered animations
- Glassmorphism with GPU-accelerated blur

---

## Instagram Accounts

- [@afsana.arshad_](https://www.instagram.com/afsana.arshad_)
- [@afsanahheeee](https://www.instagram.com/afsanahheeee)
