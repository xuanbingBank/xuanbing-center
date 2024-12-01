<template>
  <el-header class="app-header">
    <div class="header-logo">XuanBing Center</div>
    <div class="header-actions">
      <el-button class="action-btn">
        <el-icon>
          <Remove />
        </el-icon>
      </el-button>
      <el-button class="action-btn">
        <el-icon>
          <FullScreen />
        </el-icon>
      </el-button>
      <el-button class="action-btn close-btn">
        <el-icon>
          <Close />
        </el-icon>
      </el-button>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { Remove, FullScreen, Close } from '@element-plus/icons-vue'
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
  -webkit-app-region: drag; // 允许拖拽窗口
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
  -webkit-app-region: no-drag; // 按钮区域不允许拖拽
}

.action-btn {
  padding: 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background-color @animation-duration-base @animation-timing-function-base;

  &:hover {
    background-color: @menu-item-hover-bg;
  }

  .el-icon {
    width: 16px;
    height: 16px;
  }

  &.close-btn:hover {
    background-color: #e81123;
    color: white;
  }
}
</style> 