import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 287
const DESKTOP_WIDTH = 1920
const DESKTOP_HEIGHT = 1080
const MOBILE_WIDTH = 720
const MOBILE_HEIGHT = 1280

// Focal point X (0.0 to 1.0) in video source for mobile portrait framing when landscape source is used
function getFocalPointX(progress: number): number {
  if (progress < 0.25) return 0.50 // Intro exterior center
  if (progress < 0.54) return 0.44 // Wallbox center
  if (progress < 0.82) return 0.52 // CCTV camera
  return 0.65 // Smart home wall panel & final reveal
}

export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinStageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768 || window.innerHeight > window.innerWidth
  })

  const [scrollProgress, setScrollProgress] = useState(0)
  const [loadedCount, setLoadedCount] = useState(0)
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false)
  const [useVideoFallback, setUseVideoFallback] = useState(false)

  const isMobileRef = useRef(isMobile)
  isMobileRef.current = isMobile

  const framesCache = useRef<Map<number, HTMLImageElement>>(new Map())
  const activeFrameIndexRef = useRef(0)
  const activeProgressRef = useRef(0)
  const animFrameIdRef = useRef<number | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  // Format frame URL: /frames_mobile/f_0000.webp or /frames/f_0000.webp
  const getFrameUrl = useCallback((index: number, mobile?: boolean) => {
    const padded = index.toString().padStart(4, '0')
    const useMob = typeof mobile === 'boolean' ? mobile : isMobileRef.current
    return useMob ? `/frames_mobile/f_${padded}.webp` : `/frames/f_${padded}.webp`
  }, [])

  // Draw current frame to canvas using responsive "cover" + portrait centering
  const renderCanvasFrame = useCallback((frameIndex: number, progress: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Find requested frame or the closest loaded frame
    let img = framesCache.current.get(frameIndex)
    if (!img || !img.complete || img.naturalWidth === 0) {
      let minDiff = Infinity
      let closestIdx = -1
      for (const idx of framesCache.current.keys()) {
        const cached = framesCache.current.get(idx)
        if (cached && cached.complete && cached.naturalWidth > 0) {
          const diff = Math.abs(idx - frameIndex)
          if (diff < minDiff) {
            minDiff = diff
            closestIdx = idx
          }
        }
      }
      if (closestIdx !== -1) {
        img = framesCache.current.get(closestIdx)
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cw = window.innerWidth
    const ch = window.innerHeight

    const targetW = Math.round(cw * dpr)
    const targetH = Math.round(ch * dpr)

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW
      canvas.height = targetH
    }

    ctx.save()
    ctx.scale(dpr, dpr)

    const sourceW = img.naturalWidth || (isMobileRef.current ? MOBILE_WIDTH : DESKTOP_WIDTH)
    const sourceH = img.naturalHeight || (isMobileRef.current ? MOBILE_HEIGHT : DESKTOP_HEIGHT)

    // Calculate cover positioning based on actual image dimensions
    const scale = Math.max(cw / sourceW, ch / sourceH)
    const nw = sourceW * scale
    const nh = sourceH * scale

    // Y position is centered
    const oy = (ch - nh) / 2

    // X position:
    // If image is already portrait (720x1280), it is pre-cropped to the focal point so center it!
    let ox = (cw - nw) / 2

    // If source is landscape and screen is portrait (fallback scenario):
    if (sourceW > sourceH && cw < ch) {
      const focalX = getFocalPointX(progress)
      const focalPixel = focalX * nw
      ox = (cw * 0.5) - focalPixel
      ox = Math.min(0, Math.max(cw - nw, ox))
    }

    ctx.drawImage(img, ox, oy, nw, nh)
    ctx.restore()
  }, [])

  // Request render frame on animation frame
  const requestRender = useCallback((frameIdx: number, progress: number) => {
    activeFrameIndexRef.current = frameIdx
    activeProgressRef.current = progress
    if (animFrameIdRef.current !== null) {
      cancelAnimationFrame(animFrameIdRef.current)
    }
    animFrameIdRef.current = requestAnimationFrame(() => {
      renderCanvasFrame(activeFrameIndexRef.current, activeProgressRef.current)
    })
  }, [renderCanvasFrame])

  // Preload frame images progressively
  useEffect(() => {
    let isCancelled = false

    // Load Frame 0 first with highest priority
    const frame0 = new Image()
    frame0.src = getFrameUrl(0, isMobile)
    frame0.onload = () => {
      if (isCancelled) return
      framesCache.current.set(0, frame0)
      setFirstFrameLoaded(true)
      requestRender(0, activeProgressRef.current)
    }
    frame0.onerror = () => {
      // If mobile frame 0 fails, fallback to desktop frame 0
      if (isMobile) {
        frame0.src = getFrameUrl(0, false)
      } else if (!isCancelled) {
        setUseVideoFallback(true)
      }
    }

    // Progressive queue loading with concurrency control
    const concurrency = isMobile ? 8 : 6
    let currentIndex = 1

    const loadNext = () => {
      if (isCancelled || currentIndex >= TOTAL_FRAMES) return

      const idx = currentIndex++
      const img = new Image()
      img.src = getFrameUrl(idx, isMobile)

      img.onload = () => {
        if (isCancelled) return
        framesCache.current.set(idx, img)
        setLoadedCount((prev) => prev + 1)
        if (activeFrameIndexRef.current === idx) {
          requestRender(idx, activeProgressRef.current)
        }
        loadNext()
      }

      img.onerror = () => {
        if (!isCancelled) {
          loadNext()
        }
      }
    }

    // Start pool
    for (let c = 0; c < concurrency; c++) {
      loadNext()
    }

    return () => {
      isCancelled = true
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [getFrameUrl, isMobile, requestRender])

  // Resize handler with mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mob = window.innerWidth < 768 || window.innerHeight > window.innerWidth
      if (mob !== isMobileRef.current) {
        setIsMobile(mob)
        // Reset cache for new mode
        framesCache.current.clear()
        setLoadedCount(0)
      }
      requestRender(activeFrameIndexRef.current, activeProgressRef.current)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [requestRender])

  // GSAP ScrollTrigger setup
  useEffect(() => {
    const container = containerRef.current
    const stage = pinStageRef.current
    if (!container || !stage) return

    // Mobile performance settings
    ScrollTrigger.config({ ignoreMobileResize: true })

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setScrollProgress(1)
      requestRender(TOTAL_FRAMES - 1, 1)
      return
    }

    const st = ScrollTrigger.create({
      trigger: container,
      pin: stage,
      pinSpacing: true,
      anticipatePin: 1,
      start: 'top top',
      end: 'bottom bottom',
      scrub: isMobile ? 0.2 : 0.35,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress))
        setScrollProgress(progress)

        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)))
        requestRender(frameIdx, progress)

        // Video fallback sync if active
        if (videoRef.current && videoRef.current.duration) {
          videoRef.current.currentTime = progress * videoRef.current.duration
        }
      },
    })

    scrollTriggerRef.current = st

    return () => {
      st.kill()
    }
  }, [isMobile, requestRender])

  // Function to programmatically jump to a chapter
  const jumpToChapter = useCallback((chapterIdx: number) => {
    const container = containerRef.current
    if (!container) return

    // Exact progress targets matching video chapters:
    // 0: Intro (0.00)
    // 1: Wallbox (0.35)
    // 2: Security CCTV (0.65)
    // 3: Final Reveal (0.92)
    const targets = [0.00, 0.35, 0.65, 0.92]
    const targetProgress = targets[Math.min(chapterIdx, targets.length - 1)]

    const scrollTotal = container.scrollHeight - window.innerHeight
    const targetScrollY = container.offsetTop + targetProgress * scrollTotal

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }, [])

  return {
    containerRef,
    pinStageRef,
    canvasRef,
    videoRef,
    scrollProgress,
    loadedCount,
    totalFrames: TOTAL_FRAMES,
    firstFrameLoaded,
    useVideoFallback,
    jumpToChapter,
    isMobile,
  }
}
