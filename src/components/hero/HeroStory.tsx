import React from 'react'

export interface StoryChapter {
  id: string
  number?: string
  eyebrow?: string
  headline: string
  highlight?: string
  supporting?: string
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'intro',
    eyebrow: 'ELEKTROTECHNIK · SMART HOME · SICHERHEIT',
    headline: 'Technik, die modernes Wohnen möglich macht.',
  },
  {
    id: 'wallbox',
    number: '01 / E-MOBILITÄT',
    headline: 'E-Mobilität beginnt zuhause.',
    supporting: 'Intelligente Ladelösungen für eine nachhaltige Zukunft.'
  },
  {
    id: 'security',
    number: '02 / SICHERHEIT',
    headline: 'Sicherheit beginnt mit Vertrauen.',
    supporting: 'Moderne Sicherheits- und Überwachungstechnik für Ihr Zuhause.'
  },
  {
    id: 'lighting',
    number: '03 / BELEUCHTUNG',
    headline: 'Licht schafft Atmosphäre.',
    supporting: 'Durchdachte Elektroinstallationen und individuelle Lichtkonzepte.'
  },
  {
    id: 'smarthome',
    number: '04 / SMART HOME',
    headline: 'Ihr Zuhause. Intelligent vernetzt.',
    supporting: 'Smarte Lösungen für mehr Komfort und Kontrolle.'
  }
]

interface HeroStoryProps {
  activeChapterIndex: number
  chapterProgress: number // 0 to 1 within current chapter
  visible: boolean
}

export const HeroStory: React.FC<HeroStoryProps> = ({
  activeChapterIndex,
  chapterProgress,
  visible
}) => {
  if (!visible || activeChapterIndex < 0 || activeChapterIndex >= STORY_CHAPTERS.length) {
    return null
  }

  const current = STORY_CHAPTERS[activeChapterIndex]

  // Calculate subtle fade in / fade out curve
  let opacity = 1
  let translateY = 0

  if (activeChapterIndex === 0) {
    // Opening is immediately visible at top, then fades out smoothly as user scrolls
    if (chapterProgress > 0.65) {
      const t = (chapterProgress - 0.65) / 0.35
      opacity = 1 - t
      translateY = -t * 16
    }
  } else {
    // Subsequent chapters fade in, stay visible, then fade out
    if (chapterProgress < 0.25) {
      const t = chapterProgress / 0.25
      opacity = t
      translateY = (1 - t) * 16
    } else if (chapterProgress > 0.75) {
      const t = (chapterProgress - 0.75) / 0.25
      opacity = 1 - t
      translateY = -t * 16
    }
  }

  // Ultra-clean, uncluttered presentation for the opening frame
  if (current.id === 'intro') {
    return (
      <div
        className="w-full max-w-lg transition-all duration-150 ease-out pointer-events-none"
        style={{
          opacity: Math.max(0, Math.min(1, opacity)),
          transform: `translateY(${translateY}px)`
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F3A81D]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-slate-300 uppercase">
            {current.eyebrow}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.2] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {current.headline}
        </h2>
      </div>
    )
  }

  return (
    <div
      className="w-full max-w-md sm:max-w-lg transition-all duration-150 ease-out pointer-events-none"
      style={{
        opacity: Math.max(0, Math.min(1, opacity)),
        transform: `translateY(${translateY}px)`
      }}
    >
      {/* Chapter Badge */}
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F3A81D]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#F3A81D] uppercase">
            {current.number}
          </span>
        </div>
      </div>

      {/* Headline */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
        {current.headline}
      </h2>

      {/* Supporting Text */}
      {current.supporting && (
        <p className="text-base sm:text-lg md:text-xl text-slate-200/90 font-light leading-relaxed max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {current.supporting}
        </p>
      )}
    </div>
  )
}
