<template>
  <header class="h-[50px] flex items-center justify-between bg-base-100 border-b border-base-300 webkit-app-region-drag transition-[background-color,border-color,color] duration-300">
    <!-- 面包屑 -->
    <div class="flex-1 flex items-center px-4 webkit-app-region-no-drag">
      <div class="breadcrumbs text-sm">
        <ul>
          <li v-for="(crumb, index) in breadcrumbs" :key="index">
            <a 
              class="flex items-center gap-1 text-base-content/70 hover:text-base-content"
              :class="{ '!text-base-content': index === breadcrumbs.length - 1 }"
              @click.prevent="handleCrumbClick(crumb.path)"
            >
              <font-awesome-icon
                v-if="crumb.icon"
                :icon="['fas', crumb.icon]"
                class="text-xs"
              />
              <span>{{ crumb.title }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

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
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@/utils/fontawesome'

const route = useRoute()
const router = useRouter()

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
        icon: matchedRoute.meta.icon as string
      })
    }
  }

  return crumbs
})

// 处理面包屑点击
const handleCrumbClick = (path: string) => {
  if (path !== route.path) {
    router.push(path)
  }
}

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
</style> 