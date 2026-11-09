import React from 'react'
import { ArrowRight, Zap, Home, Shield, Lightbulb, Car, Wrench } from 'lucide-react'
import { AppPage } from '../hero/HeroNavigation'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { AiGeneratedBadge } from '../common/AiGeneratedBadge'

interface ServicesSectionProps {
  onNavigate?: (page: AppPage) => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const { ref, isVisible } = useScrollAnimation()
  const services = [
    {
      id: 'elektroinstallation',
      title: 'Elektroinstallation',
      subtitle: 'Neuinstallation, Sanierung und Erweiterung',
      image: '/sections/service_installation.jpg',
      icon: Zap,
    },
    {
      id: 'smarthome',
      title: 'Smart Home & KNX',
      subtitle: 'Intelligente Gebäudesteuerung',
      image: '/sections/service_smarthome.jpg',
      icon: Home,
    },
    {
      id: 'sicherheit',
      title: 'Sicherheits- & Kommunikationstechnik',
      subtitle: 'CCTV, Sprechanlagen und Sicherheit',
      image: '/sections/service_security.jpg',
      icon: Shield,
    },
    {
      id: 'beleuchtung',
      title: 'Beleuchtungstechnik',
      subtitle: 'Moderne Innen- und Außenbeleuchtung',
      image: '/sections/service_lighting.jpg',
      icon: Lightbulb,
    },
    {
      id: 'emobilitaet',
      title: 'E-Mobilität',
      subtitle: 'Wallboxen und Ladeinfrastruktur',
      image: '/sections/service_emobility.jpg',
      icon: Car,
    },
    {
      id: 'wartung',
      title: 'Prüfung & Wartung',
      subtitle: 'E-Check, Instandhaltung und Sicherheit',
      image: '/sections/service_maintenance.jpg',
      icon: Wrench,
    },
  ]

  const handleCardClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    if (onNavigate) {
      window.location.hash = `/leistungen#${id}`
      onNavigate('services')
      setTimeout(() => {
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 250)
    }
  }

  const handleViewAllServices = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate('services')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section ref={ref} id="leistungen" className="relative py-24 sm:py-32 bg-white text-slate-900 border-t border-slate-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[2.5px] bg-[#D81E26]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D81E26] uppercase">
                UNSERE LEISTUNGEN
              </span>
            </div>

            {/* Headline - Fades in when section is active */}
            <h2 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0E1E38] tracking-tight leading-[1.16] mb-3`}>
              Technik für alles, was Sie vorhaben.
            </h2>

            {/* Yellow Accent Bar */}
            <div className="w-16 h-1.5 bg-[#F3A81D] rounded-full" />
          </div>

          <div className="lg:col-span-5 lg:border-l-2 lg:border-slate-200 lg:pl-8">
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Von klassischen Elektroinstallationen bis zu intelligenten Gebäudelösungen. Wir verbinden moderne Technik mit zuverlässigem Handwerk.
            </p>
          </div>
        </div>

        {/* 6 Services Grid (3 columns x 2 rows) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.id}
                href={`#/leistungen#${s.id}`}
                onClick={(e) => handleCardClick(e, s.id)}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/60 border border-slate-200/80 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Image Container with Yellow Corner Diagonal Accent */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                  <AiGeneratedBadge position="top-2.5 left-2.5 sm:top-3 sm:left-3" />
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Content Row */}
                <div className="p-5 sm:p-6 flex items-center justify-between gap-4 flex-1">
                  <div className="flex items-center gap-4">
                    {/* Icon container */}
                    <div className="w-11 h-11 rounded-xl bg-blue-50/80 border border-blue-100/60 flex items-center justify-center flex-shrink-0 text-[#0E264D] group-hover:bg-[#0E264D] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Titles */}
                    <div className="flex flex-col">
                      <h3 className="text-base sm:text-lg font-bold text-[#0E1E38] tracking-tight group-hover:text-[#D81E26] transition-colors duration-200">
                        {s.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5 line-clamp-1">
                        {s.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Red Arrow */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#D81E26] flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* Bottom Right Corner: "View Services" CTA Button - Slides in from Right */}
        <div className="mt-12 flex justify-end">
          <a
            href="#/leistungen"
            onClick={handleViewAllServices}
            title="View Services"
            aria-label="View Services"
            className={`anim-slide-right ${isVisible ? 'is-visible' : ''} delay-200 inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#0E1E38] hover:bg-[#16305a] text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer`}
          >
            <span>Alle Leistungen ansehen</span>
            <span className="text-slate-300 font-normal text-xs sm:text-sm">(View Services)</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#F3A81D]" />
          </a>
        </div>

      </div>
    </section>
  )
}
