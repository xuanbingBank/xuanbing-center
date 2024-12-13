/**
 * @description 全局类型定义文件
 */

// 环境变量类型定义
interface ImportMetaEnv {
  /** API基础路径 */
  readonly VITE_API_BASE_URL: string
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
declare type Recordable<T = any> = Record<string, T>

// 通用接口
declare interface Result<T = any> {
  code: number
  message: string
  data: T
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

// FontAwesome相关模块声明
declare module '@fortawesome/vue-fontawesome'
declare module '@fortawesome/fontawesome-svg-core'
declare module '@fortawesome/free-solid-svg-icons'