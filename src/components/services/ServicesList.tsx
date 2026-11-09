import React from 'react'
import {
  ArrowRight,
  Home,
  Lightbulb,
  Zap,
  Settings,
  SlidersHorizontal,
  Cpu,
  Smartphone,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  Lock,
  Network,
  Sun,
  Building2,
  Eye,
  Car,
  Gauge,
  FileCheck,
  ClipboardCheck,
  ShieldAlert,
  Activity,
  Wrench,
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { AiGeneratedBadge } from '../common/AiGeneratedBadge'

interface ServiceData {
  id: string
  number: string
  titleLight: string
  titleHighlight: string
  intro: string
  image: string
  imageAlt: string
  imageOnLeft: boolean
  bgClass: string
  customImageFrame?: boolean
  isAiGenerated?: boolean
  checklist: {
    icon: React.ElementType
    text: string
  }[]
}

const SERVICES_DATA: ServiceData[] = [
  {
    id: 'elektroinstallation',
    number: '01',
    titleLight: 'Klassische',
    titleHighlight: 'Elektroinstallation',
    intro:
      'Eine zuverlässige Elektroinstallation ist die Grundlage für Sicherheit, Komfort und einen reibungslosen Alltag. ADAMAS Elektrotechnik übernimmt die fachgerechte Neuinstallation und Sanierung elektrischer Leitungen für private und gewerbliche Gebäude.',
    image: '/services/service_1_panel.jpg',
    imageAlt: 'ADAMAS Klassische Elektroinstallation Schaltschrank',
    imageOnLeft: true,
    bgClass: 'bg-white',
    customImageFrame: true, // uses the extracted frame directly
    isAiGenerated: true,
    checklist: [
      {
        icon: Home,
        text: 'Neuinstallation und Sanierung elektrischer Leitungen',
      },
      {
        icon: Lightbulb,
        text: 'Anschlüsse für Beleuchtung und Lichtsysteme',
      },
      {
        icon: Zap,
        text: 'Installation von Steckdosen und Geräteanschlüssen',
      },
      {
        icon: Settings,
        text: 'Elektroinstallationen im Innen- und Außenbereich',
      },
    ],
  },
  {
    id: 'smarthome',
    number: '02',
    titleLight: 'Smart Home &',
    titleHighlight: 'Bussysteme (KNX)',
    intro:
      'Verlegung von Steuerleitungen (z. B. KNX) zur intelligenten Vernetzung von Beleuchtung, Heizung, Beschattung und Multimedia für maximalen Komfort und höchste Energieeffizienz.',
    image: '/services/smarthome_hd.jpg',
    imageAlt: 'ADAMAS Smart Home KNX Gebäudeautomation',
    imageOnLeft: false, // Text Left, Image Right
    bgClass: 'bg-[#F8FAFC]',
    isAiGenerated: true,
    checklist: [
      {
        icon: SlidersHorizontal,
        text: 'Intelligente Vernetzung von Beleuchtung, Heizung & Beschattung',
      },
      {
        icon: Cpu,
        text: 'Planung und herstellerunabhängige KNX-Programmierung',
      },
      {
        icon: Smartphone,
        text: 'Zentrale Steuerung via Touchpanel, Tablet und Smartphone',
      },
      {
        icon: Sparkles,
        text: 'Zukunftssichere Automatisierung und spürbare Energieoptimierung',
      },
    ],
  },
  {
    id: 'sicherheit',
    number: '03',
    titleLight: 'Sicherheits- &',
    titleHighlight: 'Kommunikationstechnik',
    intro:
      'Moderne Sicherheitstechnik schützt, was Ihnen wichtig ist. Wir installieren zukunftsfähige Videoüberwachung, IP-Gegensprechanlagen und intelligente Alarmsysteme für private und gewerbliche Gebäude.',
    image: '/services/security_hd.jpg',
    imageAlt: 'ADAMAS Videoüberwachung und Sicherheitstechnik',
    imageOnLeft: true, // Image Left, Text Right
    bgClass: 'bg-white',
    isAiGenerated: true,
    checklist: [
      {
        icon: ShieldCheck,
        text: 'Moderne Videoüberwachung (CCTV) mit hochauflösendem Fernzugriff',
      },
      {
        icon: PhoneCall,
        text: 'IP-Gegensprechanlagen mit Videoübertragung und Türöffner-Funktion',
      },
      {
        icon: Lock,
        text: 'Elektronische Zutrittskontroll- und moderne Schließsysteme',
      },
      {
        icon: Network,
        text: 'Strukturierte Netzwerk- und Datenverkabelung nach Industriestandard',
      },
    ],
  },
  {
    id: 'beleuchtung',
    number: '04',
    titleLight: 'Moderne',
    titleHighlight: 'Beleuchtungstechnik',
    intro:
      'Licht schafft Atmosphäre, Orientierung und Sicherheit. Wir realisieren individuelle Lichtkonzepte für Wohnräume, Büros, Industriehallen sowie stilvolle Außen- und Fassadenbeleuchtungen.',
    image: '/services/lighting_hd.jpg',
    imageAlt: 'ADAMAS Beleuchtungstechnik und Lichtkonzepte',
    imageOnLeft: false, // Text Left, Image Right
    bgClass: 'bg-[#F1F5F9]',
    isAiGenerated: true,
    checklist: [
      {
        icon: Lightbulb,
        text: 'Planung individueller LED-Lichtkonzepte & Dimmersysteme',
      },
      {
        icon: Sun,
        text: 'Architektonische Akzent-, Decken- und Voutenbeleuchtung',
      },
      {
        icon: Building2,
        text: 'Blendfreie, energieeffiziente Gewerbe- und Arbeitsplatzbeleuchtung',
      },
      {
        icon: Eye,
        text: 'Wetterfeste Außen-, Wege- und Fassadenbeleuchtung mit Sensorik',
      },
    ],
  },
  {
    id: 'emobilitaet',
    number: '05',
    titleLight: 'Infrastruktur für',
    titleHighlight: 'Elektromobilität',
    intro:
      'Die Mobilität der Zukunft beginnt zuhause und am Arbeitsplatz. Wir sorgen für die fachgerechte Vorbereitung, Zuleitung und Installation intelligenter Wallboxen und Ladesäulen.',
    image: '/services/emobility_hd.jpg',
    imageAlt: 'ADAMAS Wallbox Installation und Ladeinfrastruktur',
    imageOnLeft: true, // Image Left, Text Right
    bgClass: 'bg-white',
    isAiGenerated: true,
    checklist: [
      {
        icon: Zap,
        text: 'Fachgerechte Zuleitung und normgerechte Absicherung für Wallboxen',
      },
      {
        icon: Car,
        text: 'Installation und Inbetriebnahme von 11 kW und 22 kW Ladestationen',
      },
      {
        icon: Gauge,
        text: 'Intelligentes Lastmanagement für Mehrfamilienhäuser und Fuhrparks',
      },
      {
        icon: FileCheck,
        text: 'Komplette Vorbereitung und Anmeldung beim zuständigen Netzbetreiber',
      },
    ],
  },
  {
    id: 'wartung',
    number: '06',
    titleLight: 'Prüfung, Wartung &',
    titleHighlight: 'Instandhaltung',
    intro:
      'Regelmäßige Überprüfungen nach geltenden Normen (DGUV V3 / DIN VDE) garantieren den sicheren, energieeffizienten und störungsfreien Betrieb Ihrer elektrischen Anlagen.',
    image: '/services/maintenance_hd.jpg',
    imageAlt: 'ADAMAS E-Check Prüfung und Instandhaltung',
    imageOnLeft: false, // Text Left, Image Right
    bgClass: 'bg-[#F8FAFC]',
    checklist: [
      {
        icon: ClipboardCheck,
        text: 'Offizieller E-Check für private Haushalte und Gewerbebetriebe',
      },
      {
        icon: ShieldAlert,
        text: 'Wiederkehrende DGUV V3 Prüfungen für ortsfeste & ortsveränderliche Geräte',
      },
      {
        icon: Activity,
        text: 'Präzise messtechnische Erfassung aller Schutz- und Isolationswerte',
      },
      {
        icon: Wrench,
        text: 'Schnelle Störungsbeseitigung, vorbeugende Wartung & Instandsetzung',
      },
    ],
  },
]

interface ServiceItemProps {
  service: ServiceData
  scrollToContact: (e: React.MouseEvent) => void
}

const ServiceSectionItem: React.FC<ServiceItemProps> = ({ service, scrollToContact }) => {
  const { ref, isVisible } = useScrollAnimation()
  const isImageLeft = service.imageOnLeft

  return (
    <section
      ref={ref}
      id={service.id}
      className={`relative py-20 sm:py-28 lg:py-32 ${service.bgClass} text-slate-900 border-t border-slate-200/60 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Image Column */}
          <div
            className={`lg:col-span-5 relative flex justify-center ${isImageLeft ? 'lg:order-1' : 'lg:order-2'
              }`}
          >
            {service.customImageFrame ? (
              /* Service 1: Uses the extracted exact composition with framing */
              <div className="relative w-full max-w-[460px] drop-shadow-2xl overflow-hidden rounded-3xl">
                {service.isAiGenerated && (
                  <AiGeneratedBadge position="top-3 left-3 sm:top-4 sm:left-4" />
                )}
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-auto object-contain rounded-3xl"
                />
              </div>
            ) : (
              /* Services 2-6: High-Res Frame with Brand Geometry */
              <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/60 border border-slate-200/90 group">
                {service.isAiGenerated && (
                  <AiGeneratedBadge position="top-3 left-3 sm:top-4 sm:left-4" />
                )}
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-[360px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            )}
          </div>

          {/* Text Content Column */}
          <div
            className={`lg:col-span-7 flex flex-col items-start ${isImageLeft ? 'lg:order-2 lg:pl-6' : 'lg:order-1 lg:pr-6'
              }`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[2.5px] bg-[#D81E26]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D81E26] uppercase">
                UNSERE LEISTUNGEN
              </span>
            </div>

            {/* Headline - Fades in when section is in view */}
            <h2 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0E1E38] tracking-tight leading-[1.18] mb-5`}>
              {service.titleLight}{' '}
              <span className="text-[#D81E26]">{service.titleHighlight}</span>
            </h2>

            {/* Intro Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl">
              {service.intro}
            </p>

            {/* Checklist Subhead */}
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#0E1E38] tracking-tight">
                Unsere Leistungen im Überblick
              </h3>
              <span className="w-8 h-1 bg-[#F3A81D] rounded-full inline-block" />
            </div>

            {/* Checklist 4 Items */}
            <div className="w-full flex flex-col gap-4 mb-9">
              {service.checklist.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-b border-slate-200/70 pb-3.5 group"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center text-[#0E264D] flex-shrink-0 group-hover:bg-[#0E264D] group-hover:text-white transition-colors duration-200 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-slate-800 leading-snug">
                      {item.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Red CTA Button: slides left if text is on left, slides right if text is on right */}
            <a
              href="#kontakt"
              onClick={scrollToContact}
              className={`${isImageLeft ? 'anim-slide-right' : 'anim-slide-left'
                } ${isVisible ? 'is-visible' : ''} delay-200 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#D81E26] hover:bg-[#BE161D] text-white font-semibold text-sm sm:text-base shadow-lg shadow-red-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer`}
            >
              <span>Projekt besprechen</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

import { AppPage } from '../hero/HeroNavigation'

interface ServicesListProps {
  onNavigate?: (page: AppPage) => void
}

export const ServicesList: React.FC<ServicesListProps> = ({ onNavigate }) => {
  React.useEffect(() => {
    const handleScrollToHash = () => {
      const hash = window.location.hash
      if (hash.includes('#') && hash.split('#').length > 2) {
        const targetId = hash.split('#')[2]
        setTimeout(() => {
          const el = document.getElementById(targetId)
          el?.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    }

    handleScrollToHash()
  }, [])

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate('contact')
    } else {
      const el = document.getElementById('kontakt')
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="services-list" className="relative flex flex-col">
      {SERVICES_DATA.map((service) => (
        <ServiceSectionItem
          key={service.id}
          service={service}
          scrollToContact={scrollToContact}
        />
      ))}
    </div>
  )
}

