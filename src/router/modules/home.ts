import { RouteRecordRaw } from 'vue-router'

export const homeRoute: RouteRecordRaw = {
  path: '/home',
  name: 'home',
  meta: {
    title: '首页',
    icon: 'material-symbols:home',
    module: 'home'
  },
  children: [
    {
      path: '/home/dashboard',
      name: 'dashboard',
      component: () => import('@/views/home/dashboard/index.vue'),
      meta: {
        title: '数据看板',
        icon: 'material-symbols:dashboard'
      }
    },
    {
      path: '/home/game-screen',
      name: 'gameScreen',
      component: () => import('@/views/home/game-screen/index.vue'),
      meta: {
        title: '游戏副屏',
        icon: 'material-symbols:desktop-windows'
      }
    }
  ]
}
