/**
 * @description 路由守卫
 */
import { Router, RouteLocationNormalized } from 'vue-router'
import { useAppStore } from '../../stores/modules/app'
import { ElMessage } from 'element-plus'
import type { RouteMeta } from '../../types/menu'

/**
 * @description 设置页面标题
 */
const setDocumentTitle = (title: string) => {
  document.title = title ? `${title} - 玄冰中心` : '玄冰中心'
}

/**
 * @description 获取路由元信息
 */
const getRouteMeta = (route: RouteLocationNormalized): RouteMeta => {
  return route.meta as RouteMeta
}

/**
 * @description 注册全局路由守卫
 */
export function setupRouterGuards(router: Router) {
  /** 前置守卫 */
  router.beforeEach((to, from, next) => {
    // 设置加载状态
    const appStore = useAppStore()
    appStore.setLoading(true)

    // 获取路由元信息
    const meta = getRouteMeta(to)

    // 设置页面标题和描述
    const title = meta.title
    const description = meta.description
    setDocumentTitle(title)
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }

    // 处理外部链接
    if (meta.isExternal && meta.externalLink) {
      window.location.href = meta.externalLink
      return
    }

    // 处理页面缓存
    if (meta.keepAlive) {
      // TODO: 实现页面缓存逻辑
    }

    // 记录路由历史
    appStore.addRouteHistory({
      path: to.path,
      title: title,
      timestamp: Date.now()
    })

    // 权限检查
    const requiresAuth = meta.requiresAuth
    const permissions = meta.permissions
    if (requiresAuth) {
      // TODO: 实现权限检查逻辑
      next()
      return
    }

    next()
  })

  /** 后置守卫 */
  router.afterEach(() => {
    // 关闭加载状态
    const appStore = useAppStore()
    appStore.setLoading(false)
  })

  /** 错误处理 */
  router.onError(error => {
    console.error('路由错误:', error)
    ElMessage.error('页面加载失败')
  })
}
