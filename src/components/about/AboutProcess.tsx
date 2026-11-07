import React from 'react'
import { MessageSquare, Calendar, HardHat, CheckCircle2 } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export const AboutProcess: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation()
  const steps = [
    {
      number: '01',
      title: 'Beratung',
      description: 'Wir verstehen Ihre Anforderungen und Wünsche.',
      icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Planung',
      description: 'Wir entwickeln eine passende technische Lösung.',
      icon: Calendar,
    },
    {
      number: '03',
      title: 'Umsetzung',
      description: 'Fachgerechte Installation mit Blick auf Qualität und Sicherheit.',
      icon: HardHat,
    },
    {
      number: '04',
      title: 'Abschluss',
      description: 'Sorgfältige Fertigstellung und Übergabe.',
      icon: CheckCircle2,
    },
  ]

  return (
    <section ref={ref} className="relative pt-24 pb-0 bg-[#F8FAFC] text-slate-900 overflow-hidden border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 text-center flex flex-col items-center">

        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-6 h-[2.5px] bg-[#D81E26]" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D81E26] uppercase">
            UNSER ANSPRUCH
          </span>
        </div>

        {/* Headline - Fades in */}
        <h2 className={`anim-fade-in ${isVisible ? 'is-visible' : ''} text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0E1E38] tracking-tight leading-[1.18] mb-4 max-w-3xl`}>
          Von der Planung bis zur <span className="text-[#D81E26]">Fertigstellung.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
          Wir begleiten Ihr Projekt zuverlässig und strukturiert &ndash; von der ersten Beratung bis zur finalen Übergabe.
        </p>

        {/* 4-Step Process Cards with connecting yellow lines */}
        <div className="relative w-full mt-14">

          {/* Horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[12%] right-[12%] h-[2px] bg-[#F3A81D] z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.number} className="flex flex-col items-center text-center">
                  {/* Step icon container with yellow number pill */}
                  <div className="relative mb-5">
                    {/* Dark Navy Square Icon */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0E1E38] text-white flex items-center justify-center shadow-lg shadow-blue-950/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>

                    {/* Yellow Number Badge on Top-Right */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F3A81D] text-slate-900 font-black text-xs flex items-center justify-center shadow-md border-2 border-white">
                      {s.number}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-[#0E1E38] mb-2 tracking-tight">
                    {s.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-[220px]">
                    {s.description}
                  </p>
                </div>
              )
            })}
          </div>

        </div>

      </div>

      {/* Bottom Architectural Blueprint Image with Hardhat */}
      <div className="relative w-full mt-8 overflow-hidden">
        <img
          src="/about/about_blueprint.jpg"
          alt="ADAMAS Planung und Fertigstellung von Elektroinstallationen"
          className="w-full h-auto object-cover max-h-[380px] min-h-[220px]"
        />
      </div>
    </section>
  )
}

