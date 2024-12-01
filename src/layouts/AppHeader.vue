<template>
  <el-header class="app-header">
    <div class="header-logo">XuanBing Center</div>
  </el-header>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
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
</style> 