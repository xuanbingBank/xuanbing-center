import { RouteRecordRaw } from 'vue-router'

export const aboutRoute: RouteRecordRaw = {
  path: '/about',
  name: 'about',
  meta: {
    title: '关于',
    icon: 'circle-info',
    module: 'about'
  },
  children: [
    {
      path: '/about/feedback',
      name: 'feedback',
      component: () => import('../../views/about/feedback/index.vue'),
      meta: {
        title: '反馈',
        icon: 'comments'
      }
    }
  ]
}
