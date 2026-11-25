'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { sound } from '@/utils/audio'
import { portfolioConfig } from '@/data/portfolioConfig'
import {
  Phone,
  MessageCircle,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from 'lucide-react'

export default function InteractiveSmartphone() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  const { personal } = portfolioConfig

  // Real-time clock in Asia/Karachi timezone
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const formatted = now.toLocaleTimeString('en-US', {
          timeZone: personal.timezone || 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
        setCurrentTime(formatted)
      } catch {
        setCurrentTime('13:30')
      }
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [personal.timezone])

  const handleToggle = () => {
    sound.playPhoneDial()
    setIsOpen(!isOpen)
  }

  const handleCopyNumber = (e: React.MouseEvent) => {
    e.stopPropagation()
    sound.playClick()
    navigator.clipboard.writeText(personal.phone)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed bottom-0 left-4 sm:left-6 z-40 select-none will-change-transform"
      style={{
        width: '260px',
        transform: isOpen
          ? 'translateY(-20px) rotate(0deg)'
          : 'translateY(calc(100% - 110px)) rotate(-5deg)',
        transition: 'transform 0.6s cubic-bezier(0.2, 0.85, 0.25, 1)',
      }}
    >
      {/* White Hand-drawn Arrow pointing toward the phone (visible when closed) */}
      {!isOpen && (
        <div className="absolute -top-20 right-[-30px] pointer-events-none">
          <svg
            className="w-24 h-20 overflow-visible text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            viewBox="0 0 120 92"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Curved arrow arc */}
            <path d="M112 8c-12 32-34 52-82 62" />
            {/* Arrowhead */}
            <path d="M42 60l-12 10 14 6" />
          </svg>
        </div>
      )}

      {/* Realistic iPhone Mockup Frame */}
      <div className="relative w-full aspect-[687/1420] drop-shadow-[0_26px_40px_rgba(0,0,0,0.8)]">
        {/* Frame graphic */}
        <Image
          src="/images/ref/iphone-520.webp"
          alt="Smartphone Frame"
          fill
          priority
          className="object-contain pointer-events-none"
        />

        {/* Screen Area inside bezel */}
        <div
          className="absolute inset-[4.5%] rounded-[38px] overflow-hidden bg-black text-white p-4 flex flex-col justify-between"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 20%, rgba(30, 41, 59, 0.9), rgba(0, 0, 0, 1) 85%)',
          }}
        >
          {/* Top Status Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 px-2 pt-1 border-b border-white/10 pb-2">
            <span className="font-bold tracking-tight">{currentTime || '13:30'}</span>
            <div className="w-16 h-3 bg-zinc-900 rounded-full" />
            <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">5G ●</span>
          </div>

          {/* Center Call / Contact Display */}
          <div className="my-auto text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-emerald-400 p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-800">
                <Image
                  src="/images/ref/portrait-jacket-1080.webp"
                  alt="Caller Photo"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="text-sm font-sans font-extrabold text-white">
              {personal.fullName}
            </div>
            <div className="text-[10px] font-mono text-emerald-400">
              {personal.status}
            </div>

            {/* Glowing "Let's Talk" Button */}
            {!isOpen ? (
              <button
                type="button"
                onClick={handleToggle}
                className="w-full py-2.5 px-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-pulse transition-all"
              >
                <Phone className="w-4 h-4 fill-black" />
                <span>Let&apos;s Talk</span>
              </button>
            ) : (
              <div className="space-y-1.5 pt-2 text-left font-mono text-xs">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${personal.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center justify-between p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors"
                >
                  <span className="flex items-center gap-2 text-[11px]">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    WhatsApp
                  </span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>

                {/* Direct Dial */}
                <a
                  href={`tel:${personal.phone}`}
                  onClick={() => sound.playClick()}
                  className="flex items-center justify-between p-2 rounded-xl bg-zinc-900 border border-white/20 text-white hover:bg-zinc-800 transition-colors"
                >
                  <span className="flex items-center gap-2 text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    Voice Call
                  </span>
                  <span className="text-[10px] text-zinc-400">{personal.phoneDisplay}</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${personal.email}`}
                  onClick={() => sound.playClick()}
                  className="flex items-center justify-between p-2 rounded-xl bg-zinc-900 border border-white/20 text-white hover:bg-zinc-800 transition-colors"
                >
                  <span className="flex items-center gap-2 text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    Email
                  </span>
                  <span className="text-[9px] text-zinc-400 truncate max-w-[90px]">
                    {personal.email}
                  </span>
                </a>

                {/* Copy Phone Number */}
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-[10px] text-zinc-300 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-zinc-400" />
                      <span>Copy phone number</span>
                    </>
                  )}
                </button>

                {/* Collapse button */}
                <button
                  type="button"
                  onClick={handleToggle}
                  className="w-full py-1 text-center text-[10px] text-zinc-500 hover:text-white flex items-center justify-center gap-1 mt-1"
                >
                  <ChevronDown className="w-3 h-3" />
                  <span>Minimize phone</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="w-24 h-1 bg-white/40 rounded-full mx-auto" />
        </div>
      </div>
    </div>
  )
}
