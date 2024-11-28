import Database from 'better-sqlite3'
import { APP_PATHS } from '../paths'
import { createDatabaseError } from '../error'

/**
 * @description 数据库管理类
 */
export class DBManager {
  private static instance: DBManager
  private db: Database.Database

  private constructor() {
    try {
      this.db = new Database(APP_PATHS.DATABASE.MAIN, {
        verbose: console.log
      })
      this.init()
    } catch (error: Error | unknown) {
      const message = error instanceof Error ? error.message : String(error)
      throw createDatabaseError(`数据库初始化失败: ${message}`)
    }
  }

  /**
   * @description 获取数据库实例
   */
  static getInstance(): DBManager {
    if (!DBManager.instance) {
      DBManager.instance = new DBManager()
    }
    return DBManager.instance
  }

  /**
   * @description 初始化数据库表
   */
  private init() {
    // 创建配置表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS config (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `)

    // 创建笔记表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        category TEXT,
        tags TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `)

    // 创建素材表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS materials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        path TEXT NOT NULL,
        size INTEGER,
        meta TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `)

    // 创建书签表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        category TEXT,
        tags TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `)
  }

  /**
   * @description 执行查询
   */
  query<T = any>(sql: string, params: any[] = []): T[] {
    try {
      const stmt = this.db.prepare(sql)
      return stmt.all(params) as T[]
    } catch (error: Error | unknown) {
      const message = error instanceof Error ? error.message : String(error)
      throw createDatabaseError(`查询失败: ${message}`)
    }
  }

  /**
   * @description 执行单条查询
   */
  queryOne<T = any>(sql: string, params: any[] = []): T | null {
    try {
      const stmt = this.db.prepare(sql)
      return stmt.get(params) as T || null
    } catch (error: Error | unknown) {
      const message = error instanceof Error ? error.message : String(error)
      throw createDatabaseError(`查询失败: ${message}`)
    }
  }

  /**
   * @description 执行更新
   */
  execute(sql: string, params: any[] = []): number {
    try {
      const stmt = this.db.prepare(sql)
      const result = stmt.run(params)
      return result.changes
    } catch (error: Error | unknown) {
      const message = error instanceof Error ? error.message : String(error)
      throw createDatabaseError(`执行失败: ${message}`)
    }
  }

  /**
   * @description 开始事务
   */
  transaction<T>(fn: () => T): T {
    try {
      const result = this.db.transaction(fn)()
      return result
    } catch (error: Error | unknown) {
      const message = error instanceof Error ? error.message : String(error)
      throw createDatabaseError(`事务执行失败: ${message}`)
    }
  }

  /**
   * @description 备份数据库
   */
  backup(): string {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupPath = `${APP_PATHS.DATABASE.BACKUP}/backup-${timestamp}.db`
      this.db.backup(backupPath)
      return backupPath
    } catch (error: Error | unknown) {
      const message = error instanceof Error ? error.message : String(error)
      throw createDatabaseError(`备份失败: ${message}`)
    }
  }

  /**
   * @description 关闭数据库连接
   */
  close() {
    this.db.close()
  }
}

// 导出数据库实例
export const db = DBManager.getInstance() 