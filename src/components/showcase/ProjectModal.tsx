'use client'

import React from 'react'
import Image from 'next/image'
import { ProjectItem } from '@/types/portfolio'
import { sound } from '@/utils/audio'
import { X, ExternalLink, Github, Award, CheckCircle2, Layers, Cpu } from 'lucide-react'

interface ProjectModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-cyan-500/30 text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClick()
            onClose()
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors"
          aria-label="Close case study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tags */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 font-bold uppercase">
            {project.category}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {project.year} · Client: {project.client}
          </span>
          {project.badgeText && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400">
              <Award className="w-3.5 h-3.5" />
              {project.badgeText}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 id="modal-title" className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-2">
          {project.title}
        </h2>
        <p className="text-lg text-cyan-300 font-sans mb-6">{project.subtitle}</p>

        {/* Main Artwork Preview */}
        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-white/10 mb-6 bg-slate-950">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Project Description */}
        <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Architectural Overview
            </h3>
            <p>{project.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-1 font-bold">
                The Engineering Challenge
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">{project.challenge}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1 font-bold">
                The Solution &amp; Delivery
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">{project.solution}</p>
            </div>
          </div>

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-2">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40">
                  <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400">{m.value}</div>
                  <div className="text-[11px] font-mono text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> Technologies &amp; Shaders Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider font-mono transition-colors shadow-lg"
              >
                <span>Launch Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-bold text-xs uppercase tracking-wider font-mono transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick()
              onClose()
            }}
            className="text-xs font-mono text-slate-400 hover:text-white"
          >
            Press [ESC] to exit
          </button>
        </div>
      </div>
    </div>
  )
}
