import React from 'react'
import { ArrowRight } from 'lucide-react'
import { AppPage } from './HeroNavigation'

interface HeroButtonsProps {
  className?: string
  onNavigate?: (page: AppPage) => void
}

export const HeroButtons: React.FC<HeroButtonsProps> = ({ className = '', onNavigate }) => {
  const handleServicesClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate('services')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleAboutClick = (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate('about')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-3 ${className}`}>
      {/* Primary CTA (Left): Brand Red - Slides in from Left */}
      <a
        href="#leistungen"
        onClick={handleServicesClick}
        className="anim-slide-left is-visible inline-flex items-center gap-2 sm:gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#D81E26] hover:bg-[#BE161D] text-white font-semibold text-sm sm:text-base tracking-wide shadow-lg shadow-red-950/40 hover:shadow-red-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group cursor-pointer"
      >
        <span>Unsere Leistungen</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </a>

      {/* Secondary CTA (Right): Outline with subtle glass - Slides in from Right */}
      <a
        href="#ueber-uns"
        onClick={handleAboutClick}
        className="anim-slide-right is-visible delay-150 inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/40 hover:border-white text-white font-medium text-sm sm:text-base tracking-wide backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        Über uns
      </a>
    </div>
  )
}
