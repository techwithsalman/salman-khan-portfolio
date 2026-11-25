'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

export default function HandwrittenAccents() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {/* 1. Left Annotation: Design & Code */}
      <div className="absolute left-6 lg:left-16 top-1/3 max-w-[200px] hidden md:block">
        <div className="font-handwriting text-2xl lg:text-3xl text-cyan-500 dark:text-cyan-300 font-bold -rotate-6 tracking-wide drop-shadow-sm">
          Design &amp; Code in tandem ~
        </div>
        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 pl-2">
          // 60 FPS WebGL pipelines
        </p>
        {/* Curved arrow pointing toward portrait */}
        <svg
          className="w-16 h-12 ml-6 text-cyan-500/80 dark:text-cyan-400/80"
          viewBox="0 0 64 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M 10 10 Q 35 15 50 40" />
          <path d="M 42 36 L 50 40 L 52 30" />
        </svg>
      </div>

      {/* 2. Top-Right Annotation: Physics Card pointer */}
      <div className="absolute right-48 lg:right-72 top-28 hidden xl:block">
        <div className="flex items-center gap-1.5 font-handwriting text-2xl text-amber-500 dark:text-amber-300 font-bold rotate-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Interactive Physics ID ~</span>
        </div>
        <p className="text-[10px] font-mono text-slate-400 text-right pr-4">
          [ Drag, swing &amp; flip card ]
        </p>
        <svg
          className="w-20 h-10 ml-auto text-amber-500/80 dark:text-amber-400/80"
          viewBox="0 0 80 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M 10 10 Q 45 8 70 30" />
          <path d="M 60 28 L 70 30 L 68 20" />
        </svg>
      </div>

      {/* 3. Bottom-Left Annotation: Direct Reach line */}
      <div className="absolute left-8 bottom-24 hidden lg:block">
        <div className="font-handwriting text-xl text-emerald-500 dark:text-emerald-300 font-semibold -rotate-3">
          Instant Signal ↓
        </div>
      </div>
    </div>
  )
}
