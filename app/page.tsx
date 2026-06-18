import dynamic from 'next/dynamic'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'

// Dynamically import heavy sections for code splitting
const About = dynamic(() =>
  import('@/components/sections/About').then(m => ({ default: m.About }))
)
const Journey = dynamic(() =>
  import('@/components/sections/Journey').then(m => ({ default: m.Journey }))
)
const Gallery = dynamic(() =>
  import('@/components/sections/Gallery').then(m => ({ default: m.Gallery }))
)
const Passions = dynamic(() =>
  import('@/components/sections/Passions').then(m => ({ default: m.Passions }))
)
const Featured = dynamic(() =>
  import('@/components/sections/Featured').then(m => ({ default: m.Featured }))
)
const Memories = dynamic(() =>
  import('@/components/sections/Memories').then(m => ({ default: m.Memories }))
)
const Highlights = dynamic(() =>
  import('@/components/sections/Highlights').then(m => ({ default: m.Highlights }))
)
const Quotes = dynamic(() =>
  import('@/components/sections/Quotes').then(m => ({ default: m.Quotes }))
)
const SocialHub = dynamic(() =>
  import('@/components/sections/SocialHub').then(m => ({ default: m.SocialHub }))
)
const Contact = dynamic(() =>
  import('@/components/sections/Contact').then(m => ({ default: m.Contact }))
)

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Journey />
        <Gallery />
        <Passions />
        <Featured />
        <Memories />
        <Highlights />
        <Quotes />
        <SocialHub />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
