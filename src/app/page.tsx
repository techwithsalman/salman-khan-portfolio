'use client'

import React from 'react'
import HeroReferenceSection from '@/components/hero/HeroReferenceSection'
import CinematicProjectShowcase from '@/components/showcase/CinematicProjectShowcase'
import CurriculumVitaeSection from '@/components/cv/CurriculumVitaeSection'
import ReferenceFooter from '@/components/footer/ReferenceFooter'
import ReferenceNav from '@/components/navigation/ReferenceNav'

export default function HomePage() {
  return (
    <div className="relative w-full bg-black min-h-screen text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* 1. Floating Navigation Pill (Top-Right) */}
      <ReferenceNav />

      {/* 2. Hero Section matching Screenshot 2 */}
      <HeroReferenceSection />

      {/* 3. Cinematic Full-Screen Project Showcase matching Screenshot 3 */}
      <CinematicProjectShowcase />

      {/* 4. Curriculum Vitae & Experience Timeline */}
      <CurriculumVitaeSection />

      {/* 5. Broadcast Sign-off & Footer */}
      <ReferenceFooter />
    </div>
  )
}
