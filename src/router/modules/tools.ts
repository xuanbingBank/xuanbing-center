import { Tools, InfoFilled } from '@element-plus/icons-vue'
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
      path: '/tools-list',
      name: 'tools-list',
      meta: {
        title: '工具箱',
        icon: Tools
      }
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '关于',
        icon: InfoFilled
      }
    }
  ]
} 