import React, { useState, useEffect } from 'react'
import { Hero } from './components/hero/Hero'
import { HeroNavigation, AppPage } from './components/hero/HeroNavigation'
import { AboutSection } from './components/sections/AboutSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { WhyChooseUsSection } from './components/sections/WhyChooseUsSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { PartnersMarquee } from './components/sections/PartnersMarquee'
import { ContactCtaSection } from './components/sections/ContactCtaSection'
import { Footer } from './components/sections/Footer'

// About Page Components
import { AboutHero } from './components/about/AboutHero'
import { AboutCompany } from './components/about/AboutCompany'
import { AboutProcess } from './components/about/AboutProcess'

// Services Page Components
import { ServicesHero } from './components/services/ServicesHero'
import { ServicesList } from './components/services/ServicesList'

// Contact Page Components
import { ContactHero } from './components/contact/ContactHero'
import { ContactFormSection } from './components/contact/ContactFormSection'
import { ContactMapSection } from './components/contact/ContactMapSection'

// Legal & Compliance Pages
import { LegalPage } from './components/legal/LegalPage'

const getInitialPage = (): AppPage => {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.toLowerCase()
  const search = window.location.search.toLowerCase()
  const path = window.location.pathname.toLowerCase()

  if (
    hash.includes('impressum') ||
    search.includes('page=impressum') ||
    path.includes('impressum')
  ) {
    return 'impressum'
  }

  if (
    hash.includes('datenschutz') ||
    hash.includes('privacy') ||
    search.includes('page=datenschutz') ||
    search.includes('page=privacy') ||
    path.includes('datenschutz') ||
    path.includes('privacy')
  ) {
    return 'datenschutz'
  }

  if (
    hash.includes('agb') ||
    hash.includes('terms') ||
    search.includes('page=agb') ||
    search.includes('page=terms') ||
    path.includes('agb') ||
    path.includes('terms')
  ) {
    return 'agb'
  }

  if (
    hash.includes('kontakt') ||
    hash.includes('contact') ||
    search.includes('page=contact') ||
    search.includes('page=kontakt') ||
    path.includes('kontakt') ||
    path.includes('contact')
  ) {
    return 'contact'
  }

  if (
    hash.includes('leistungen') ||
    hash.includes('services') ||
    search.includes('page=services') ||
    search.includes('page=leistungen') ||
    path.includes('leistungen') ||
    path.includes('services')
  ) {
    return 'services'
  }

  if (
    hash.includes('about') ||
    hash.includes('ueber-uns') ||
    search.includes('page=about') ||
    search.includes('page=ueber-uns') ||
    path.includes('about') ||
    path.includes('ueber-uns')
  ) {
    return 'about'
  }

  return 'home'
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>(getInitialPage)

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.toLowerCase()
      const search = window.location.search.toLowerCase()

      if (
        hash.includes('impressum') ||
        search.includes('page=impressum')
      ) {
        setCurrentPage('impressum')
      } else if (
        hash.includes('datenschutz') ||
        hash.includes('privacy') ||
        search.includes('page=datenschutz') ||
        search.includes('page=privacy')
      ) {
        setCurrentPage('datenschutz')
      } else if (
        hash.includes('agb') ||
        hash.includes('terms') ||
        search.includes('page=agb') ||
        search.includes('page=terms')
      ) {
        setCurrentPage('agb')
      } else if (
        hash.includes('kontakt') ||
        hash.includes('contact') ||
        search.includes('page=contact') ||
        search.includes('page=kontakt')
      ) {
        setCurrentPage('contact')
      } else if (
        hash.includes('leistungen') ||
        hash.includes('services') ||
        search.includes('page=services') ||
        search.includes('page=leistungen')
      ) {
        setCurrentPage('services')
      } else if (
        hash.includes('about') ||
        hash.includes('ueber-uns') ||
        search.includes('page=about') ||
        search.includes('page=ueber-uns')
      ) {
        setCurrentPage('about')
      } else if (hash === '#/' || hash === '#home' || hash === '') {
        setCurrentPage('home')
      }
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    window.addEventListener('popstate', syncFromHash)
    return () => {
      window.removeEventListener('hashchange', syncFromHash)
      window.removeEventListener('popstate', syncFromHash)
    }
  }, [])

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page)
    if (page === 'contact') {
      window.location.hash = '/kontakt'
    } else if (page === 'services') {
      window.location.hash = '/leistungen'
    } else if (page === 'about') {
      window.location.hash = '/ueber-uns'
    } else if (page === 'impressum') {
      window.location.hash = '/impressum'
    } else if (page === 'datenschutz') {
      window.location.hash = '/datenschutz'
    } else if (page === 'agb') {
      window.location.hash = '/agb'
    } else {
      window.location.hash = '/'
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const skipHero = typeof window !== 'undefined' && window.location.search.includes('nohero=1')

  return (
    <main className="relative bg-[#070B12] text-white min-h-screen">
      {currentPage === 'home' && (
        <>
          {/* 1. Cinematic Scroll-Driven Hero */}
          {!skipHero && <Hero onNavigate={handleNavigate} />}
          {skipHero && <HeroNavigation currentPage="home" onNavigate={handleNavigate} />}

          {/* 2. Über ADAMAS Section (Soft Off-White #F8FAFC) */}
          <AboutSection onNavigate={handleNavigate} />

          {/* 3. Unsere Leistungen Section (Crisp Pure White #FFFFFF) */}
          <ServicesSection onNavigate={handleNavigate} />

          {/* 4. Warum ADAMAS Section (Cool Gray #F1F5F9) */}
          <WhyChooseUsSection />

          {/* 5. Kundenstimmen Section (Pure White #FFFFFF) */}
          <TestimonialsSection />

          {/* 6. Original Partner Brands Marquee (#F8FAFC) */}
          <PartnersMarquee />

          {/* 7. Jetzt Kontakt Aufnehmen Banner (Cinematic Dark #070B12) */}
          <ContactCtaSection onNavigate={handleNavigate} />

          {/* 8. Official Master Enterprise Footer (#041633) */}
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {currentPage === 'about' && (
        <>
          {/* Fixed Navigation for About Page with active indicator on "Über uns" */}
          <HeroNavigation currentPage="about" onNavigate={handleNavigate} />

          {/* 1. About Hero Section (Dark Navy #011429 with Electrician & Badges) */}
          <AboutHero />

          {/* 2. About Company Profile Section (Pure White #FFFFFF with Photo Collage) */}
          <AboutCompany />

          {/* 3. 4-Step Process & Blueprint Section (Off-White #F8FAFC "Unser Anspruch") */}
          <AboutProcess />

          {/* 4. Original Partner Brands Marquee (#F8FAFC) */}
          <PartnersMarquee />

          {/* 5. Final Contact CTA Section (Cinematic Dark #070B12) */}
          <ContactCtaSection onNavigate={handleNavigate} />

          {/* 6. Official Master Enterprise Footer (#041633) */}
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {currentPage === 'services' && (
        <>
          {/* Fixed Navigation for Services Page with active indicator on "Leistungen" */}
          <HeroNavigation currentPage="services" onNavigate={handleNavigate} />

          {/* 1. Services Hero Section (Dark Navy #011429) */}
          <ServicesHero onNavigate={handleNavigate} />

          {/* 2. All 6 Detailed Services with Alternating Layout & Backgrounds */}
          <ServicesList onNavigate={handleNavigate} />

          {/* 3. Our 4-Step Process & Blueprint from About Section ("Unser Anspruch") */}
          <AboutProcess />

          {/* 4. Customer Reviews Section from Home Page ("Das sagen unsere Kunden") */}
          <TestimonialsSection />

          {/* 5. Final Contact CTA Section (Cinematic Dark #070B12) */}
          <ContactCtaSection onNavigate={handleNavigate} />

          {/* 6. Official Master Enterprise Footer (#041633) */}
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {currentPage === 'contact' && (
        <>
          {/* Fixed Navigation for Contact Page with active indicator on "Kontakt" */}
          <HeroNavigation currentPage="contact" onNavigate={handleNavigate} />

          {/* 1. Contact Hero Section (Dark Navy #011429 with Friendly Electrician) */}
          <ContactHero />

          {/* 2. Interactive Contact Form & Contact Information Card */}
          <ContactFormSection onNavigate={handleNavigate} />

          {/* 3. Full-Width Leverkusen Architectural Map Section */}
          <ContactMapSection />

          {/* 4. Official Master Enterprise Footer (#041633) */}
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {/* Legal Pages: Impressum, Datenschutz, AGB */}
      {(currentPage === 'impressum' ||
        currentPage === 'datenschutz' ||
        currentPage === 'agb') && (
        <LegalPage
          activeDoc={currentPage}
          onNavigate={handleNavigate}
        />
      )}
    </main>
  )
}

export default App
