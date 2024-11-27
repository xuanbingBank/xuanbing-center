<template>
  <div class="side-menu-container">
    <!-- 一级菜单 -->
    <div class="primary-menu">
      <el-menu
        :default-active="activeModule"
        class="primary-menu-list"
        @select="handleModuleSelect"
      >
        <div class="menu-top">
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
        <div class="menu-bottom">
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
    <div class="secondary-menu" v-show="activeModule !== ''">
      <el-menu
        :default-active="activeRoute"
        class="secondary-menu-list"
        router
      >
        <template v-for="route in currentModuleChildren" :key="route.path">
          <el-sub-menu 
            v-if="route.children?.length" 
            :index="route.path"
          >
            <template #title>
              <el-icon v-if="route.meta?.icon">
                <component :is="route.meta.icon" />
              </el-icon>
              <span>{{ route.meta?.title }}</span>
            </template>
            <el-menu-item 
              v-for="child in route.children"
              :key="child.path"
              :index="child.path"
            >
              <el-icon v-if="child.meta?.icon">
                <component :is="child.meta.icon" />
              </el-icon>
              <span>{{ child.meta?.title }}</span>
            </el-menu-item>
          </el-sub-menu>
          
          <el-menu-item 
            v-else 
            :index="route.path"
          >
            <el-icon v-if="route.meta?.icon">
              <component :is="route.meta.icon" />
            </el-icon>
            <span>{{ route.meta?.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { menuRoutes } from '@/router'
import type { MenuItem } from '@/types/menu'

const route = useRoute()
const activeModule = ref('')
const activeRoute = ref('')

// 顶部菜单（非底部菜单）
const topMenus = computed(() => 
  menuRoutes.filter(route => !route.meta?.isBottom)
)

// 底部菜单
const bottomMenus = computed(() => 
  menuRoutes.filter(route => route.meta?.isBottom)
)

// 当前模块的子菜单
const currentModuleChildren = computed(() => {
  const currentModule = menuRoutes.find(
    route => route.meta?.module === activeModule.value
  )
  return currentModule ? [currentModule] : []
})

// 处理模块选择
const handleModuleSelect = (index: string) => {
  activeModule.value = index
  // 找到当前模块的第一个可用路由
  const currentModule = menuRoutes.find(
    route => route.meta?.module === index
  )
  if (currentModule) {
    const firstRoute = currentModule.children?.[0] || currentModule
    activeRoute.value = firstRoute.path
  }
}

// 初始化激活的模块和路由
const initActiveMenu = () => {
  const currentRoute = menuRoutes.find(item => {
    if (item.path === route.path) return true
    return item.children?.some(child => child.path === route.path)
  })
  if (currentRoute?.meta?.module) {
    activeModule.value = currentRoute.meta.module
    activeRoute.value = route.path
  }
}

// 初始化
initActiveMenu()
</script>

<style lang="less" scoped>
.side-menu-container {
  display: flex;
  height: 100%;
}

.primary-menu {
  width: @primary-menu-width;
  background-color: @bg-white;
  border-right: 1px solid @border-color;

  .primary-menu-list {
    border-right: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: @bg-dark;
    
    .menu-top, .menu-bottom {
      display: flex;
      flex-direction: column;
    }
    
    :deep(.el-menu-item) {
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
  }
}

.secondary-menu {
  width: @secondary-menu-width;
  background-color: @bg-white;
  border-right: 1px solid @border-color;

  .secondary-menu-list {
    border-right: none;
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
  }
}

:deep(.el-menu-item .el-icon) {
  margin-right: 0;
}

:deep(.el-menu) {
  border-right: none;
}
</style> 