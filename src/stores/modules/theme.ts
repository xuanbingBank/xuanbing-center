import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>(localStorage.getItem('theme-mode') as ThemeMode || 'system')

  const currentTheme = ref('light')

  function setMode(newMode: ThemeMode) {
    mode.value = newMode
    updateTheme()
  }

  function updateTheme() {
    const theme = currentTheme.value
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme-mode', mode.value)
  }

  function initSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => mode.value === 'system' && updateTheme())
    updateTheme()
  }

  function setTheme(theme: string) {
    currentTheme.value = theme
    if (mode.value !== 'dark') {
      document.documentElement.setAttribute('data-theme', theme)
    }
    localStorage.setItem('theme', theme)
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      currentTheme.value = savedTheme
      if (mode.value !== 'dark') {
        document.documentElement.setAttribute('data-theme', savedTheme)
      }
    }
  }

  return {
    mode,
    currentTheme,
    setMode,
    initSystemThemeListener,
    setTheme,
    initTheme
  }
}) 