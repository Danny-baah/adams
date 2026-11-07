import React from 'react'
import { ExternalLink } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export const ContactMapSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="relative w-full bg-slate-100 overflow-hidden border-t border-slate-200">
      {/* Full-width Map Link & Image Container */}
      <a
        href="https://maps.google.com/?q=ADAMAS+Elektrotechnik+Maybachstr.+37+51381+Leverkusen"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full group cursor-pointer overflow-hidden"
        title="ADAMAS Elektrotechnik auf Google Maps öffnen"
      >
        <img
          src="/contact/contact_map_leverkusen.jpg"
          alt="Standort ADAMAS Elektrotechnik Maybachstraße 37 Leverkusen"
          className="w-full h-auto min-h-[220px] sm:min-h-[280px] lg:min-h-[340px] max-h-[460px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Hover Pill Cue in Top-Right - Slides in from Right */}
        <div className={`anim-slide-right ${isVisible ? 'is-visible' : ''} absolute top-4 right-4 sm:top-6 sm:right-8 z-10 opacity-90 group-hover:opacity-100 transition-opacity`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E1E38]/90 text-white font-medium text-xs sm:text-sm backdrop-blur-md shadow-lg border border-white/20 group-hover:bg-[#D81E26] transition-colors">
            <span>In Google Maps öffnen</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Subtle Bottom Shadow / Border */}
        <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </a>
    </section>
  )
}

