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
  label: string
  tag: string
  kenBurnsClass: string
  objectPosition: string
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'wallbox',
    image: '/hero/hero_slide_wallbox.webp',
    alt: 'ADAMAS E-Mobilität und Wallbox Ladelösung mit Elektrofahrzeug im Carport',
    label: 'Wallbox & E-Auto',
    tag: 'E-Mobilität & Wallbox-Ladesysteme',
    kenBurnsClass: 'animate-ken-burns-1',
    objectPosition: 'object-[72%_center] sm:object-[68%_center] lg:object-center',
  },
  {
    id: 'cctv',
    image: '/hero/hero_slide_cctv.webp',
    alt: 'ADAMAS Moderne Videoüberwachung und CCTV Sicherheitstechnik',
    label: 'CCTV & Sicherheit',
    tag: 'Sicherheitstechnik & Videoüberwachung',
    kenBurnsClass: 'animate-ken-burns-2',
    objectPosition: 'object-[60%_center] sm:object-[55%_center] lg:object-center',
  },
  {
    id: 'lighting',
    image: '/hero/hero_slide_lighting.webp',
    alt: 'ADAMAS Intelligente Innenbeleuchtung und Smart Home Raumlicht',
    label: 'Smarte Beleuchtung',
    tag: 'Lichtdesign & Smart-Home-Steuerung',
    kenBurnsClass: 'animate-ken-burns-3',
    objectPosition: 'object-[78%_center] sm:object-[68%_center] lg:object-center',
  },
]

// Interval between 5 and 7 seconds (6 seconds per slide)
const SLIDE_DURATION_MS = 6000

/**
 * Standard, modern homepage hero section with Ken Burns slideshow.
 * Features 3 rotating high-definition visuals:
 * 1. Wallbox with electric car (full charging system, zero humans)
 * 2. High-tech CCTV security camera (dome architectural installation)
 * 3. Modern living room with ambient smart lighting (zero humans)
 */
export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('slide')
      if (param !== null) {
        const parsed = parseInt(param, 10)
        if (!isNaN(parsed) && parsed >= 0 && parsed < HERO_SLIDES.length) {
          return parsed
        }
      }
    }
    return 0
  })
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  // Automatic slideshow rotation with 6s duration
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
      <div className="absolute inset-x-0 bottom-0 h-32 cinematic-bottom-gradient pointer-events-none z-10" />

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
      <div className="h-24 sm:h-28 md:h-32 flex-shrink-0" />

      {/* Main Hero Content: Centered vertically */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 my-auto py-8 sm:py-12 flex flex-col justify-center items-start">
        <div className="w-full max-w-2xl text-left flex flex-col justify-center">
          {/* Dynamic Eyebrow & Slide Badge */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-3.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F3A81D] animate-pulse" />
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] text-slate-300 uppercase">
              ELEKTROTECHNIK &middot; SMART HOME &middot; SICHERHEIT
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-400/80 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">
              0{currentSlide + 1} &middot; {HERO_SLIDES[currentSlide].tag}
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

      {/* Bottom Status Bar: Interactive Slide Navigation Pills with Animated Progress */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pb-6 sm:pb-8 flex items-center justify-between">
        {/* Subtle scroll cue hint */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F3A81D]" />
          <span>Qualität &amp; Handwerk seit 1998</span>
        </div>

        {/* Ken Burns Slide Selector Pills with Progress Bars - Positioned to stay clear of right-aligned cookie banner */}
        <div className="flex items-center gap-2 sm:gap-2.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-2xl mx-auto lg:mr-auto lg:ml-10 xl:mx-auto">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`relative overflow-hidden inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium transition-all duration-300 px-2.5 sm:px-3.5 py-1.5 rounded-full cursor-pointer ${
                  isActive
                    ? 'bg-[#D81E26] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                aria-label={`Zum Slide ${slide.label} wechseln`}
              >
                {/* Active Slide 6-Second Progress Fill Bar */}
                {isActive && (
                  <span
                    key={`progress-${currentSlide}`}
                    className={`absolute bottom-0 left-0 h-[2px] bg-white/70 animate-slide-progress ${
                      isPaused ? 'is-paused' : ''
                    }`}
                  />
                )}
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    isActive ? 'bg-white' : 'bg-slate-400'
                  }`}
                />
                <span className="font-mono text-[11px] opacity-80">0{index + 1}</span>
                <span className="hidden md:inline font-semibold">{slide.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
