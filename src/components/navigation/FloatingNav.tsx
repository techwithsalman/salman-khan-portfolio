'use client'

import React, { useState, useEffect } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { portfolioConfig } from '@/data/portfolioConfig'
import { sound } from '@/utils/audio'
import {
  Search,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Menu,
  X,
  FileDown,
  Sparkles,
} from 'lucide-react'

export default function FloatingNav() {
  const { theme, toggleTheme, soundEnabled, toggleSound, setIsSearchOpen } = usePortfolio()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { personal } = portfolioConfig

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Work', href: '#showcase' },
    { label: '3D Art', href: '#gallery3d' },
    { label: 'Nexus', href: '#about' },
    { label: 'Timeline', href: '#experience' },
    { label: 'Lab', href: '#lab' },
    { label: 'Signal', href: '#contact' },
  ]

  const handleNavClick = (href: string) => {
    sound.playClick()
    setMobileMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-40 px-4 sm:px-8 flex justify-center transition-all duration-300 pointer-events-none`}
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 px-5 py-2.5 rounded-full backdrop-blur-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-slate-950/80 dark:bg-slate-950/80 border border-slate-700/60 dark:border-cyan-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)]'
              : 'bg-slate-900/40 dark:bg-slate-900/40 border border-white/10'
          }`}
          aria-label="Main Floating Menu"
        >
          {/* Brand Logo / Initials */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#hero')
            }}
            className="flex items-center gap-2 text-sm font-display font-black tracking-wider text-white hover:text-cyan-400 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-amber-400 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center text-[11px] font-mono font-bold text-white">
                AV
              </div>
            </div>
            <span className="hidden md:inline font-mono text-xs uppercase tracking-widest text-slate-300">
              {personal.firstName}
            </span>
          </a>

          {/* Center Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                onMouseEnter={() => sound.playHover()}
                className="text-xs font-mono font-medium text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => {
                sound.playClick()
                setIsSearchOpen(true)
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-300 hover:text-white transition-colors text-xs font-mono"
              title="Search and Jump (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline text-[10px] text-slate-400">⌘K</span>
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-slate-300" />
              )}
            </button>

            {/* CV Direct Download Pill */}
            <a
              href={personal.cvUrl}
              download="Alexander_Vance_Resume.pdf"
              onClick={() => sound.playClick()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold transition-all shadow-md"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => {
                sound.playClick()
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              className="lg:hidden p-2 rounded-full bg-slate-800 border border-white/10 text-slate-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-6 animate-in fade-in duration-200 lg:hidden">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <span className="font-display font-black text-xl text-white">
              {personal.name}
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-slate-800 text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 my-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className="block text-2xl font-display font-extrabold text-white hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <a
              href={personal.cvUrl}
              download
              className="px-4 py-2 rounded-full bg-cyan-500 text-black font-bold"
            >
              Download CV
            </a>
            <span>v1.0 · 2026</span>
          </div>
        </div>
      )}
    </>
  )
}
