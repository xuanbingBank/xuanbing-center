import { InfoFilled, ChatDotRound } from '@element-plus/icons-vue'
import type { MenuItem } from '@/types/menu'

export const aboutRoute: MenuItem = {
  path: '/about',
  name: 'about',
  meta: {
    title: '关于',
    icon: InfoFilled,
    module: 'about'
  },
  children: [
    {
      path: '/about/feedback',
      name: 'feedback',
      component: () => import('@/views/about/feedback/index.vue'),
      meta: {
        title: '反馈',
        icon: ChatDotRound
      }
    }
  ]
}
