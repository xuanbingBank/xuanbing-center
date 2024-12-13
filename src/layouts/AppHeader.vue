<template>
  <header class="flex flex-col bg-base-100 border-b border-base-300 transition-[background-color,border-color,color] duration-300">
    <!-- 顶部区域 -->
    <div class="h-[32px] flex items-center justify-between webkit-app-region-drag">
      <!-- 可拖拽区域 -->
      <div class="flex-1 h-full"></div>

      <!-- Window Controls -->
      <div class="flex items-center [&]:webkit-app-region-no-drag webkit-app-region-no-drag">
        <!-- Minimize -->
        <button 
          class="btn btn-ghost btn-sm h-[32px] w-[32px] min-h-0 rounded-none hover:bg-base-200 flex items-center justify-center"
          @click="minimizeWindow"
        >
          <font-awesome-icon icon="window-minimize" class="translate-y-[-2px]" />
        </button>

        <!-- Maximize -->
        <button 
          class="btn btn-ghost btn-sm h-[32px] w-[32px] min-h-0 rounded-none hover:bg-base-200 flex items-center justify-center"
          @click="toggleMaximize"
        >
          <font-awesome-icon icon="window-maximize" />
        </button>

        <!-- Close -->
        <button 
          class="btn btn-ghost btn-sm h-[32px] w-[32px] min-h-0 rounded-none hover:bg-error flex items-center justify-center"
          @click="closeWindow"
        >
          <font-awesome-icon icon="xmark" />
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@/utils/fontawesome'

declare global {
  interface Window {
    electronAPI: {
      minimizeWindow: () => void
      toggleMaximize: () => void
      closeWindow: () => void
    }
  }
}

/**
 * @description 最小化窗口
 */
const minimizeWindow = () => {
  window.electronAPI.minimizeWindow()
}

/**
 * @description 切换最大化/还原窗口
 */
const toggleMaximize = () => {
  window.electronAPI.toggleMaximize()
}

/**
 * @description 关闭窗口
 */
const closeWindow = () => {
  window.electronAPI.closeWindow()
}
</script>

<style scoped lang="postcss">
.webkit-app-region-drag {
  -webkit-app-region: drag;
  -webkit-user-select: none;
  user-select: none;
}

.webkit-app-region-no-drag {
  -webkit-app-region: no-drag;
}

/* 滚动按钮样式 */
.btn-ghost {
  @apply hover:bg-base-200;
}
</style> 