import React from 'react'
import { Phone, Mail, MapPin, Laptop, ExternalLink } from 'lucide-react'

type AppPage = 'home' | 'about' | 'services' | 'contact'

interface FooterProps {
  onNavigate?: (page: AppPage) => void
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, page: AppPage, href?: string) => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (href && href.startsWith('#') && href !== '#') {
        setTimeout(() => {
          const el = document.querySelector(href)
          el?.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    }
  }

  return (
    <footer className="relative bg-[#041633] text-white overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-10">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-20">
        {/* 4 Columns Grid with Vertical Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 pb-10 sm:pb-12">
          
          {/* Column 1: Logo & Brand Description */}
          <div className="lg:col-span-4 lg:pr-8 flex flex-col justify-start">
            {/* Official ADAMAS Logo */}
            <a
              href="#"
              onClick={(e) => handleNav(e, 'home')}
              className="inline-block mb-6 group transition-opacity duration-200 hover:opacity-90"
            >
              <img
                src="/assets/adamas_logo_darkbg.png"
                alt="ADAMAS Elektrotechnik"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </a>

            <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
              Ihr zuverlässiger Partner für Elektroinstallation, Smart Home, Sicherheitstechnik und mehr &ndash; seit 1998 in Leverkusen.
            </p>
          </div>

          {/* Column 2: Schnellzugriff */}
          <div className="lg:col-span-2 lg:px-6 lg:border-l lg:border-white/15">
            <h4 className="text-base font-bold text-white tracking-wide mb-2">
              Schnellzugriff
            </h4>
            <div className="w-10 h-1 bg-[#F3A81D] mb-5" />

            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNav(e, 'home')}
                  className="hover:text-white transition-colors"
                >
                  Startseite
                </a>
              </li>
              <li>
                <a
                  href="#ueber-uns"
                  onClick={(e) => handleNav(e, 'about')}
                  className="hover:text-white transition-colors"
                >
                  Über uns
                </a>
              </li>
              <li>
                <a
                  href="#leistungen"
                  onClick={(e) => handleNav(e, 'services')}
                  className="hover:text-white transition-colors"
                >
                  Leistungen
                </a>
              </li>
              <li>
                <a
                  href="#kontakt"
                  onClick={(e) => handleNav(e, 'contact')}
                  className="hover:text-white transition-colors"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Unsere Leistungen */}
          <div className="lg:col-span-3 lg:px-6 lg:border-l lg:border-white/15">
            <h4 className="text-base font-bold text-white tracking-wide mb-2">
              Unsere Leistungen
            </h4>
            <div className="w-10 h-1 bg-[#F3A81D] mb-5" />

            <ul className="space-y-3 text-sm text-slate-300">
              <li><a href="#elektroinstallation" onClick={(e) => handleNav(e, 'services', '#elektroinstallation')} className="hover:text-white transition-colors">Elektroinstallation</a></li>
              <li><a href="#smarthome" onClick={(e) => handleNav(e, 'services', '#smarthome')} className="hover:text-white transition-colors">Smart Home &amp; KNX</a></li>
              <li><a href="#sicherheit" onClick={(e) => handleNav(e, 'services', '#sicherheit')} className="hover:text-white transition-colors">Sicherheits- &amp; Kommunikationstechnik</a></li>
              <li><a href="#beleuchtung" onClick={(e) => handleNav(e, 'services', '#beleuchtung')} className="hover:text-white transition-colors">Beleuchtungstechnik</a></li>
              <li><a href="#emobilitaet" onClick={(e) => handleNav(e, 'services', '#emobilitaet')} className="hover:text-white transition-colors">E-Mobilität</a></li>
              <li><a href="#wartung" onClick={(e) => handleNav(e, 'services', '#wartung')} className="hover:text-white transition-colors">Prüfung &amp; Wartung</a></li>
            </ul>
          </div>

          {/* Column 4: Kontakt */}
          <div className="lg:col-span-3 lg:pl-6 lg:border-l lg:border-white/15">
            <h4 className="text-base font-bold text-white tracking-wide mb-2">
              Kontakt
            </h4>
            <div className="w-10 h-1 bg-[#F3A81D] mb-5" />

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#142A52] border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <a href="tel:+49214508185" className="hover:text-white font-medium transition-colors">
                  +49 214 50 81 85
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#142A52] border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a href="mailto:info@adamas-elektrotechnik.de" className="hover:text-white font-medium transition-colors">
                  info@adamas-elektrotechnik.de
                </a>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#142A52] border border-white/10 flex items-center justify-center flex-shrink-0 text-white mt-0.5">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-slate-300 leading-snug">
                  Friedrich-Ebert-Straße 134<br />51373 Leverkusen
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/15 my-6" />

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col items-center gap-4 text-xs text-slate-300">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-center">
            <span>&copy; {new Date().getFullYear()} ADAMAS Elektrotechnik. Alle Rechte vorbehalten.</span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">ABG</a>
          </div>

          {/* Webdesign by EmanCopys */}
          <div className="flex items-center gap-2 pt-2 text-slate-300 text-xs">
            <Laptop className="w-4 h-4 text-[#F3A81D]" />
            <span>Webdesign by</span>
            <a
              href="https://elektro-adamas.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F3A81D] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>EmanCopys</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
