/**
 * @description 全局类型定义文件
 */

import { defineComponent } from 'vue'

// 环境变量类型定义
interface ImportMetaEnv {
  /** API基础路径 */
  readonly VITE_API_BASE_URL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Window扩展
declare interface Window {
  /** Electron IPC通信 */
  electron: {
    ipcRenderer: {
      send: (channel: string, ...args: any[]) => void
      on: (channel: string, func: (...args: any[]) => void) => void
      once: (channel: string, func: (...args: any[]) => void) => void
      invoke: (channel: string, ...args: any[]) => Promise<any>
    }
  }
}

// 通用类型
declare type Nullable<T> = T | null
declare type NonNullable<T> = T extends null | undefined ? never : T
declare type Recordable<T = any> = Record<string, T>

// 通用接口
declare interface Result<T = any> {
  code: number
  message: string
  data: T
}

// 分页相关类型
declare interface PageParams {
  page: number
  pageSize: number
  [key: string]: any
}

declare interface PageResult<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 组件相关类型
declare type Component<T = any> = 
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// 路由元信息
declare interface RouteMeta {
  /** 标题 */
  title?: string
  /** 图标 */
  icon?: Component
  /** 模块 */
  module?: string
  /** 是否底部菜单 */
  isBottom?: boolean
  /** 是否缓存 */
  keepAlive?: boolean
  /** 是否隐藏 */
  hidden?: boolean
}

// 主题相关类型
declare type ThemeMode = 'light' | 'dark' | 'system'

declare interface ThemeConfig {
  /** 主题模式 */
  mode: ThemeMode
  /** 主题色 */
  primaryColor: string
  /** 是否开启色弱模式 */
  isWeak: boolean
}

// 数据库相关类型
declare interface Database {
  /** 数据库名称 */
  name: string
  /** 数据库类型 */
  type: 'sqlite' | 'mysql' | 'postgresql'
  /** 数据库路径 */
  path?: string
  /** 数据库连接配置 */
  config?: {
    host?: string
    port?: number
    username?: string
    password?: string
  }
}

declare interface Table {
  /** 表名 */
  name: string
  /** 表注释 */
  comment?: string
  /** 字段列表 */
  columns: Column[]
}

declare interface Column {
  /** 字段名 */
  name: string
  /** 字段类型 */
  type: string
  /** 字段注释 */
  comment?: string
  /** 是否主键 */
  isPrimary?: boolean
  /** 是否可空 */
  isNullable?: boolean
  /** 默认值 */
  defaultValue?: any
}

// 文件相关类型
declare interface FileInfo {
  /** 文件名 */
  name: string
  /** 文件路径 */
  path: string
  /** 文件大小 */
  size: number
  /** 文件类型 */
  type: string
  /** 创建时间 */
  createTime: string
  /** 修改时间 */
  updateTime: string
}

// 系统配置类型
declare interface SystemConfig {
  /** 数据库配置 */
  database: {
    /** 默认数据库类型 */
    defaultType: Database['type']
    /** 数据库列表 */
    list: Database[]
  }
  /** 主题配置 */
  theme: ThemeConfig
  /** 系统设置 */
  settings: {
    /** 是否开启自动备份 */
    autoBackup: boolean
    /** 备份间隔(分钟) */
    backupInterval: number
    /** 备份路径 */
    backupPath: string
  }
}

declare module '@fortawesome/vue-fontawesome'
declare module '@fortawesome/fontawesome-svg-core'
declare module '@fortawesome/free-solid-svg-icons'