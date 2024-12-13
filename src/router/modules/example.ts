import { RouteRecordRaw } from 'vue-router'

export const exampleRoute: RouteRecordRaw = {
  path: '/examples',
  name: 'examples',
  meta: {
    title: 'daisyUI示例',
    icon: 'material-symbols:science',
    module: 'examples'
  },
  children: [
    {
      path: '/page',
      name: 'page',
      component: () => import('@/views/examples/page/index.vue'),
      meta: {
        title: '页面示例',
        icon: 'material-symbols:article'
      }
    },
    {
      path: '/buttons',
      name: 'daisyui-buttons',
      component: () => import('@/views/examples/daisyui/buttons/index.vue'),
      meta: {
        title: '按钮示例',
        icon: 'material-symbols:smart-button'
      }
    }
  ]
}
