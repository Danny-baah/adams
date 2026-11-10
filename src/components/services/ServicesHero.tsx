import React from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { AppPage } from '../hero/HeroNavigation'

interface ServicesHeroProps {
  onNavigate?: (page: AppPage) => void
}

export const ServicesHero: React.FC<ServicesHeroProps> = () => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-center bg-[#011429] text-white overflow-hidden"
    >
      {/* Background Graphic Photo with High-Res Architectural Exterior Lighting (FULL WIDTH, Zero Humans, Meaningful Craftsmanship) */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/services/services_hero_meaningful.webp" type="image/webp" />
          <img
            src="/services/services_hero_meaningful.jpg"
            alt="ADAMAS Elektrotechnik Moderne Architekturbeleuchtung und Gebäudetechnik"
            className="w-full h-full object-cover object-[center_center] filter brightness-95"
          />
        </picture>
        {/* Left-to-Right subtle dark gradient overlay for text legibility while keeping photo full width */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#011429]/95 via-[#011429]/75 to-[#011429]/20 w-full sm:w-4/5 lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011429]/80 via-transparent to-black/20" />
      </div>

      {/* Hero Content - All texts visible at once without scrolling */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-20 w-full">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-8 h-1 bg-[#F3A81D] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-slate-200 uppercase">
              UNSERE LEISTUNGEN
            </span>
          </div>

          {/* Headline - Fades in */}
          <h1 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.14] sm:leading-[1.12] mb-3 sm:mb-4`}>
            Elektrotechnik, die verbindet.<br />
            Lösungen, die{' '}
            <span className="text-[#F3A81D] drop-shadow-[0_2px_14px_rgba(243,168,29,0.35)]">
              überzeugen.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
            Von der Elektroinstallation bis zur E-Mobilität &ndash; wir bieten maßgeschneiderte Lösungen für private, gewerbliche und öffentliche Projekte.
          </p>

        </div>
      </div>
    </section>
  )
}
