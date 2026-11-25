'use client'

import React, { useState } from 'react'
import { sound } from '@/utils/audio'
import { portfolioConfig } from '@/data/portfolioConfig'
import { Download, Briefcase, GraduationCap, Sparkles, Check, Globe } from 'lucide-react'

export default function CurriculumVitaeSection() {
  const [activeTab, setActiveTab] = useState<'Experience' | 'Diplomas' | 'Skills' | 'Soft skills' | 'Languages'>('Experience')
  const { experience, education, skills, softSkills, languages, personal } = portfolioConfig

  const tabs = ['Experience', 'Diplomas', 'Skills', 'Soft skills', 'Languages'] as const

  return (
    <section
      id="cv-experience"
      className="relative w-full bg-black text-white py-24 px-4 sm:px-8 border-t border-white/10"
      aria-label="Curriculum Vitae"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title matching reference */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-white/15 mb-10">
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1">
              Curriculum vitae · {personal.fullName}
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight text-white">
              {personal.role}
            </h2>
          </div>

          <a
            href={personal.cvUrl}
            download="Mohamed_Andaloussi_CV.pdf"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors self-start sm:self-auto shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Download my CV</span>
          </a>
        </div>

        {/* Tab Buttons matching reference */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                sound.playClick()
                setActiveTab(tab)
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-white text-black shadow-md'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB 1: EXPERIENCE */}
        {activeTab === 'Experience' && (
          <div className="space-y-6">
            {experience.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 hover:border-white/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-sans font-black text-white">
                      {item.role}
                    </h3>
                    <p className="text-sm font-mono text-zinc-300 mt-0.5">
                      {item.company} — <span className="text-zinc-500">{item.location}</span>
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
                    {item.period}
                  </span>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{item.description}</p>

                <div className="space-y-2">
                  {item.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: DIPLOMAS */}
        {activeTab === 'Diplomas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span className="font-bold text-white">{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-xl font-sans font-black text-white mb-1">{item.degree}</h3>
                  <p className="text-sm font-mono text-zinc-300">{item.institution}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs font-mono text-zinc-400">
                  {item.highlight}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SKILLS */}
        {activeTab === 'Skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((cat, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10">
                <h3 className="text-lg font-sans font-black uppercase text-white mb-6">
                  {cat.category}
                </h3>
                <div className="space-y-4">
                  {cat.items.map((skill, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-200 font-semibold">{skill.name}</span>
                        <span className="text-zinc-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-white"
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

        {/* TAB 4: SOFT SKILLS */}
        {activeTab === 'Soft skills' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {softSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-zinc-950 border border-white/10 flex items-center gap-3 text-sm font-sans font-bold text-zinc-200"
              >
                <Check className="w-4 h-4 text-white flex-shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: LANGUAGES */}
        {activeTab === 'Languages' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((lang, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/15 text-[10px] font-mono text-white font-bold">
                    {lang.code}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-sans font-black text-white">{lang.language}</h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">{lang.proficiency}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
