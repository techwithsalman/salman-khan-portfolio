import React from 'react'
import HeroSection from '@/components/hero/HeroSection'
import ProjectShowcase from '@/components/showcase/ProjectShowcase'
import ArtGallery3D from '@/components/gallery/ArtGallery3D'
import AboutSection from '@/components/about/AboutSection'
import CareerTimeline from '@/components/timeline/CareerTimeline'
import CreativeLab from '@/components/lab/CreativeLab'
import ContactSection from '@/components/contact/ContactSection'

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Cinematic Hero with 3D Depth, Oversized Name, Physics Badge, Phone */}
      <HeroSection />

      {/* 2. Interactive Project Showcase (Horizontal Scroll Gallery & List Mode) */}
      <ProjectShowcase />

      {/* 3. 3D Generative Art Gallery */}
      <ArtGallery3D />

      {/* 4. About Me & Manifesto */}
      <AboutSection />

      {/* 5. Career & Education Timeline */}
      <CareerTimeline />

      {/* 6. Creative Code Lab */}
      <CreativeLab />

      {/* 7. Contact Section */}
      <ContactSection />
    </div>
  )
}
