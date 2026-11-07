import React from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export const PartnersMarquee: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()
  // Official partners from https://elektro-adamas.de/ & brand references
  const partners = [
    { name: 'ABB', logo: '/partners/abb.svg', height: 'h-8 sm:h-10' },
    { name: 'Gira', logo: '/partners/gira.png', height: 'h-8 sm:h-10' },
    { name: 'Hager', logo: '/partners/hager.png', height: 'h-8 sm:h-10' },
    { name: 'KNX', logo: '/partners/knx.svg', height: 'h-8 sm:h-10' },
    { name: 'Mennekes', logo: '/partners/mennekes.svg', height: 'h-7 sm:h-9' },
    { name: 'Siemens', logo: '/partners/siemens.svg', height: 'h-8 sm:h-10' },
    { name: 'Busch-Jaeger', logo: '/partners/busch-jaeger.png', height: 'h-9 sm:h-11' },
    { name: 'SSS Siedle', logo: '/partners/siedle.png', height: 'h-7 sm:h-9' },
    { name: 'Theben', logo: '/partners/theben.png', height: 'h-8 sm:h-10' },
    { name: 'Eltako', logo: '/partners/eltako.png', height: 'h-8 sm:h-10' },
    { name: 'Brumberg', logo: '/partners/brumberg.png', height: 'h-7 sm:h-9' },
    { name: 'Philips Leuchten', logo: '/partners/philips.png', height: 'h-9 sm:h-11' },
    { name: 'Vaillant', logo: '/partners/vaillant.png', height: 'h-8 sm:h-10' },
    { name: 'SLV', logo: '/partners/slv.png', height: 'h-8 sm:h-10' },
  ]

  return (
    <section ref={ref} id="partner" className="relative py-20 sm:py-28 bg-[#F8FAFC] text-slate-900 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-6 h-[2.5px] bg-[#D81E26]" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D81E26] uppercase">
            UNSERE PARTNER
          </span>
        </div>

        {/* Headline - Fades in when section is in view */}
        <h2 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0E1E38] tracking-tight leading-[1.16] mb-3`}>
          Starke Marken an unserer Seite.
        </h2>

        {/* Yellow Accent Bar */}
        <div className="w-16 h-1.5 bg-[#F3A81D] rounded-full" />
      </div>

      {/* Marquee Banner Container - Single large continuous white card matching reference */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative bg-white rounded-2xl py-8 sm:py-10 px-4 border border-slate-200/90 shadow-md shadow-slate-200/50 overflow-hidden group">
          
          {/* Left Gradient Fade Mask */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />

          {/* Right Gradient Fade Mask */}
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

          {/* Continuous Infinite Marquee Track */}
          <div className="animate-marquee-smooth flex items-center">
            {/* Set 1 */}
            <div className="flex items-center gap-12 sm:gap-16 px-6 sm:px-8">
              {partners.map((p, idx) => (
                <div
                  key={`p1-${idx}`}
                  className="flex items-center justify-center flex-shrink-0 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
                  title={p.name}
                >
                  <img
                    src={p.logo}
                    alt={`${p.name} Partner`}
                    className={`${p.height} w-auto max-w-[160px] sm:max-w-[200px] object-contain`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Set 2 for seamless loop */}
            <div className="flex items-center gap-12 sm:gap-16 px-6 sm:px-8">
              {partners.map((p, idx) => (
                <div
                  key={`p2-${idx}`}
                  className="flex items-center justify-center flex-shrink-0 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
                  title={p.name}
                >
                  <img
                    src={p.logo}
                    alt={`${p.name} Partner`}
                    className={`${p.height} w-auto max-w-[160px] sm:max-w-[200px] object-contain`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
