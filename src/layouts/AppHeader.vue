<template>
  <header class="flex flex-col bg-base-100 border-b border-base-300 transition-[background-color,border-color,color] duration-300">
    <!-- 顶部区域 -->
    <div class="h-[50px] flex items-center justify-between webkit-app-region-drag">
      <!-- 面包屑 -->
      <div class="min-w-[200px] max-w-[400px] flex items-center px-4 webkit-app-region-no-drag">
        <div class="breadcrumbs text-sm w-full">
          <ul class="w-full">
            <li v-for="(crumb, index) in breadcrumbs" :key="index">
              <a 
                class="flex items-center gap-1 text-base-content/70"
                :class="[
                  { '!text-base-content': index === breadcrumbs.length - 1 },
                  { 'hover:text-base-content cursor-pointer': crumb.clickable !== false }
                ]"
                @click.prevent="crumb.clickable !== false && handleCrumbClick(crumb.path)"
              >
                <font-awesome-icon
                  v-if="crumb.icon"
                  :icon="['fas', crumb.icon]"
                  class="text-xs flex-shrink-0"
                />
                <span class="truncate">{{ crumb.title }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 可拖拽区域 -->
      <div class="flex-1 h-full"></div>

      <!-- Window Controls -->
      <div class="flex items-center [&]:webkit-app-region-no-drag webkit-app-region-no-drag">
        <!-- Minimize -->
        <button 
          class="btn btn-ghost btn-sm h-[50px] w-[50px] min-h-0 rounded-none hover:bg-base-200 flex items-center justify-center"
          @click="minimizeWindow"
        >
          <font-awesome-icon icon="window-minimize" class="translate-y-[-4px]" />
        </button>

        <!-- Maximize -->
        <button 
          class="btn btn-ghost btn-sm h-[50px] w-[50px] min-h-0 rounded-none hover:bg-base-200 flex items-center justify-center"
          @click="toggleMaximize"
        >
          <font-awesome-icon icon="window-maximize" />
        </button>

        <!-- Close -->
        <button 
          class="btn btn-ghost btn-sm h-[50px] w-[50px] min-h-0 rounded-none hover:bg-error flex items-center justify-center"
          @click="closeWindow"
        >
          <font-awesome-icon icon="xmark" />
        </button>
      </div>
    </div>

    <!-- 页签区域 -->
    <div class="h-[36px] flex items-center px-2 webkit-app-region-no-drag">
      <div class="tabs tabs-boxed bg-base-200/50 h-[32px]">
        <a
          v-for="tab in openedTabs"
          :key="tab.path"
          class="tab h-[32px] min-h-[32px] gap-2 px-4"
          :class="{ 'tab-active': tab.path === route.path }"
          @click="handleTabClick(tab.path)"
        >
          <font-awesome-icon
            v-if="tab.icon"
            :icon="['fas', tab.icon]"
            class="text-xs"
          />
          <span>{{ tab.title }}</span>
          <font-awesome-icon
            icon="xmark"
            class="text-xs opacity-0 group-hover:opacity-100 hover:text-error"
            @click.stop="closeTab(tab.path)"
          />
        </a>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { FontAwesomeIcon } from '@/utils/fontawesome'
import { useMenu } from '@/hooks/useMenu'

const route = useRoute()
const router = useRouter()
const { handleModuleSelect } = useMenu()

// 已打开的页签
const openedTabs = useStorage('xuanbing-opened-tabs', [{
  title: '数据看板',
  path: '/home/dashboard',
  icon: 'house'
}])

// 计算面包屑数据
const breadcrumbs = computed(() => {
  const crumbs = []
  let currentPath = ''
  
  // 解析当前路由路径
  const pathSegments = route.path.split('/').filter(Boolean)
  
  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    const matchedRoute = router.getRoutes().find(r => r.path === currentPath)
    
    if (matchedRoute?.meta?.title) {
      crumbs.push({
        title: matchedRoute.meta.title,
        path: currentPath,
        icon: matchedRoute.meta.icon as string,
        // 如果是一级菜单（路径只有一段），则设置为不可点击
        clickable: pathSegments.length > 1 && currentPath.split('/').filter(Boolean).length > 1
      })
    }
  }

  // 如果没有面包屑，则显示默认的数据看板
  if (crumbs.length === 0) {
    return [{
      title: '数据看板',
      path: '/home/dashboard',
      icon: 'house',
      clickable: true
    }]
  }

  return crumbs
})

// 处理面包屑点击
const handleCrumbClick = (path: string) => {
  if (path !== route.path) {
    router.push(path)
  }
}

// 处理页签点击
const handleTabClick = (path: string) => {
  if (path !== route.path) {
    // 获取目标路由的模块信息
    const matchedRoute = router.getRoutes().find(r => r.path === path)
    if (matchedRoute?.meta?.module) {
      // 先激活对应的模块
      handleModuleSelect(matchedRoute.meta.module as string)
    }
    // 然后跳转到目标路由
    router.push(path)
  }
}

// 关闭页签
const closeTab = (path: string) => {
  if (openedTabs.value.length <= 1) return
  const index = openedTabs.value.findIndex(tab => tab.path === path)
  if (index > -1) {
    openedTabs.value.splice(index, 1)
    // 如果关闭的是当前页签，则跳转到前一个页签
    if (path === route.path) {
      const nextTab = openedTabs.value[index - 1] || openedTabs.value[0]
      router.push(nextTab.path)
    }
  }
}

// 监听路由变化，自动添加页签
watch(
  () => route.path,
  (path) => {
    if (!openedTabs.value.find(tab => tab.path === path)) {
      const matchedRoute = router.getRoutes().find(r => r.path === path)
      if (matchedRoute?.meta?.title) {
        openedTabs.value.push({
          title: matchedRoute.meta.title as string,
          path: path,
          icon: matchedRoute.meta.icon as string
        })
      }
    }
  },
  { immediate: true }
)

declare global {
  interface Window {
    electronAPI: {
      minimizeWindow: () => void
      toggleMaximize: () => void
      closeWindow: () => void
    }
  }
}

/**
 * @description 最小化窗口
 */
const minimizeWindow = () => {
  window.electronAPI.minimizeWindow()
}

/**
 * @description 切换最大化/还原窗口
 */
const toggleMaximize = () => {
  window.electronAPI.toggleMaximize()
}

/**
 * @description 关闭窗口
 */
const closeWindow = () => {
  window.electronAPI.closeWindow()
}
</script>

<style scoped lang="postcss">
.webkit-app-region-drag {
  -webkit-app-region: drag;
  -webkit-user-select: none;
  user-select: none;
}

.webkit-app-region-no-drag {
  -webkit-app-region: no-drag;
}

/* 面包屑样式 */
.breadcrumbs ul li:not(:first-child):before {
  @apply !text-base-content/60 !mx-2;
}

/* 页签样式 */
.tabs .tab {
  @apply transition-colors duration-200;
}

.tabs .tab-active {
  @apply !bg-primary text-primary-content;
}

.tab:hover .opacity-0 {
  @apply opacity-100;
}
</style> 