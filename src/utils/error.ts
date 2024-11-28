import { ElMessage } from 'element-plus'

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
  /**
   * @description 处理错误
   */
  static handle(error: any) {
    console.error('Error:', error)

    // 如果是自定义错误，直接处理
    if (error instanceof CustomError) {
      return this.handleCustomError(error)
    }

    // 处理其他类型错误
    if (error instanceof Error) {
      return this.handleSystemError(error)
    }

    // 处理未知错误
    return this.handleUnknownError(error)
  }

  /**
   * @description 处理自定义错误
   */
  private static handleCustomError(error: CustomError) {
    switch (error.type) {
      case ErrorType.BUSINESS:
        ElMessage.warning(error.message)
        break
      case ErrorType.NETWORK:
        ElMessage.error('网络连接失败，请检查网络设置')
        break
      case ErrorType.DATABASE:
        ElMessage.error('数据库操作失败：' + error.message)
        break
      case ErrorType.FILE:
        ElMessage.error('文件操作失败：' + error.message)
        break
      default:
        ElMessage.error(error.message)
    }
  }

  /**
   * @description 处理系统错误
   */
  private static handleSystemError(error: Error) {
    ElMessage.error(error.message)
  }

  /**
   * @description 处理未知错误
   */
  private static handleUnknownError(error: any) {
    ElMessage.error('发生未知错误')
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
