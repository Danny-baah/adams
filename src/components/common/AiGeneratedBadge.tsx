import React from 'react'

interface AiGeneratedBadgeProps {
  className?: string
  position?: string
  text?: string
}

/**
 * Discrete translucent badge indicating synthetic / AI-generated visuals.
 * Complies with EU AI Act (Art. 50) and matches client reference design.
 */
export const AiGeneratedBadge: React.FC<AiGeneratedBadgeProps> = ({
  className = '',
  position = 'top-3 left-3',
  text = 'Ai-generated',
}) => {
  return (
    <div
      className={`absolute ${position} z-10 inline-flex items-center px-2 py-0.5 rounded-md bg-black/55 backdrop-blur-md border border-white/15 text-white/90 text-[10.5px] sm:text-[11px] font-medium tracking-wide shadow-sm pointer-events-none select-none transition-opacity duration-200 ${className}`}
      aria-label="AI-generated visual"
    >
      {text}
    </div>
  )
}
