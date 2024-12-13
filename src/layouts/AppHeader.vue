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
          class="btn btn-sm hover:bg-base-200"
          @click="minimizeWindow"
        >
          <Icon 
            icon="material-symbols:minimize" 
            class="w-[16px] h-[16px]"
          />
        </button>

        <!-- Maximize -->
        <button 
          class="btn btn-sm hover:bg-base-200"
          @click="toggleMaximize"
        >
          <Icon 
            icon="material-symbols:fullscreen" 
          />
        </button>

        <!-- Close -->
        <button 
          class="btn btn-sm hover:bg-error"
          @click="closeWindow"
        >
          <Icon 
            icon="material-symbols:close" 
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

declare global {
  interface Window {
    electronAPI: {
      minimizeWindow: () => void
      toggleMaximize: () => void
      closeWindow: () => void
    }
  }
}

let isMaximized = false;

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
  isMaximized = !isMaximized
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