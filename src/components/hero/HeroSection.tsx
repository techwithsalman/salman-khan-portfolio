'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { sound } from '@/utils/audio'
import { portfolioConfig } from '@/data/portfolioConfig'
import PhysicsGlassBadge from './PhysicsGlassBadge'
import InteractivePhone from './InteractivePhone'
import HandwrittenAccents from './HandwrittenAccents'
import HeroAmbientCanvas from './HeroAmbientCanvas'
import { ArrowDown, Compass, Sparkles } from 'lucide-react'

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  const { personal, hero } = portfolioConfig

  // Parallax mouse tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleScrollToWork = () => {
    sound.playClick()
    const target = document.getElementById('showcase')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-cinematic-darkest text-slate-100 selection:bg-cyan-500 selection:text-black pt-20"
      aria-label="Hero Section"
    >
      {/* 1. CINEMATIC DARK OFFICE BACKGROUND WITH PARALLAX */}
      <div
        className="absolute inset-0 z-0 pointer-events-none scale-105 will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -10}px, 0)`,
          transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <Image
          src="/images/hero/office-bg.webp"
          alt="Cinematic Office Interior"
          fill
          priority
          className="object-cover object-center brightness-90 contrast-110"
        />
        {/* Cinematic Vignette & Ambient Radial Glow Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-darkest via-transparent to-cinematic-darkest/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.08)_0%,rgba(0,10,25,0.7)_80%)]" />
      </div>

      {/* 2. THREE.JS AMBIENT PARTICLE DUST */}
      <HeroAmbientCanvas />

      {/* 3. HANDWRITTEN ANNOTATIONS & ACCENTS */}
      <HandwrittenAccents />

      {/* 4. OVERSIZED TWO-LINE NAME TYPOGRAPHY (BEHIND PORTRAIT) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 select-none will-change-transform"
        style={{
          transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 14}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div className="text-center font-display font-black tracking-tighter uppercase leading-[0.82] text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] text-slate-200/10 dark:text-white/10 mix-blend-overlay">
          <div className="relative inline-block">
            <span>{hero.oversizedNameLine1}</span>
            <div className="absolute -top-6 right-0 text-xs font-mono font-normal tracking-widest text-cyan-400/60 uppercase">
              // TECH ARCHITECT
            </div>
          </div>
          <br />
          <div className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-slate-300/10 to-transparent">
            {hero.oversizedNameLine2}
          </div>
        </div>
      </div>

      {/* 5. CENTER TRANSPARENT PORTRAIT WITH 3D DEPTH PARALLAX */}
      <div
        className="relative z-20 mx-auto mt-auto flex flex-col items-center justify-end w-full max-w-4xl px-4 pointer-events-none"
        style={{
          transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 8}px, 0)`,
          transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div className="relative w-[340px] sm:w-[460px] md:w-[560px] lg:w-[620px] h-[480px] sm:h-[600px] md:h-[680px] lg:h-[730px]">
          <Image
            src={personal.avatar}
            alt={personal.name}
            fill
            priority
            className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,10,25,0.9)] will-change-transform"
          />

          {/* Realistic Bottom Shadow / Desk Interface Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cinematic-darkest via-cinematic-darkest/60 to-transparent" />
        </div>
      </div>

      {/* 6. HANGING GLASS DESIGNER ID CARD (FLOATING ON RIGHT) */}
      <div className="absolute right-4 sm:right-8 lg:right-16 top-16 z-30 pointer-events-auto">
        <PhysicsGlassBadge />
      </div>

      {/* 7. BOTTOM CONTROLS & INTERACTIVE ELEMENTS */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
        {/* Left: Interactive Phone Contact Pill */}
        <div className="order-2 md:order-1 self-start md:self-auto">
          <InteractivePhone />
        </div>

        {/* Center: Scroll Into The Work Button with rotating text */}
        <div className="order-1 md:order-2 flex flex-col items-center">
          <button
            type="button"
            onClick={handleScrollToWork}
            onMouseEnter={() => sound.playHover()}
            className="group relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full focus:outline-none"
            aria-label="Scroll into the work"
          >
            {/* Spinning Circular SVG Text */}
            <svg
              className="absolute inset-0 w-full h-full animate-spin-slow group-hover:animate-spin"
              viewBox="0 0 120 120"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                />
              </defs>
              <text className="text-[9.5px] font-mono tracking-[0.22em] uppercase fill-slate-400 group-hover:fill-cyan-400 transition-colors">
                <textPath href="#circlePath">
                  · SCROLL INTO THE WORK · EXPLORE CASES
                </textPath>
              </text>
            </svg>

            {/* Inner Glowing Center Circle */}
            <div className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 group-hover:border-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-300">
              <ArrowDown className="w-5 h-5 text-cyan-400 animate-bounce" />
            </div>
          </button>
        </div>

        {/* Right: Quick Telemetry Stats */}
        <div className="order-3 hidden lg:flex items-center gap-6 p-3 rounded-2xl backdrop-blur-xl bg-slate-900/50 border border-white/10 text-xs font-mono text-slate-300">
          {hero.quickStats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-cyan-400 font-bold text-sm">{stat.value}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
