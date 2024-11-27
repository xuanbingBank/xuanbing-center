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

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.menu-container {
  display: flex;
  height: 100%;

  .primary-menu {
    height: 100%;
    border-right: 1px solid $border-color;
    background-color: $bg-white;

    &-items {
      border-right: none;
      background-color: $bg-white;
      padding: 0 !important;

      :deep(.el-menu-item) {
        text-align: center;
        background-color: $bg-white;
        border-left: 3px solid transparent;
        padding: 0 !important;
        margin: 0;

        &.is-active {
          background-color: $menu-active-bg;
          border-left: 3px solid $menu-active-border;
          color: $menu-active-text;

          .el-icon {
            color: $menu-active-text;
          }
        }

        &:hover {
          background-color: $menu-hover-bg;
        }

        .el-icon {
          margin: 0;
          line-height: 60px;
          color: $menu-icon-color;
        }
      }
    }
  }

  .side-menu {
    height: 100%;
    border-right: 1px solid $border-color;
  }
}
</style> 