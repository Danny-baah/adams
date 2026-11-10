import React, { useState } from 'react'
import { ArrowRight, Phone, CheckCircle, X } from 'lucide-react'
import { AppPage } from '../hero/HeroNavigation'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

interface ContactCtaSectionProps {
  onNavigate?: (page: AppPage) => void
}

export const ContactCtaSection: React.FC<ContactCtaSectionProps> = ({ onNavigate }) => {
  const { ref, isVisible } = useScrollAnimation()
  const [modalOpen, setModalOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleContactClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate('contact')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setModalOpen(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setModalOpen(false)
    }, 2500)
  }

  return (
    <section ref={ref} id="kontakt" className="relative py-14 sm:py-18 lg:py-20 bg-[#070B12] text-white overflow-hidden border-t border-slate-800/80">
      {/* Background Twilight Villa Image with Clean Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero_villa_smart.webp"
          alt="ADAMAS Elektrotechnik"
          className="w-full h-full object-cover opacity-25 filter brightness-70 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B12] via-[#070B12]/90 to-[#070B12]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-transparent to-[#070B12]/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
        <div className="max-w-2xl">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-5 h-[2px] bg-[#D81E26]" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D81E26] uppercase">
              JETZT KONTAKT AUFNEHMEN
            </span>
          </div>

          {/* Main Headline - Fades in when section is active */}
          <h2 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-4`}>
            Bereit für Ihr<br />
            nächstes <span className="text-[#F3A81D] drop-shadow-[0_2px_12px_rgba(243,168,29,0.3)]">Projekt?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-6 max-w-xl">
            Ob Elektroinstallation, Modernisierung oder Smart Home &ndash; wir beraten Sie gerne und finden die passende Lösung.
          </p>

          {/* Action Row: Left button slides from left, Right button slides from right */}
          <div className="flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={handleContactClick}
              className={`anim-slide-left ${isVisible ? 'is-visible' : ''} inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#D81E26] hover:bg-[#BE161D] text-white font-semibold text-sm sm:text-base shadow-lg shadow-red-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer`}
            >
              <span>Kontakt aufnehmen</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <a
              href="tel:+49214508185"
              className={`anim-slide-right ${isVisible ? 'is-visible' : ''} delay-150 inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/20 text-white font-medium text-sm sm:text-base backdrop-blur-md transition-all duration-200`}
            >
              <Phone className="w-4 h-4 text-[#F3A81D]" />
              <span>+49 214 50 81 85</span>
            </a>
          </div>

        </div>
      </div>

      {/* Interactive Contact Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0E1E38] text-white rounded-3xl p-8 border border-white/15 shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <CheckCircle className="w-16 h-16 text-[#F3A81D] mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold mb-2">Vielen Dank für Ihre Anfrage!</h3>
                <p className="text-slate-300 text-sm">
                  Wir haben Ihre Nachricht erhalten und melden uns zeitnah bei Ihnen.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-xs font-bold tracking-widest text-[#F3A81D] uppercase">
                    ADAMAS ELEKTROTECHNIK
                  </span>
                  <h3 className="text-2xl font-bold mt-1">Projekt anfragen</h3>
                  <p className="text-slate-300 text-sm mt-1">
                    Hinterlassen Sie uns Ihre Kontaktdaten &ndash; wir melden uns schnellstmöglich.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ihr vollständiger Name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#F3A81D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        E-Mail *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="ihre@email.de"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#F3A81D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Telefonnummer
                      </label>
                      <input
                        type="tel"
                        placeholder="+49 ..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#F3A81D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Ihr Anliegen / Projektbeschreibung
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Beschreiben Sie kurz Ihr Vorhaben (z.B. Wallbox-Installation, Smart Home, Sanierung)..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#F3A81D]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#D81E26] hover:bg-[#BE161D] text-white font-semibold text-sm tracking-wide shadow-lg shadow-red-950/40 transition-colors"
                  >
                    Anfrage absenden &rarr;
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
