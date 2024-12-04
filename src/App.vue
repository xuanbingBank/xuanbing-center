<template>
  <div class="h-screen flex flex-col bg-base-100 transition-colors duration-300" :class="{ 'dark': isDark }">
    <!-- 顶栏 -->
    <app-header />

    <!-- 主体内容区 -->
    <div class="flex flex-1 h-[calc(100vh-50px)] overflow-hidden">
      <!-- 侧边栏 -->
      <side-menu />

      <!-- 右侧内容区 -->
      <main-content />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import SideMenu from './layouts/SideMenu.vue'
import AppHeader from './layouts/AppHeader.vue'
import MainContent from './layouts/MainContent.vue'

const isDark = useDark()
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
