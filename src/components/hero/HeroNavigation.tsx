import React, { useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

export type AppPage = 'home' | 'about' | 'services' | 'contact'

interface HeroNavigationProps {
  scrollProgress?: number
  currentPage?: AppPage
  onNavigate?: (page: AppPage) => void
}

export const HeroNavigation: React.FC<HeroNavigationProps> = ({
  currentPage = 'home',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLinkClick = (
    e: React.MouseEvent,
    page?: AppPage,
    href?: string
  ) => {
    if (page && onNavigate) {
      e.preventDefault()
      onNavigate(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setMobileMenuOpen(false)
      return
    }

    if (currentPage !== 'home' && href?.startsWith('#') && href !== '#') {
      if (onNavigate) {
        e.preventDefault()
        onNavigate('home')
        setTimeout(() => {
          const el = document.querySelector(href)
          el?.scrollIntoView({ behavior: 'smooth' })
        }, 120)
      }
    }

    setMobileMenuOpen(false)
  }

  const isHome = currentPage === 'home'
  const isAbout = currentPage === 'about'
  const isServices = currentPage === 'services'
  const isContact = currentPage === 'contact'
  const isDarkBar = isAbout || isServices || isContact

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-auto">
      {/* Top vignette / background scrim */}
      <div
        className={`absolute inset-x-0 top-0 transition-all duration-300 pointer-events-none ${
          isDarkBar
            ? 'h-full bg-[#061122]/90 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'h-28 cinematic-top-gradient'
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 sm:py-6 flex items-center justify-between">
        {/* Left: Official ADAMAS Logo */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center group transition-opacity duration-200 hover:opacity-90"
        >
          <img
            src="/assets/adamas_logo_darkbg.png"
            alt="ADAMAS Elektrotechnik"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain"
          />
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Home */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, 'home')}
            className={`relative text-sm font-medium tracking-wide transition-colors duration-200 py-1 ${
              isHome ? 'text-white' : 'text-slate-200/80 hover:text-white'
            }`}
          >
            Home
            {isHome && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F3A81D] rounded-full shadow-[0_0_8px_rgba(243,168,29,0.7)]" />
            )}
          </a>

          {/* Über uns */}
          <a
            href="#ueber-uns"
            onClick={(e) => handleLinkClick(e, 'about')}
            className={`relative text-sm font-medium tracking-wide transition-colors duration-200 py-1 ${
              isAbout ? 'text-white' : 'text-slate-200/80 hover:text-white'
            }`}
          >
            Über uns
            {isAbout && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F3A81D] rounded-full shadow-[0_0_8px_rgba(243,168,29,0.7)]" />
            )}
          </a>

          {/* Leistungen */}
          <a
            href="#leistungen"
            onClick={(e) => handleLinkClick(e, 'services')}
            className={`relative text-sm font-medium tracking-wide transition-colors duration-200 py-1 ${
              isServices ? 'text-white' : 'text-slate-200/80 hover:text-white'
            }`}
          >
            Leistungen
            {isServices && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F3A81D] rounded-full shadow-[0_0_8px_rgba(243,168,29,0.7)]" />
            )}
          </a>

          {/* Kontakt */}
          <a
            href="#kontakt"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className={`relative text-sm font-medium tracking-wide transition-colors duration-200 py-1 ${
              isContact ? 'text-white' : 'text-slate-200/80 hover:text-white'
            }`}
          >
            Kontakt
            {isContact && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F3A81D] rounded-full shadow-[0_0_8px_rgba(243,168,29,0.7)]" />
            )}
          </a>
        </nav>

        {/* Right: CTA Button - Slides in from Right */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#kontakt"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="anim-slide-right is-visible inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F3A81D] hover:bg-[#DF930A] text-[#070B12] font-semibold text-sm tracking-tight shadow-lg shadow-black/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer"
          >
            <span>Angebot anfragen</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-[#F3A81D] transition-colors focus:outline-none"
          aria-label="Navigation umschalten"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070B12]/98 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, 'home')}
              className={`text-base font-medium py-1 flex items-center justify-between ${
                isHome ? 'text-[#F3A81D]' : 'text-slate-200 hover:text-white'
              }`}
            >
              <span>Home</span>
              {isHome && <span className="w-1.5 h-1.5 rounded-full bg-[#F3A81D]" />}
            </a>

            <a
              href="#ueber-uns"
              onClick={(e) => handleLinkClick(e, 'about')}
              className={`text-base font-medium py-1 flex items-center justify-between ${
                isAbout ? 'text-[#F3A81D]' : 'text-slate-200 hover:text-white'
              }`}
            >
              <span>Über uns</span>
              {isAbout && <span className="w-1.5 h-1.5 rounded-full bg-[#F3A81D]" />}
            </a>

            <a
              href="#leistungen"
              onClick={(e) => handleLinkClick(e, 'services')}
              className={`text-base font-medium py-1 flex items-center justify-between ${
                isServices ? 'text-[#F3A81D]' : 'text-slate-200 hover:text-white'
              }`}
            >
              <span>Leistungen</span>
              {isServices && <span className="w-1.5 h-1.5 rounded-full bg-[#F3A81D]" />}
            </a>

            <a
              href="#kontakt"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className={`text-base font-medium py-1 flex items-center justify-between ${
                isContact ? 'text-[#F3A81D]' : 'text-slate-200 hover:text-white'
              }`}
            >
              <span>Kontakt</span>
              {isContact && <span className="w-1.5 h-1.5 rounded-full bg-[#F3A81D]" />}
            </a>
          </nav>

          <div className="pt-2 border-t border-white/10">
            <a
              href="#kontakt"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#F3A81D] text-[#070B12] font-semibold text-sm tracking-tight shadow-lg"
            >
              <span>Angebot anfragen</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
