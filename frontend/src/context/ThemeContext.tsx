'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);

  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  const resolveTheme = useCallback((currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  }, [getSystemTheme]);

  const applyTheme = useCallback((resolvedTheme: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    
    root.setAttribute('data-theme', resolvedTheme);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('employrix-theme', newTheme);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    }
    
    const resolved = resolveTheme(newTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, [resolveTheme, applyTheme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let savedTheme: Theme = 'system';
    
    try {
      const stored = localStorage.getItem('employrix-theme') as Theme;
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        savedTheme = stored;
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }

    setThemeState(savedTheme);
    const resolved = resolveTheme(savedTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
    setIsLoading(false);
  }, [resolveTheme, applyTheme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const newResolved = e.matches ? 'dark' : 'light';
        setResolvedTheme(newResolved);
        applyTheme(newResolved);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme, applyTheme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    document.documentElement.classList.add('theme-transitioning');
    
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const value: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('employrix-theme') || 'system';
      var resolved = theme;
      
      if (theme === 'system') {
        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      document.documentElement.classList.add(resolved);
      document.documentElement.setAttribute('data-theme', resolved);
    } catch (e) {
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
`;