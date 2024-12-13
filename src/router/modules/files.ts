import { RouteRecordRaw } from 'vue-router'

export const filesRoute: RouteRecordRaw = {
  path: '/files',
  name: 'files',
  meta: {
    title: '文件管理',
    icon: 'material-symbols:folder-managed',
    module: 'files'
  },
  children: [
    {
      path: '/files/explorer',
      name: 'explorer',
      component: () => import('@/views/files/explorer/index.vue'),
      meta: {
        title: '文件浏览',
        icon: 'material-symbols:folder-open'
      }
    },
    {
      path: '/files/recent',
      name: 'recent',
      component: () => import('@/views/files/recent/index.vue'),
      meta: {
        title: '最近文件',
        icon: 'material-symbols:history'
      }
    },
    {
      path: '/files/favorites',
      name: 'favorites', 
      component: () => import('@/views/files/favorites/index.vue'),
      meta: {
        title: '收藏夹',
        icon: 'material-symbols:star'
      }
    }
  ]
} 