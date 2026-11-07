import { useEffect, useRef, useState } from 'react'

export interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/**
 * useScrollAnimation:
 * Reusable React hook using IntersectionObserver to detect when a section
 * or element is actively visible in the viewport.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = options
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fallback if IntersectionObserver is unavailable
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(el)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}

