import { RouteRecordRaw } from 'vue-router'
import { loadView } from '../../utils/router'

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
      component: loadView('about/feedback/index'),
      meta: {
        title: '反馈',
        icon: 'comments'
      }
    }
  ]
}
