'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { sound } from '@/utils/audio'
import { portfolioConfig } from '@/data/portfolioConfig'
import { ArrowDown, RotateCw } from 'lucide-react'

export default function HeroReferenceSection() {
  const [badgeRotation, setBadgeRotation] = useState({ x: 0, y: 0, z: -1.5 })
  const [badgeOffset, setBadgeOffset] = useState({ x: 0, y: 0 })
  const [isDraggingBadge, setIsDraggingBadge] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })

  const { hero, personal } = portfolioConfig

  // Gentle idle sway animation for badge
  useEffect(() => {
    let animId: number
    let time = 0

    const loop = () => {
      if (!isDraggingBadge) {
        time += 0.02
        const swayAngle = Math.sin(time) * 2.2
        setBadgeRotation(prev => ({
          ...prev,
          z: swayAngle,
        }))
      }
      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [isDraggingBadge])

  // Badge dragging
  const handleBadgePointerDown = (e: React.PointerEvent) => {
    setIsDraggingBadge(true)
    dragStart.current = { x: e.clientX - badgeOffset.x, y: e.clientY - badgeOffset.y }
    sound.playClick()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handleBadgePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingBadge) return
    const newX = Math.max(-100, Math.min(100, e.clientX - dragStart.current.x))
    const newY = Math.max(-30, Math.min(80, e.clientY - dragStart.current.y))
    setBadgeOffset({ x: newX, y: newY })
    setBadgeRotation(prev => ({ ...prev, z: (newX / 100) * 18 }))
  }

  const handleBadgePointerUp = (e: React.PointerEvent) => {
    if (isDraggingBadge) {
      setIsDraggingBadge(false)
      sound.playWhoosh()
      try {
        ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
      } catch {}
      // Return gently
      setBadgeOffset({ x: 0, y: 0 })
    }
  }

  const handleScrollToWork = () => {
    sound.playClick()
    const target = document.getElementById('project-showcase')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[720px] max-h-[1080px] overflow-hidden select-none bg-black"
      aria-label="Hero Workspace"
    >
      {/* 1. PHOTOREALISTIC LUXURY INDUSTRIAL OFFICE BACKDROP */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/ref/office-start.webp"
          alt="Industrial Office Background"
          fill
          priority
          className="object-cover object-center brightness-95 contrast-105"
        />
        {/* Subtle atmospheric vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* 2. OVERSIZED TWO-LINE NAME TYPOGRAPHY (BEHIND CHARACTER) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center pt-8 sm:pt-14">
        <svg
          className="w-full h-auto max-h-[460px] px-2 sm:px-6 overflow-visible opacity-90"
          viewBox="0 0 1440 470"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="wm-frame-ref" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#eef0f2" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c9ced3" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <text
            x="14"
            y="200"
            textLength="1412"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#wm-frame-ref)"
            className="font-sans font-black tracking-tight"
            style={{ fontSize: '210px', textTransform: 'uppercase' }}
          >
            {hero.nameLine1}
          </text>
          <text
            x="14"
            y="430"
            textLength="1412"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#wm-frame-ref)"
            className="font-sans font-black tracking-tight"
            style={{ fontSize: '210px', textTransform: 'uppercase' }}
          >
            {hero.nameLine2}
          </text>
        </svg>
      </div>

      {/* 3. MAIN HUMAN CHARACTER WITH LEATHER JACKET & SHOULDER ROBOT */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-end justify-center">
        <div className="relative w-[850px] max-w-[95vw] h-[85vh] min-h-[580px] max-h-[920px]">
          {/* Main transparent photographic portrait */}
          <Image
            src="/images/ref/portrait-jacket-1080.webp"
            alt={personal.fullName}
            fill
            priority
            className="object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
          />

          {/* Miniature shoulder robot sitting on shoulder */}
          <div className="absolute top-[26%] left-[34%] pointer-events-auto group">
            {/* Robot body */}
            <div className="relative w-16 h-20 sm:w-20 sm:h-24">
              <Image
                src="/images/ref/robot-body-360.webp"
                alt="Shoulder Companion Robot"
                fill
                className="object-contain"
              />
              {/* Animated waving robot hand */}
              <div className="absolute top-1 -right-1 w-6 h-8 origin-bottom animate-spin-slow">
                <Image
                  src="/images/ref/robot-hand-360.webp"
                  alt="Robot Waving Hand"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Interactive speech bubble */}
            <div className="absolute -top-12 -left-6 px-3 py-1.5 rounded-xl bg-white text-black text-[11px] font-sans font-bold shadow-xl border border-black/10 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
              <span>Hi! We&apos;re here for you.</span>
              <div className="absolute bottom-[-6px] left-8 w-2 h-2 bg-white rotate-45 border-r border-b border-black/10" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. HANGING GREEN PLANT IN UPPER-LEFT FOREGROUND */}
      <div className="absolute top-0 left-0 z-30 pointer-events-none w-[200px] sm:w-[280px] md:w-[340px] aspect-square">
        <Image
          src="/images/ref/plant.webp"
          alt="Hanging Plant"
          fill
          priority
          className="object-contain object-top-left -translate-x-4 -translate-y-4"
        />
      </div>

      {/* 5. WHITE HANDWRITTEN "design & code" TYPOGRAPHY */}
      <div className="absolute top-[28%] left-[10%] sm:left-[14%] z-20 pointer-events-none">
        <span className="font-handwriting text-3xl sm:text-5xl text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] -rotate-6 block">
          {hero.scriptText}
        </span>
      </div>

      {/* 6. DESIGNER ID CARD (HANGING GLASS BADGE ON RIGHT) */}
      <div
        className="absolute right-4 sm:right-10 lg:right-24 top-0 z-30 cursor-grab active:cursor-grabbing will-change-transform"
        style={{
          transform: `translate(${badgeOffset.x}px, ${badgeOffset.y}px) rotate(${badgeRotation.z}deg)`,
          transformOrigin: '50% 0',
          transition: isDraggingBadge ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        onPointerDown={handleBadgePointerDown}
        onPointerMove={handleBadgePointerMove}
        onPointerUp={handleBadgePointerUp}
        onPointerCancel={handleBadgePointerUp}
      >
        <svg
          className="w-[200px] sm:w-[240px] lg:w-[270px] overflow-visible drop-shadow-[0_25px_40px_rgba(0,0,0,0.7)]"
          viewBox="0 0 582 1030"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ref-strap" x1="0" x2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#d5d9dc" />
            </linearGradient>
            <linearGradient id="ref-metal" x1="0" x2="1">
              <stop offset="0%" stopColor="#f4f6f8" />
              <stop offset="50%" stopColor="#9aa3ab" />
              <stop offset="100%" stopColor="#e3e7ea" />
            </linearGradient>
            <linearGradient id="ref-sleeve" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.30" />
            </linearGradient>
          </defs>

          {/* Dual white lanyard straps extending from above viewport */}
          <path d="M214 0h44l38 486h-22z" fill="url(#ref-strap)" />
          <path d="M322 0h44l-60 486h-22z" fill="url(#ref-strap)" />

          {/* Metallic Clip & Swivel Hook */}
          <rect x="268" y="470" width="46" height="40" rx="10" fill="url(#ref-metal)" />
          <circle cx="291" cy="522" r="17" fill="none" stroke="url(#ref-metal)" strokeWidth="7" />

          {/* Glass Sleeve */}
          <rect
            x="150"
            y="532"
            width="282"
            height="440"
            rx="20"
            fill="url(#ref-sleeve)"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="3"
          />
          {/* Top slot clip hole */}
          <rect x="256" y="548" width="70" height="12" rx="6" fill="rgba(0,0,0,0.5)" />

          {/* Inner Black Identity Card */}
          <rect x="172" y="566" width="238" height="382" rx="14" fill="#000000" />
        </svg>

        {/* Card Content Overlay positioned exactly over the black face */}
        <div
          className="absolute text-white font-mono pointer-events-none select-none flex flex-col justify-between"
          style={{
            top: '55%',
            left: '29.5%',
            width: '41%',
            height: '37%',
            padding: '12px 10px',
          }}
        >
          {/* Card Header */}
          <div>
            <div className="flex items-center justify-between text-[7px] text-zinc-400 font-bold tracking-widest uppercase">
              <span>{hero.designerCard.year}</span>
              <span className="text-zinc-500">ID-2026</span>
            </div>
            <h4 className="text-[11px] font-sans font-black tracking-wider text-white uppercase leading-tight mt-0.5">
              DESIGNER<br />CARD
            </h4>
            <div className="text-[6.5px] text-zinc-400 tracking-wider mt-0.5">
              {hero.designerCard.role}
            </div>
          </div>

          {/* Profile Photo Thumbnail */}
          <div className="relative w-14 h-14 mx-auto rounded-lg overflow-hidden border border-white/20 bg-zinc-900 my-1">
            <Image
              src={hero.designerCard.photo}
              alt="Designer Photo"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Information rows */}
          <div className="space-y-0.5 text-[6.5px] leading-tight">
            <div>
              <span className="text-zinc-500 uppercase tracking-wider">NAME: </span>
              <span className="font-bold text-white">{hero.designerCard.name}</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase tracking-wider">FOCUS: </span>
              <span className="font-bold text-white">{hero.designerCard.focus}</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase tracking-wider">IG: </span>
              <span className="text-zinc-300">{hero.designerCard.instagram}</span>
            </div>
            <div className="truncate">
              <span className="text-zinc-500 uppercase tracking-wider">EMAIL: </span>
              <span className="text-zinc-300">{hero.designerCard.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. BOTTOM-CENTER PILL-SHAPED "SCROLL INTO THE WORK" BUTTON */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <button
          type="button"
          onClick={handleScrollToWork}
          onMouseEnter={() => sound.playHover()}
          className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/30 hover:border-white/70 text-white text-xs font-mono font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-2xl hover:scale-105"
        >
          <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
          <span>SCROLL INTO THE WORK</span>
        </button>
      </div>
    </section>
  )
}
