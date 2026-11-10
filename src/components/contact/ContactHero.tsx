import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export const ContactHero: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('contact-form')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      className="relative pt-24 pb-14 sm:pt-32 sm:pb-18 lg:pt-36 lg:pb-22 min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center bg-[#011429] text-white overflow-hidden"
    >
      {/* Background Graphic Photo: Modern Illuminated Architectural Villa (FULL WIDTH, Zero Faces, Zero Text) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/contact/contact_hero_clean.jpg"
          alt="ADAMAS Elektrotechnik Kontakt Ihr Projekt"
          className="w-full h-full object-cover object-[center_center] filter brightness-90"
        />
        {/* Left-to-Right Dark Navy Gradient Mask for perfect text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#011429] via-[#011429]/90 to-[#011429]/40 w-full sm:w-4/5 lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011429] via-transparent to-black/30" />
      </div>

      {/* Hero Content - All texts and CTA button visible at once */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-20 w-full">
        <div className="max-w-2xl">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-8 h-1 bg-[#F3A81D] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-slate-200 uppercase">
              KONTAKT
            </span>
          </div>

          {/* Headline - Fades in */}
          <h1 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.14] sm:leading-[1.12] mb-3 sm:mb-4`}>
            Lassen Sie uns über<br />
            <span className="text-[#F3A81D] drop-shadow-[0_2px_14px_rgba(243,168,29,0.35)]">
              Ihr Projekt
            </span>{' '}
            sprechen.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-6 sm:mb-7 max-w-xl">
            Sie haben Fragen oder planen ein neues Vorhaben? Wir sind gerne für Sie da.
          </p>

          {/* Button - Slides in from Left */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact-form"
              onClick={scrollToForm}
              className={`anim-slide-left ${isVisible ? 'is-visible' : ''} inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#D81E26] hover:bg-[#BE161D] text-white font-semibold text-sm sm:text-base tracking-wide shadow-lg shadow-red-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer`}
            >
              <span>Jetzt Kontakt aufnehmen</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
