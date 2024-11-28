<template>
  <div class="dashboard">
    <h2>数据看板</h2>

    <el-card class="system-info">
      <template #header>
        <div class="card-header">
          <span>系统信息</span>
        </div>
      </template>

      <div class="info-item">
        <span>系统平台：</span>
        <span>{{ platform }}</span>
      </div>

      <div class="info-item">
        <span>窗口尺寸：</span>
        <span>{{ width }} x {{ height }}</span>
      </div>

      <div class="info-item">
        <span>电池状态：</span>
        <span>{{ batteryLevel ? `${Math.round(batteryLevel * 100)}%` : '未知' }}</span>
      </div>

      <div class="info-item">
        <span>网络状态：</span>
        <span>{{ online ? '在线' : '离线' }}</span>
      </div>

      <div class="info-item">
        <span>首选语言：</span>
        <span>{{ preferredLanguages[0] || '未知' }}</span>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize, useBattery, useOnline, usePreferredLanguages } from '@vueuse/core'
import { withErrorHandler } from '@/utils/error'

const { width, height } = useWindowSize()
const online = useOnline()
const { level: batteryLevel } = useBattery()
const preferredLanguages = usePreferredLanguages()
const platform = process.platform

class DashboardService {
  /**
   * @description 加载数据
   */
  loadData = withErrorHandler(async () => {
    // 模拟可能出错的操作
    throw new Error('加载数据失败')
  })
}

const service = new DashboardService()

// 在组件中使用
const handleLoadData = async () => {
  try {
    await service.loadData()
  } catch (error) {
    // 错误已经被统一处理，这里可以做一些额外的处理
    console.log('Additional error handling')
  }
}
</script>

<style lang="less" scoped>
.dashboard {
  .system-info {
    max-width: 600px;
    margin: 20px 0;
  }

  .info-item {
    margin: 10px 0;
    display: flex;
    gap: 10px;
  }
}
</style>
