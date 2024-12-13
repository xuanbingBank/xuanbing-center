import { RouteRecordRaw } from 'vue-router'

export const exampleRoute: RouteRecordRaw = {
  path: '/examples',
  name: 'examples',
  meta: {
    title: 'daisyUI示例',
    icon: 'flask',
    module: 'examples'
  },
  children: [
    {
      path: '/buttons',
      name: 'daisyui-buttons',
      component: () => import('@/views/examples/daisyui/buttons/index.vue'),
      meta: {
        title: '按钮示例',
        icon: 'palette'
      }
    }
  ]
}
