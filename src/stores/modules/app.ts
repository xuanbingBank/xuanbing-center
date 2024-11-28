/**
 * @description 应用状态管理
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface RouteHistory {
  path: string
  title: string
  timestamp: number
}

export const useAppStore = defineStore('app', () => {
  /** 加载状态 */
  const loading = ref(false)
  
  /** 路由历史 */
  const routeHistory = ref<RouteHistory[]>([])

  /**
   * @description 设置加载状态
   */
  const setLoading = (status: boolean) => {
    loading.value = status
  }

  /**
   * @description 添加路由历史
   */
  const addRouteHistory = (route: RouteHistory) => {
    routeHistory.value.push(route)
    // 只保留最近的 50 条记录
    if (routeHistory.value.length > 50) {
      routeHistory.value.shift()
    }
  }

  return {
    loading,
    routeHistory,
    setLoading,
    addRouteHistory
  }
}) 