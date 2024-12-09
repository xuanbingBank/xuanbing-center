/**
 * @description 错误类型枚举
 */
export enum ErrorType {
  /** 业务错误 */
  BUSINESS = 'business',
  /** 网络错误 */
  NETWORK = 'network',
  /** 数据库错误 */
  DATABASE = 'database',
  /** 文件系统错误 */
  FILE = 'file',
  /** 未知错误 */
  UNKNOWN = 'unknown'
}

/**
 * @description 自定义错误类
 */
export class CustomError extends Error {
  /** 错误类型 */
  type: ErrorType
  /** 错误码 */
  code?: string | number
  /** 错误数据 */
  data?: any

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    code?: string | number,
    data?: any
  ) {
    super(message)
    this.type = type
    this.code = code
    this.data = data
    this.name = 'CustomError'
  }
}

/**
 * @description 错误处理器
 */
export class ErrorHandler {
  private static messageQueue: { type: 'success' | 'warning' | 'error', message: string }[] = []
  private static isProcessing = false

  /**
   * @description 显示消息
   */
  private static showMessage(type: 'success' | 'warning' | 'error', message: string) {
    this.messageQueue.push({ type, message })
    this.processMessageQueue()
  }

  /**
   * @description 处理消息队列
   */
  private static async processMessageQueue() {
    if (this.isProcessing || this.messageQueue.length === 0) return

    this.isProcessing = true
    const { type, message } = this.messageQueue.shift()!

    // 创建消息元素
    const messageEl = document.createElement('div')
    messageEl.className = `message message-${type} opacity-0 transform translate-y-[-20px] transition-all duration-300`
    messageEl.textContent = message
    messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      border-radius: 4px;
      z-index: 9999;
      background: var(--base-100);
      border: 1px solid var(--base-300);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    `

    // 添加类型特定样式
    switch (type) {
      case 'success':
        messageEl.style.borderColor = 'var(--success)'
        messageEl.style.color = 'var(--success-content)'
        break
      case 'warning':
        messageEl.style.borderColor = 'var(--warning)'
        messageEl.style.color = 'var(--warning-content)'
        break
      case 'error':
        messageEl.style.borderColor = 'var(--error)'
        messageEl.style.color = 'var(--error-content)'
        break
    }

    document.body.appendChild(messageEl)

    // 显示动画
    await new Promise(resolve => setTimeout(resolve, 50))
    messageEl.style.opacity = '1'
    messageEl.style.transform = 'translate(-50%, 0)'

    // 等待后隐藏
    await new Promise(resolve => setTimeout(resolve, 3000))
    messageEl.style.opacity = '0'
    messageEl.style.transform = 'translate(-50%, -20px)'

    // 移除元素
    await new Promise(resolve => setTimeout(resolve, 300))
    document.body.removeChild(messageEl)

    this.isProcessing = false
    this.processMessageQueue()
  }

  /**
   * @description 处理错误
   */
  static handle(error: any) {
    console.error('Error:', error)

    if (error instanceof CustomError) {
      return this.handleCustomError(error)
    }

    if (error instanceof Error) {
      return this.handleSystemError(error)
    }

    return this.handleUnknownError(error)
  }

  /**
   * @description 处理自定义错误
   */
  private static handleCustomError(error: CustomError) {
    switch (error.type) {
      case ErrorType.BUSINESS:
        this.showMessage('warning', error.message)
        break
      case ErrorType.NETWORK:
        this.showMessage('error', '网络连接失败，请检查网络设置')
        break
      case ErrorType.DATABASE:
        this.showMessage('error', '数据库操作失败：' + error.message)
        break
      case ErrorType.FILE:
        this.showMessage('error', '文件操作失败：' + error.message)
        break
      default:
        this.showMessage('error', error.message)
    }
  }

  /**
   * @description 处理系统错误
   */
  private static handleSystemError(error: Error) {
    this.showMessage('error', error.message)
  }

  /**
   * @description 处理未知错误
   */
  private static handleUnknownError(error: any) {
    this.showMessage('error', '发生未知错误')
    console.error('Unknown Error:', error)
  }
}

/**
 * @description 包装异步函数，添加错误处理
 */
export function withErrorHandler<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args)
    } catch (error) {
      ErrorHandler.handle(error)
      throw error
    }
  }) as T
}

/**
 * @description 创建业务错误
 */
export function createBusinessError(message: string, code?: string | number, data?: any) {
  return new CustomError(message, ErrorType.BUSINESS, code, data)
}

/**
 * @description 创建数据库错误
 */
export function createDatabaseError(message: string, code?: string | number, data?: any) {
  return new CustomError(message, ErrorType.DATABASE, code, data)
}

/**
 * @description 创建文件系统错误
 */
export function createFileError(message: string, code?: string | number, data?: any) {
  return new CustomError(message, ErrorType.FILE, code, data)
}
