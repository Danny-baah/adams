import React from 'react'
import {
  Scale,
  ShieldCheck,
  FileText,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Home,
} from 'lucide-react'
import { HeroNavigation, AppPage } from '../hero/HeroNavigation'
import { ImpressumView } from './ImpressumView'
import { DatenschutzView } from './DatenschutzView'
import { AgbView } from './AgbView'
import { Footer } from '../sections/Footer'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export type LegalDoc = 'impressum' | 'datenschutz' | 'agb'

interface LegalPageProps {
  activeDoc: LegalDoc
  onNavigate: (page: AppPage) => void
}

export const LegalPage: React.FC<LegalPageProps> = ({
  activeDoc,
  onNavigate,
}) => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation()

  const tabs: { id: LegalDoc; label: string; icon: React.ReactNode; page: AppPage }[] = [
    {
      id: 'impressum',
      label: 'Impressum',
      icon: <Scale className="w-4 h-4" />,
      page: 'impressum',
    },
    {
      id: 'datenschutz',
      label: 'Datenschutzerklärung',
      icon: <ShieldCheck className="w-4 h-4" />,
      page: 'datenschutz',
    },
    {
      id: 'agb',
      label: 'AGB',
      icon: <FileText className="w-4 h-4" />,
      page: 'agb',
    },
  ]

  const getDocTitle = () => {
    switch (activeDoc) {
      case 'impressum':
        return 'Impressum'
      case 'datenschutz':
        return 'Datenschutzerklärung'
      case 'agb':
        return 'Allgemeine Geschäftsbedingungen'
      default:
        return 'Rechtliche Hinweise'
    }
  }

  const getDocSubtitle = () => {
    switch (activeDoc) {
      case 'impressum':
        return 'Gesetzliche Pflichtangaben und Anbieterkennzeichnung nach § 5 DDG'
      case 'datenschutz':
        return 'Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO'
      case 'agb':
        return 'Vertragsbedingungen und Grundlagen für handwerkliche Leistungen der Adamas Elektrotechnik'
      default:
        return 'Transparenz, Rechtssicherheit und Verbindlichkeit'
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col justify-between">
      {/* 1. Header Navigation Bar */}
      <HeroNavigation currentPage={activeDoc} onNavigate={onNavigate} />

      {/* 2. Legal Hero Header Section */}
      <section
        ref={heroRef}
        className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 bg-[#011429] text-white overflow-hidden border-b border-white/10"
      >
        {/* Subtle Ambient Blueprint Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#F3A81D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mb-6">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-white inline-flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-[#F3A81D]" />
              <span>Startseite</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300">Rechtliches</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#F3A81D] font-medium">{getDocTitle()}</span>
          </nav>

          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-8 h-[2px] bg-[#F3A81D]" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F3A81D]">
              RECHTLICHE HINWEISE
            </span>
          </div>

          {/* Main Headline - Animated Fade In */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 anim-fade-in ${
              heroVisible ? 'is-visible' : ''
            }`}
          >
            {getDocTitle()}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
            {getDocSubtitle()}
          </p>

          {/* Document Switcher Tab Bar */}
          <div className="inline-flex flex-wrap gap-2 p-1.5 bg-[#061B36] rounded-2xl border border-white/10 shadow-lg">
            {tabs.map((tab) => {
              const isActive = activeDoc === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onNavigate(tab.page)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#D81E26] text-white shadow-md shadow-red-950/30 scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-[#F3A81D]'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Document Content */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-16 w-full flex-grow">
        {activeDoc === 'impressum' && <ImpressumView onNavigate={onNavigate} />}
        {activeDoc === 'datenschutz' && <DatenschutzView onNavigate={onNavigate} />}
        {activeDoc === 'agb' && <AgbView onNavigate={onNavigate} />}

        {/* Bottom Actions: Back to Home & Contact */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="anim-slide-left is-visible inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-200 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4 text-[#D81E26]" />
            <span>Zurück zur Startseite</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="anim-slide-right is-visible inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D81E26] hover:bg-[#BE161D] text-white font-semibold text-sm shadow-md shadow-red-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Fragen? Kontaktieren Sie uns</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* 4. Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  )
}
