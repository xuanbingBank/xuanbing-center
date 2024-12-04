import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>(localStorage.getItem('theme-mode') as ThemeMode || 'system')

  const currentTheme = ref('light')

  // 硬件加速相关状态
  const hardwareAcceleration = ref(localStorage.getItem('hardware-acceleration') === 'true')
  const accelerationType = ref(localStorage.getItem('acceleration-type') || 'transform3d')

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

  // 设置硬件加速状态
  function setHardwareAcceleration(enabled: boolean) {
    hardwareAcceleration.value = enabled
    localStorage.setItem('hardware-acceleration', String(enabled))
    applyHardwareAcceleration()
  }

  // 设置加速类型
  function setAccelerationType(type: string) {
    accelerationType.value = type
    localStorage.setItem('acceleration-type', type)
    applyHardwareAcceleration()
  }

  // 应用硬件加速
  function applyHardwareAcceleration() {
    const style = document.documentElement.style
    
    if (!hardwareAcceleration.value) {
      style.setProperty('--hardware-acceleration', 'none')
      return
    }
    
    const accelerationValue = accelerationType.value === 'transform3d'
      ? 'translate3d(0,0,0)'
      : 'translateZ(0)'
    
    style.setProperty('--hardware-acceleration', accelerationValue)
  }

  // 初始化时应用硬件加速
  function initHardwareAcceleration() {
    applyHardwareAcceleration()
  }

  return {
    mode,
    currentTheme,
    setMode,
    initSystemThemeListener,
    setTheme,
    initTheme,
    hardwareAcceleration,
    accelerationType,
    setHardwareAcceleration,
    setAccelerationType,
    initHardwareAcceleration
  }
}) 