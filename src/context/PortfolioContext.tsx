'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { ProjectItem, ArtGalleryItem } from '@/types/portfolio'
import { sound } from '@/utils/audio'

interface PortfolioContextType {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  soundEnabled: boolean
  toggleSound: () => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void
  activeProject: ProjectItem | null
  setActiveProject: (p: ProjectItem | null) => void
  activeArt: ArtGalleryItem | null
  setActiveArt: (a: ArtGalleryItem | null) => void
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null)
  const [activeArt, setActiveArt] = useState<ArtGalleryItem | null>(null)

  // Initialize theme from document or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      document.documentElement.classList.add('dark')
    }

    const savedSound = localStorage.getItem('portfolio-sound')
    if (savedSound !== null) {
      const enabled = savedSound === 'true'
      setSoundEnabled(enabled)
      sound.enabled = enabled
    }
  }, [])

  // Keyboard shortcut for Cmd+K / Ctrl+K search dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        sound.playClick()
        setIsSearchOpen(prev => !prev)
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false)
        setActiveProject(null)
        setActiveArt(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleTheme = () => {
    sound.playClick()
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('portfolio-theme', next)
      document.documentElement.classList.toggle('dark', next === 'dark')
      return next
    })
  }

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev
      sound.enabled = next
      localStorage.setItem('portfolio-sound', String(next))
      if (next) sound.playClick()
      return next
    })
  }

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        isSearchOpen,
        setIsSearchOpen,
        activeProject,
        setActiveProject,
        activeArt,
        setActiveArt,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
