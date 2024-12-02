import { RouteRecordRaw } from 'vue-router'
import { loadView } from '../../utils/router'

export const settingsRoute: RouteRecordRaw = {
  path: '/settings',
  name: 'settings',
  meta: {
    title: '设置',
    icon: 'gear',
    module: 'settings',
    isBottom: true
  },
  children: [
    {
      path: '/settings/theme',
      name: 'themeSettings',
      component: loadView('settings/theme'),
      meta: {
        title: '主题设置'
      }
    },
    {
      path: '/settings/data',
      name: 'dataSettings',
      component: loadView('settings/data'),
      meta: {
        title: '数据中心设置'
      }
    },
    {
      path: '/settings/backup',
      name: 'backupSettings',
      component: loadView('settings/backup'),
      meta: {
        title: '备份设置'
      }
    },
    {
      path: '/settings/other',
      name: 'otherSettings',
      component: loadView('settings/other'),
      meta: {
        title: '其他设置'
      }
    }
  ]
}
