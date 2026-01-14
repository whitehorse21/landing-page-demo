import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import enTranslations from '../locales/en.json'
import esTranslations from '../locales/es.json'
import frTranslations from '../locales/fr.json'
import nlTranslations from '../locales/nl.json'

export type Language = 'en' | 'es' | 'fr' | 'nl'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

const translations: Record<Language, any> = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  nl: nlTranslations,
}

// Helper function to get nested value from object using dot notation
const getNestedValue = (obj: any, path: string): string | null => {
  return path.split('.').reduce((current: any, key: string) => {
    return current && current[key] !== undefined ? current[key] : null
  }, obj)
}

// Flatten nested translation object for backward compatibility with dot notation keys
const flattenTranslations = (obj: any, prefix = ''): Record<string, string> => {
  const flattened: Record<string, string> = {}
  
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(flattened, flattenTranslations(obj[key], prefix ? `${prefix}.${key}` : key))
    } else {
      flattened[prefix ? `${prefix}.${key}` : key] = obj[key]
    }
  }
  
  return flattened
}

const flattenedTranslations: Record<Language, Record<string, string>> = {
  en: flattenTranslations(enTranslations),
  es: flattenTranslations(esTranslations),
  fr: flattenTranslations(frTranslations),
  nl: flattenTranslations(nlTranslations),
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en'
    
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['en', 'es', 'fr', 'nl'].includes(savedLanguage)) {
      document.documentElement.setAttribute('lang', savedLanguage)
      return savedLanguage
    }
    
    // Detect browser language
    const browserLang = navigator.language.split('-')[0]
    if (['en', 'es', 'fr', 'nl'].includes(browserLang)) {
      document.documentElement.setAttribute('lang', browserLang)
      return browserLang as Language
    }
    
    document.documentElement.setAttribute('lang', 'en')
    return 'en'
  })
  
  // Update lang attribute when language changes
  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('language', lang)
      document.documentElement.setAttribute('lang', lang)
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  const t = (key: string): string => {
    // Try to get from flattened translations first (for dot notation keys)
    const flattened = flattenedTranslations[language][key]
    if (flattened) return flattened
    
    // Fallback to nested lookup
    const nested = getNestedValue(translations[language], key)
    if (nested && nested !== key) return nested
    
    // Fallback to English
    const englishFlattened = flattenedTranslations.en[key]
    if (englishFlattened) return englishFlattened
    
    const englishNested = getNestedValue(translations.en, key)
    if (englishNested && englishNested !== key) return englishNested
    
    // Return key if not found
    return key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
