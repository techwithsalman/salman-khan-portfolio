'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sound } from '@/utils/audio'
import { portfolioConfig } from '@/data/portfolioConfig'
import { ProjectItem } from '@/types/portfolio'
import ProjectModal from './ProjectModal'
import {
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  List as ListIcon,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [viewMode, setViewMode] = useState<'gallery' | 'list'>('gallery')
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)

  const { projects } = portfolioConfig

  // Categories list
  const categories = ['All', '3D WebGL', 'Creative Dev', 'Full-Stack', 'Design System']

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(p => p.category === selectedCategory)

  // GSAP Horizontal Scroll Setup
  useEffect(() => {
    if (viewMode !== 'gallery') return

    const track = horizontalTrackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    // Disable horizontal pin on mobile screens for natural touch swipe
    const isMobile = window.innerWidth < 1024
    if (isMobile) return

    const totalWidth = track.scrollWidth - window.innerWidth + 120

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth * 1.2}`,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [viewMode, filteredProjects.length])

  const handleSkipCases = () => {
    sound.playClick()
    const target = document.getElementById('gallery3d')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollTrack = (direction: 'left' | 'right') => {
    sound.playClick()
    if (horizontalTrackRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      horizontalTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative w-full bg-cinematic-darkest text-slate-100 overflow-hidden py-24 border-t border-cyan-500/10"
      aria-label="Selected Projects Showcase"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-2">
              <Layers className="w-4 h-4" />
              <span>Broadcast Station · Case Archive</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
              ENGINEERED REALITIES
            </h2>
            <p className="text-sm text-slate-400 font-sans mt-2 max-w-xl">
              Production web applications, bespoke GLSL shaders, and performance-tuned interactive spaces.
            </p>
          </div>

          {/* View Toggles & Skip Cases Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSkipCases}
              onMouseEnter={() => sound.playHover()}
              className="px-4 py-2 rounded-full border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              Skip the cases ↓
            </button>

            {/* Gallery vs List Toggle */}
            <div className="flex items-center p-1 rounded-full bg-slate-900 border border-white/10">
              <button
                type="button"
                onClick={() => {
                  sound.playClick()
                  setViewMode('gallery')
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                  viewMode === 'gallery'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Gallery</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick()
                  setViewMode('list')
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                  viewMode === 'list'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ListIcon className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                sound.playClick()
                setSelectedCategory(cat)
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW MODE 1: HORIZONTAL GALLERY CARDS */}
      {viewMode === 'gallery' ? (
        <div ref={pinContainerRef} className="relative w-full overflow-hidden">
          {/* Navigation arrow buttons for mobile / desktop click */}
          <div className="flex lg:hidden justify-end px-4 mb-4 gap-2">
            <button
              type="button"
              onClick={() => scrollTrack('left')}
              className="p-2 rounded-full bg-slate-900 border border-white/10 text-slate-300"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack('right')}
              className="p-2 rounded-full bg-slate-900 border border-white/10 text-slate-300"
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal Track */}
          <div
            ref={horizontalTrackRef}
            className="flex gap-8 px-4 sm:px-12 overflow-x-auto lg:overflow-visible pb-10 scrollbar-none items-stretch"
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => {
                  sound.playClick()
                  setActiveProject(project)
                }}
                onMouseEnter={() => sound.playHover()}
                className="group relative flex-shrink-0 w-[320px] sm:w-[420px] lg:w-[480px] rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)] cursor-pointer"
              >
                <div>
                  {/* Top Header Card */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                    <span className="text-cyan-400 font-bold">CASE #{project.featuredNumber}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] uppercase font-bold">
                      {project.category}
                    </span>
                  </div>

                  {/* Artwork Image */}
                  <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/10 mb-6 bg-slate-950">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {project.badgeText && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1 shadow-lg">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{project.badgeText}</span>
                      </div>
                    )}
                  </div>

                  {/* Project Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-1 line-clamp-2">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tech Pills & Launch Button */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: STRUCTURED INDEX LIST */
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="divide-y divide-white/10 border-y border-white/10">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  sound.playClick()
                  setActiveProject(project)
                }}
                onMouseEnter={() => sound.playHover()}
                className="group py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] px-4 rounded-xl transition-colors"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-cyan-500 font-bold">
                    #{project.featuredNumber}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{project.subtitle}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-slate-300">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{project.year}</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Case</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Case Study Deep-Dive Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
