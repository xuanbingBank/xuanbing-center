<template>
  <el-container class="app-container">
    <!-- 顶栏 -->
    <el-header class="app-header">
      <div class="header-logo">XuanBing Center</div>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
        <side-menu />
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
import SideMenu from './components/SideMenu.vue'
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