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
    <div 
      class="secondary-menu"
      :class="{ 'secondary-menu-collapsed': isCollapsed }"
    >
      <div class="secondary-menu-header" @click="toggleCollapse">
        <el-icon class="collapse-icon" :class="{ 'is-collapsed': isCollapsed }">
          <ArrowRight />
        </el-icon>
      </div>
      <el-menu
        :default-active="activeRoute"
        class="secondary-menu-list"
        router
        :collapse="isCollapsed"
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
import { ref, computed, defineComponent, PropType, h } from 'vue'
import { useRoute } from 'vue-router'
import { menuRoutes } from '@/router'
import type { MenuItem } from '@/types/menu'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'

// 菜单折叠状态
const isCollapsed = ref(false)

// 切换折叠状态
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// 递归菜单项组件
const RecursiveMenuItem = defineComponent({
  name: 'RecursiveMenuItem',
  props: {
    menuItem: {
      type: Object as PropType<MenuItem>,
      required: true
    }
  },
  setup(props) {
    const renderIcon = () => {
      const icon = props.menuItem.meta?.icon
      if (icon) {
        return h(ElIcon, null, {
          default: () => h(icon)
        })
      }
      return null
    }

    const renderTitle = () => {
      const title = props.menuItem.meta?.title || ''
      return [
        renderIcon(),
        h('span', title)
      ]
    }

    return () => {
      const children = props.menuItem.children
      if (children?.length) {
        return h(
          ElSubMenu,
          { 
            index: props.menuItem.path,
            popperClass: 'side-menu-popper'
          },
          {
            title: () => renderTitle(),
            default: () => children.map(child => 
              h(RecursiveMenuItem, {
                key: child.path,
                menuItem: child
              })
            )
          }
        )
      }

      return h(
        ElMenuItem,
        { index: props.menuItem.path },
        {
          default: () => renderTitle()
        }
      )
    }
  }
})

const route = useRoute()
const activeModule = ref('home')
const activeRoute = ref('')

// 顶部菜单（非底部菜单）
const topMenus = computed(() => 
  menuRoutes.filter(route => !route.meta?.isBottom)
)

// 底部菜单
const bottomMenus = computed(() => 
  menuRoutes.filter(route => route.meta?.isBottom)
)

// 当前模块的路由配置
const currentModuleRoute = computed(() => {
  const current = menuRoutes.find(route => route.meta?.module === activeModule.value)
  return current || menuRoutes[0] // 如果没有找到当前模块，返回第一个模块（首页）
})

// 处理模块选择
const handleModuleSelect = (index: string) => {
  activeModule.value = index
  // 找到当前模块的第一个可用路由
  const currentModule = menuRoutes.find(
    route => route.meta?.module === index
  )
  if (currentModule?.children?.length) {
    const firstRoute = findFirstLeafRoute(currentModule.children)
    if (firstRoute) {
      activeRoute.value = firstRoute.path
    }
  }
}

// 查找第一个叶子路由
const findFirstLeafRoute = (routes: MenuItem[]): MenuItem | null => {
  const firstRoute = routes[0]
  if (!firstRoute) return null
  if (firstRoute.children?.length) {
    return findFirstLeafRoute(firstRoute.children)
  }
  return firstRoute
}

// 初始化激活的模块和路由
const initActiveMenu = () => {
  const currentRoute = findRouteByPath(menuRoutes, route.path)
  if (currentRoute?.meta?.module) {
    activeModule.value = currentRoute.meta.module
    activeRoute.value = route.path
  } else {
    // 如果没有找到当前路由，设置为首页
    const homeModule = menuRoutes[0]
    if (homeModule?.children?.length) {
      const firstRoute = findFirstLeafRoute(homeModule.children)
      if (firstRoute) {
        activeModule.value = homeModule.meta?.module || 'home'
        activeRoute.value = firstRoute.path
      }
    }
  }
}

// 根据路径查找路由配置
const findRouteByPath = (routes: MenuItem[], path: string): MenuItem | null => {
  for (const route of routes) {
    if (route.path === path) return route
    if (route.children?.length) {
      const found = findRouteByPath(route.children, path)
      if (found) return found
    }
  }
  return null
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
  transition: width 0.3s;
  position: relative;

  &.secondary-menu-collapsed {
    width: 64px;

    .secondary-menu-header {
      .collapse-icon {
        transform: rotate(180deg);
      }
    }
  }

  .secondary-menu-header {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 8px;
    cursor: pointer;
    border-bottom: 1px solid @border-color;

    .collapse-icon {
      font-size: 16px;
      color: @text-secondary;
      transition: transform 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }

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

:deep(.el-menu--collapse) {
  width: 64px;
}
</style> 