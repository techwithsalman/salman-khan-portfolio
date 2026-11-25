'use client'

import React, { useState } from 'react'
import { Phone, MessageCircle, Mail, Copy, Check, ExternalLink, Signal } from 'lucide-react'
import { sound } from '@/utils/audio'
import { portfolioConfig } from '@/data/portfolioConfig'

export default function InteractivePhone() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const { personal, hero } = portfolioConfig

  const handleToggle = () => {
    sound.playPhoneDial()
    setIsOpen(prev => !prev)
  }

  const handleCopyNumber = (e: React.MouseEvent) => {
    e.stopPropagation()
    sound.playClick()
    navigator.clipboard.writeText(personal.phone)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="relative inline-block z-40">
      {/* Expanded Quick Action Card */}
      {isOpen && (
        <div
          className="absolute bottom-full left-0 mb-3 w-72 p-4 rounded-2xl backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
          role="dialog"
          aria-label="Direct contact options"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-bold text-slate-800 dark:text-cyan-300">
                DIRECT SECURE LINE
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">ONLINE</span>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-300 mb-3 font-sans">
            Ready to discuss web spaces, 3D pipelines, or design systems.
          </div>

          {/* Action Links */}
          <div className="space-y-1.5 font-mono text-xs">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${personal.whatsapp}?text=Hi%20Alexander,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect!`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                WhatsApp Message
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Direct Phone Dial */}
            <a
              href={`tel:${personal.phone}`}
              onClick={() => sound.playClick()}
              className="flex items-center justify-between p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/40 text-cyan-900 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-500" />
                Direct Voice Call
              </span>
              <span className="text-[11px] font-bold">{personal.phoneFormatted}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${personal.email}?subject=Project%20Inquiry%20via%20Portfolio`}
              onClick={() => sound.playClick()}
              className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500" />
                Send Email
              </span>
              <span className="text-[10px] truncate max-w-[110px]">{personal.email}</span>
            </a>

            {/* Copy Number */}
            <button
              type="button"
              onClick={handleCopyNumber}
              className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors text-[11px]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Number copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy phone number</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Bottom-Left Floating Phone Pill */}
      <button
        type="button"
        onClick={handleToggle}
        onMouseEnter={() => sound.playHover()}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-slate-300/80 dark:border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:border-cyan-400 dark:hover:border-cyan-400 transition-all duration-300 hover:scale-105"
        aria-expanded={isOpen}
      >
        {/* Pulsing Signal Beacon Icon */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
          <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        </div>

        {/* Text Details */}
        <div className="text-left font-mono">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Signal className="w-3 h-3 text-emerald-500" />
            <span>Available</span>
          </div>
          <div className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
            {hero.contactPill.phoneNumber}
          </div>
        </div>
      </button>
    </div>
  )
}
