<template>
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
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { HomeFilled, Setting, InfoFilled } from '@element-plus/icons-vue'

const isCollapse = ref(false)
</script>

<style scoped>
.side-menu {
  height: 100%;
  border-right: 1px solid #dcdfe6;
}
</style> 