/**
 * @description 菜单相关的逻辑封装
 */
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStorage, useLocalStorage } from '@vueuse/core'
import { menuRoutes } from '@/router'
import type { MenuItem } from '@/types/menu'

export function useMenu() {
  // 持久化状态
  const isCollapsed = useLocalStorage('xuanbing-menu-collapsed', false)
  const activeModule = useStorage('xuanbing-active-module', 'home')
  const activeRoute = useStorage('xuanbing-active-route', '')

  const route = useRoute()
  const router = useRouter()

  /**
   * @description 计算顶部菜单项
   */
  const topMenus = computed(() => 
    menuRoutes.filter(route => !route.meta?.isBottom)
  )

  /**
   * @description 计算底部菜单项
   */
  const bottomMenus = computed(() => 
    menuRoutes.filter(route => route.meta?.isBottom)
  )

  /**
   * @description 计算当前模块路由
   */
  const currentModuleRoute = computed(() => {
    const current = menuRoutes.find(route => route.meta?.module === activeModule.value)
    return current || menuRoutes[0]
  })

  /**
   * @description 切换折叠状态
   */
  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
  }

  /**
   * @description 处理路由选择
   */
  const handleSelect = (index: string) => {
    activeRoute.value = index
    router.push(index)
  }

  /**
   * @description 处理模块选择
   */
  const handleModuleSelect = (index: string) => {
    activeModule.value = index
    const currentModule = menuRoutes.find(
      route => route.meta?.module === index
    )
    if (currentModule?.children?.length) {
      const firstRoute = findFirstLeafRoute(currentModule.children)
      if (firstRoute) {
        activeRoute.value = firstRoute.path
        router.push(firstRoute.path)
      }
    }
  }

  /**
   * @description 查找第一个叶子路由
   */
  const findFirstLeafRoute = (routes: MenuItem[]): MenuItem | null => {
    const firstRoute = routes[0]
    if (!firstRoute) return null
    if (firstRoute.children?.length) {
      return findFirstLeafRoute(firstRoute.children)
    }
    return firstRoute
  }

  /**
   * @description 根据路径查找路由
   */
  const findRouteByPath = (routes: MenuItem[], path: string): MenuItem | null => {
    for (const route of routes) {
      if (route.path === path) return route
      if (route.children?.length) {
        const found = findRouteByPath(route.children, path)
        if (found) return found
      }
    }
    return null
  }

  /**
   * @description 初始化激活菜单
   */
  const initActiveMenu = () => {
    const currentRoute = findRouteByPath(menuRoutes, route.path)
    if (currentRoute?.meta?.module) {
      activeModule.value = currentRoute.meta.module
      activeRoute.value = route.path
    } else {
      const homeModule = menuRoutes[0]
      if (homeModule?.children?.length) {
        const firstRoute = findFirstLeafRoute(homeModule.children)
        if (firstRoute) {
          activeModule.value = homeModule.meta?.module || 'home'
          activeRoute.value = firstRoute.path
        }
      }
    }
  }

  return {
    // 状态
    isCollapsed,
    activeModule,
    activeRoute,
    topMenus,
    bottomMenus,
    currentModuleRoute,

    // 方法
    toggleCollapse,
    handleSelect,
    handleModuleSelect,
    initActiveMenu
  }
} 