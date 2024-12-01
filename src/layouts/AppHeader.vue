<template>
  <header class="h-[50px] flex items-center justify-between bg-base-100 border-b border-base-300 [&]:webkit-app-region-drag">
    <!-- Logo -->
    <div class="text-xl font-bold text-base-content px-6">XuanBing Center</div>

    <!-- Window Controls -->
    <div class="flex items-center [&]:webkit-app-region-no-drag">
      <!-- Minimize -->
      <button 
        class="btn btn-ghost btn-sm h-[50px] w-[50px] min-h-0 rounded-none hover:bg-base-200"
      >
        <font-awesome-icon icon="window-minimize" />
      </button>

      <!-- Maximize -->
      <button 
        class="btn btn-ghost btn-sm h-[50px] w-[50px] min-h-0 rounded-none hover:bg-base-200"
      >
        <font-awesome-icon icon="window-maximize" />
      </button>

      <!-- Close -->
      <button 
        class="btn btn-ghost btn-sm h-[50px] w-[50px] min-h-0 rounded-none hover:bg-error hover:text-white"
      >
        <font-awesome-icon icon="xmark" />
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
// 不需要单独导入图标，因为已经在 fontawesome.ts 中全局注册
</script>

<style>
.webkit-app-region-drag {
  -webkit-app-region: drag;
}

.webkit-app-region-no-drag {
  -webkit-app-region: no-drag;
}
</style> 