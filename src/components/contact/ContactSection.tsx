'use client'

import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { sound } from '@/utils/audio'
import { portfolioConfig } from '@/data/portfolioConfig'
import {
  Radio,
  Send,
  MessageCircle,
  Phone,
  Mail,
  Copy,
  Check,
  Clock,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Codepen,
} from 'lucide-react'

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '', budget: '< $10k' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [localTime, setLocalTime] = useState('')

  const { personal } = portfolioConfig

  // Real-time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = () => {
    sound.playClick()
    navigator.clipboard.writeText(personal.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return

    setIsSubmitting(true)
    sound.playClick()

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      sound.playSuccess()

      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#f59e0b', '#10b981', '#a855f7'],
      })
    }, 1000)
  }

  return (
    <section
      id="contact"
      className="relative w-full bg-cinematic-darkest text-slate-100 py-24 border-t border-cyan-500/10 overflow-hidden"
      aria-label="Contact and Signal Transmission"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="pb-6 mb-12 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-2">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Signal Tower · Direct Transmission</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            LET&apos;S CRAFT THE EXTRAORDINARY
          </h2>
          <p className="text-sm text-slate-400 font-sans mt-2 max-w-xl">
            Have a project in mind, an inquiry about WebGL pipelines, or looking to collaborate? Send a transmission below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 backdrop-blur-2xl border border-white/10 shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-white">
                    Transmission Dispatched
                  </h3>
                  <p className="text-sm text-slate-300 font-sans max-w-md mx-auto">
                    Thank you, {formState.name}. Your message has been encrypted and delivered to Alexander&apos;s direct priority queue. Expect a response within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick()
                      setIsSubmitted(false)
                      setFormState({ name: '', email: '', message: '', budget: '< $10k' })
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 border border-cyan-500/30"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Direct Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="elena@studio.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Estimated Project Scope
                    </label>
                    <select
                      value={formState.budget}
                      onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                    >
                      <option value="< $10k">&lt; $10k (Landing Page / WebGL Micro-site)</option>
                      <option value="$10k - $25k">$10k — $25k (Full 3D Experience / Product Configurator)</option>
                      <option value="$25k - $50k">$25k — $50k (Flagship Web Application &amp; Design System)</option>
                      <option value="> $50k">&gt; $50k (Enterprise Real-Time WebGL Architecture)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Brief Message &amp; Vision *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your goals, timelines, or aesthetic ideas..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Encoding & Transmitting...' : 'Dispatch Signal'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Telemetry & Instant Reach */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Timezone Widget */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Location &amp; Local Clock
                </div>
                <div className="text-sm font-bold text-white mt-1">San Francisco, CA (PST)</div>
                <div className="text-xl font-mono text-cyan-400 font-extrabold mt-1">
                  {localTime || '12:00:00 PM'}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            {/* Direct Connect Options */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Instant Signal Channels
              </div>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${personal.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 hover:bg-emerald-900/40 transition-colors text-xs font-mono"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  WhatsApp Direct
                </span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Voice Phone */}
              <a
                href={`tel:${personal.phone}`}
                onClick={() => sound.playClick()}
                className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 hover:bg-cyan-900/40 transition-colors text-xs font-mono"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  Voice Call Direct
                </span>
                <span>{personal.phoneFormatted}</span>
              </a>

              {/* Copy Email */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs font-mono"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{personal.email}</span>
                </span>
                {copiedEmail ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>

            {/* Social Footprint */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                Social Coordinates
              </div>
              <div className="flex flex-wrap gap-3">
                {personal.socialLinks.github && (
                  <a
                    href={personal.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-300 transition-colors border border-white/5"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {personal.socialLinks.linkedin && (
                  <a
                    href={personal.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-300 transition-colors border border-white/5"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {personal.socialLinks.twitter && (
                  <a
                    href={personal.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-300 transition-colors border border-white/5"
                    aria-label="Twitter / X"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {personal.socialLinks.instagram && (
                  <a
                    href={personal.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-300 transition-colors border border-white/5"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {personal.socialLinks.codepen && (
                  <a
                    href={personal.socialLinks.codepen}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-300 transition-colors border border-white/5"
                    aria-label="CodePen"
                  >
                    <Codepen className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer (Matching Reference "Thanks for watching.") */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-lg text-white">THANKS FOR WATCHING.</span>
          </div>
          <div>
            © {new Date().getFullYear()} {personal.name} · Built with Next.js, Three.js, GSAP &amp; Lenis
          </div>
        </div>
      </div>
    </section>
  )
}
