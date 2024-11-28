import { HomeFilled, Monitor } from '@element-plus/icons-vue'
import type { MenuItem } from '../../types/menu'

export const homeRoute: MenuItem = {
  path: '/home',
  name: 'home',
  meta: {
    title: '首页',
    icon: HomeFilled,
    module: 'home',
    description: '系统首页',
    keywords: ['首页', '仪表盘', '数据看板'],
    type: 'list',
    sort: 1
  },
  children: [
    {
      path: '/home/dashboard',
      name: 'dashboard',
      component: () => import('@/views/home/dashboard/index.vue'),
      meta: {
        title: '数据看板',
        icon: HomeFilled,
        keepAlive: true,
        description: '系统数据总览',
        type: 'list',
        parent: 'home',
        sort: 1
      }
    },
    {
      path: '/home/game-screen',
      name: 'gameScreen',
      component: () => import('@/views/home/game-screen/index.vue'),
      meta: {
        title: '游戏副屏',
        icon: Monitor,
        keepAlive: false,
        description: '游戏辅助显示界面',
        type: 'other',
        parent: 'home',
        sort: 2
      }
    }
  ]
}
