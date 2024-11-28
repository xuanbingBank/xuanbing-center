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
          <el-menu-item v-for="route in topMenus" :key="route.name" :index="route.meta?.module">
            <el-icon v-if="route.meta?.icon">
              <component :is="route.meta.icon" />
            </el-icon>
          </el-menu-item>
        </div>
        <div class="side-menu__primary-bottom">
          <el-menu-item v-for="route in bottomMenus" :key="route.name" :index="route.meta?.module">
            <el-icon v-if="route.meta?.icon">
              <component :is="route.meta.icon" />
            </el-icon>
          </el-menu-item>
        </div>
      </el-menu>
    </div>

    <!-- 二级菜单 -->
    <div class="side-menu__secondary" :class="{ 'side-menu__secondary--collapsed': isCollapsed }">
      <div class="side-menu__secondary-header" @click="toggleCollapse">
        <el-icon
          class="side-menu__collapse-icon"
          :class="{ 'side-menu__collapse-icon--collapsed': isCollapsed }"
        >
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
    background-color: @menu-dark-bg;
    border-right: @border-width-base @border-style-base @border-color-base;

    &-list {
      border-right: none;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: @menu-dark-bg;
    }

    &-top,
    &-bottom {
      display: flex;
      flex-direction: column;
    }
  }

  &__secondary {
    width: @secondary-menu-width;
    background-color: @menu-bg;
    border-right: @border-width-base @border-style-base @border-color-base;
    transition: @animation-duration-base;
    position: relative;

    &--collapsed {
      width: 64px;

      .side-menu__collapse-icon {
        transform: rotate(180deg);
      }
    }

    &-header {
      height: @menu-item-height;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 @spacing-sm;
      cursor: pointer;
      border-bottom: @border-width-base @border-style-base @border-color-split;
    }

    &-list {
      border-right: none;
    }
  }

  &__collapse-icon {
    font-size: @font-size-base;
    color: @text-secondary;
    transition: transform @animation-duration-base @animation-timing-function-base;

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
    background-color: @menu-item-active-bg;
    border-left: @border-width-base * 2 @border-style-base @primary-color;
    color: @primary-color;
  }

  &:hover {
    background-color: @menu-item-hover-bg;
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
  height: @menu-item-height;
  line-height: @menu-item-height;
  text-align: center;
  color: @menu-dark-item-text;

  &.is-active {
    background-color: @menu-dark-item-active-bg;
    color: @menu-dark-item-active-text;
  }

  &:hover {
    background-color: @menu-dark-item-hover-bg;
    color: @menu-dark-item-hover-text;
  }
}
</style>
