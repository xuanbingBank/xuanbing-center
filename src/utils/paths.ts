import { app } from 'electron'
import { join } from 'path'
import { mkdirSync, existsSync } from 'fs'

/**
 * @description 应用数据目录结构
 */
export const APP_PATHS = {
  // 应用数据根目录
  ROOT: join(app.getPath('userData'), 'XuanBingData'),

  // 数据库文件目录
  DATABASE: {
    ROOT: join(app.getPath('userData'), 'XuanBingData', 'databases'),
    // 主数据库文件
    MAIN: join(app.getPath('userData'), 'XuanBingData', 'databases', 'main.db'),
    // 备份目录
    BACKUP: join(app.getPath('userData'), 'XuanBingData', 'databases', 'backup')
  },

  // 配置文件目录
  CONFIG: join(app.getPath('userData'), 'XuanBingData', 'config'),

  // 缓存目录
  CACHE: join(app.getPath('userData'), 'XuanBingData', 'cache'),

  // 日志目录
  LOGS: join(app.getPath('userData'), 'XuanBingData', 'logs'),

  // 临时文件目录
  TEMP: join(app.getPath('userData'), 'XuanBingData', 'temp')
} as const

/**
 * @description 初始化应用数据目录
 */
export function initAppPaths() {
  Object.values(APP_PATHS).forEach(path => {
    if (typeof path === 'string' && !existsSync(path)) {
      mkdirSync(path, { recursive: true })
    } else if (typeof path === 'object') {
      Object.values(path).forEach(subPath => {
        if (typeof subPath === 'string' && !existsSync(subPath)) {
          mkdirSync(subPath, { recursive: true })
        }
      })
    }
  })
}
