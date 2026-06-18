'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Instagram, Send, CheckCircle, Mail, MessageSquare } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { ContactFormData } from '@/types'
import { cn } from '@/lib/utils'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true)
    // Simulate submission (connect to your preferred service: Formspree, Resend, etc.)
    await new Promise(res => setTimeout(res, 1500))
    console.log('Form data:', data)
    setLoading(false)
    setSubmitted(true)
    reset()
  }

  return (
    <section
      id="contact"
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060B17 0%, #091425 50%, #060B17 100%)' }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(12,94,66,0.15) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Get in Touch"
          title={
            <>
              Let&rsquo;s Write
              <br />
              <em className="italic">a Story Together</em>
            </>
          }
          subtitle="Whether you want to collaborate, connect, or simply say hello — I'd love to hear from you."
          className="mb-16"
          accentColor="emerald"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — form */}
          <AnimatedSection direction="left">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 rounded-2xl border border-emerald-bright/20 bg-[rgba(12,94,66,0.08)]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                  >
                    <CheckCircle size={48} className="text-emerald-bright mb-5" />
                  </motion.div>
                  <h3 className="font-display text-3xl font-light text-cream mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-muted text-sm font-body leading-relaxed mb-6 max-w-xs">
                    Thank you for reaching out. I&rsquo;ll be back with you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs tracking-[0.2em] uppercase text-emerald-bright font-body hover:text-cream transition-colors"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      label="Your Name"
                      error={errors.name?.message}
                    >
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        placeholder="Afsana Arshad"
                        className={cn(fieldClass, errors.name && errorFieldClass)}
                      />
                    </FormField>

                    <FormField label="Email Address" error={errors.email?.message}>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                        })}
                        type="email"
                        placeholder="hello@example.com"
                        className={cn(fieldClass, errors.email && errorFieldClass)}
                      />
                    </FormField>
                  </div>

                  <FormField label="Subject" error={errors.subject?.message}>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      type="text"
                      placeholder="Collaboration, Hello, or anything..."
                      className={cn(fieldClass, errors.subject && errorFieldClass)}
                    />
                  </FormField>

                  <FormField label="Your Message" error={errors.message?.message}>
                    <textarea
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message too short' },
                      })}
                      rows={5}
                      placeholder="Share your thoughts, ideas, or a simple hello..."
                      className={cn(fieldClass, 'resize-none', errors.message && errorFieldClass)}
                    />
                  </FormField>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 py-4 text-[0.75rem] font-semibold tracking-[0.18em] uppercase text-obsidian bg-emerald-bright rounded-sm hover:bg-emerald-glow disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_8px_32px_rgba(21,168,112,0.4)]"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </AnimatedSection>

          {/* Right — info */}
          <AnimatedSection direction="right" delay={0.2} className="space-y-8">
            {/* Big tagline */}
            <div>
              <p className="font-display italic text-3xl font-light text-cream/80 leading-snug mb-4">
                &ldquo;Every great conversation starts with a simple hello.&rdquo;
              </p>
              <p className="text-muted text-sm font-body leading-relaxed">
                I believe in genuine connections. Whether it&rsquo;s a collaboration opportunity, a creative project, or just a warm message — I love hearing from people who share a passion for beautiful storytelling.
              </p>
            </div>

            {/* Contact options */}
            <div className="space-y-4">
              <h4 className="text-[0.6rem] tracking-[0.3em] uppercase text-emerald-bright font-body">
                Other Ways to Connect
              </h4>

              {[
                {
                  icon: <Instagram size={18} />,
                  label: 'Instagram (Curated)',
                  value: '@afsana.arshad_',
                  href: 'https://www.instagram.com/afsana.arshad_',
                  color: '#22C87B',
                },
                {
                  icon: <Instagram size={18} />,
                  label: 'Instagram (Personal)',
                  value: '@afsanahheeee',
                  href: 'https://www.instagram.com/afsanahheeee',
                  color: '#C9A96E',
                },
                {
                  icon: <Mail size={18} />,
                  label: 'Email',
                  value: 'hello@afsanaarshad.com',
                  href: 'mailto:hello@afsanaarshad.com',
                  color: '#A8BCCE',
                },
                {
                  icon: <MessageSquare size={18} />,
                  label: 'DM me directly',
                  value: 'Instagram DM preferred',
                  href: 'https://www.instagram.com/afsana.arshad_',
                  color: '#C4868A',
                },
              ].map(item => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300 group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted font-body mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-cream/80 font-body group-hover:text-cream transition-colors">
                      {item.value}
                    </p>
                  </div>
                  <span className="ml-auto text-muted/40 group-hover:text-cream/40 transition-colors text-xs">
                    →
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Response time */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-bright/10 bg-emerald-bright/5">
              <div className="w-2 h-2 rounded-full bg-emerald-bright animate-pulse flex-shrink-0" />
              <p className="text-xs text-muted font-body">
                Typically responds within{' '}
                <span className="text-cream/80">24–48 hours</span>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

const fieldClass =
  'w-full bg-[rgba(9,20,37,0.5)] border border-white/[0.1] rounded-lg px-4 py-3.5 text-sm font-body text-cream placeholder:text-muted/40 focus:outline-none focus:border-emerald-bright/50 focus:bg-[rgba(9,20,37,0.7)] transition-all duration-300'

const errorFieldClass = 'border-rose/50 focus:border-rose/70'

function FormField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-muted font-body mb-2">
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-[0.65rem] text-rose font-body"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
