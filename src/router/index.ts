import { createRouter, createWebHashHistory } from 'vue-router'
import { homeRoute } from './modules/home'
import { dataRoute } from './modules/data'
import { filesRoute } from './modules/files'
import { toolsRoute } from './modules/tools'
import { exampleRoute } from './modules/example'
import { settingsRoute } from './modules/settings'
import { generateRoutes } from './utils'
import { setupRouterGuards } from './guards'
import type { MenuItem } from '../types/menu'

// 菜单路由配置
export const menuRoutes: MenuItem[] = [homeRoute, dataRoute, filesRoute, toolsRoute, exampleRoute, settingsRoute]

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
