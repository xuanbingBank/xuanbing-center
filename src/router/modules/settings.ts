import { RouteRecordRaw } from 'vue-router'

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
      component: () => import('../../views/settings/theme.vue'),
      meta: {
        title: '主题设置',
        icon: 'palette'
      }
    },
    {
      path: '/settings/data',
      name: 'dataSettings',
      component: () => import('../../views/settings/data.vue'),
      meta: {
        title: '数据设置',
        icon: 'database'
      }
    },
    {
      path: '/settings/backup',
      name: 'backupSettings',
      component: () => import('../../views/settings/backup.vue'),
      meta: {
        title: '备份设置',
        icon: 'cloud-arrow-up'
      }
    },
    {
      path: '/settings/other',
      name: 'otherSettings',
      component: () => import('../../views/settings/other.vue'),
      meta: {
        title: '其他设置',
        icon: 'sliders'
      }
    }
  ]
}
