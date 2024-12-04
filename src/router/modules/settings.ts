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
        title: '主题设置',
        icon: 'palette'
      }
    },
    {
      path: '/settings/data',
      name: 'dataSettings',
      component: loadView('settings/data'),
      meta: {
        title: '数据设置',
        icon: 'database'
      }
    },
    {
      path: '/settings/backup',
      name: 'backupSettings',
      component: loadView('settings/backup'),
      meta: {
        title: '备份设置',
        icon: 'cloud-arrow-up'
      }
    },
    {
      path: '/settings/other',
      name: 'otherSettings',
      component: loadView('settings/other'),
      meta: {
        title: '其他设置',
        icon: 'sliders'
      }
    }
  ]
}
