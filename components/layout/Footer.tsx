'use client'

import { motion } from 'framer-motion'
import { Instagram, Heart } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-obsidian border-t border-white/[0.06] overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 80% at 50% 100%, rgba(12,94,66,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl font-light text-cream tracking-[0.08em] mb-2">
                AFSANA
              </h2>
              <p className="text-[0.6rem] tracking-[0.4em] uppercase text-emerald-bright mb-6">
                Arshad
              </p>
              <p className="text-muted text-sm leading-relaxed max-w-xs">
                A storyteller living beautifully. Every moment is a chapter worth reading.
              </p>
            </motion.div>
          </div>

          {/* Navigation */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-[0.6rem] tracking-[0.3em] uppercase text-emerald-bright mb-5">
                Navigate
              </h3>
              <nav className="flex flex-col gap-3" aria-label="Footer navigation">
                {NAV_LINKS.map(link => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted hover:text-cream text-sm transition-colors duration-300 text-left w-fit"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Connect */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-[0.6rem] tracking-[0.3em] uppercase text-emerald-bright mb-5">
                Follow
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.instagram.com/afsana.arshad_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted hover:text-cream transition-colors duration-300 group"
                >
                  <Instagram
                    size={14}
                    className="text-emerald-bright group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm">@afsana.arshad_</span>
                </a>
                <a
                  href="https://www.instagram.com/afsanahheeee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted hover:text-cream transition-colors duration-300 group"
                >
                  <Instagram
                    size={14}
                    className="text-gold group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm">@afsanahheeee</span>
                </a>
              </div>

              {/* Tagline */}
              <div className="mt-8 p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                <p className="font-display italic text-cream/50 text-sm leading-relaxed">
                  &ldquo;Life is a story worth telling beautifully.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted text-xs font-body"
          >
            © {currentYear} Afsana Arshad. All rights reserved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 text-muted text-xs font-body"
          >
            Made with <Heart size={11} className="text-rose fill-rose" /> for every beautiful moment
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs text-muted hover:text-emerald-bright tracking-widest uppercase transition-colors"
              aria-label="Back to top"
            >
              ↑ Top
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
