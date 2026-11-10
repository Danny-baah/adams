import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { AppPage } from '../hero/HeroNavigation'

interface ServicesHeroProps {
  onNavigate?: (page: AppPage) => void
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({ onNavigate }) => {
  const { ref, isVisible } = useScrollAnimation()
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('services-list')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate('contact')
    } else {
      const el = document.getElementById('kontakt')
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={ref} className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 bg-[#011429] text-white overflow-hidden">
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

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-20">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-1 bg-[#F3A81D] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-slate-200 uppercase">
              UNSERE LEISTUNGEN
            </span>
          </div>

          {/* Headline - Fades in */}
          <h1 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-white tracking-tight leading-[1.12] mb-5`}>
            Elektrotechnik, die verbindet.<br />
            Lösungen, die{' '}
            <span className="text-[#F3A81D] drop-shadow-[0_2px_14px_rgba(243,168,29,0.35)]">
              überzeugen.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-xl">
            Von der Elektroinstallation bis zur E-Mobilität &ndash; wir bieten maßgeschneiderte Lösungen für private, gewerbliche und öffentliche Projekte.
          </p>

          {/* Buttons Row - Left slides from Left, Right slides from Right */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#services-list"
              onClick={scrollToServices}
              className={`anim-slide-left ${isVisible ? 'is-visible' : ''} inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#D81E26] hover:bg-[#BE161D] text-white font-semibold text-sm sm:text-base tracking-wide shadow-lg shadow-red-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer`}
            >
              <span>Unsere Leistungen</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#kontakt"
              onClick={handleContactClick}
              className={`anim-slide-right ${isVisible ? 'is-visible' : ''} delay-150 inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/25 text-white font-medium text-sm sm:text-base tracking-wide backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer`}
            >
              Projekt besprechen
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
