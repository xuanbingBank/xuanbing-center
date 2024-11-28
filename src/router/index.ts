import { createRouter, createWebHashHistory } from 'vue-router'
import { homeRoute } from './modules/home'
import { dataRoute } from './modules/data'
import { toolsRoute } from './modules/tools'
import { aboutRoute } from './modules/about'
import { settingsRoute } from './modules/settings'
import { generateRoutes } from './utils'
import { setupRouterGuards } from './guards'
import type { MenuItem } from '@/types/menu'

// 菜单路由配置
export const menuRoutes: MenuItem[] = [homeRoute, dataRoute, toolsRoute, aboutRoute, settingsRoute]

// 生成路由配置
const routes = generateRoutes(menuRoutes)

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 注册路由守卫
setupRouterGuards(router)

export default router
