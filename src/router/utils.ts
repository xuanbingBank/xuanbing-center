import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '../types/menu'

/**
 * @description 生成路由配置
 */
export function generateRoutes(menuRoutes: MenuItem[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  function addRoute(menuItem: MenuItem) {
    const route: RouteRecordRaw = {
      path: menuItem.path,
      name: menuItem.name,
      component: menuItem.component,
      meta: menuItem.meta as any,
      children: []
    }

    if (menuItem.children?.length) {
      route.children = menuItem.children.map(child => ({
        path: child.path.replace(menuItem.path + '/', ''),
        name: child.name,
        component: child.component,
        meta: child.meta as any,
        children: []
      }))
    }

    routes.push(route)
  }

  menuRoutes.forEach(route => addRoute(route))
  return routes
}
