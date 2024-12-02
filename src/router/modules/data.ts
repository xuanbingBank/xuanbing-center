import { RouteRecordRaw } from 'vue-router'
import { loadView } from '../../utils/router'


export const dataRoute: RouteRecordRaw = {
  path: '/data',
  name: 'data',
  meta: {
    title: '数据中心',
    icon: 'folder',
    module: 'data'
  },
  children: [
    {
      path: '/data/notes',
      name: 'notes',
      component: loadView('data/notes/index'),
      meta: {
        title: '笔记',
        icon: 'file'
      }
    },
    {
      path: '/data/materials',
      name: 'materials',
      component: loadView('data/materials/index'),
      meta: {
        title: '素材库',
        icon: 'box-archive'
      }
    },
    {
      path: '/data/bookmarks',
      name: 'bookmarks',
      component: loadView('data/bookmarks/index'),
      meta: {
        title: '网址收藏',
        icon: 'link'
      }
    },
    {
      path: '/data/music',
      name: 'music',
      component: loadView('data/music/index'),
      meta: {
        title: '音乐库',
        icon: 'headphones'
      }
    },
    {
      path: '/data/videos',
      name: 'videos',
      component: loadView('data/videos/index'),
      meta: {
        title: '视频库',
        icon: 'video'
      }
    },
    {
      path: '/data/codes',
      name: 'codes',
      component: loadView('data/codes/index'),
      meta: {
        title: '代码库',
        icon: 'code'
      }
    },
    {
      path: '/data/others',
      name: 'others',
      component: loadView('data/others/index'),
      meta: {
        title: '其他',
        icon: 'folder'
      }
    }
  ]
}
