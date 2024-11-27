import { Setting } from '@element-plus/icons-vue'
import type { MenuItem } from '@/types/menu'

export const systemRoute: MenuItem = {
  path: '/system',
  name: 'system',
  meta: {
    title: '系统',
    icon: Setting,
    module: 'system'
  },
  children: [
    {
      path: '/feature1',
      name: 'feature1',
      meta: {
        title: '功能1'
      }
    },
    {
      path: '/feature2',
      name: 'feature2',
      meta: {
        title: '功能2'
      }
    }
  ]
} 