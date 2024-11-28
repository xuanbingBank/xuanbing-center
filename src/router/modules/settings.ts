import { Setting } from '@element-plus/icons-vue'
import type { MenuItem } from '@/types/menu'

export const settingsRoute: MenuItem = {
  path: '/settings',
  name: 'settings',
  component: () => import('@/views/settings/index.vue'),
  meta: {
    title: '设置',
    icon: Setting,
    module: 'settings',
    isBottom: true
  },
  children: [
    {
      path: '/settings/theme',
      name: 'themeSettings',
      component: () => import('@/views/settings/theme.vue'),
      meta: {
        title: '主题设置'
      }
    },
    {
      path: '/settings/data',
      name: 'dataSettings',
      component: () => import('@/views/settings/data.vue'),
      meta: {
        title: '数据中心设置'
      }
    },
    {
      path: '/settings/backup',
      name: 'backupSettings',
      component: () => import('@/views/settings/backup.vue'),
      meta: {
        title: '备份设置'
      }
    },
    {
      path: '/settings/other',
      name: 'otherSettings',
      component: () => import('@/views/settings/other.vue'),
      meta: {
        title: '其他设置'
      }
    }
  ]
}
