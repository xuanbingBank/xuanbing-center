<template>
  <header class="h-[50px] flex items-center justify-between bg-base-100 border-b border-base-300 webkit-app-region-drag transition-[background-color,border-color,color] duration-300">
    <!-- Logo -->
    <div class="text-xl font-bold text-base-content px-6 flex-1">XuanBing Center</div>

    <!-- Window Controls -->
    <div class="flex items-center [&]:webkit-app-region-no-drag webkit-app-region-no-drag">
      <!-- Minimize -->
      <button 
        class="btn btn-ghost btn-sm h-[50px] w-[50px] min-h-0 rounded-none hover:bg-base-200"
        @click="minimizeWindow"
      >
        <font-awesome-icon icon="window-minimize" />
      </button>

      <!-- Maximize -->
      <button 
        class="btn btn-ghost btn-sm h-[50px] w-[50px] min-h-0 rounded-none hover:bg-base-200"
        @click="toggleMaximize"
      >
        <font-awesome-icon icon="window-maximize" />
      </button>

      <!-- Close -->
      <button 
        class="btn btn-ghost btn-sm h-[50px] w-[50px] min-h-0 rounded-none hover:bg-error"
        @click="closeWindow"
      >
        <font-awesome-icon icon="xmark" />
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
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

<style>
.webkit-app-region-drag {
  -webkit-app-region: drag;
  -webkit-user-select: none;
  user-select: none;
}

.webkit-app-region-no-drag {
  -webkit-app-region: no-drag;
}
</style> 