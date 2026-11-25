'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { sound } from '@/utils/audio'
import { ShieldCheck, Sparkles, QrCode, Cpu, RotateCw } from 'lucide-react'
import { portfolioConfig } from '@/data/portfolioConfig'

export default function PhysicsGlassBadge() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: -2 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const cardRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0, rotZ: 0 })
  const animFrame = useRef<number | null>(null)

  const { badge, oversizedNameLine1, oversizedNameLine2 } = portfolioConfig.hero

  // Physics Spring Return Loop
  useEffect(() => {
    let currentX = offset.x
    let currentY = offset.y
    let currentRotZ = rotation.z

    const springLoop = () => {
      if (!isDragging) {
        // Spring physics parameters
        const stiffness = 0.08
        const damping = 0.85

        // Spring force towards rest position (0, 0, natural tilt -2deg)
        const forceX = -stiffness * currentX
        const forceY = -stiffness * currentY
        const forceRotZ = -stiffness * (currentRotZ - -2)

        velocity.current.x = (velocity.current.x + forceX) * damping
        velocity.current.y = (velocity.current.y + forceY) * damping
        velocity.current.rotZ = (velocity.current.rotZ + forceRotZ) * damping

        currentX += velocity.current.x
        currentY += velocity.current.y
        currentRotZ += velocity.current.rotZ

        setOffset({ x: currentX, y: currentY })
        setRotation(prev => ({ ...prev, z: currentRotZ }))
      }

      animFrame.current = requestAnimationFrame(springLoop)
    }

    animFrame.current = requestAnimationFrame(springLoop)
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current)
    }
  }, [isDragging])

  // Mouse move tilt on card hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const rotX = -(y / (rect.height / 2)) * 14
    const rotY = (x / (rect.width / 2)) * 18

    setRotation(prev => ({
      ...prev,
      x: rotX,
      y: rotY,
    }))
  }

  const handleMouseLeave = () => {
    if (!isDragging) {
      setRotation(prev => ({ ...prev, x: 0, y: 0 }))
    }
  }

  // Pointer dragging physics
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
    sound.playClick()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const newX = Math.max(-120, Math.min(120, e.clientX - dragStart.current.x))
    const newY = Math.max(-40, Math.min(140, e.clientY - dragStart.current.y))

    // Calculate rotation angle proportional to drag swing
    const dragAngle = (newX / 120) * 22
    setOffset({ x: newX, y: newY })
    setRotation(prev => ({ ...prev, z: dragAngle }))
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false)
      velocity.current = {
        x: (offset.x / 120) * 12,
        y: (offset.y / 140) * 8,
        rotZ: (rotation.z / 22) * 5,
      }
      sound.playWhoosh()
      try {
        ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
      } catch {}
    }
  }

  const handleFlipCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFlipped(prev => !prev)
    sound.playWhoosh()
  }

  return (
    <div className="relative flex flex-col items-center select-none z-30">
      {/* Hanging Black Lanyard Cord from Ceiling */}
      <div className="relative flex flex-col items-center pointer-events-none">
        {/* Anchor point at ceiling */}
        <div className="w-5 h-2 bg-gradient-to-b from-slate-700 to-slate-900 rounded-b shadow-md" />
        
        {/* Dynamic Lanyard Strap */}
        <svg
          className="w-16 overflow-visible"
          height="140"
          viewBox="0 0 64 140"
          style={{
            transform: `translate(${offset.x * 0.35}px, 0px)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {/* Dual textured nylon lanyard lines */}
          <path
            d={`M 26 0 Q ${32 + offset.x * 0.2} 70 ${30 + offset.x * 0.35} 140`}
            stroke="rgba(30, 41, 59, 0.9)"
            strokeWidth="3.5"
            fill="none"
          />
          <path
            d={`M 38 0 Q ${32 + offset.x * 0.2} 70 ${34 + offset.x * 0.35} 140`}
            stroke="rgba(15, 23, 42, 0.95)"
            strokeWidth="3.5"
            fill="none"
          />
          {/* Subtle cyan inner accent thread */}
          <path
            d={`M 32 0 Q ${32 + offset.x * 0.2} 70 ${32 + offset.x * 0.35} 140`}
            stroke="rgba(56, 189, 248, 0.5)"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Metallic Titanium Clip & Swivel Hook */}
        <div
          className="relative -mt-2 w-9 h-7 bg-gradient-to-b from-slate-400 via-slate-200 to-slate-500 rounded-t-sm rounded-b-md shadow-lg border border-slate-300 flex items-center justify-center"
          style={{
            transform: `translate(${offset.x * 0.6}px, ${offset.y * 0.2}px) rotate(${rotation.z * 0.6}deg)`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <div className="w-4 h-1.5 bg-slate-800 rounded-full" />
          <div className="absolute -bottom-1.5 w-2 h-3 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full" />
        </div>
      </div>

      {/* Glassmorphic ID Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="cursor-grab active:cursor-grabbing transform-gpu will-change-transform"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) rotateZ(${rotation.z}deg) rotateX(${rotation.x}deg) rotateY(${rotation.y + (isFlipped ? 180 : 0)}deg)`,
          transformStyle: 'preserve-3d',
          transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* Holographic Sheen Overlay */}
        <div
          className="relative w-[280px] sm:w-[310px] h-[430px] rounded-2xl p-5 backdrop-blur-xl border border-white/20 dark:border-cyan-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] dark:shadow-[0_20px_60px_rgba(56,189,248,0.12)] transition-colors duration-500 overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(56, 189, 248, 0.12) 100%)',
            boxShadow:
              'inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2), 0 25px 50px -12px rgba(0, 15, 35, 0.5)',
          }}
        >
          {/* Glass Slot Hole for clip */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-2.5 rounded-full bg-slate-900/60 border border-white/30 backdrop-blur-md shadow-inner" />

          {/* FRONT FACE */}
          <div
            className={`w-full h-full flex flex-col justify-between pt-3 transition-opacity duration-300 ${
              isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {/* Header: Title & Security Badge */}
            <div>
              <div className="flex items-center justify-between text-[10px] tracking-widest text-slate-700 dark:text-cyan-300 font-mono font-bold uppercase mb-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  {badge.clearance}
                </span>
                <span className="text-slate-500 dark:text-slate-400">{badge.idNumber}</span>
              </div>
              <h4 className="text-xs font-black tracking-wider text-slate-900 dark:text-white uppercase font-display">
                {badge.title}
              </h4>
              <p className="text-[9px] text-cyan-600 dark:text-cyan-400 font-mono">{badge.department}</p>
            </div>

            {/* Middle: Portrait & Specialty */}
            <div className="my-2 flex flex-col items-center">
              <div className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-cyan-400/40 shadow-inner bg-slate-900/40 p-1">
                <Image
                  src={badge.avatar}
                  alt="Designer Photo"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-cyan-500/90 text-[8px] font-mono text-white font-bold">
                  VERIFIED
                </div>
              </div>

              <div className="mt-2 text-center">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-wide uppercase">
                  {oversizedNameLine1} {oversizedNameLine2}
                </h3>
                <p className="text-[10px] font-mono text-cyan-600 dark:text-cyan-300 font-semibold tracking-wider">
                  {badge.role}
                </p>
                <div className="mt-1 inline-block px-2 py-0.5 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 text-[9px] text-cyan-700 dark:text-cyan-300 font-mono">
                  {badge.specialty}
                </div>
              </div>
            </div>

            {/* Bottom: Barcode & Interactive Flip Button */}
            <div className="pt-2 border-t border-slate-300/40 dark:border-white/10 flex items-end justify-between">
              <div>
                {/* Visual Barcode Pattern */}
                <div className="flex items-end gap-[2px] h-6 mb-1 opacity-80">
                  {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2].map((h, i) => (
                    <div
                      key={i}
                      className="w-[2px] bg-slate-800 dark:bg-slate-200"
                      style={{ height: `${h * 5 + 4}px` }}
                    />
                  ))}
                </div>
                <div className="text-[8px] font-mono tracking-widest text-slate-500 dark:text-slate-400">
                  {badge.barcodeText}
                </div>
              </div>

              {/* Flip Button */}
              <button
                type="button"
                onClick={handleFlipCard}
                className="group p-2 rounded-xl bg-white/40 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 hover:border-cyan-400 text-slate-700 dark:text-slate-200 transition-all shadow-sm hover:scale-105"
                title="Inspect security chip & back"
              >
                <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 text-cyan-500" />
              </button>
            </div>
          </div>

          {/* BACK FACE (Flipped) */}
          <div
            className={`absolute inset-0 p-5 flex flex-col justify-between pt-7 transition-opacity duration-300 ${
              isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold mb-2">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" /> HARDWARE TOKEN
                </span>
                <span>CHIP-v5</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-display">
                CREATIVE ACCESS TOKEN
              </h4>
            </div>

            {/* Neural Chip / QR Simulation */}
            <div className="my-auto flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-800/40 to-amber-500/20 border border-cyan-400/40 p-2 flex items-center justify-center relative shadow-inner">
                <QrCode className="w-14 h-14 text-cyan-500 dark:text-cyan-300" />
                <div className="absolute inset-0 bg-cyan-400/10 animate-pulse rounded-xl" />
              </div>

              <div className="text-center font-mono text-[9px] text-slate-600 dark:text-slate-300 space-y-1">
                <p>STATUS: ACTIVE & VERIFIED</p>
                <p>VALID THROUGH: 2026/Q4</p>
                <p className="text-cyan-600 dark:text-cyan-400 font-semibold">TANGIER / SF / GLOBAL</p>
              </div>
            </div>

            {/* Flip back button */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-300/40 dark:border-white/10">
              <span className="text-[8px] font-mono text-slate-400">DOUBLE-SIDED REFRACTIVE GLASS</span>
              <button
                type="button"
                onClick={handleFlipCard}
                className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-[10px] font-mono text-cyan-600 dark:text-cyan-300 font-bold flex items-center gap-1"
              >
                <RotateCw className="w-3 h-3" /> FLIP FRONT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
