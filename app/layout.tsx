import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://afsanaarshad.com'),
  title: {
    default: 'Afsana Arshad — A Story Written in Moments',
    template: '%s | Afsana Arshad',
  },
  description:
    'Personal world of Afsana Arshad — Creative soul, lifestyle enthusiast, and storyteller. Explore her journey through fashion, travel, family, and the art of intentional living.',
  keywords: [
    'Afsana Arshad',
    'lifestyle',
    'fashion',
    'travel',
    'photography',
    'personal portfolio',
    'Instagram',
    'storyteller',
    'creative',
  ],
  authors: [{ name: 'Afsana Arshad' }],
  creator: 'Afsana Arshad',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://afsanaarshad.com',
    siteName: 'Afsana Arshad',
    title: 'Afsana Arshad — A Story Written in Moments',
    description:
      'Creative Soul · Lifestyle Enthusiast · Storyteller. Explore the world of Afsana Arshad.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Afsana Arshad — A Story Written in Moments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afsana Arshad — A Story Written in Moments',
    description: 'Creative Soul · Lifestyle Enthusiast · Storyteller',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#060B17' },
    { media: '(prefers-color-scheme: light)', color: '#060B17' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Afsana Arshad',
              url: 'https://afsanaarshad.com',
              sameAs: [
                'https://www.instagram.com/afsana.arshad_',
                'https://www.instagram.com/afsanahheeee',
              ],
              jobTitle: 'Lifestyle & Creative Content Creator',
              description:
                'Creative soul, lifestyle enthusiast, and storyteller sharing the art of intentional living through fashion, travel, and authentic moments.',
            }),
          }}
        />
      </head>
      <body className="bg-obsidian text-cream font-body antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
