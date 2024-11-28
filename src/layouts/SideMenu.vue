<template>
  <div class="side-menu" ref="menuContainerRef">
    <!-- 一级菜单 -->
    <div class="side-menu__primary">
      <el-menu
        :default-active="activeModule"
        class="side-menu__primary-list"
        @select="handleModuleSelect"
      >
        <div class="side-menu__primary-top">
          <el-menu-item 
            v-for="route in topMenus" 
            :key="route.name"
            :index="route.meta?.module"
          >
            <el-icon v-if="route.meta?.icon">
              <component :is="route.meta.icon" />
            </el-icon>
          </el-menu-item>
        </div>
        <div class="side-menu__primary-bottom">
          <el-menu-item 
            v-for="route in bottomMenus" 
            :key="route.name"
            :index="route.meta?.module"
          >
            <el-icon v-if="route.meta?.icon">
              <component :is="route.meta.icon" />
            </el-icon>
          </el-menu-item>
        </div>
      </el-menu>
    </div>

    <!-- 二级菜单 -->
    <div 
      class="side-menu__secondary"
      :class="{ 'side-menu__secondary--collapsed': isCollapsed }"
    >
      <div class="side-menu__secondary-header" @click="toggleCollapse">
        <el-icon class="side-menu__collapse-icon" :class="{ 'side-menu__collapse-icon--collapsed': isCollapsed }">
          <ArrowRight />
        </el-icon>
      </div>
      <el-menu
        :default-active="activeRoute"
        class="side-menu__secondary-list"
        router
        :collapse="isCollapsed"
        @select="handleSelect"
      >
        <template v-if="currentModuleRoute">
          <recursive-menu-item 
            v-for="route in currentModuleRoute.children"
            :key="route.path"
            :menu-item="route"
          />
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import RecursiveMenuItem from '@/components/menu/RecursiveMenuItem'
import { useMenu } from '@/hooks/useMenu'

const {
  isCollapsed,
  activeModule,
  activeRoute,
  topMenus,
  bottomMenus,
  currentModuleRoute,
  toggleCollapse,
  handleSelect,
  handleModuleSelect,
  initActiveMenu
} = useMenu()

onMounted(() => {
  initActiveMenu()
})
</script>

<style lang="less" scoped>
.side-menu {
  display: flex;
  height: 100%;

  &__primary {
    width: @primary-menu-width;
    background-color: @bg-white;
    border-right: 1px solid @border-color;

    &-list {
      border-right: none;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: @bg-dark;
    }

    &-top,
    &-bottom {
      display: flex;
      flex-direction: column;
    }
  }

  &__secondary {
    width: @secondary-menu-width;
    background-color: @bg-white;
    border-right: 1px solid @border-color;
    transition: width 0.3s;
    position: relative;

    &--collapsed {
      width: 64px;

      .side-menu__collapse-icon {
        transform: rotate(180deg);
      }
    }

    &-header {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 8px;
      cursor: pointer;
      border-bottom: 1px solid @border-color;
    }

    &-list {
      border-right: none;
    }
  }

  &__collapse-icon {
    font-size: 16px;
    color: @text-secondary;
    transition: transform 0.3s;

    &:hover {
      color: @primary-color;
    }

    &--collapsed {
      transform: rotate(180deg);
    }
  }
}

:deep(.el-menu-item) {
  &.is-active {
    background-color: @menu-active-bg;
    border-left: 2px solid @menu-active-border;
    color: @menu-active-text;
  }

  &:hover {
    background-color: @menu-hover-bg;
  }

  .el-icon {
    margin-right: 0;
  }
}

:deep(.el-menu) {
  border-right: none;

  &--collapse {
    width: 64px;
  }
}

// 一级菜单项样式
:deep(.side-menu__primary-list .el-menu-item) {
  padding: 0 !important;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: @menu-dark-text;

  &.is-active {
    background-color: @menu-dark-active-bg;
    color: @menu-dark-active-text;
  }

  &:hover {
    background-color: @menu-dark-hover-bg;
    color: @menu-dark-hover-text;
  }
}
</style> 