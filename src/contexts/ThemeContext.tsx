import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      // Apply immediately
      const root = document.documentElement
      if (savedTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      return savedTheme as Theme
    }
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
      return 'dark'
    }
    
    // Default to light
    document.documentElement.classList.remove('dark')
    return 'light'
  })

  // Apply theme whenever it changes
  useEffect(() => {
    const root = document.documentElement
    
    // Apply theme class synchronously
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Save to localStorage
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [theme])

  const toggleTheme = () => {
    const root = document.documentElement
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      
      // Apply immediately and synchronously to DOM
      if (newTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      
      // Save to localStorage immediately
      try {
        localStorage.setItem('theme', newTheme)
      } catch (e) {
        // Ignore localStorage errors
      }
      
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
