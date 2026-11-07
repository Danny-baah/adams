import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 287
const VIDEO_WIDTH = 1920
const VIDEO_HEIGHT = 1080

// Focal point X (0.0 to 1.0) in video source for mobile portrait framing
function getFocalPointX(progress: number): number {
  if (progress < 0.12) return 0.50 // Intro exterior center
  if (progress < 0.28) return 0.44 // Wallbox center
  if (progress < 0.41) return 0.52 // CCTV camera
  if (progress < 0.68) return 0.42 // Interior lighting chandelier
  return 0.65 // Smart home wall panel & final reveal
}

export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinStageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [scrollProgress, setScrollProgress] = useState(0)
  const [loadedCount, setLoadedCount] = useState(0)
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false)
  const [useVideoFallback, setUseVideoFallback] = useState(false)

  const framesCache = useRef<Map<number, HTMLImageElement>>(new Map())
  const activeFrameIndexRef = useRef(0)
  const activeProgressRef = useRef(0)
  const animFrameIdRef = useRef<number | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  // Format frame URL: /frames/f_0000.webp ... /frames/f_0286.webp
  const getFrameUrl = useCallback((index: number) => {
    const padded = index.toString().padStart(4, '0')
    return `/frames/f_${padded}.webp`
  }, [])

  // Draw current frame to canvas using responsive "cover" + mobile focal point tracking
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

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr
      canvas.height = ch * dpr
    }

    ctx.save()
    ctx.scale(dpr, dpr)

    // Calculate cover positioning
    const scale = Math.max(cw / VIDEO_WIDTH, ch / VIDEO_HEIGHT)
    const nw = VIDEO_WIDTH * scale
    const nh = VIDEO_HEIGHT * scale

    // Y position is centered
    const oy = (ch - nh) / 2

    // X position: On wide screens, center. On narrow portrait screens, adapt to focal point.
    let ox = (cw - nw) / 2
    if (cw / ch < 16 / 9) {
      const focalX = getFocalPointX(progress)
      const focalPixel = focalX * nw
      // Position the focal point toward the right half on mobile so the left stays clear for text
      const targetScreenX = cw > 640 ? cw * 0.5 : cw * 0.72
      ox = targetScreenX - focalPixel
      // Clamp to prevent blank borders
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
    frame0.src = getFrameUrl(0)
    frame0.onload = () => {
      if (isCancelled) return
      framesCache.current.set(0, frame0)
      setFirstFrameLoaded(true)
      requestRender(0, 0)
    }
    frame0.onerror = () => {
      if (!isCancelled) {
        setUseVideoFallback(true)
      }
    }

    // Progressive queue loading with concurrency control
    const concurrency = 6
    let currentIndex = 1

    const loadNext = () => {
      if (isCancelled || currentIndex >= TOTAL_FRAMES) return

      const idx = currentIndex++
      const img = new Image()
      img.src = getFrameUrl(idx)

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
  }, [getFrameUrl, requestRender])

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      requestRender(activeFrameIndexRef.current, activeProgressRef.current)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [requestRender])

  // GSAP ScrollTrigger setup
  useEffect(() => {
    const container = containerRef.current
    const stage = pinStageRef.current
    if (!container || !stage) return

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
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
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
  }, [requestRender])

  // Function to programmatically jump to a chapter
  const jumpToChapter = useCallback((chapterIdx: number) => {
    const container = containerRef.current
    if (!container) return

    // Exact progress targets matching video chapters:
    // 0: Intro (0.00)
    // 1: Wallbox (0.20)
    // 2: Security CCTV (0.35)
    // 3: Lighting (0.55)
    // 4: Smart Home (0.78)
    // 5: Final Reveal (0.95)
    const targets = [0.00, 0.20, 0.35, 0.55, 0.78, 0.95]
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
  }
}
