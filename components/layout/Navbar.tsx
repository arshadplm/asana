'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { scrollDirection, scrollY } = useScrollDirection(5)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const isScrolled = scrollY > 60
  const isHidden = scrollDirection === 'down' && scrollY > 200 && !menuOpen

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
    const observers: IntersectionObserver[] = []

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          isScrolled
            ? 'py-3 bg-[rgba(6,11,23,0.85)] backdrop-blur-2xl border-b border-white/[0.06]'
            : 'py-5 bg-transparent'
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={() => handleNavClick('#hero')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col leading-none"
          >
            <span className="font-display text-xl font-light tracking-[0.12em] text-cream">
              AFSANA
            </span>
            <span className="font-body text-[0.55rem] tracking-[0.4em] uppercase text-emerald-bright">
              Arshad
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  'relative font-body text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300',
                  activeSection === link.href.slice(1)
                    ? 'text-cream'
                    : 'text-muted hover:text-cream'
                )}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 inset-x-0 h-px bg-emerald-bright"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://www.instagram.com/afsana.arshad_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-obsidian bg-emerald-bright rounded-sm hover:bg-emerald-glow transition-colors duration-300"
            >
              Follow
              <span aria-hidden>✦</span>
            </motion.a>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-cream"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-obsidian/95 backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-deep-navy/90 border-l border-white/5 flex flex-col pt-24 pb-10 px-8"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center gap-4 py-4 border-b border-white/5 text-left group"
                  >
                    <span className="text-emerald-bright/50 text-xs w-6 group-hover:text-emerald-bright transition-colors">
                      0{i + 1}
                    </span>
                    <span className="font-display text-2xl font-light text-cream/80 group-hover:text-cream transition-colors">
                      {link.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto"
              >
                <a
                  href="https://www.instagram.com/afsana.arshad_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 text-xs font-semibold tracking-[0.2em] uppercase text-obsidian bg-emerald-bright rounded-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Follow on Instagram
                </a>
                <p className="mt-4 text-center text-muted text-[0.6rem] tracking-widest">
                  @afsana.arshad_ · @afsanahheeee
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <ProgressBar />
    </>
  )
}

function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setProgress(scrollTop / (scrollHeight - clientHeight))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg, #0C5E42, #22C87B, #C9A96E)',
        }}
      />
    </div>
  )
}
