'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { usePortfolio } from '@/context/PortfolioContext'
import { portfolioConfig } from '@/data/portfolioConfig'
import { sound } from '@/utils/audio'
import {
  Search,
  X,
  Layers,
  Box,
  Compass,
  Briefcase,
  FlaskConical,
  Radio,
  FileText,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'

export default function CommandSearchModal() {
  const { isSearchOpen, setIsSearchOpen, toggleTheme, theme, toggleSound, soundEnabled } = usePortfolio()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const { projects, artGallery, skills, personal } = portfolioConfig

  // Generate searchable index
  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim()
    const results: Array<{
      id: string
      type: 'Section' | 'Project' | '3D Art' | 'Skill' | 'Action'
      title: string
      subtitle: string
      action: () => void
    }> = []

    // Quick Actions
    results.push({
      id: 'action-theme',
      type: 'Action',
      title: `Toggle Theme (${theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'})`,
      subtitle: 'Change interface color scheme',
      action: () => toggleTheme(),
    })
    results.push({
      id: 'action-sound',
      type: 'Action',
      title: `Toggle Audio Effects (${soundEnabled ? 'Mute' : 'Enable'})`,
      subtitle: 'Micro-interaction sound synthesizer',
      action: () => toggleSound(),
    })
    results.push({
      id: 'action-cv',
      type: 'Action',
      title: 'Download Curriculum Vitae (PDF)',
      subtitle: 'Save official resume document',
      action: () => {
        window.open(personal.cvUrl, '_blank')
      },
    })

    // Sections
    const sectionList = [
      { id: 'hero', name: 'Hero Workspace', desc: 'Cinematic office, portrait & physics ID badge' },
      { id: 'showcase', name: 'Broadcast Station', desc: 'Horizontal project showcase' },
      { id: 'gallery3d', name: 'Art Museum', desc: 'Real-time 3D interactive sculptures' },
      { id: 'about', name: 'The Nexus', desc: 'Creative manifesto, philosophy & stats' },
      { id: 'experience', name: 'Time Corridor', desc: 'Career timeline, education & skills' },
      { id: 'lab', name: 'Creative Forge', desc: 'Interactive shaders, physics & experiments' },
      { id: 'contact', name: 'Signal Tower', desc: 'Direct message transmission & contacts' },
    ]

    sectionList.forEach((s) => {
      results.push({
        id: `sec-${s.id}`,
        type: 'Section',
        title: s.name,
        subtitle: s.desc,
        action: () => {
          document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
        },
      })
    })

    // Projects
    projects.forEach((p) => {
      results.push({
        id: `p-${p.id}`,
        type: 'Project',
        title: p.title,
        subtitle: `${p.category} · ${p.subtitle}`,
        action: () => {
          document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })
        },
      })
    })

    // 3D Art Pieces
    artGallery.forEach((a) => {
      results.push({
        id: `a-${a.id}`,
        type: '3D Art',
        title: a.title,
        subtitle: `${a.medium} (${a.geometryType})`,
        action: () => {
          document.getElementById('gallery3d')?.scrollIntoView({ behavior: 'smooth' })
        },
      })
    })

    if (!q) return results.slice(0, 8)

    return results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q)
    )
  }, [query, theme, soundEnabled, toggleTheme, toggleSound, personal.cvUrl, projects, artGallery])

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      sound.playHover()
      setSelectedIndex((prev) => (prev + 1) % searchResults.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      sound.playHover()
      setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (searchResults[selectedIndex]) {
        sound.playClick()
        searchResults[selectedIndex].action()
        setIsSearchOpen(false)
      }
    }
  }

  if (!isSearchOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-cyan-500/30 text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-6 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, project, skill, or jump to section..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1 scrollbar-none">
          {searchResults.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-slate-500">
              No matching records found for &quot;{query}&quot;
            </div>
          ) : (
            searchResults.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sound.playClick()
                  item.action()
                  setIsSearchOpen(false)
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                  selectedIndex === idx
                    ? 'bg-cyan-500/10 border border-cyan-500/40 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono font-bold uppercase text-cyan-400">
                    {item.type}
                  </span>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold">{item.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.subtitle}</div>
                  </div>
                </div>

                <ArrowRight
                  className={`w-4 h-4 transition-transform ${
                    selectedIndex === idx ? 'text-cyan-400 translate-x-1' : 'opacity-0'
                  }`}
                />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-950/60 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-cyan-400">Alexander Vance Portfolio v1.0</span>
        </div>
      </div>
    </div>
  )
}
