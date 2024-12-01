<template>
  <el-container class="app-container" :class="{ dark: isDark }">
    <!-- 顶栏 -->
    <app-header />

    <!-- 主体内容区 -->
    <el-container class="main-container">
      <!-- 侧边栏 -->
      <side-menu />

      <!-- 右侧内容区 -->
      <el-container class="right-container">
        <!-- 主要内容区 -->
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>

        <!-- 底栏 -->
        <el-footer height="50px">
          <div class="footer-content">© 2024 XuanBing Center. All rights reserved.</div>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import SideMenu from './layouts/SideMenu.vue'
import AppHeader from './layouts/AppHeader.vue'

const isDark = useDark()
</script>

<style lang="less" scoped>
@import '@/styles/variables.less';

* {
  padding: 0;
  margin: 0;
}

.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-container {
  flex: 1;
  overflow: hidden;
}

.right-container {
  display: flex;
  flex-direction: column;
  min-width: 0; // 防止内容溢出
}

.el-main {
  background-color: @bg-light;
  padding: @spacing-lg;
  flex: 1;
  overflow: auto;
}

.el-footer {
  background-color: @bg-base;
  border-top: @border-width-base @border-style-base @border-color-base;
  display: flex;
  align-items: center;
  justify-content: center;
  height: @footer-height;
}

.footer-content {
  color: @text-secondary;
  font-size: @font-size-base;
}

// 页面切换动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity @animation-duration-base @animation-timing-function-base;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
