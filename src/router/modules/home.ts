import { HomeFilled, Monitor } from '@element-plus/icons-vue'
import type { MenuItem } from '@/types/menu'

export const homeRoute: MenuItem = {
  path: '/home',
  name: 'home',
  meta: {
    title: '首页',
    icon: HomeFilled,
    module: 'home'
  },
  children: [
    {
      path: '/home/dashboard',
      name: 'dashboard',
      component: () => import('@/views/home/dashboard/index.vue'),
      meta: {
        title: '数据看板',
        icon: HomeFilled
      }
    },
    {
      path: '/home/game-screen',
      name: 'gameScreen',
      component: () => import('@/views/home/game-screen/index.vue'),
      meta: {
        title: '游戏副屏',
        icon: Monitor
      }
    }
  ]
} 