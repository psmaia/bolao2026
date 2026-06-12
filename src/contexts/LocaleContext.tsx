'use client'

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { type Locale, DEFAULT_LOCALE, translate } from '@/lib/i18n'

const STORAGE_KEY = 'bolao2026:locale'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'pt' || stored === 'es') setLocaleState(stored)
    } catch {
      // localStorage indisponível — mantém o padrão
    }
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try { localStorage.setItem(STORAGE_KEY, next) } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next === 'es' ? 'es' : 'pt-BR'
    }
  }, [])

  const t = useCallback((key: string, vars?: Record<string, string | number>) => translate(locale, key, vars), [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    // Fallback seguro fora do provider (ex: em testes) — usa o idioma padrão.
    return { locale: DEFAULT_LOCALE, setLocale: () => {}, t: (key: string, vars?: Record<string, string | number>) => translate(DEFAULT_LOCALE, key, vars) }
  }
  return ctx
}
