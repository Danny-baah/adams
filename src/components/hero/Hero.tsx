import React, { useState, useEffect } from 'react'
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
  kenBurnsClass: string
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'wallbox',
    image: '/hero/hero_slide_wallbox.webp',
    alt: 'ADAMAS E-Mobilität und Wallbox Ladelösung mit Elektrofahrzeug',
    label: 'Wallbox & E-Auto',
    kenBurnsClass: 'animate-ken-burns-1',
  },
  {
    id: 'cctv',
    image: '/hero/hero_slide_cctv.webp',
    alt: 'ADAMAS Moderne Videoüberwachung und CCTV Sicherheitstechnik',
    label: 'CCTV & Sicherheit',
    kenBurnsClass: 'animate-ken-burns-2',
  },
  {
    id: 'lighting',
    image: '/hero/hero_slide_lighting.webp',
    alt: 'ADAMAS Intelligente Innenbeleuchtung und Smart Home Gebäudetechnik',
    label: 'Smarte Beleuchtung',
    kenBurnsClass: 'animate-ken-burns-3',
  },
]

const SLIDE_DURATION_MS = 6000

/**
 * Standard, modern homepage hero section with Ken Burns slideshow.
 * Features 3 rotating high-definition visuals:
 * 1. Wallbox with electric car
 * 2. High-tech CCTV security camera
 * 3. Modern architectural internal lighting
 */
export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Automatic slideshow rotation
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, SLIDE_DURATION_MS)

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section
      className="relative w-full min-h-[100svh] lg:h-screen lg:min-h-[720px] lg:max-h-[980px] bg-[#070B12] text-white overflow-hidden flex flex-col justify-between select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
                className={`w-full h-full object-cover object-[72%_center] sm:object-[70%_center] lg:object-center ${
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

      {/* Fixed / Floating Top Navigation */}
      <HeroNavigation currentPage="home" onNavigate={onNavigate} />

      {/* Top Navbar Spacer: Guarantees text is comfortably below fixed navbar */}
      <div className="h-24 sm:h-28 md:h-32 flex-shrink-0" />

      {/* Main Hero Content: Centered vertically */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 my-auto py-8 sm:py-12 flex flex-col justify-center items-start">
        <div className="w-full max-w-2xl text-left flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3 sm:mb-3.5">
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

      {/* Bottom Status Bar: Interactive Slide Navigation Pills */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pb-6 sm:pb-8 flex items-center justify-between">
        {/* Subtle scroll cue hint */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F3A81D]" />
          <span>Qualität &amp; Handwerk seit 1998</span>
        </div>

        {/* Ken Burns Slide Selector Pills */}
        <div className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 shadow-lg ml-auto">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium transition-all duration-300 px-2 sm:px-2.5 py-1 rounded-full cursor-pointer ${
                  isActive
                    ? 'bg-[#D81E26] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                aria-label={`Zum Slide ${slide.label} wechseln`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-white' : 'bg-slate-400'
                  }`}
                />
                <span className="hidden md:inline">{slide.label}</span>
                <span className="md:hidden">0{index + 1}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
