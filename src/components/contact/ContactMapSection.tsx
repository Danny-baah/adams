import React from 'react'
import { ExternalLink } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useCookieConsent } from '../../utils/cookieConsent'

export const ContactMapSection: React.FC = () => {
  const { ref } = useScrollAnimation()
  const { preferences } = useCookieConsent()

  // If the user has not accepted external media cookies, simply do not load the map (no text, completely clean)
  if (!preferences.externalMedia) {
    return null
  }

  return (
    <section
      ref={ref}
      className="relative w-full bg-slate-900 overflow-hidden border-t border-slate-800"
      aria-label="Standort und Anfahrt ADAMAS Elektrotechnik"
    >
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] overflow-hidden group">
        <iframe
          title="ADAMAS Elektrotechnik Standort Leverkusen"
          src="https://maps.google.com/maps?q=ADAMAS+Elektrotechnik+Maybachstra%C3%9Fe+37+51381+Leverkusen&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 filter grayscale-[20%] contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Quick External Open Button in Top-Right */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
          <a
            href="https://maps.google.com/?q=ADAMAS+Elektrotechnik+Maybachstr.+37+51381+Leverkusen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#041633]/90 hover:bg-[#D81E26] text-white font-medium text-xs sm:text-sm backdrop-blur-md shadow-lg border border-white/20 transition-all cursor-pointer"
            title="Auf externem Google Maps öffnen"
          >
            <span>In Google Maps öffnen</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
