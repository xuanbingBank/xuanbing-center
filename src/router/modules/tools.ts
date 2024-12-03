import { RouteRecordRaw } from 'vue-router'
import { loadView } from '../../utils/router'

export const toolsRoute: RouteRecordRaw = {
  path: '/tools',
  name: 'tools',
  meta: {
    title: '工具',
    icon: 'wrench',
    module: 'tools'
  },
  children: [
    {
      path: '/tools/features',
      name: 'toolFeatures',
      component: loadView('tools/index'),
      meta: {
        title: '小功能组',
        icon: 'wrench'
      }
    }
  ]
}
