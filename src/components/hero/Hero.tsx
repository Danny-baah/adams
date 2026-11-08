import React from 'react'
import { useHeroAnimation } from '../../hooks/useHeroAnimation'
import { HeroNavigation, AppPage } from './HeroNavigation'
import { HeroContent } from './HeroContent'

interface HeroProps {
  onNavigate?: (page: AppPage) => void
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const {
    containerRef,
    pinStageRef,
    canvasRef,
    videoRef,
    scrollProgress,
    loadedCount,
    totalFrames,
    firstFrameLoaded,
    useVideoFallback,
    jumpToChapter,
    isMobile,
  } = useHeroAnimation()

  const loadPercent = Math.min(100, Math.round(((loadedCount + 1) / totalFrames) * 100))

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#070B12]"
      // 380vh scroll track on desktop, 280vh on mobile
      style={{ height: isMobile ? '280vh' : '380vh' }}
    >
      {/* Pinned Visual Stage - 100svh / 100vh managed cleanly by GSAP ScrollTrigger */}
      <div
        ref={pinStageRef}
        className="w-full h-screen min-h-[100svh] overflow-hidden select-none"
      >
        {/* Background Canvas for Frame-by-Frame Playback */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Fallback Video Element if canvas frames unavailable */}
        {useVideoFallback && (
          <video
            ref={videoRef}
            src="/assets/hero.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Fallback Initial Image until canvas first paints (prevents blank screen) */}
        {!firstFrameLoaded && (
          <img
            src={isMobile ? '/frames_mobile/f_0000.webp' : '/frames/f_0000.webp'}
            alt="ADAMAS Elektrotechnik"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Subtle Vignette & Scrims */}
        <div className="absolute inset-0 cinematic-vignette pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 cinematic-bottom-gradient pointer-events-none" />

        {/* Floating Transparent Navigation */}
        <HeroNavigation
          scrollProgress={typeof window !== 'undefined' && window.location.search.includes('finalhero=1') ? 1.0 : scrollProgress}
          currentPage="home"
          onNavigate={onNavigate}
        />

        {/* Cinematic Storytelling & Final Hero State */}
        <HeroContent
          progress={typeof window !== 'undefined' && window.location.search.includes('finalhero=1') ? 1.0 : scrollProgress}
          onJumpToChapter={jumpToChapter}
          onNavigate={onNavigate}
        />

        {/* Minimal Subtle Loading Bar during background frame preloading */}
        {loadPercent < 100 && (
          <div className="absolute bottom-2 right-4 z-30 pointer-events-none flex items-center gap-2 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 opacity-70">
            <span className="text-[10px] font-mono text-slate-400">
              HD Cache: {loadPercent}%
            </span>
            <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F3A81D] transition-all duration-150"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
