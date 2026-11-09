import React, { useState, useEffect } from 'react'
import {
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Lock,
} from 'lucide-react'
import { AppPage } from '../hero/HeroNavigation'

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  externalMedia: boolean
}

const STORAGE_KEY = 'adamas_cookie_consent'

interface CookieBannerProps {
  onNavigate?: (page: AppPage) => void
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true & required
    analytics: false,
    externalMedia: false,
  })

  useEffect(() => {
    // Check if consent has already been given
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) {
        // Show after a subtle delay (700ms) for pleasant entrance
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 700)
        return () => clearTimeout(timer)
      } else {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed.essential === 'boolean') {
          setPreferences(parsed)
        }
      }
    } catch {
      // Fallback
    }

    // Listen for custom event to re-open settings from footer
    const handleReopen = () => {
      setIsVisible(true)
      setShowDetails(true)
    }

    window.addEventListener('openCookieSettings', handleReopen)
    return () => window.removeEventListener('openCookieSettings', handleReopen)
  }, [])

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch {
      // Storage unavailable
    }
    setPreferences(prefs)
    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      externalMedia: true,
    })
  }

  const handleAcceptEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      externalMedia: false,
    })
  }

  const handleSaveCustom = () => {
    saveConsent(preferences)
  }

  const handleLegalClick = (e: React.MouseEvent, page: AppPage) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(page)
    } else {
      window.location.hash = `/${page}`
    }
  }

  if (!isVisible) return null

  return (
    <aside
      role="region"
      aria-label="Cookie- und Privatsphäre-Einstellungen"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg z-50 bg-[#041633]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/60 text-white p-5 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto"
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

          {/* Category 3: External Media */}
          <label className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3 cursor-pointer hover:bg-white/[0.08] transition-colors">
            <div>
              <span className="font-bold text-white block mb-1">Externe Medien &amp; Karten</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Ermöglicht das Laden interaktiver Kartendienste (wie Google Maps für Anfahrtsbeschreibungen).
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
  )
}
