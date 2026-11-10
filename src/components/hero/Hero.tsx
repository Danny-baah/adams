import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HeroNavigation, AppPage } from './HeroNavigation'
import { HeroButtons } from './HeroButtons'

interface HeroProps {
  onNavigate?: (page: AppPage) => void
}

interface HeroSlide {
  id: string
  image: string
  alt: string
  kenBurnsClass: string
  objectPosition: string
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'smart-villa',
    image: '/assets/hero_villa_smart.webp',
    alt: 'ADAMAS Intelligente Elektrotechnik, Smart Home, Wallbox und Videoüberwachung',
    kenBurnsClass: 'animate-ken-burns-1',
    objectPosition: 'object-[75%_center] sm:object-[68%_center] lg:object-center',
  },
  {
    id: 'cctv-security',
    image: '/hero/hero_slide_cctv.webp',
    alt: 'ADAMAS Moderne Videoüberwachung und CCTV Sicherheitstechnik',
    kenBurnsClass: 'animate-ken-burns-2',
    objectPosition: 'object-[60%_center] sm:object-[55%_center] lg:object-center',
  },
]

// Interval between 5 and 7 seconds (6 seconds per slide)
const SLIDE_DURATION_MS = 6000

/**
 * Standard, modern homepage hero section with Ken Burns slideshow.
 * Features 2 rotating high-definition visuals:
 * 1. Smart Villa at dusk with wallbox, CCTV and architectural illumination (from user reference)
 * 2. High-tech CCTV security camera (dome architectural installation)
 */
export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  // Automatic slideshow rotation every 6 seconds
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(nextSlide, SLIDE_DURATION_MS)
    return () => clearInterval(interval)
  }, [isPaused, nextSlide, currentSlide])

  return (
    <section
      className="relative w-full min-h-[100svh] lg:h-screen lg:min-h-[720px] lg:max-h-[980px] bg-[#070B12] text-white overflow-hidden flex flex-col justify-between select-none group/hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="ADAMAS Elektrotechnik Startbereich"
    >
      {/* Background Slideshow with Ken Burns Pan & Zoom */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover ${slide.objectPosition} ${
                  isActive ? slide.kenBurnsClass : ''
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          )
        })}
      </div>

      {/* Cinematic Gradient Scrims: Ensures 100% sharp text legibility on all devices */}
      {/* Desktop Left Dark Scrim */}
      <div className="hidden sm:block absolute inset-y-0 left-0 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 cinematic-left-gradient pointer-events-none z-10" />

      {/* Mobile Vignette & Scrims */}
      <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-[#070B12]/85 via-transparent to-[#070B12]/85 pointer-events-none z-10" />
      <div className="sm:hidden absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#070B12]/90 via-[#070B12]/40 to-transparent pointer-events-none z-10" />

      {/* Ambient Vignette & Bottom Section Blend */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 cinematic-bottom-gradient pointer-events-none z-10" />

      {/* Desktop Next/Prev Arrow Controls (Subtle, appear on hero hover) */}
      <div className="hidden lg:flex absolute inset-y-0 right-8 items-center gap-2 z-20 pointer-events-auto opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300">
        <button
          type="button"
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-105"
          aria-label="Vorheriges Bild"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-105"
          aria-label="Nächstes Bild"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Fixed / Floating Top Navigation */}
      <HeroNavigation currentPage="home" onNavigate={onNavigate} />

      {/* Top Navbar Spacer: Guarantees text is comfortably below fixed navbar */}
      <div className="h-20 sm:h-24 md:h-28 flex-shrink-0" />

      {/* Main Hero Content: Centered vertically */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 my-auto py-8 sm:py-12 flex flex-col justify-center items-start">
        <div className="w-full max-w-2xl text-left flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-3 sm:mb-3.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F3A81D] animate-pulse" />
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] text-slate-300 uppercase">
              ELEKTROTECHNIK &middot; SMART HOME &middot; SICHERHEIT
            </span>
          </div>

          {/* Main Headline - Entrance Fade-In */}
          <h1 className="anim-fade-in is-visible text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold text-white leading-[1.14] sm:leading-[1.1] tracking-tight mb-4 sm:mb-5">
            Intelligente<br />
            Elektrotechnik<br />
            <span className="text-[#F3A81D] drop-shadow-[0_2px_16px_rgba(243,168,29,0.4)]">
              für Ihr Zuhause.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200/90 font-normal leading-relaxed mb-7 sm:mb-8 max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Moderne Elektroinstallationen, sichere Gebäudetechnik und smarte Lösungen &ndash; professionell, zuverlässig und zukunftssicher.
          </p>

          {/* CTA Buttons */}
          <HeroButtons onNavigate={onNavigate} />
        </div>
      </div>

      {/* Bottom Spacer to ensure balanced vertical centering now that the bottom pills are removed */}
      <div className="h-10 sm:h-16 flex-shrink-0" />
    </section>
  )
}
