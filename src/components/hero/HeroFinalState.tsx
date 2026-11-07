import React from 'react'
import { HeroButtons } from './HeroButtons'
import { AppPage } from './HeroNavigation'

interface HeroFinalStateProps {
  opacity?: number
  transform?: string
  onNavigate?: (page: AppPage) => void
}

export const HeroFinalState: React.FC<HeroFinalStateProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-2xl text-left flex flex-col justify-center my-auto">
      {/* Eyebrow */}
      <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
        <span className="inline-block w-2 h-2 rounded-full bg-[#F3A81D] animate-pulse" />
        <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] text-slate-300 uppercase">
          ELEKTROTECHNIK &middot; SMART HOME &middot; SICHERHEIT
        </span>
      </div>

      {/* Main Headline - Fades in slowly and visibly */}
      <h1 className="anim-fade-in is-visible text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] font-extrabold text-white leading-[1.12] sm:leading-[1.1] tracking-tight mb-3.5 sm:mb-4">
        Intelligente<br />
        Elektrotechnik<br />
        <span className="text-[#F3A81D] drop-shadow-[0_2px_16px_rgba(243,168,29,0.4)]">
          für Ihr Zuhause.
        </span>
      </h1>

      {/* Supporting Text */}
      <p className="text-sm sm:text-base md:text-lg text-slate-200/90 font-normal leading-relaxed mb-6 sm:mb-7 max-w-xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
        Moderne Elektroinstallationen, sichere Gebäudetechnik und smarte Lösungen &ndash; professionell, zuverlässig und zukunftssicher.
      </p>

      {/* CTA Buttons */}
      <HeroButtons onNavigate={onNavigate} />
    </div>
  )
}
