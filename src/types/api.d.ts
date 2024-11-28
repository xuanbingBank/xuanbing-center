/**
 * @description 接口返回数据的类型定义
 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

/**
 * @description 分页请求参数
 */
export interface PageParams {
  page: number
  pageSize: number
}

/**
 * @description 分页响应数据
 */
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
} 