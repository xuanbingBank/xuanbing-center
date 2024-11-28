import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db } from '@/utils/db'
import { createDatabaseError } from '@/utils/error'

/**
 * @description Counter Store 接口定义
 */
interface CounterState {
  count: number
  history: number[]
  lastUpdated: number | null
}

/**
 * @description Counter Store
 */
export const useCounterStore = defineStore('counter', () => {
  // 初始化数据库表
  try {
    db.execute(`
      CREATE TABLE IF NOT EXISTS store_counter (
        key TEXT PRIMARY KEY,
        value INTEGER NOT NULL,
        updated_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS store_counter_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      );
    `)
    // 初始化计数器
    db.execute(
      'INSERT OR IGNORE INTO store_counter (key, value, updated_at) VALUES (?, ?, ?)',
      ['count', 0, null]
    )
  } catch (error) {
    throw createDatabaseError('初始化 Counter Store 失败')
  }

  // 状态
  const count = ref(getStoredCount())
  const history = ref(getStoredHistory())
  const lastUpdated = ref(getStoredLastUpdated())

  // 从数据库获取状态
  function getStoredCount(): number {
    const result = db.queryOne('SELECT value FROM store_counter WHERE key = ?', ['count'])
    return result ? result.value : 0
  }

  function getStoredHistory(): number[] {
    return db.query(
      'SELECT value FROM store_counter_history ORDER BY created_at DESC LIMIT 10'
    ).map(row => row.value)
  }

  function getStoredLastUpdated(): number | null {
    const result = db.queryOne('SELECT updated_at FROM store_counter WHERE key = ?', ['count'])
    return result ? result.updated_at : null
  }

  // Getters
  const doubleCount = computed(() => count.value * 2)
  const lastChangeTime = computed(() => 
    lastUpdated.value ? new Date(lastUpdated.value).toLocaleString() : '从未更新'
  )

  // Actions
  function increment(delta = 1) {
    db.transaction(() => {
      const newValue = count.value + delta
      const now = Date.now()

      // 更新计数器
      db.execute(
        'UPDATE store_counter SET value = ?, updated_at = ? WHERE key = ?',
        [newValue, now, 'count']
      )

      // 添加历史记录
      db.execute(
        'INSERT INTO store_counter_history (value, created_at) VALUES (?, ?)',
        [newValue, now]
      )

      // 清理旧历史记录
      db.execute(`
        DELETE FROM store_counter_history 
        WHERE id NOT IN (
          SELECT id FROM store_counter_history 
          ORDER BY created_at DESC 
          LIMIT 10
        )
      `)

      // 更新状态
      count.value = newValue
      history.value = getStoredHistory()
      lastUpdated.value = now
    })
  }

  function decrement(delta = 1) {
    increment(-delta)
  }

  function reset() {
    db.transaction(() => {
      // 重置计数器
      db.execute(
        'UPDATE store_counter SET value = 0, updated_at = NULL WHERE key = ?',
        ['count']
      )
      // 清空历史记录
      db.execute('DELETE FROM store_counter_history')

      // 更新状态
      count.value = 0
      history.value = []
      lastUpdated.value = null
    })
  }

  /**
   * @description 批量更新状态
   */
  function setState(newState: Partial<CounterState>) {
    db.transaction(() => {
      if (newState.count !== undefined) {
        const now = Date.now()
        db.execute(
          'UPDATE store_counter SET value = ?, updated_at = ? WHERE key = ?',
          [newState.count, now, 'count']
        )
        count.value = newState.count
        lastUpdated.value = now
      }
      history.value = getStoredHistory()
    })
  }

  /**
   * @description 导出状态
   */
  function exportState(): CounterState {
    return {
      count: count.value,
      history: history.value,
      lastUpdated: lastUpdated.value
    }
  }

  return {
    // 状态
    count,
    history,
    lastUpdated,

    // Getters
    doubleCount,
    lastChangeTime,

    // Actions
    increment,
    decrement,
    reset,
    setState,
    exportState
  }
})

/**
 * @description Counter Store 辅助函数
 */
export function useCounter() {
  const store = useCounterStore()
  
  // 自定义组合函数
  const incrementByTen = () => store.increment(10)
  const decrementByTen = () => store.decrement(10)
  
  // 导出扩展的功能
  return {
    ...store,
    incrementByTen,
    decrementByTen
  }
} 