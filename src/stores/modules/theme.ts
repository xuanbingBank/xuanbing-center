import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>(localStorage.getItem('theme-mode') as ThemeMode || 'system')

  const currentTheme = computed(() => {
    if (mode.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return mode.value
  })

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

  return {
    mode,
    currentTheme,
    setMode,
    initSystemThemeListener
  }
}) 