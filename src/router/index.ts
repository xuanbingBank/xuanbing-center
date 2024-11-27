import { createRouter, createWebHashHistory } from 'vue-router'
import { homeRoute } from './modules/home'
import { systemRoute } from './modules/system'
import { toolsRoute } from './modules/tools'
import { settingsRoute } from './modules/settings'
import { generateRoutes } from './utils'
import type { MenuItem } from '@/types/menu'

// 菜单路由配置
export const menuRoutes: MenuItem[] = [
  homeRoute,
  systemRoute,
  toolsRoute,
  settingsRoute
]

// 生成路由配置
const routes = generateRoutes(menuRoutes)

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 