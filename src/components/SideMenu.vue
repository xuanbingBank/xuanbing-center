<template>
  <div class="menu-container">
    <!-- 一级菜单栏 -->
    <div class="primary-menu">
      <el-menu
        default-active="1"
        class="primary-menu-items"
        :collapse="true"
      >
        <el-menu-item index="1" @click="activeModule = 'home'">
          <el-icon><HomeFilled /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="2" @click="activeModule = 'system'">
          <el-icon><Setting /></el-icon>
          <template #title>系统</template>
        </el-menu-item>
        <el-menu-item index="3" @click="activeModule = 'tools'">
          <el-icon><Tools /></el-icon>
          <template #title>工具</template>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 二级菜单栏 -->
    <div class="secondary-menu">
      <el-menu
        default-active="/"
        class="side-menu"
        :router="true"
        :collapse="isCollapse"
      >
        <template v-if="activeModule === 'home'">
          <el-menu-item index="/">
            <el-icon><HomeFilled /></el-icon>
            <span>首页概览</span>
          </el-menu-item>
          <el-menu-item index="/dashboard">
            <el-icon><DataBoard /></el-icon>
            <span>数据看板</span>
          </el-menu-item>
        </template>

        <template v-if="activeModule === 'system'">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>功能</span>
            </template>
            <el-menu-item index="/feature1">功能1</el-menu-item>
            <el-menu-item index="/feature2">功能2</el-menu-item>
          </el-sub-menu>
        </template>

        <template v-if="activeModule === 'tools'">
          <el-menu-item index="/tools">
            <el-icon><Tools /></el-icon>
            <span>工具箱</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><InfoFilled /></el-icon>
            <span>关于</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  HomeFilled,
  Setting,
  InfoFilled,
  Tools,
  DataBoard
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const activeModule = ref('home')
</script>

<style scoped>
.menu-container {
  display: flex;
  height: 100%;
}

.primary-menu {
  width: 64px;
  height: 100%;
  border-right: 1px solid #dcdfe6;
  background-color: #304156;
}

.primary-menu-items {
  border-right: none;
  background-color: #304156;
}

.primary-menu-items :deep(.el-menu-item) {
  text-align: center;
  background-color: #304156;
  border-left: 3px solid transparent;
}

.primary-menu-items :deep(.el-menu-item.is-active) {
  background-color: #263445;
  border-left: 3px solid #409EFF;
}

.primary-menu-items :deep(.el-menu-item:hover) {
  background-color: #263445;
}

.primary-menu-items :deep(.el-menu-item .el-icon) {
  color: #bfcbd9;
}

.primary-menu-items :deep(.el-menu-item.is-active .el-icon) {
  color: #409EFF;
}

.secondary-menu {
  flex: 1;
}

.side-menu {
  height: 100%;
  border-right: 1px solid #dcdfe6;
}

.side-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style> 