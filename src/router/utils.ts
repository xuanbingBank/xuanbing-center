import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '@/types/menu'

// 生成路由配置
export function generateRoutes(menuRoutes: MenuItem[]): RouteRecordRaw[] {
  return menuRoutes.reduce<RouteRecordRaw[]>((acc, route) => {
    if (route.children) {
      acc.push(...route.children.map(child => ({
        path: child.path,
        name: child.name,
        component: () => import(`@/views${child.path}.vue`),
        meta: child.meta
      })))
    } else {
      acc.push({
        path: route.path,
        name: route.name,
        component: () => import(`@/views${route.path}.vue`),
        meta: route.meta
      })
    }
    return acc
  }, [])
} 