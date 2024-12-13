import { RouteRecordRaw } from 'vue-router'

export const toolsRoute: RouteRecordRaw = {
  path: '/tools',
  name: 'tools',
  meta: {
    title: '工具',
    icon: 'material-symbols:auto-awesome-mosaic',
    module: 'tools'
  },
  children: [
    {
      path: '/tools/features',
      name: 'toolFeatures',
      component: () => import('@/views/tools/features/index.vue'),
      meta: {
        title: '小功能组',
        icon: 'material-symbols:widgets'
      }
    }
  ]
}
