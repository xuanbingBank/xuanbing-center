<template>
  <div class="flex h-full b" ref="menuContainerRef">
    <!-- 一级菜单 -->
    <div class="w-[40px] flex-shrink-0 bg-base-200 border-r border-base-300">
      <div class="flex flex-col h-full justify-between">
        <!-- 顶部菜单 -->
        <ul class="menu menu-sm bg-base-200 p-0">
          <li v-for="route in topMenus" :key="route.name" class="my-1">
            <a
              class="rounded-none"
              :class="{ 'active': activeModule === route.meta?.module }"
              @click="handleModuleSelect(route.meta?.module || '')"
            >
              <font-awesome-icon
                v-if="route.meta?.icon"
                :icon="['fas', route.meta.icon as string]"
                class="text-sm"
              />
            </a>
          </li>
        </ul>

        <!-- 底部菜单 -->
        <ul class="menu menu-sm bg-base-200 p-0">
          <li v-for="route in bottomMenus" :key="route.name">
            <a
              class="rounded-none"
              :class="{ 'active': activeModule === route.meta?.module }"
              @click="handleModuleSelect(route.meta?.module || '')"
            >
              <font-awesome-icon
                v-if="route.meta?.icon"
                :icon="['fas', route.meta.icon as string]"
                class="text-sm"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 二级菜单 -->
    <div 
      class="bg-[#1e1e1e] border-r border-base-300 transition-all duration-300 relative overflow-hidden"
      :class="[isCollapsed ? 'w-[40px]' : 'w-[150px]']"
    >
      <ul class="menu menu-sm p-0"
          :class="[isCollapsed ? 'w-[40px]' : 'w-[150px]']"
      >
        <template v-if="currentModuleRoute?.children">
          <recursive-menu-item
            v-for="route in currentModuleRoute.children"
            class="px-3 [&_.active]:!bg-[#141414]"
            :key="route.path"
            :menu-item="route"
            :is-active="activeRoute === route.path"
            :is-collapsed="isCollapsed"
            @select="handleSelect"
          />
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
          class="w-full h-full bg-base-200 group-hover:bg-base-300
                 border border-r-0 border-base-300 group-hover:border-primary
                 rounded-l transition-colors flex items-center justify-center"
        >
          <font-awesome-icon
            icon="angle-right"
            class="text-xs text-base-content/60 group-hover:text-primary
                   transition-all duration-300"
            :class="{ 'rotate-180': isCollapsed }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { FontAwesomeIcon } from '@/utils/fontawesome'
import RecursiveMenuItem from '@/components/menu/RecursiveMenuItem.vue'
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
