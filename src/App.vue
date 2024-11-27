<template>
  <el-container class="app-container">
    <!-- 顶栏 -->
    <el-header class="app-header">
      <div class="header-logo">XuanBing Center</div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
        <side-menu />

      <!-- 主要内容区 -->
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        
        <!-- 底栏 -->
        <el-footer height="50px">
          <div class="footer-content">
            © 2024 XuanBing Center. All rights reserved.
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import SideMenu from './components/SideMenu.vue'
</script>

<style lang="less" scoped>
@import '@/styles/variables.less';

*{
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
</style> 