import { Folder, Collection, Link, Headset, VideoPlay, Document } from '@element-plus/icons-vue'
import type { MenuItem } from '@/types/menu'

export const dataRoute: MenuItem = {
  path: '/data',
  name: 'data',
  meta: {
    title: '数据中心',
    icon: Folder,
    module: 'data'
  },
  children: [
    {
      path: '/data/notes',
      name: 'notes',
      component: () => import('@/views/data/notes/index.vue'),
      meta: {
        title: '笔记',
        icon: Document
      }
    },
    {
      path: '/data/materials',
      name: 'materials',
      component: () => import('@/views/data/materials/index.vue'),
      meta: {
        title: '素材库',
        icon: Collection
      }
    },
    {
      path: '/data/bookmarks',
      name: 'bookmarks',
      component: () => import('@/views/data/bookmarks/index.vue'),
      meta: {
        title: '网址收藏',
        icon: Link
      }
    },
    {
      path: '/data/music',
      name: 'music',
      component: () => import('@/views/data/music/index.vue'),
      meta: {
        title: '音乐库',
        icon: Headset
      }
    },
    {
      path: '/data/videos',
      name: 'videos',
      component: () => import('@/views/data/videos/index.vue'),
      meta: {
        title: '视频库',
        icon: VideoPlay
      }
    },
    {
      path: '/data/codes',
      name: 'codes',
      component: () => import('@/views/data/codes/index.vue'),
      meta: {
        title: '代码库',
        icon: Document
      }
    },
    {
      path: '/data/others',
      name: 'others',
      component: () => import('@/views/data/others/index.vue'),
      meta: {
        title: '其他',
        icon: Folder
      }
    }
  ]
} 