'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { sound } from '@/utils/audio'
import { portfolioConfig } from '@/data/portfolioConfig'
import { ArrowLeft, ArrowRight, ExternalLink, Lock } from 'lucide-react'
import InteractiveSmartphone from '@/components/phone/InteractiveSmartphone'

export default function CinematicProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const { projects } = portfolioConfig
  const currentCase = projects[activeIndex]

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextCase()
      } else if (e.key === 'ArrowLeft') {
        handlePrevCase()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  const handleNextCase = () => {
    if (isTransitioning) return
    sound.playClick()
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length)
      setIsTransitioning(false)
    }, 200)
  }

  const handlePrevCase = () => {
    if (isTransitioning) return
    sound.playClick()
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <section
      id="project-showcase"
      className="relative w-full h-screen min-h-[720px] max-h-[1080px] overflow-hidden select-none bg-black flex flex-col justify-between"
      aria-label="Project Showcase"
    >
      {/* 1. DARKER INDUSTRIAL OFFICE ROOM ENVIRONMENT */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/ref/room-1920.webp"
          alt="Darker Office Ambient Room"
          fill
          priority
          className="object-cover object-center brightness-70 contrast-125"
        />
        {/* Dark cinematic radial vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
      </div>

      {/* 2. WHITE PROJECT INFORMATION PLAQUE (Positioned safely on upper-right, avoiding fixed menu pill) */}
      <div className="absolute top-6 right-36 sm:right-40 z-30 pointer-events-auto">
        <a
          href={currentCase.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-md bg-white hover:bg-zinc-100 text-black font-sans font-bold text-xs tracking-tight shadow-[0_8px_20px_rgba(0,0,0,0.7)] transform hover:-translate-y-0.5 transition-all"
        >
          <span>{currentCase.badgeText || currentCase.title}</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-700" />
        </a>
      </div>

      {/* 3. MAIN COMPOSITION: LEFT INFO COLUMN + LARGE CENTER/RIGHT LAPTOP MOCKUP */}
      <div className="relative z-10 my-auto w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 pointer-events-none">
        {/* Left Side: Project details without overlapping */}
        <div className="w-full lg:w-[320px] flex-shrink-0 text-white pointer-events-auto space-y-3 pt-6 lg:pt-0">
          <div className="text-xs sm:text-sm font-mono font-bold tracking-widest text-zinc-400 uppercase">
            {currentCase.number}
          </div>

          <h2 className="text-2xl sm:text-4xl font-sans font-black tracking-tight text-white uppercase leading-none drop-shadow-md">
            {currentCase.title}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-zinc-300 font-semibold">
            {currentCase.category}
          </p>

          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed line-clamp-4">
            {currentCase.description}
          </p>

          <div className="pt-2">
            <a
              href={currentCase.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-bold text-white underline underline-offset-4 hover:text-cyan-400 transition-colors"
            >
              <span>Open the case</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right / Center: Realistic Laptop Mockup (~70% of available viewport) */}
        <div className="flex-1 w-full max-w-[880px] flex items-center justify-center pointer-events-auto">
          <div
            className="relative w-full flex flex-col items-center will-change-transform"
            style={{
              transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
              opacity: isTransitioning ? 0.75 : 1,
              transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
            }}
          >
            {/* Screen Lid with Realistic Metallic Bezel */}
            <div className="relative w-full aspect-[16/10] bg-zinc-950 rounded-t-xl sm:rounded-t-2xl border-[6px] sm:border-[10px] md:border-[12px] border-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
              {/* Webcam Dot */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-800 border border-zinc-700 z-30 flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-cyan-400/80" />
              </div>

              {/* Browser Address Bar */}
              <div className="relative z-20 w-full h-7 sm:h-8 bg-zinc-900/95 border-b border-white/10 px-3 flex items-center justify-between text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] text-zinc-300">
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  <span>{currentCase.domain}</span>
                </div>

                <div className="w-6" />
              </div>

              {/* Screen Content: Website Screenshot */}
              <div className="relative flex-1 w-full bg-black overflow-hidden">
                <Image
                  src={currentCase.screenshot}
                  alt={currentCase.title}
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />
              </div>
            </div>

            {/* Laptop Deck / Keyboard Base */}
            <div className="relative w-[106%] h-5 sm:h-7 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 rounded-b-xl border-t border-zinc-600 shadow-[0_15px_30px_rgba(0,0,0,0.85)] flex items-start justify-center">
              <div className="w-20 sm:w-28 h-1.5 sm:h-2 bg-zinc-900 rounded-b-md shadow-inner" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. NAVIGATION CONTROLS */}
      {/* Bottom-Left: Previous Case Button */}
      <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-14 z-20 pointer-events-auto">
        <button
          type="button"
          onClick={handlePrevCase}
          className="group flex items-center gap-3 text-white text-xs sm:text-sm font-mono uppercase tracking-wider focus:outline-none"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/40 group-hover:border-white group-hover:scale-110 group-hover:bg-white/10 flex items-center justify-center transition-all duration-300 shadow-lg">
            <ArrowLeft className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">previous case</span>
        </button>
      </div>

      {/* Bottom-Right: Next Case Button */}
      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-14 z-20 pointer-events-auto">
        <button
          type="button"
          onClick={handleNextCase}
          className="group flex items-center gap-3 text-white text-xs sm:text-sm font-mono uppercase tracking-wider focus:outline-none"
        >
          <span className="font-bold">next case</span>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/40 group-hover:border-white group-hover:scale-110 group-hover:bg-white/10 flex items-center justify-center transition-all duration-300 shadow-lg">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>

      {/* 5. INTERACTIVE SMARTPHONE (Positioned in bottom-left inside showcase) */}
      <InteractiveSmartphone />
    </section>
  )
}
