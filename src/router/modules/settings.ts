import { Setting } from '@element-plus/icons-vue'
import type { MenuItem } from '@/types/menu'

export const settingsRoute: MenuItem = {
  path: '/settings',
  name: 'settings',
  meta: {
    title: '设置',
    icon: Setting,
    module: 'settings',
    isBottom: true
  }
} 