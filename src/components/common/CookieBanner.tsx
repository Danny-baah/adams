import React, { useState, useEffect } from 'react'
import {
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Lock,
  Cookie,
} from 'lucide-react'
import { AppPage } from '../hero/HeroNavigation'
import {
  CookiePreferences,
  DEFAULT_PREFERENCES,
  getStoredPreferences,
  savePreferences,
  EVENT_CONSENT_UPDATED,
  EVENT_OPEN_SETTINGS,
} from '../../utils/cookieConsent'

export type { CookiePreferences }

interface CookieBannerProps {
  onNavigate?: (page: AppPage) => void
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    return getStoredPreferences() || DEFAULT_PREFERENCES
  })

  useEffect(() => {
    // Check if consent has already been saved
    const saved = getStoredPreferences()
    if (!saved) {
      // First visit: Show banner after subtle delay (700ms)
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 700)
      return () => clearTimeout(timer)
    } else {
      setPreferences(saved)
    }

    // Listen for custom event to re-open settings
    const handleReopen = () => {
      setIsVisible(true)
      setShowDetails(true)
    }

    const handleConsentUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CookiePreferences>
      if (customEvent.detail) {
        setPreferences(customEvent.detail)
      }
    }

    window.addEventListener(EVENT_OPEN_SETTINGS, handleReopen)
    window.addEventListener(EVENT_CONSENT_UPDATED, handleConsentUpdate)

    return () => {
      window.removeEventListener(EVENT_OPEN_SETTINGS, handleReopen)
      window.removeEventListener(EVENT_CONSENT_UPDATED, handleConsentUpdate)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      externalMedia: true,
    }
    setPreferences(allAccepted)
    savePreferences(allAccepted)
    setIsVisible(false)
  }

  const handleAcceptEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      externalMedia: false,
    }
    setPreferences(essentialOnly)
    savePreferences(essentialOnly)
    setIsVisible(false)
  }

  const handleSaveCustom = () => {
    savePreferences(preferences)
    setIsVisible(false)
  }

  const handleLegalClick = (e: React.MouseEvent, page: AppPage) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(page)
    } else {
      window.location.hash = `/${page}`
    }
  }

  return (
    <>
      {/* Floating Cookie Settings Icon (always available when banner is dismissed so user can change their mind) */}
      {!isVisible && (
        <aside
          role="complementary"
          aria-label="Cookie-Einstellungen öffnen"
          className="fixed bottom-5 left-5 z-40 group"
        >
          <button
            type="button"
            onClick={() => {
              setIsVisible(true)
              setShowDetails(true)
            }}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#041633]/90 hover:bg-[#07214a] text-slate-200 hover:text-white border border-white/20 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F3A81D]"
            title="Cookie- und Datenschutzeinstellungen ändern"
            aria-label="Cookie- und Datenschutzeinstellungen ändern"
          >
            <div className="w-6 h-6 rounded-full bg-[#F3A81D]/20 text-[#F3A81D] flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
              <Cookie className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline text-xs font-semibold tracking-wide">
              Privatsphäre &amp; Cookies
            </span>
          </button>
        </aside>
      )}

      {/* Main Cookie Banner Modal on the Bottom Right */}
      {isVisible && (
        <aside
          role="region"
          aria-label="Cookie- und Privatsphäre-Einstellungen"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-50 bg-[#041633]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/60 text-white p-5 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-start gap-3.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#092654] border border-white/15 flex items-center justify-center flex-shrink-0 text-[#F3A81D] mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#F3A81D] uppercase block">
                ADAMAS ELEKTROTECHNIK
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Privatsphäre &amp; Cookies
              </h3>
            </div>
          </div>

          {/* Main Text */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Wir verwenden Cookies und Technologien, um unsere Website für Sie optimal zu gestalten. Essenzielle Cookies sind für den Betrieb erforderlich. Sie können selbst entscheiden, welche Kategorien Sie zulassen möchten.
          </p>

          {/* Expandable Details Accordion */}
          {showDetails && (
            <div className="space-y-3 mb-4 pt-2 border-t border-white/10 text-xs">
              {/* Category 1: Essential */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white mb-1">
                    <Lock className="w-3.5 h-3.5 text-[#F3A81D]" />
                    <span>Essenziell (technisch notwendig)</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Erforderlich für grundlegende Funktionen (z.&nbsp;B. Speicherung Ihrer Cookie-Einwilligung, Navigation).
                  </p>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 bg-white/10 px-2 py-0.5 rounded flex-shrink-0">
                  Immer aktiv
                </span>
              </div>

              {/* Category 2: Analytics */}
              <label className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3 cursor-pointer hover:bg-white/[0.08] transition-colors">
                <div>
                  <span className="font-bold text-white block mb-1">Statistik &amp; Analyse</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Anonymisierte Auswertung (ohne Nutzerprofile), um Fehler zu erkennen und Inhalte zu verbessern.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-white/30 text-[#D81E26] focus:ring-0 cursor-pointer mt-1"
                />
              </label>

              {/* Category 3: External Media & Maps */}
              <label className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3 cursor-pointer hover:bg-white/[0.08] transition-colors">
                <div>
                  <span className="font-bold text-white block mb-1">Externe Medien &amp; Google Maps</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Ermöglicht das Laden externer Medien und interaktiver Kartendienste (wie Google Maps für Anfahrtsbeschreibungen). Bei Deaktivierung werden keine externen Daten geladen.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.externalMedia}
                  onChange={(e) =>
                    setPreferences({ ...preferences, externalMedia: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-white/30 text-[#D81E26] focus:ring-0 cursor-pointer mt-1"
                />
              </label>
            </div>
          )}

          {/* Button Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#D81E26] hover:bg-[#BE161D] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Alle akzeptieren</span>
            </button>

            {showDetails ? (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-[#F3A81D] hover:bg-[#DF930A] text-[#070B12] text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Auswahl speichern
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                Nur essenzielle
              </button>
            )}
          </div>

          {/* Toggle Details & Legal Links */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 mt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1 text-[#F3A81D] hover:underline font-medium cursor-pointer"
            >
              <Settings className="w-3 h-3" />
              <span>{showDetails ? 'Weniger anzeigen' : 'Einstellungen anpassen'}</span>
              {showDetails ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>

            <div className="flex items-center gap-2.5">
              <a
                href="#/impressum"
                onClick={(e) => handleLegalClick(e, 'impressum')}
                className="hover:text-white transition-colors underline"
              >
                Impressum
              </a>
              <span>&middot;</span>
              <a
                href="#/datenschutz"
                onClick={(e) => handleLegalClick(e, 'datenschutz')}
                className="hover:text-white transition-colors underline"
              >
                Datenschutz
              </a>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}
