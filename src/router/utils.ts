import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '@/types/menu'

// 生成路由配置
export function generateRoutes(menuRoutes: MenuItem[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  function addRoute(menuItem: MenuItem) {
    const route: RouteRecordRaw = {
      path: menuItem.path,
      name: menuItem.name,
      component: menuItem.component,
      meta: menuItem.meta,
      children: []
    }

    if (menuItem.children?.length) {
      route.children = menuItem.children.map(child => ({
        path: child.path.replace(menuItem.path + '/', ''), // 移除父路径前缀
        name: child.name,
        component: child.component,
        meta: child.meta,
        children: []
      }))
    }

    routes.push(route)
  }

  menuRoutes.forEach(route => addRoute(route))
  return routes
} 