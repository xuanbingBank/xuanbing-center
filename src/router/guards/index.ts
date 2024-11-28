/**
 * @description 路由守卫
 */
import { Router } from 'vue-router'
import { useAppStore } from '@/stores/modules/app'
import { ElMessage } from 'element-plus'

/**
 * @description 设置页面标题
 */
const setDocumentTitle = (title: string) => {
  document.title = title ? `${title} - 玄冰中心` : '玄冰中心'
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

    // 设置页面标题
    const title = to.meta?.title as string
    setDocumentTitle(title)

    // 记录路由历史
    appStore.addRouteHistory({
      path: to.path,
      title: title,
      timestamp: Date.now()
    })

    // 权限检查
    const requiresAuth = to.meta?.requiresAuth
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
  router.onError((error) => {
    console.error('路由错误:', error)
    ElMessage.error('页面加载失败')
  })
} 