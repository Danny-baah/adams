import React from 'react'
import { ExternalLink, MapPin, ShieldCheck, Settings } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useCookieConsent } from '../../utils/cookieConsent'

export const ContactMapSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()
  const { preferences, acceptExternalMedia, openSettings } = useCookieConsent()

  const isMapAllowed = preferences.externalMedia

  return (
    <section
      ref={ref}
      className="relative w-full bg-slate-900 overflow-hidden border-t border-slate-800"
      aria-label="Standort und Anfahrt ADAMAS Elektrotechnik"
    >
      {isMapAllowed ? (
        /* Interaktive Google Maps Karte (Wenn Externe Medien akzeptiert wurden) */
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

          {/* Bottom subtle consent notice with link to change settings */}
          <div className="absolute inset-x-0 bottom-0 bg-[#041633]/85 backdrop-blur-sm py-2 px-4 text-center text-[11px] text-slate-300 border-t border-white/10 flex items-center justify-center gap-2">
            <span>Karte bereitgestellt über Google Maps.</span>
            <button
              type="button"
              onClick={openSettings}
              className="text-[#F3A81D] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <Settings className="w-3 h-3" />
              <span>Einwilligung ändern</span>
            </button>
          </div>
        </div>
      ) : (
        /* DSGVO 2-Klick-Lösung: Google Maps ist blockiert bis Einwilligung erteilt wird */
        <div className="relative w-full min-h-[340px] sm:min-h-[400px] md:min-h-[460px] flex items-center justify-center overflow-hidden p-6 sm:p-10">
          {/* Blurred / Dimmed Static Map Preview Background (Keine externen Requests!) */}
          <div className="absolute inset-0 z-0">
            <img
              src="/contact/contact_map_leverkusen.jpg"
              alt="Statische Vorschau Standort Leverkusen"
              className="w-full h-full object-cover filter blur-[6px] brightness-30 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#041633]/90 via-[#041633]/80 to-[#041633]/95" />
          </div>

          {/* Privacy Consent Box */}
          <div className={`anim-fade-in ${isVisible ? 'is-visible' : ''} relative z-10 max-w-xl w-full bg-[#041633]/95 border border-white/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center text-white shadow-2xl shadow-black/70`}>
            {/* Header Icon */}
            <div className="w-12 h-12 mx-auto mb-3.5 rounded-2xl bg-[#092654] border border-[#F3A81D]/30 flex items-center justify-center text-[#F3A81D] shadow-lg shadow-black/40">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-slate-300 tracking-wider uppercase mb-2">
              <MapPin className="w-3 h-3 text-[#F3A81D]" />
              <span>Datenschutz &middot; Externe Medien</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
              Google Maps ist derzeit deaktiviert
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-md mx-auto">
              Um die interaktive Anfahrtskarte und den Routenplaner anzuzeigen, ist Ihre Einwilligung zur Kategorie „Externe Medien“ erforderlich. Beim Laden können personenbezogene Daten (wie Ihre IP-Adresse) an Google übertragen werden.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={acceptExternalMedia}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#D81E26] hover:bg-[#BE161D] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Karte laden &amp; Externe Medien akzeptieren</span>
              </button>

              <button
                type="button"
                onClick={openSettings}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                <Settings className="w-4 h-4 text-[#F3A81D]" />
                <span>Einstellungen anpassen</span>
              </button>
            </div>

            {/* External Link Fallback */}
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-400">
              <a
                href="https://maps.google.com/?q=ADAMAS+Elektrotechnik+Maybachstr.+37+51381+Leverkusen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white hover:underline transition-colors"
              >
                <span>Alternativ direkt auf Google Maps öffnen</span>
                <ExternalLink className="w-3 h-3 text-[#F3A81D]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
