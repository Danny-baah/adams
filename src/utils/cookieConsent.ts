import { useState, useEffect, useCallback } from 'react'

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  externalMedia: boolean
}

export const STORAGE_KEY = 'adamas_cookie_consent'
export const EVENT_CONSENT_UPDATED = 'adamas_cookie_consent_updated'
export const EVENT_OPEN_SETTINGS = 'openCookieSettings'

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  externalMedia: false,
}

export function getStoredPreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed.essential === 'boolean') {
      return {
        essential: true,
        analytics: Boolean(parsed.analytics),
        externalMedia: Boolean(parsed.externalMedia),
      }
    }
  } catch {
    // Local storage parse error
  }
  return null
}

export function savePreferences(prefs: CookiePreferences): void {
  if (typeof window === 'undefined') return
  const finalPrefs: CookiePreferences = {
    ...prefs,
    essential: true, // Always required
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPrefs))
  } catch {
    // Storage unavailable
  }
  window.dispatchEvent(new CustomEvent(EVENT_CONSENT_UPDATED, { detail: finalPrefs }))
}

export function openCookieModal(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(EVENT_OPEN_SETTINGS))
}

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    return getStoredPreferences() || DEFAULT_PREFERENCES
  })

  const [hasConsented, setHasConsented] = useState<boolean>(() => {
    return getStoredPreferences() !== null
  })

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CookiePreferences>
      if (customEvent.detail) {
        setPreferences(customEvent.detail)
        setHasConsented(true)
      } else {
        const stored = getStoredPreferences()
        if (stored) {
          setPreferences(stored)
          setHasConsented(true)
        }
      }
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const stored = getStoredPreferences()
        if (stored) {
          setPreferences(stored)
          setHasConsented(true)
        }
      }
    }

    window.addEventListener(EVENT_CONSENT_UPDATED, handleUpdate)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener(EVENT_CONSENT_UPDATED, handleUpdate)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const acceptAll = useCallback(() => {
    savePreferences({
      essential: true,
      analytics: true,
      externalMedia: true,
    })
  }, [])

  const acceptEssential = useCallback(() => {
    savePreferences({
      essential: true,
      analytics: false,
      externalMedia: false,
    })
  }, [])

  const acceptExternalMedia = useCallback(() => {
    const current = getStoredPreferences() || DEFAULT_PREFERENCES
    savePreferences({
      ...current,
      externalMedia: true,
    })
  }, [])

  return {
    preferences,
    hasConsented,
    acceptAll,
    acceptEssential,
    acceptExternalMedia,
    saveConsent: savePreferences,
    openSettings: openCookieModal,
  }
}

