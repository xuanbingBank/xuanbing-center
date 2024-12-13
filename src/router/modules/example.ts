import { RouteRecordRaw } from 'vue-router'

export const exampleRoute: RouteRecordRaw = {
  path: '/examples',
  name: 'examples',
  meta: {
    title: '示例',
    icon: 'flask',
    module: 'examples'
  },
  children: [
    {
      path: '/daisyui',
      name: 'daisyui',
      component: () => import('@/views/examples/daisyui/index.vue'),
      meta: {
        title: 'daisyUI',
        icon: 'palette'
      }
    }
  ]
}
