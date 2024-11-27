import type { Component } from 'vue'

export interface MenuItem {
  path: string
  name: string
  component?: () => Promise<Component>
  meta?: {
    title?: string
    icon?: Component
    module?: string
    isBottom?: boolean
  }
  children?: MenuItem[]
} 