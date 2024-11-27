<template>
  <el-container class="app-container">
    <!-- 顶栏 -->
    <el-header class="app-header">
      <div class="header-logo">XuanBing Center</div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          default-active="/"
          class="side-menu"
          :router="true"
          :collapse="isCollapse"
        >
          <el-menu-item index="/">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>功能</span>
            </template>
            <el-menu-item index="/feature1">功能1</el-menu-item>
            <el-menu-item index="/feature2">功能2</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/about">
            <el-icon><InfoFilled /></el-icon>
            <span>关于</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

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
import { ref } from 'vue'
import { HomeFilled, Setting, InfoFilled } from '@element-plus/icons-vue'

const isCollapse = ref(false)
</script>

<style scoped>
.app-container {
  height: 100vh;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 20px;
}

.header-logo {
  font-size: 20px;
  font-weight: bold;
}

.side-menu {
  height: 100%;
  border-right: 1px solid #dcdfe6;
}

.el-aside {
  background-color: #fff;
}

.el-main {
  background-color: #f5f7fa;
  padding: 20px;
}

.el-footer {
  background-color: #fff;
  border-top: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-content {
  color: #909399;
  font-size: 14px;
}
</style> 