<template>
  <el-container class="app-container" :class="{ dark: isDark }">
    <!-- 顶栏 -->
    <el-header class="app-header">
      <div class="header-logo">XuanBing Center</div>
      <div class="header-actions">
        <el-button @click="handleToggleDark">
          <el-icon>
            <component :is="isDark ? Sunny : Moon" />
          </el-icon>
        </el-button>
      </div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <side-menu />

      <!-- 主要内容区 -->
      <el-container>
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
import SideMenu from './layouts/SideMenu.vue'
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sunny } from '@element-plus/icons-vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

// 处理暗色模式切换
const handleToggleDark = (evt: MouseEvent) => {
  toggleDark()
}
</script>

<style lang="less" scoped>
@import '@/styles/variables.less';

* {
  padding: 0;
  margin: 0;
}

.app-container {
  height: 100vh;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: @bg-base;
  border-bottom: @border-width-base @border-style-base @border-color-base;
  padding: 0 @spacing-lg;
  height: @header-height;
}

.header-logo {
  font-size: @font-size-xl;
  font-weight: bold;
  color: @text-primary;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: @spacing-sm;
}

.el-main {
  background-color: @bg-light;
  padding: @spacing-lg;
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
