export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

export const themeInitScript = `
(function() {
  const storageKey = '${THEME_STORAGE_KEY}';
  try {
    const savedTheme = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : (prefersDark ? 'dark' : 'light');

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    console.warn('Error initializing theme', error);
  }
})();
`.trim();

