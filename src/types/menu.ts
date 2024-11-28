import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

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

// 确保 MenuItem 可以转换为 RouteRecordRaw
export type MenuItemToRoute = Omit<RouteRecordRaw, 'children'> & {
  children?: MenuItemToRoute[]
} 