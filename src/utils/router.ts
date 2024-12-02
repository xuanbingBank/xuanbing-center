/**
 * 路由懒加载工具函数
 * @param {string} view - 视图组件的路径
 * @returns {Promise<Component>} 返回异步组件
 */
export const loadView = (view: string) => {
  return () => import(`/src/views/${view}.vue`)
} 