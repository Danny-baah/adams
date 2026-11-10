import React from 'react'
import { HeroNavigation, AppPage } from './HeroNavigation'
import { HeroButtons } from './HeroButtons'

interface HeroProps {
  onNavigate?: (page: AppPage) => void
}

/**
 * Standard, modern homepage hero section (non-scroll).
 * Features high-resolution background artwork depicting the modern villa with:
 * - CCTV security camera on the modern overhang
 * - EV Wallbox charging station with car in the driveway
 * - Warm, glowing architectural inside lighting
 * - High-contrast left typography with entrance animations
 */
export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative w-full min-h-[100svh] lg:h-screen lg:min-h-[720px] lg:max-h-[980px] bg-[#070B12] text-white overflow-hidden flex flex-col justify-between">
      {/* Background Image: Desktop & Mobile Responsive */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <source
          media="(max-width: 640px)"
          srcSet="/assets/hero_villa_smart_mobile.webp"
          type="image/webp"
        />
        <img
          src="/assets/hero_villa_smart.webp"
          alt="ADAMAS Elektrotechnik - Intelligente Gebäudetechnik, Wallbox & CCTV Sicherheit"
          className="w-full h-full object-cover object-[72%_center] sm:object-[70%_center] lg:object-center"
        />
      </picture>

      {/* Cinematic Gradient Scrims: Ensures 100% sharp text legibility while keeping villa, car, wallbox, and CCTV visible on right */}
      {/* Desktop Left Dark Gradient */}
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

      {/* Main Hero Content: Exactly centered vertically */}
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

          {/* CTA Buttons - Slide In Animation */}
          <HeroButtons onNavigate={onNavigate} />

        </div>
      </div>

      {/* Bottom Breathing Room */}
      <div className="h-10 sm:h-14 flex-shrink-0" />
    </section>
  )
}
