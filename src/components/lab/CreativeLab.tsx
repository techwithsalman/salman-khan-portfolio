'use client'

import React, { useState, useEffect, useRef } from 'react'
import { portfolioConfig } from '@/data/portfolioConfig'
import { sound } from '@/utils/audio'
import { FlaskConical, Play, RotateCcw, Volume2, Sparkles, Activity } from 'lucide-react'

export default function CreativeLab() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const { creativeLab } = portfolioConfig

  // 1. Particle Flowfield Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // 2. Audio State for Synesthesia
  const [isAudioRunning, setIsAudioRunning] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)

  // Particle Flowfield Implementation
  useEffect(() => {
    if (activeTab !== 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const w = (canvas.width = canvas.parentElement?.clientWidth || 600)
    const h = (canvas.height = 360)

    const count = 350
    const particles: Array<{ x: number; y: number; vx: number; vy: number; hue: number; size: number }> = []

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        hue: Math.random() * 80 + 170, // bright cyan to vibrant turquoise and amber
        size: Math.random() * 2.5 + 1.2,
      })
    }

    let mouseX = w / 2
    let mouseY = h / 2

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    canvas.addEventListener('mousemove', onPointerMove)

    let t = 0
    const loop = () => {
      animId = requestAnimationFrame(loop)
      t += 0.008

      // Semi-transparent trailing background for luminous trails
      ctx.fillStyle = 'rgba(2, 6, 23, 0.22)'
      ctx.fillRect(0, 0, w, h)

      particles.forEach((p) => {
        // Flowfield angle based on curl trig
        const angle = Math.sin(p.x * 0.005 + t) * Math.cos(p.y * 0.005 + t) * Math.PI * 4
        p.vx += Math.cos(angle) * 0.2
        p.vy += Math.sin(angle) * 0.2

        // Mouse repulsion
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (1 - dist / 120) * 2.2
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        p.vx *= 0.94
        p.vy *= 0.94
        p.x += p.vx
        p.y += p.vy

        // Wrap around boundaries
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.shadowBlur = 8
        ctx.shadowColor = `hsla(${p.hue}, 95%, 65%, 0.8)`
        ctx.fillStyle = `hsla(${p.hue}, 95%, 75%, 0.95)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousemove', onPointerMove)
    }
  }, [activeTab])

  // Audio Oscillator Synthesizer for Lab Experiment #3
  const toggleAudioSynth = () => {
    sound.playClick()
    if (isAudioRunning) {
      if (oscRef.current) {
        oscRef.current.stop()
        oscRef.current.disconnect()
        oscRef.current = null
      }
      setIsAudioRunning(false)
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioCtx()
        audioCtxRef.current = ctx

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(146.83, ctx.currentTime) // D3 chord root

        gain.gain.setValueAtTime(0.04, ctx.currentTime)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()

        oscRef.current = osc
        setIsAudioRunning(true)
      } catch {}
    }
  }

  // Magnetic Grid Nodes State for Experiment #4
  const [gridNodes, setGridNodes] = useState<Array<{ id: number; offset: number }>>(() =>
    Array.from({ length: 36 }, (_, i) => ({ id: i, offset: 0 }))
  )

  const handleGridHover = (idx: number) => {
    sound.playHover()
    setGridNodes((prev) =>
      prev.map((node, i) => (i === idx ? { ...node, offset: 1 } : node))
    )
    setTimeout(() => {
      setGridNodes((prev) =>
        prev.map((node, i) => (i === idx ? { ...node, offset: 0 } : node))
      )
    }, 400)
  }

  return (
    <section
      id="lab"
      className="relative w-full bg-cinematic-darkest text-slate-100 py-24 border-t border-cyan-500/10 overflow-hidden"
      aria-label="Creative Code Lab"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-2">
              <FlaskConical className="w-4 h-4" />
              <span>Creative Forge · Live Micro-Engines</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
              EXPERIMENTAL LAB
            </h2>
            <p className="text-sm text-slate-400 font-sans mt-2 max-w-xl">
              Real-time physics engines, audio-reactive synthesizers, and procedural mathematics testbeds running directly in your browser.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-slate-900/80 px-4 py-2 rounded-full border border-emerald-500/20">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>GPU Hardware Acceleration: ACTIVE</span>
          </div>
        </div>

        {/* Experiment Tab Selectors */}
        <div className="flex flex-wrap items-center gap-2.5 pb-4 mb-8">
          {creativeLab.map((exp, idx) => (
            <button
              key={exp.id}
              type="button"
              onClick={() => {
                sound.playClick()
                setActiveTab(idx)
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-mono text-xs whitespace-nowrap transition-all duration-200 ${
                activeTab === idx
                  ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <span>#{idx + 1}</span>
              <span>{exp.title}</span>
            </button>
          ))}
        </div>

        {/* Active Experiment Interactive Canvas Area */}
        <div className="relative w-full rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 min-h-[440px] flex flex-col justify-between shadow-2xl">
          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 font-bold uppercase">
                  {creativeLab[activeTab].type}
                </span>
                <span>TARGET: {creativeLab[activeTab].fpsTarget}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
                {creativeLab[activeTab].title}
              </h3>
            </div>

            <div className="text-xs font-mono text-slate-400 max-w-sm sm:text-right">
              <span className="text-amber-400 font-bold">Instruction: </span>
              {creativeLab[activeTab].instructions}
            </div>
          </div>

          {/* Interactive Playground Viewport */}
          <div className="relative my-6 w-full h-[320px] rounded-2xl bg-slate-950/90 border border-white/5 overflow-hidden flex items-center justify-center">
            {activeTab === 0 && (
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair"
                title="Move your mouse to repel particles"
              />
            )}

            {activeTab === 1 && (
              <div className="relative w-full h-full flex items-center justify-center p-8 select-none">
                {/* Background high-contrast optical bars */}
                <div className="absolute inset-0 flex items-center justify-around opacity-30">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-full bg-gradient-to-b from-cyan-400 via-white to-amber-400"
                    />
                  ))}
                </div>

                {/* Floating Glassmorphic Optical Prism */}
                <div className="relative z-10 w-72 h-44 rounded-2xl backdrop-blur-2xl bg-white/15 border-2 border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 flex flex-col justify-between animate-badge-sway cursor-pointer">
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/80">
                    <span>FRESNEL REFRACTION</span>
                    <span>IOR 1.52</span>
                  </div>
                  <div className="text-center font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300">
                    SNELL&apos;S LAW
                  </div>
                  <div className="text-right text-[9px] font-mono text-cyan-300">
                    REAL-TIME RGB DISPERSION
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 gap-6">
                {/* Audio Oscillating Waveform Bars */}
                <div className="flex items-center gap-1.5 h-32">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 rounded-full transition-all duration-150 ${
                        isAudioRunning
                          ? 'bg-gradient-to-t from-cyan-500 to-amber-400'
                          : 'bg-slate-800'
                      }`}
                      style={{
                        height: isAudioRunning
                          ? `${Math.sin(i * 0.4 + Date.now() * 0.005) * 45 + 55}%`
                          : '12%',
                      }}
                    />
                  ))}
                </div>

                {/* Audio Toggle Button */}
                <button
                  type="button"
                  onClick={toggleAudioSynth}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg ${
                    isAudioRunning
                      ? 'bg-rose-500 hover:bg-rose-400 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isAudioRunning ? 'Silence Oscillator' : 'Synthesize Harmonic Tone'}</span>
                </button>
              </div>
            )}

            {activeTab === 3 && (
              <div className="relative w-full h-full flex items-center justify-center p-6">
                {/* 6x6 Magnetic Matrix Grid */}
                <div className="grid grid-cols-6 gap-4">
                  {gridNodes.map((node, i) => (
                    <button
                      key={node.id}
                      type="button"
                      onMouseEnter={() => handleGridHover(i)}
                      className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center transition-all duration-300"
                      style={{
                        transform: node.offset === 1 ? 'scale(1.4) rotate(45deg)' : 'scale(1)',
                        borderColor: node.offset === 1 ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                        backgroundColor: node.offset === 1 ? 'rgba(56,189,248,0.2)' : 'rgba(15,23,42,0.6)',
                      }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          node.offset === 1 ? 'bg-cyan-400' : 'bg-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footnote */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-white/10">
            <span>{creativeLab[activeTab].description}</span>
            <span className="text-cyan-400 mt-1 sm:mt-0">// ZERO EXTERNAL PLUGINS REQUIRED</span>
          </div>
        </div>
      </div>
    </section>
  )
}
