<template>
  <div class="side-menu-container">
    <!-- 一级菜单 -->
    <div class="primary-menu">
      <el-menu
        :default-active="activeModule"
        class="primary-menu-list"
        @select="handleModuleSelect"
      >
        <el-menu-item index="home">
          <el-icon><HomeFilled /></el-icon>
        </el-menu-item>
        <el-menu-item index="system">
          <el-icon><Setting /></el-icon>
        </el-menu-item>
        <el-menu-item index="tools">
          <el-icon><Tools /></el-icon>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 二级菜单 -->
    <div class="secondary-menu" v-show="activeModule !== ''">
      <el-menu
        :default-active="activeRoute"
        class="secondary-menu-list"
        router
      >
        <template v-if="activeModule === 'home'">
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

const activeModule = ref('home')
const activeRoute = ref('')

const handleModuleSelect = (index: string) => {
  activeModule.value = index
}
</script>

<style lang="scss" scoped>
.side-menu-container {
  display: flex;
  height: 100%;
}

.primary-menu {
  width: 24px;
  background-color: $bg-white;
  border-right: 1px solid $border-color;

  .primary-menu-list {
    border-right: none;
    
    :deep(.el-menu-item) {
      padding: 0 !important;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }
}

.secondary-menu {
  width: 200px;
  background-color: $bg-white;
  border-right: 1px solid $border-color;

  .secondary-menu-list {
    border-right: none;
  }
}

:deep(.el-menu-item) {
  &.is-active {
    background-color: $menu-active-bg;
    border-left: 2px solid $menu-active-border;
    color: $menu-active-text;
  }

  &:hover {
    background-color: $menu-hover-bg;
  }
}

:deep(.el-menu-item .el-icon) {
  margin-right: 0;
}
</style> 