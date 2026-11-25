'use client'

import React, { useState } from 'react'
import { portfolioConfig } from '@/data/portfolioConfig'
import { ArtGalleryItem } from '@/types/portfolio'
import SingleArtCanvas from './SingleArtCanvas'
import { sound } from '@/utils/audio'
import { Box, Sparkles, Maximize2, X, Move3d } from 'lucide-react'

export default function ArtGallery3D() {
  const [inspectItem, setInspectItem] = useState<ArtGalleryItem | null>(null)
  const { artGallery } = portfolioConfig

  return (
    <section
      id="gallery3d"
      className="relative w-full bg-cinematic-darkest text-slate-100 py-24 border-t border-cyan-500/10 overflow-hidden"
      aria-label="3D Generative Art Gallery"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-2">
              <Box className="w-4 h-4" />
              <span>Art Museum · Generative Geometry</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
              DIMENSIONAL ARTIFACTS
            </h2>
            <p className="text-sm text-slate-400 font-sans mt-2 max-w-xl">
              Procedural meshes, raymarched manifolds, and topological explorations rendered in real-time WebGL. Click and drag to orbit each sculpture.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-white/10">
            <Move3d className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Real-time 3D Viewports Active</span>
          </div>
        </div>

        {/* 3D Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artGallery.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,15,35,0.7)]"
            >
              {/* 3D Canvas Box */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl bg-slate-950/80 border border-white/5 overflow-hidden flex items-center justify-center mb-6">
                <SingleArtCanvas item={item} />

                {/* Inspect Fullscreen Button */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick()
                    setInspectItem(item)
                  }}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors shadow-lg"
                  title="Inspect in full viewport"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-mono text-cyan-300 border border-white/10 pointer-events-none">
                  DRAG TO ROTATE
                </div>
              </div>

              {/* Title & Metadata */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="text-cyan-400 font-bold">{item.year}</span>
                  <span className="text-[10px] uppercase">{item.geometryType}</span>
                </div>

                <h3 className="text-xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 font-mono mt-1">{item.medium}</p>
                <p className="text-xs text-slate-400 font-sans mt-3 line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen 3D Modal */}
      {inspectItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-5xl h-[80vh] rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <button
              type="button"
              onClick={() => {
                sound.playClick()
                setInspectItem(null)
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative flex-1 w-full rounded-2xl bg-slate-950 overflow-hidden border border-white/10">
              <SingleArtCanvas item={inspectItem} />
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 max-w-md pointer-events-none">
                <h3 className="text-lg font-display font-bold text-white">{inspectItem.title}</h3>
                <p className="text-xs font-mono text-cyan-400">{inspectItem.medium}</p>
                <p className="text-xs text-slate-300 mt-2">{inspectItem.description}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>ORBIT: DRAG MOUSE | ZOOM: PERSPECTIVE CAMERA</span>
              <button
                type="button"
                onClick={() => setInspectItem(null)}
                className="hover:text-white"
              >
                Press [ESC] to return
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
