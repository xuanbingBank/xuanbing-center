<template>
  <div class="h-screen flex flex-col bg-base-100" :class="{ 'dark': isDark }">
    <!-- 顶栏 -->
    <app-header />

    <!-- 主体内容区 -->
    <div class="flex flex-1 h-[calc(100vh-50px)] overflow-hidden">
      <!-- 侧边栏 -->
      <side-menu />

      <!-- 右侧内容区 -->
      <div class="flex flex-col flex-1 min-w-0">
        <!-- 主要内容区 -->
        <main class="flex-1 overflow-auto bg-base-200 p-6">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>

        <!-- 底栏 -->
        <footer class="h-[50px] flex items-center justify-center bg-base-100 border-t border-base-300">
          <div class="text-base-content/60 text-sm">
            © 2024 XuanBing Center. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import SideMenu from './layouts/SideMenu.vue'
import AppHeader from './layouts/AppHeader.vue'

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
