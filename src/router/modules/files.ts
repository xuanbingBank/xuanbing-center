import { RouteRecordRaw } from 'vue-router'

export const filesRoute: RouteRecordRaw = {
  path: '/files',
  name: 'files',
  meta: {
    title: '文件管理',
    icon: 'folder-tree',
    module: 'files'
  },
  children: [
    {
      path: '/files/explorer',
      name: 'explorer',
      component: () => import('@/views/files/explorer/index.vue'),
      meta: {
        title: '文件浏览',
        icon: 'folder-open'
      }
    },
    {
      path: '/files/recent',
      name: 'recent',
      component: () => import('@/views/files/recent/index.vue'),
      meta: {
        title: '最近文件',
        icon: 'clock'
      }
    },
    {
      path: '/files/favorites',
      name: 'favorites', 
      component: () => import('@/views/files/favorites/index.vue'),
      meta: {
        title: '收藏夹',
        icon: 'star'
      }
    }
  ]
} 