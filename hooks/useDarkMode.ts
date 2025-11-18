'use client';

import { useThemeContext } from '@/components/ThemeProvider';

export function useDarkMode() {
  const { theme } = useThemeContext();
  return theme === 'dark';
}
