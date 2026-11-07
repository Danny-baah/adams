import React from 'react'
import { HeroStory, STORY_CHAPTERS } from './HeroStory'
import { HeroFinalState } from './HeroFinalState'
import { AppPage } from './HeroNavigation'

interface HeroContentProps {
  progress: number // 0.0 to 1.0
  onJumpToChapter?: (chapterIdx: number) => void
  onNavigate?: (page: AppPage) => void
}

export const HeroContent: React.FC<HeroContentProps> = ({
  progress,
  onJumpToChapter,
  onNavigate,
}) => {
  const isFinalState = progress >= 0.88

  // Calculate active chapter index and progress inside that chapter
  let activeChapterIndex = 0
  let chapterProgress = 0

  if (progress <= 0.12) {
    activeChapterIndex = 0
    chapterProgress = progress / 0.12
  } else if (progress <= 0.28) {
    activeChapterIndex = 1
    chapterProgress = (progress - 0.13) / (0.28 - 0.13)
  } else if (progress <= 0.41) {
    activeChapterIndex = 2
    chapterProgress = (progress - 0.29) / (0.41 - 0.29)
  } else if (progress <= 0.68) {
    activeChapterIndex = 3
    chapterProgress = (progress - 0.42) / (0.68 - 0.42)
  } else if (progress < 0.88) {
    activeChapterIndex = 4
    chapterProgress = (progress - 0.69) / (0.88 - 0.69)
  } else {
    activeChapterIndex = -1
    chapterProgress = 1
  }

  // Smooth opacity curve for final hero reveal
  const finalOpacity = Math.max(0, Math.min(1, (progress - 0.88) / 0.08))
  const finalTranslateY = (1 - finalOpacity) * 20

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col z-20">
      {/* Left dark gradient scrim to ensure text legibility on desktop */}
      <div className="hidden sm:block absolute inset-y-0 left-0 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 cinematic-left-gradient pointer-events-none" />

      {/* Tailored mobile gradient scrim */}
      <div className="sm:hidden absolute inset-0 bg-gradient-to-r from-[#070B12]/95 via-[#070B12]/80 to-[#070B12]/45 pointer-events-none" />
      <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-[#070B12]/85 via-transparent to-[#070B12]/60 pointer-events-none" />

      {/* Top navbar spacer: Guarantees content never collides with fixed navbar */}
      <div className="h-20 sm:h-24 md:h-28 flex-shrink-0" />

      {/* Main Story & Final State Container: Mathematically Centered Vertically */}
      <div className="relative flex-1 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-start">
        {/* Story chapters during scroll */}
        <div
          className={`transition-opacity duration-300 ${
            isFinalState ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
        >
          <HeroStory
            activeChapterIndex={activeChapterIndex}
            chapterProgress={chapterProgress}
            visible={!isFinalState}
          />
        </div>

        {/* Final Hero Composition revealed at the end: Exactly Centered Vertically */}
        <div
          className="absolute inset-x-6 sm:inset-x-8 lg:inset-x-12 inset-y-0 flex items-center justify-start transition-all duration-300 ease-out"
          style={{
            opacity: finalOpacity,
            transform: `translateY(${finalTranslateY}px)`,
            pointerEvents: finalOpacity > 0.6 ? 'auto' : 'none',
          }}
        >
          <HeroFinalState onNavigate={onNavigate} />
        </div>
      </div>

      {/* Bottom status bar: Scroll cue & Chapter navigation */}
      <div className="h-16 sm:h-20 flex-shrink-0 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pb-4 sm:pb-6 flex items-center justify-between pointer-events-auto">
        {/* Initial Minimal Scroll Cue (fades out as soon as user starts scrolling) */}
        <div
          className="flex items-center gap-3 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - progress * 8) }}
        >
          <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
            <span className="w-1 h-1.5 rounded-full bg-[#F3A81D] animate-bounce" />
          </div>
          <span className="text-[11px] tracking-[0.18em] uppercase text-slate-300/80 font-medium">
            Scrollen zum Entdecken &darr;
          </span>
        </div>

        {/* Chapter pill indicator on desktop */}
        <div
          className={`hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 ml-auto transition-all duration-300 ${
            progress < 0.05 ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'
          }`}
        >
          {STORY_CHAPTERS.map((ch, idx) => {
            const isActive = activeChapterIndex === idx
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => onJumpToChapter && onJumpToChapter(idx)}
                className="group relative flex items-center gap-1.5 px-2 py-1 transition-all cursor-pointer"
                title={ch.headline}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-5 h-1.5 bg-[#F3A81D]'
                      : 'w-1.5 h-1.5 bg-white/40 group-hover:bg-white/80'
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold tracking-wider transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {ch.number ? ch.number.split(' ')[0] : '00'}
                </span>
              </button>
            )
          })}
          {/* Final state indicator */}
          <button
            type="button"
            onClick={() => onJumpToChapter && onJumpToChapter(5)}
            className="group relative flex items-center gap-1.5 px-2 py-1 transition-all cursor-pointer"
            title="ADAMAS"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                isFinalState
                  ? 'w-5 h-1.5 bg-[#D81E26]'
                  : 'w-1.5 h-1.5 bg-white/40 group-hover:bg-white/80'
              }`}
            />
            <span
              className={`text-[10px] font-semibold tracking-wider transition-colors duration-200 ${
                isFinalState ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
              }`}
            >
              FINAL
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
