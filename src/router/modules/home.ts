import { HomeFilled, DataBoard } from '@element-plus/icons-vue'
import type { MenuItem } from '@/types/menu'

export const homeRoute: MenuItem = {
  path: '/',
  name: 'home',
  meta: {
    title: '首页',
    icon: HomeFilled,
    module: 'home'
  },
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        title: '数据看板',
        icon: DataBoard
      }
    }
  ]
} 