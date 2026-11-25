'use client'

import React, { useState } from 'react'
import { portfolioConfig } from '@/data/portfolioConfig'
import { sound } from '@/utils/audio'
import {
  Briefcase,
  GraduationCap,
  Cpu,
  HeartHandshake,
  Languages as LangIcon,
  Download,
  Calendar,
  Building,
  CheckCircle,
} from 'lucide-react'

export default function CareerTimeline() {
  const [activeTab, setActiveTab] = useState<'Experience' | 'Diplomas' | 'Skills' | 'Soft skills' | 'Languages'>('Experience')
  const { experience, education, skills, softSkills, languages, personal } = portfolioConfig

  const tabs = ['Experience', 'Diplomas', 'Skills', 'Soft skills', 'Languages'] as const

  return (
    <section
      id="experience"
      className="relative w-full bg-cinematic-darkest text-slate-100 py-24 border-t border-cyan-500/10 overflow-hidden"
      aria-label="Career and Skills Timeline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-2">
              <Briefcase className="w-4 h-4" />
              <span>Time Corridor · Career &amp; Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
              JOURNEY &amp; CAPABILITIES
            </h2>
          </div>

          <a
            href={personal.cvUrl}
            download="Alexander_Vance_Resume.pdf"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono text-cyan-300 hover:text-white transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download Official CV (PDF)</span>
          </a>
        </div>

        {/* Tab Controls (Matching Reference Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                sound.playClick()
                setActiveTab(tab)
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENT 1: EXPERIENCE */}
        {activeTab === 'Experience' && (
          <div className="space-y-6">
            {experience.map((item, idx) => (
              <div
                key={item.id}
                className="group p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                      {item.type} Role
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-0.5">
                      {item.role}
                    </h3>
                    <p className="text-sm font-mono text-slate-300 flex items-center gap-2 mt-1">
                      <Building className="w-4 h-4 text-cyan-400" />
                      <span>{item.company}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400">{item.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">{item.description}</p>

                <div className="space-y-2 mb-6">
                  {item.keyAchievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {item.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB CONTENT 2: DIPLOMAS & EDUCATION */}
        {activeTab === 'Diplomas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span className="text-cyan-400 font-bold">{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-1">{item.degree}</h3>
                  <p className="text-sm font-mono text-cyan-300 mb-3">{item.institution}</p>
                  {item.honors && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 mb-4">
                      {item.honors}
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Curriculum Highlights:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.courses.map((c, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB CONTENT 3: SKILLS */}
        {activeTab === 'Skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10"
              >
                <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span>{cat.category}</span>
                </h3>

                <div className="space-y-4">
                  {cat.skills.map((skill, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-200 font-semibold">{skill.name}</span>
                        <span className="text-cyan-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-amber-400"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB CONTENT 4: SOFT SKILLS */}
        {activeTab === 'Soft skills' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {softSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 flex items-center gap-4 hover:border-cyan-400/40 transition-colors"
              >
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="text-sm font-display font-bold text-slate-100">{skill}</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB CONTENT 5: LANGUAGES */}
        {activeTab === 'Languages' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((lang, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-colors"
              >
                <div className="text-3xl mb-3">{lang.flag}</div>
                <h3 className="text-lg font-display font-bold text-white">{lang.language}</h3>
                <p className="text-xs font-mono text-cyan-400 mt-1">{lang.proficiency}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
