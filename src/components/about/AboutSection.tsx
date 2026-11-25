'use client'

import React from 'react'
import Image from 'next/image'
import { portfolioConfig } from '@/data/portfolioConfig'
import { sound } from '@/utils/audio'
import { Compass, Download, CheckCircle2, Terminal, Sparkles, MapPin, Globe } from 'lucide-react'

export default function AboutSection() {
  const { personal, hero } = portfolioConfig

  return (
    <section
      id="about"
      className="relative w-full bg-cinematic-darkest text-slate-100 py-24 border-t border-cyan-500/10 overflow-hidden"
      aria-label="About the Artist and Developer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="pb-6 mb-12 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-2">
            <Compass className="w-4 h-4" />
            <span>The Nexus · Philosophy &amp; Identity</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
            THE ARCHITECTURE OF IMMERSION
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Badge Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md h-[460px] rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-900/60 p-4 shadow-[0_20px_50px_rgba(0,10,25,0.7)] group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950">
                <Image
                  src={personal.avatar}
                  alt={personal.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono font-bold text-cyan-400">{personal.status}</div>
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{personal.location}</span>
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Manifesto & Telemetry Stats */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-snug">
              {personal.tagline}
            </h3>

            <div className="space-y-4 text-slate-300 font-sans text-base sm:text-lg leading-relaxed">
              {personal.fullBio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
              {hero.quickStats.map((stat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col"
                >
                  <span className="text-2xl sm:text-3xl font-display font-black text-cyan-400">
                    {stat.value}
                  </span>
                  <span className="text-xs font-mono text-slate-400 mt-1 uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={personal.cvUrl}
                download="Alexander_Vance_Resume.pdf"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download Curriculum Vitae</span>
              </a>

              <a
                href="#contact"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 font-mono font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Initiate Contact</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
