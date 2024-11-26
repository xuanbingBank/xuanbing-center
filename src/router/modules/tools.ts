import { Tools } from '@element-plus/icons-vue'
import type { MenuItem } from '@/types/menu'

export const toolsRoute: MenuItem = {
  path: '/tools',
  name: 'tools',
  meta: {
    title: '工具',
    icon: Tools,
    module: 'tools'
  },
  children: [
    {
      path: '/tools/features',
      name: 'toolFeatures',
      component: () => import('@/views/tools/features.vue'),
      meta: {
        title: '小功能组',
        icon: Tools
      }
    }
  ]
} 