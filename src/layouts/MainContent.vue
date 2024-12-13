/**
 * @description 主要内容区布局组件
 */
<template>
  <div class="flex flex-col flex-1 min-w-0">
    <!-- 主要内容区 -->
    <main class="flex-1 overflow-auto bg-base-200 p-6 transition-colors duration-300">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts" setup>
// 无需额外逻辑
</script>

<style lang="postcss" scoped>
/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style> 