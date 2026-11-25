'use client'

import React, { useState } from 'react'
import { sound } from '@/utils/audio'
import { portfolioConfig } from '@/data/portfolioConfig'
import { Menu, X, Volume2, VolumeX, Download, ExternalLink } from 'lucide-react'

export default function ReferenceNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [soundOn, setSoundOn] = useState(true)

  const { personal } = portfolioConfig

  const navItems = [
    { num: '00', label: 'Home', href: '#hero' },
    { num: '01', label: 'The Nexus', href: '#about' },
    { num: '02', label: 'Art Museum', href: '#gallery3d' },
    { num: '03', label: 'Broadcast Station', href: '#project-showcase' },
    { num: '04', label: 'Time Corridor', href: '#cv-experience' },
    { num: '05', label: 'Creative Forge', href: '#lab' },
    { num: '06', label: 'Signal Tower', href: '#contact' },
  ]

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    const next = !soundOn
    setSoundOn(next)
    sound.enabled = next
    if (next) sound.playClick()
  }

  const handleNavClick = (href: string) => {
    sound.playClick()
    setIsOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Top-Right Floating Pill Navigation Menu */}
      <div className="fixed top-6 right-6 sm:right-10 z-50 pointer-events-auto">
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl transition-all">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-full text-zinc-300 hover:text-white transition-colors"
            title={soundOn ? 'Mute sound' : 'Enable sound'}
            aria-label="Toggle sound"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>

          {/* Menu Trigger Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick()
              setIsOpen(!isOpen)
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="hidden sm:inline">MENU</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Drawer Menu Matching Reference Layout */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-14 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/15">
            <div className="flex items-center gap-3">
              <span className="font-sans font-black text-xl text-white tracking-wider uppercase">
                {personal.fullName}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                // {personal.location}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                sound.playClick()
                setIsOpen(false)
              }}
              className="p-3 rounded-full bg-zinc-900 border border-white/20 text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Numbered Navigation List Matching Reference Structure */}
          <div className="my-auto max-w-2xl py-8 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.num}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center justify-between py-2 text-2xl sm:text-4xl font-sans font-extrabold text-zinc-400 hover:text-white transition-colors"
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-sm font-mono text-zinc-500 group-hover:text-white font-bold">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="text-lg font-mono text-zinc-600 group-hover:text-white group-hover:translate-x-2 transition-all">
                  →
                </span>
              </a>
            ))}
          </div>

          {/* Footer Quick Actions */}
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-4">
              <a
                href={personal.cvUrl}
                download="Mohamed_Andaloussi_CV.pdf"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold uppercase tracking-wider"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="hover:text-white underline underline-offset-4"
              >
                {personal.email}
              </a>
            </div>

            <div className="text-zinc-500">
              © {new Date().getFullYear()} {personal.fullName}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
