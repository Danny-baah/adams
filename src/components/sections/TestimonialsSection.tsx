import React from 'react'
import { Star, Quote } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export const TestimonialsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()
  const testimonials = [
    {
      initials: 'MK',
      name: 'Michael K.',
      location: 'Leverkusen',
      text: 'Zuverlässige, saubere und professionelle Arbeit. Die Wallbox-Installation verlief absolut reibungslos.',
      rating: 5,
    },
    {
      initials: 'SR',
      name: 'Stefanie R.',
      location: 'Köln',
      text: 'Kompetente Beratung, faire Umsetzung und ein sehr freundliches Team. Wir sind rundum zufrieden.',
      rating: 5,
    },
    {
      initials: 'TB',
      name: 'Thomas B.',
      location: 'Düsseldorf',
      text: 'Moderne Technik, pünktliche Ausführung und hohe Qualität. ADAMAS ist eine klare Empfehlung.',
      rating: 5,
    },
  ]

  return (
    <section ref={ref} id="kundenstimmen" className="relative py-24 sm:py-32 bg-white text-slate-900 border-t border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[2.5px] bg-[#D81E26]" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D81E26] uppercase">
              KUNDENSTIMMEN
            </span>
          </div>

          {/* Headline - Fades in when section is in view */}
          <h2 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0E1E38] tracking-tight leading-[1.16] mb-3`}>
            Das sagen unsere Kunden.
          </h2>

          {/* Yellow Accent Bar */}
          <div className="w-16 h-1.5 bg-[#F3A81D] rounded-full" />
        </div>

        {/* Testimonials 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative bg-white rounded-2xl p-8 border border-slate-200/90 shadow-md shadow-slate-100 flex flex-col justify-between hover:shadow-xl hover:border-slate-300 transition-all duration-300"
            >
              {/* Top Quote Icon */}
              <div className="text-[#F3A81D] mb-5">
                <Quote className="w-9 h-9 fill-[#F3A81D]/20 stroke-[#F3A81D]" />
              </div>

              {/* Quote Body */}
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-8 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author Row */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200/80 flex items-center justify-center font-bold text-sm text-[#0E264D]">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#0E1E38] leading-tight">
                      {t.name}
                    </h4>
                    <span className="text-xs text-slate-500 font-normal">
                      {t.location}
                    </span>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-[#F3A81D]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F3A81D] stroke-[#F3A81D]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

