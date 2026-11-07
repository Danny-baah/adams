import React from 'react'
import { ArrowRight } from 'lucide-react'
import { AppPage } from '../hero/HeroNavigation'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

interface AboutSectionProps {
  onNavigate?: (page: AppPage) => void
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { ref, isVisible } = useScrollAnimation()

  const handleAboutClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate('about')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section ref={ref} id="ueber-uns" className="relative py-24 sm:py-32 bg-[#F8FAFC] text-slate-900 border-t border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[2.5px] bg-[#D81E26]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D81E26] uppercase">
                ÜBER ADAMAS
              </span>
            </div>

            {/* Headline - Fades in when section is in view */}
            <h2 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0E1E38] tracking-tight leading-[1.18] mb-3`}>
              Kompetenz, Qualität und Zuverlässigkeit.
            </h2>

            {/* Yellow Accent Bar */}
            <div className="w-16 h-1.5 bg-[#F3A81D] rounded-full mb-6" />

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8">
              Seit 1998 steht ADAMAS Elektrotechnik für hochwertige Elektroinstallationen und durchdachte technische Lösungen. Wir begleiten private und gewerbliche Kunden mit Erfahrung, technischem Know-how und einem klaren Anspruch an Qualität &ndash; von der Planung bis zur fachgerechten Umsetzung.
            </p>

            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs sm:text-sm font-bold tracking-wider text-slate-800 uppercase mb-8 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#D81E26] rounded-xs" />
                <span>GEGRÜNDET 1998</span>
              </div>
              <span className="text-slate-300 font-light hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#F3A81D] rounded-xs" />
                <span>LEVERKUSEN, DEUTSCHLAND</span>
              </div>
            </div>

            {/* CTA Button - Slides in from Left */}
            <a
              href="#ueber-uns-page"
              onClick={handleAboutClick}
              className={`anim-slide-left ${isVisible ? 'is-visible' : ''} delay-200 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0E264D] hover:bg-[#163B75] text-white font-semibold text-base shadow-lg shadow-blue-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer`}
            >
              <span>Mehr über uns</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Column: Image with "Seit 1998" Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/60 border border-slate-200/80 group">
              <img
                src="/sections/about_installation_clean.jpg"
                alt="ADAMAS Elektrotechnik Meisterbetrieb Schaltschrank und Installation"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Badge: Seit 1998 */}
              <div className="absolute bottom-5 left-5 z-20 flex items-center bg-[#071B33] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xl overflow-hidden border border-white/10 pointer-events-none">
                <span className="w-2.5 self-stretch bg-[#F3A81D]" />
                <span className="px-4 py-2">Seit 1998</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
