import type { Component } from 'vue'
import type { RouteMeta as VueRouteMeta } from 'vue-router'

/**
 * @description 扩展的路由元信息
 */
export interface RouteMeta extends VueRouteMeta {
  /** 页面标题 */
  title: string
  
  /** 图标 */
  icon?: Component | string
  
  /** 所属模块 */
  module?: string
  
  /** 是否为底部菜单 */
  isBottom?: boolean
  
  /** 是否需要权限 */
  requiresAuth?: boolean
  
  /** 权限列表 */
  permissions?: string[]
  
  /** 是否缓存页面 */
  keepAlive?: boolean
  
  /** 是否在菜单中隐藏 */
  hidden?: boolean
  
  /** 页面说明 */
  description?: string
  
  /** 页面关键字 */
  keywords?: string[]
  
  /** 页面类型(用于区分不同类型的页面) */
  type?: 'list' | 'detail' | 'form' | 'other'
  
  /** 父级路由名称 */
  parent?: string
  
  /** 排序号(用于菜单排序) */
  sort?: number
  
  /** 是否为外部链接 */
  isExternal?: boolean
  
  /** 外部链接地址 */
  externalLink?: string
}

/**
 * @description 菜单项
 */
export interface MenuItem {
  /** 路由路径 */
  path: string
  
  /** 路由名称 */
  name: string
  
  /** 组件 */
  component?: () => Promise<Component>
  
  /** 路由元信息 */
  meta?: RouteMeta
  
  /** 子路由 */
  children?: MenuItem[]
} 