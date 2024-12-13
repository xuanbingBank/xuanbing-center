<template>
  <div class="flex flex-col h-full border-r border-base-content/10">
    <!-- Logo -->
    <div class="flex h-[33px] border-b border-base-content/10">
      <div class="w-[32px] flex-shrink-0 flex items-center justify-center">
        <img 
          src="@/assets/logo/logo.png" 
          alt="XuanBing Center Logo" 
          class="w-[24px] h-[24px] object-contain"
        />
      </div>
      <div 
        class="flex items-center px-2 transition-all duration-300 overflow-hidden"
        :class="[isCollapsed ? 'w-[32px]' : 'w-[150px]']"
      >
        <span 
          class="text-sm font-medium text-base-content whitespace-nowrap transition-opacity duration-300"
          :class="{ 'opacity-0': isCollapsed }"
        >
          XuanBing Center
        </span>
      </div>
    </div>

    <!-- 菜单容器 -->
    <div class="flex flex-1 min-h-0" ref="menuContainerRef">
      <!-- 一级菜单 -->
      <div class="w-[32px] flex-shrink-0 bg-base-100 border-r border-base-content/10 transition-all duration-300">
        <div class="flex flex-col h-full justify-between">
          <!-- 顶部菜单 -->
          <ul class="menu menu-sm bg-base-100 p-0 w-[31px]">
            <li v-for="route in topMenus" :key="route.name" class="my-1 w-full px-1">
              <a
                class="w-[24px] h-[24px] items-center justify-center rounded-lg text-base-content/70 hover:text-base-content hover:bg-base-200 transition-[background-color] duration-200"
                :class="{ 'active !bg-primary !text-primary-content': activeModule === route.meta?.module }"
                @click="handleModuleSelect(route.meta?.module || '')"
              >
                <Icon
                  v-if="route.meta?.icon"
                  :icon="route.meta.icon"
                  class="w-4 h-4"
                />
              </a>
            </li>
          </ul>

          <!-- 底部菜单 -->
          <ul class="menu menu-sm bg-base-100 p-0 w-[31px]">
            <li v-for="route in bottomMenus" :key="route.name" class="w-full px-1">
              <a
                class="w-[24px] h-[24px] items-center justify-center rounded-lg text-base-content/70 hover:text-base-content hover:bg-base-200 transition-[background-color] duration-200"
                :class="{ 'active !bg-primary !text-primary-content': activeModule === route.meta?.module }"
                @click="handleModuleSelect(route.meta?.module || '')"
              >
                <Icon
                  v-if="route.meta?.icon"
                  :icon="route.meta.icon"
                  class="w-4 h-4"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 二级菜单 -->
      <div 
        class="bg-base-100 relative overflow-hidden transition-all duration-300"
        :class="[isCollapsed ? 'w-[32px]' : 'w-[150px]']"
      >
        <ul class="menu menu-sm p-0">
          <template v-if="currentModuleRoute?.children">
            <li v-for="route in currentModuleRoute.children" 
                :key="route.path"
                class="my-1"
                :class="[isCollapsed ? 'px-1' : 'px-3']"
            >
              <a 
                class="menu-item"
                :class="[
                  { 'active': activeRoute === route.path },
                  isCollapsed ? 'w-[24px] h-[24px] justify-center' : 'w-full'
                ]"
                @click="handleSelect(route.path)"
              >
                <Icon
                  v-if="route.meta?.icon"
                  :icon="route.meta.icon"
                  class="w-4 h-4"
                />
                <span 
                  v-if="!isCollapsed"
                  class="ml-1 whitespace-nowrap"
                >
                  {{ route.meta?.title }}
                </span>
                <Icon
                  v-if="!isCollapsed && route.children?.length"
                  icon="material-symbols:chevron-right"
                  class="ml-auto text-xs"
                />
              </a>

              <template v-if="route.children && !isCollapsed">
                <ul class="menu menu-sm pl-4">
                  <li v-for="child in route.children" 
                      :key="child.path"
                      class="my-1"
                  >
                    <a 
                      class="menu-item"
                      :class="{ 'active': activeRoute === child.path }"
                      @click="handleSelect(child.path)"
                    >
                      <Icon
                        v-if="child.meta?.icon"
                        :icon="child.meta.icon"
                        class="w-4 h-4"
                      />
                      <span class="ml-1 whitespace-nowrap">{{ child.meta?.title }}</span>
                    </a>
                  </li>
                </ul>
              </template>
            </li>
          </template>
        </ul>

        <!-- 折叠按钮 -->
        <div 
          class="absolute top-1/2 -translate-y-1/2 -right-[1px] 
                 w-[16px] h-[50px] flex items-center justify-center
                 cursor-pointer group"
          @click="toggleCollapse"
        >
          <div 
            class="w-full h-full bg-base-100 group-hover:bg-base-200
                   border border-r-0 border-base-content/10 group-hover:border-primary
                   rounded-l transition-colors flex items-center justify-center"
          >
            <Icon
              icon="material-symbols:chevron-right"
              class="text-xs text-base-content/60 group-hover:text-primary
                     transition-transform duration-300 ease-in-out"
              :class="{ 'rotate-180': isCollapsed }"
              :width="14"
              :height="14"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'
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

<style scoped lang="postcss">
.menu-item {
  @apply flex items-center px-3
         hover:bg-base-200/50
         text-base-content/70 hover:text-base-content
         relative rounded-lg
         transition-[background-color,color]
         duration-300
         border border-transparent;

  /* 展开状态下的高度 */
  height: 32px;
  min-height: 32px;
}

/* 折叠时的菜单项样式 */
.menu-item.w-\[24px\] {
  @apply p-0;
  height: 24px;
  min-height: 24px;
}

/* 激活状态样式 */
.menu-item.active {
  @apply !bg-primary !text-primary-content;
}

.menu-item.active:hover {
  @apply !bg-primary/90;
}

/* 图标过渡效果 */
.menu-item .fa-chevron-right {
  @apply transition-transform duration-300;
}
</style>
