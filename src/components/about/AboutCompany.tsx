import React from 'react'
import { Calendar, MapPin } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { AiGeneratedBadge } from '../common/AiGeneratedBadge'

export const AboutCompany: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="relative py-24 sm:py-32 bg-white text-slate-900 overflow-hidden border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Photo Collage (Villa, Fuses, Cable Trays) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/80 border border-slate-200/90 group">
              <AiGeneratedBadge position="top-3 left-3 sm:top-4 sm:left-4" />
              <img
                src="/about/about_collage_full.jpg"
                alt="ADAMAS moderne Elektrotechnik und zukunftsfähige Installationen"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Copy & Facts */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[2.5px] bg-[#D81E26]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D81E26] uppercase">
                ÜBER ADAMAS
              </span>
            </div>

            {/* Headline - Fades in */}
            <h2 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0E1E38] tracking-tight leading-[1.18] mb-6`}>
              Ein starker Partner<br />
              für <span className="text-[#D81E26]">moderne Elektrotechnik.</span>
            </h2>

            {/* Paragraphs */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-5">
              Seit 1998 steht ADAMAS Elektrotechnik für hochwertige Elektroinstallationen und durchdachte technische Lösungen.
            </p>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8">
              Mit Sitz in Leverkusen betreuen wir private und gewerbliche Kunden. Dabei verbinden wir langjährige Erfahrung, technisches Know-how und moderne Technologien, um zuverlässige Lösungen für unterschiedliche Anforderungen zu realisieren.
            </p>

            {/* Key Facts Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
              {/* Fact 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D81E26] flex items-center justify-center border border-red-100">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-bold text-[#0E1E38] leading-tight">
                    Seit 1998
                  </span>
                </div>
              </div>

              {/* Yellow vertical divider bar */}
              <div className="w-1 h-8 bg-[#F3A81D] rounded-full hidden sm:block" />

              {/* Fact 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D81E26] flex items-center justify-center border border-red-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-bold text-[#0E1E38] leading-tight">
                    Sitz in Leverkusen
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

