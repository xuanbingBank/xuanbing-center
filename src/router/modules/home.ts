import { RouteRecordRaw } from 'vue-router'

export const homeRoute: RouteRecordRaw = {
  path: '/home',
  name: 'home',
  meta: {
    title: '首页',
    icon: 'house',
    module: 'home'
  },
  children: [
    {
      path: '/home/dashboard',
      name: 'dashboard',
      component: () => import('@/views/home/dashboard/index.vue'),
      meta: {
        title: '数据看板',
        icon: 'house',
        keepAlive: true,
        description: '系统数据总览',
        type: 'list',
        parent: 'home',
        sort: 1
      }
    },
    {
      path: '/home/game-screen',
      name: 'gameScreen',
      component: () => import('@/views/home/game-screen/index.vue'),
      meta: {
        title: '游戏副屏',
        icon: 'display',
        keepAlive: false,
        description: '游戏辅助显示界面',
        type: 'other',
        parent: 'home',
        sort: 2
      }
    }
  ]
}
