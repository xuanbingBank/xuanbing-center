<template>
  <div class="theme-settings p-6">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-base-content">主题设置</h2>
      <p class="mt-2 text-base-content/60">自定义应用的外观和主题样式</p>
    </div>

    <!-- 主题模式选择 -->
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body">
        <h3 class="card-title text-lg mb-4">主题模式</h3>
        <div class="grid grid-cols-3 gap-4 max-w-2xl">
          <!-- 每列包含按钮和对应的预览 -->
          <div 
            v-for="mode in themeModes" 
            :key="mode.value"
            class="flex flex-col gap-3"
          >
            <!-- 选择按钮 -->
            <label 
              class="btn btn-outline gap-2 justify-start px-3 py-2 h-auto min-h-0"
              :class="{ 'btn-active': themeStore.mode === mode.value }"
            >
              <input 
                type="radio" 
                name="theme-mode" 
                class="radio radio-xs radio-primary" 
                :value="mode.value"
                :checked="themeStore.mode === mode.value"
                @change="handleModeChange(mode.value)"
              />
              <div class="flex items-center gap-2 text-sm">
                <font-awesome-icon :icon="mode.icon" class="text-base" />
                <span>{{ mode.label }}</span>
              </div>
            </label>

            <!-- 效果预览 -->
            <div 
              class="preview-card rounded-lg overflow-hidden border border-base-300 cursor-pointer"
              :class="{ 'opacity-50': themeStore.mode !== mode.value }"
              @click="handleModeChange(mode.value)"
            >
              <div 
                class="preview-header p-1.5" 
                :class="mode.value === 'light' ? 'bg-white border-b border-gray-200' : 
                       mode.value === 'dark' ? 'bg-gray-800 border-b border-gray-700' :
                       'bg-gradient-to-r from-white to-gray-800 border-b border-gray-400'"
              >
                <div class="flex items-center gap-1.5">
                  <div class="w-2 h-2 rounded-full bg-red-500"></div>
                  <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div class="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div 
                class="preview-content p-2"
                :class="mode.value === 'light' ? 'bg-gray-50' : 
                       mode.value === 'dark' ? 'bg-gray-900' :
                       'bg-gradient-to-r from-gray-50 to-gray-900'"
              >
                <div 
                  class="h-1.5 w-3/4 rounded mb-1.5"
                  :class="mode.value === 'light' ? 'bg-gray-300' : 
                         mode.value === 'dark' ? 'bg-gray-700' :
                         'bg-gradient-to-r from-gray-300 to-gray-700'"
                ></div>
                <div 
                  class="h-1.5 w-1/2 rounded"
                  :class="mode.value === 'light' ? 'bg-gray-300' : 
                         mode.value === 'dark' ? 'bg-gray-700' :
                         'bg-gradient-to-r from-gray-300 to-gray-700'"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主题色调选择 -->
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body">
        <h3 class="card-title text-lg mb-4 text-base-content">主题色调</h3>
        <div class="grid grid-cols-4 gap-4">
          <div 
            v-for="color in themeColors" 
            :key="color.name"
            class="theme-color-item cursor-pointer rounded-lg overflow-hidden border border-base-300 transition-all"
            :class="{ 'ring-2 ring-offset-2 ring-primary': selectedColor === color.name }"
            @click="handleColorSelect(color)"
          >
            <!-- 预览窗口 -->
            <div class="preview-window">
              <!-- 标题栏 -->
              <div class="bg-base-100 border-b border-base-300 p-2">
                <div class="flex items-center gap-1.5">
                  <div class="w-2 h-2 rounded-full bg-red-500"></div>
                  <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div class="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>

              <!-- 内容区 -->
              <div class="p-3 bg-base-100">
                <!-- 按钮示例 -->
                <div 
                  class="btn btn-sm w-full mb-2 pointer-events-none select-none flex items-center justify-center rounded-btn"
                  :style="{ 
                    backgroundColor: color.value, 
                    color: '#fff', 
                    borderColor: color.value,
                    padding: '0.25rem 0.75rem'  // 添加内边距
                  }"
                >
                  主要按钮
                </div>
                
                <!-- 进度条示例 -->
                <div class="w-full h-2 rounded-full bg-base-200 mb-2">
                  <div 
                    class="h-full rounded-full pointer-events-none"
                    :style="{ width: '60%', backgroundColor: color.value }"
                  ></div>
                </div>

                <!-- 开关示例 -->
                <div class="flex items-center justify-between pointer-events-none select-none">
                  <span class="text-xs">开关</span>
                  <div 
                    class="toggle toggle-sm checked"
                    :style="{
                      '--tglbg': color.value,
                      '--handleoffset': '1.5rem',
                      backgroundColor: color.value,
                      borderColor: color.value
                    }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- 标签 -->
            <div class="text-center py-2 text-sm bg-base-200">
              {{ color.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 界面元素圆角设置 -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title text-lg mb-4">界面圆角</h3>
        <div class="flex items-center gap-4">
          <input type="range" class="range range-primary" min="0" max="20" value="8" />
          <span class="text-base-content/60">8px</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useThemeStore } from '@/stores/modules/theme'
import type { ThemeMode } from '@/stores/modules/theme'

const themeStore = useThemeStore()

/**
 * @description 主题模式选项
 */
const themeModes = [
  { value: 'light' as ThemeMode, label: '浅色模式', icon: 'sun' },
  { value: 'dark' as ThemeMode, label: '深色模式', icon: 'moon' },
  { value: 'system' as ThemeMode, label: '跟随系统', icon: 'computer' }
] as const

/**
 * @description 主题颜色选项
 */
const themeColors = [
  { name: 'light', label: '默认蓝', value: '#1890ff', darkValue: '#177ddc' },
  { name: 'green', label: '清新绿', value: '#52c41a', darkValue: '#49aa19' },
  { name: 'purple', label: '典雅紫', value: '#722ed1', darkValue: '#642ab5' },
  { name: 'orange', label: '活力橙', value: '#fa8c16', darkValue: '#d87a16' },
  { name: 'red', label: '中国红', value: '#f5222d', darkValue: '#dc3545' },
  { name: 'cyan', label: '清爽青', value: '#13c2c2', darkValue: '#08979c' },
  { name: 'pink', label: '浪漫粉', value: '#eb2f96', darkValue: '#c41d7f' },
  { name: 'blue', label: '科技蓝', value: '#2f54eb', darkValue: '#1d39c4' }
]

const selectedColor = ref(themeStore.currentTheme)

// 处理模式切换
function handleModeChange(value: ThemeMode) {
  themeStore.setMode(value)
}

// 处理主题色调切换
function handleColorChange(themeName: string) {
  selectedColor.value = themeName
  themeStore.setTheme(themeName)
}

// 监听主题模式变化，自动切换对应的主题色调
watch(() => themeStore.mode, (newMode) => {
  if (newMode === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', selectedColor.value)
  }
}, { immediate: true })

// 点击颜色卡片时触发主题切换
function handleColorSelect(color: typeof themeColors[number]) {
  handleColorChange(color.name)
}
</script>

<style lang="less" scoped>
.theme-color-item {
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  &:active {
    transform: scale(0.98);
  }
}

.preview-window {
  min-height: 140px;
  background-color: var(--b1);
}

// 自定义 toggle 开关样式
:deep(.toggle) {
  &:checked {
    background-color: var(--tglbg);
    border-color: var(--tglbg);
  }
}

.preview-card {
  min-height: 80px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    opacity: 1 !important;
  }

  &:active {
    transform: scale(0.98);
  }
}

// 自定义滚动条样式
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

// 深色模式下的滚动条
:global(.dark) {
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}

// 添加按钮圆角样式
.btn {
  border-radius: var(--rounded-btn, 0.5rem);
}
</style>
