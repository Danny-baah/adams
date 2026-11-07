import React from 'react'
import { Calendar, MapPin } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export const AboutHero: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 bg-[#011429] text-white overflow-hidden">
      {/* Background Graphic Photo: Clean Switchboard Installation from elektro-adamas.de (Zero Faces, Zero Ghost Text) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/about/about_hero_clean.jpg"
          alt="ADAMAS Elektrotechnik Erfahrung und Zukunft"
          className="w-full h-full object-cover object-[center_center] filter brightness-90"
        />
        {/* Left-to-right dark navy gradient mask so text is 100% legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#011429] via-[#011429]/85 to-transparent w-full sm:w-4/5 lg:w-3/5" />
        {/* Soft bottom vignette for seamless section transition */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#011429] to-transparent pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-20">
        <div className="max-w-2xl">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-1 bg-[#F3A81D] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-slate-200 uppercase">
              ÜBER ADAMAS
            </span>
          </div>

          {/* Headline - Fades in */}
          <h1 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-white tracking-tight leading-[1.12] mb-5`}>
            Elektrotechnik mit<br />
            Erfahrung. Lösungen<br />
            <span className="text-[#F3A81D] drop-shadow-[0_2px_14px_rgba(243,168,29,0.35)]">
              mit Zukunft.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-xl">
            Seit 1998 steht ADAMAS Elektrotechnik für hochwertige Elektroinstallationen und durchdachte technische Lösungen.
          </p>

          {/* Badges Row - Left badge slides left, Right badge slides right */}
          <div className="flex flex-wrap items-center gap-3.5">
            <div className={`anim-slide-left ${isVisible ? 'is-visible' : ''} inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D81E26] text-white font-bold text-sm shadow-lg shadow-red-950/40`}>
              <Calendar className="w-4 h-4" />
              <span>Seit 1998</span>
            </div>

            <div className={`anim-slide-right ${isVisible ? 'is-visible' : ''} delay-150 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E1E38]/80 hover:bg-[#0E1E38] border border-white/25 text-white font-medium text-sm backdrop-blur-md`}>
              <MapPin className="w-4 h-4 text-white" />
              <span>Sitz in Leverkusen</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
