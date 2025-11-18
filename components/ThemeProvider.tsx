'use client';

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { THEME_STORAGE_KEY, ThemeMode } from '@/lib/theme';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getPreferredTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: ThemeMode) {
  if (typeof document === 'undefined') {
    return;
  }

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  document.documentElement.setAttribute('data-theme', theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start with 'light' on server to match initial HTML
  // The inline script in layout.tsx handles the initial theme before React hydrates
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  // Sync theme from data-theme attribute (set by inline script) or localStorage/system preference after mount
  // Use useLayoutEffect to read DOM synchronously before paint to prevent flash
  useLayoutEffect(() => {
    // Read from data-theme attribute first (set by inline script before React hydrates)
    const dataTheme = document.documentElement.getAttribute('data-theme') as ThemeMode | null;
    const preferredTheme = dataTheme === 'dark' || dataTheme === 'light' 
      ? dataTheme 
      : getPreferredTheme();
    // This setState is necessary to sync React state with the DOM after hydration
    // The inline script sets the theme before React hydrates, so we need to sync here
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Initial hydration sync
    setThemeState(preferredTheme);
    applyTheme(preferredTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const updateTheme = (nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    }
    applyTheme(nextTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      }
      applyTheme(next);
      return next;
    });
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: updateTheme,
      toggleTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
}

