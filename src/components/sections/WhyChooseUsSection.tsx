import React from 'react'
import { Award, ShieldCheck, Target, Handshake } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export const WhyChooseUsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()
  const pillars = [
    {
      title: 'Fachkompetenz',
      description: 'Fundiertes technisches Wissen und langjährige Erfahrung.',
      icon: Award,
    },
    {
      title: 'Sicherheit',
      description: 'Fachgerechte Umsetzung nach geltenden Normen und Standards.',
      icon: ShieldCheck,
    },
    {
      title: 'Präzision',
      description: 'Sorgfältige Planung und saubere, zuverlässige Ausführung.',
      icon: Target,
    },
    {
      title: 'Zuverlässigkeit',
      description: 'Persönliche Betreuung – von der Beratung bis zum Projektabschluss.',
      icon: Handshake,
    },
  ]

  return (
    <section ref={ref} id="warum-adamas" className="relative py-24 sm:py-32 bg-[#F1F5F9] text-slate-900 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Electrical Precision Craftsmanship Photo (Zero Faces) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/70 border border-slate-200/90 group">
              <img
                src="/sections/why_craftsmanship_clean.jpg"
                alt="ADAMAS Elektrotechnik Präzision bei der Arbeit"
                className="w-full h-[440px] sm:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Copy & 2x2 Feature Grid */}
          <div className="lg:col-span-7 flex flex-col order-1 lg:order-2">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[2.5px] bg-[#D81E26]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D81E26] uppercase">
                WARUM ADAMAS
              </span>
            </div>

            {/* Headline - Fades in when section is in view */}
            <h2 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0E1E38] tracking-tight leading-[1.18] mb-3`}>
              Gute Technik beginnt mit guter Arbeit.
            </h2>

            {/* Yellow Accent Bar */}
            <div className="w-16 h-1.5 bg-[#F3A81D] rounded-full mb-6" />

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-10 max-w-2xl">
              Bei ADAMAS verbinden wir Fachkompetenz, technische Präzision und persönliche Betreuung &ndash; für Lösungen, auf die Sie sich verlassen können.
            </p>

            {/* 2x2 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((p) => {
                const Icon = p.icon
                return (
                  <div
                    key={p.title}
                    className="relative bg-white rounded-2xl p-6 shadow-md shadow-slate-200/60 border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-200 group"
                  >
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-blue-50/90 border border-blue-100/70 flex items-center justify-center text-[#0E264D] mb-4 group-hover:bg-[#0E264D] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg font-bold text-[#0E1E38] tracking-tight mb-2">
                        {p.title}
                      </h3>
                      <p className="text-sm text-slate-500 font-normal leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

