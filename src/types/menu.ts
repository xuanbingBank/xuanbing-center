import type { Component } from 'vue'

export interface MenuItem {
  path: string
  name: string
  meta?: {
    title?: string
    icon?: Component
    module?: string
    isBottom?: boolean
  }
  children?: MenuItem[]
} 