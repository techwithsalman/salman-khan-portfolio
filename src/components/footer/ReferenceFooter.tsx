'use client'

import React from 'react'
import { portfolioConfig } from '@/data/portfolioConfig'
import { sound } from '@/utils/audio'
import { Mail, Phone, ExternalLink, Github, Linkedin, Instagram } from 'lucide-react'

export default function ReferenceFooter() {
  const { personal } = portfolioConfig

  return (
    <footer
      id="contact"
      className="relative w-full bg-black text-white pt-24 pb-16 px-4 sm:px-8 border-t border-white/10 select-none"
      aria-label="Footer and Contact"
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-between">
        {/* Main Big Sign-off matching reference */}
        <div className="pb-16 border-b border-white/15">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                Broadcast Sign-off · Tangier, Morocco
              </div>
              <h2 className="text-4xl sm:text-7xl font-sans font-black tracking-tight text-white uppercase">
                THANKS FOR WATCHING.
              </h2>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${personal.email}`}
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg"
              >
                <Mail className="w-4 h-4" />
                <span>Get in touch</span>
              </a>

              <a
                href={`https://wa.me/${personal.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-900 border border-white/20 text-white font-sans font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* SMPTE / TV Testcard Color Bar Accent */}
          <div className="mt-12 w-full h-3 flex rounded-full overflow-hidden border border-white/10 opacity-70">
            <div className="flex-1 bg-[#c0c0c0]" />
            <div className="flex-1 bg-[#c0c000]" />
            <div className="flex-1 bg-[#00c0c0]" />
            <div className="flex-1 bg-[#00c000]" />
            <div className="flex-1 bg-[#c000c0]" />
            <div className="flex-1 bg-[#c00000]" />
            <div className="flex-1 bg-[#0000c0]" />
          </div>
        </div>

        {/* Footer Meta Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} {personal.fullName} · {personal.location}
          </div>

          <div className="flex items-center gap-6">
            <a
              href={personal.instagram ? `https://instagram.com/${personal.instagram.replace('@', '')}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={personal.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Behance
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
