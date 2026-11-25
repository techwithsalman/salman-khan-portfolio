'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { sound } from '@/utils/audio'
import { portfolioConfig } from '@/data/portfolioConfig'
import { ArrowLeft, ArrowRight, ExternalLink, Lock } from 'lucide-react'

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
    }, 220)
  }

  const handlePrevCase = () => {
    if (isTransitioning) return
    sound.playClick()
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
      setIsTransitioning(false)
    }, 220)
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
          className="object-cover object-center brightness-75 contrast-125"
        />
        {/* Dark cinematic radial vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* 2. WHITE PROJECT INFORMATION PLAQUE ON THE UPPER-RIGHT SIDE */}
      <div className="absolute top-8 sm:top-12 right-6 sm:right-16 z-30 pointer-events-auto">
        <a
          href={currentCase.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-md bg-white hover:bg-zinc-100 text-black font-sans font-bold text-sm tracking-tight shadow-[0_8px_20px_rgba(0,0,0,0.6)] transform hover:-translate-y-0.5 hover:rotate-1 transition-all"
        >
          <span>{currentCase.badgeText || currentCase.title}</span>
          <ExternalLink className="w-4 h-4 text-zinc-700" />
        </a>
      </div>

      {/* 3. CENTER: LARGE METALLIC LAPTOP MOCKUP (~70% VIEWPORT WIDTH) */}
      <div className="relative z-10 my-auto w-full flex items-center justify-center px-4 sm:px-12 pointer-events-none">
        <div
          className="relative w-[92%] sm:w-[80%] lg:w-[70%] max-w-[1080px] flex flex-col items-center will-change-transform pointer-events-auto"
          style={{
            transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
            opacity: isTransitioning ? 0.75 : 1,
            transition: 'transform 0.22s ease-out, opacity 0.22s ease-out',
          }}
        >
          {/* LAPTOP LID / SCREEN */}
          <div className="relative w-full aspect-[16/10] bg-zinc-950 rounded-t-2xl sm:rounded-t-3xl border-[6px] sm:border-[10px] md:border-[12px] border-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
            {/* Top Webcam Notch / Camera Dot */}
            <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-800 border border-zinc-700 z-30 flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-cyan-400/80" />
            </div>

            {/* Realistic Browser Address Bar */}
            <div className="relative z-20 w-full h-8 sm:h-9 bg-zinc-900/95 border-b border-white/10 px-4 flex items-center justify-between text-xs font-mono text-zinc-400">
              {/* Traffic Light Window Dots */}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>

              {/* URL Domain Pill */}
              <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] sm:text-xs text-zinc-300">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>{currentCase.domain}</span>
              </div>

              {/* Empty spacer for alignment */}
              <div className="w-8" />
            </div>

            {/* Screen Content: Actual Project Website Screenshot */}
            <div className="relative flex-1 w-full bg-black overflow-hidden">
              <Image
                src={currentCase.screenshot}
                alt={currentCase.title}
                fill
                priority
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />

              {/* Glossy display light reflection streak */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />
            </div>
          </div>

          {/* LAPTOP DECK / BASE (METALLIC BASE, KEYBOARD CHASSIS, TRACKPAD) */}
          <div className="relative w-[106%] h-6 sm:h-8 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 rounded-b-xl sm:rounded-b-2xl border-t border-zinc-600 shadow-[0_15px_30px_rgba(0,0,0,0.85)] flex items-start justify-center">
            {/* Center thumb notch */}
            <div className="w-24 sm:w-32 h-2 sm:h-2.5 bg-zinc-900 rounded-b-md shadow-inner" />
          </div>
        </div>
      </div>

      {/* 4. LEFT SIDE: PROJECT NAME, INDEX, DESCRIPTION & "OPEN THE CASE" */}
      <div className="absolute left-6 sm:left-14 top-1/2 -translate-y-1/2 z-20 max-w-[280px] sm:max-w-[340px] text-white pointer-events-auto">
        <div className="space-y-3">
          {/* Project index */}
          <div className="text-xs sm:text-sm font-mono font-bold tracking-widest text-zinc-400 uppercase">
            {currentCase.number}
          </div>

          {/* Project Title */}
          <h2 className="text-2xl sm:text-4xl font-sans font-black tracking-tight text-white uppercase leading-none drop-shadow-md">
            {currentCase.title}
          </h2>

          {/* Category */}
          <p className="text-xs sm:text-sm font-mono text-zinc-300 font-semibold">
            {currentCase.category}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            {currentCase.description}
          </p>

          {/* Open the case link */}
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
      </div>

      {/* 5. NAVIGATION CONTROLS */}
      {/* Bottom-Left: Previous Case Button */}
      <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-14 z-20 pointer-events-auto">
        <button
          type="button"
          onClick={handlePrevCase}
          className="group flex items-center gap-3 text-white text-xs sm:text-sm font-mono uppercase tracking-wider focus:outline-none"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/40 group-hover:border-white group-hover:scale-110 group-hover:bg-white/10 flex items-center justify-center transition-all duration-300 shadow-lg">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="font-bold">previous case</span>
        </button>
      </div>

      {/* Bottom-Right: Next Case Button */}
      <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-14 z-20 pointer-events-auto">
        <button
          type="button"
          onClick={handleNextCase}
          className="group flex items-center gap-3 text-white text-xs sm:text-sm font-mono uppercase tracking-wider focus:outline-none"
        >
          <span className="font-bold">next case</span>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/40 group-hover:border-white group-hover:scale-110 group-hover:bg-white/10 flex items-center justify-center transition-all duration-300 shadow-lg">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </button>
      </div>
    </section>
  )
}
