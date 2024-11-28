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
  background-color: @bg-white;
  border-bottom: 1px solid @border-color;
  padding: 0 20px;
  height: @header-height;
}

.header-logo {
  font-size: 20px;
  font-weight: bold;
  color: @text-primary;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.el-main {
  background-color: @bg-gray;
  padding: 20px;
}

.el-footer {
  background-color: @bg-white;
  border-top: 1px solid @border-color;
  display: flex;
  align-items: center;
  justify-content: center;
  height: @footer-height;
}

.footer-content {
  color: @text-secondary;
  font-size: 14px;
}

// 页面切换动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
