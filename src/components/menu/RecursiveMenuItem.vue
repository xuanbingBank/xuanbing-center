<template>
  <li>
    <a
      class="menu-item"
      :class="[
        { 'active': isActive },
        isCollapsed ? 'justify-center w-[40px] p-0' : 'px-4'
      ]"
      @click="handleClick"
    >
      <font-awesome-icon
        v-if="props.menuItem.meta?.icon"
        :icon="['fas', props.menuItem.meta.icon as string]"
        class="text-sm"
      />
      <span 
        v-if="!isCollapsed"
        class="text-sm"
      >
        {{ props.menuItem.meta?.title }}
      </span>
    </a>

    <ul v-if="props.menuItem.children?.length" 
        class="menu menu-compact"
        :class="{ 'hidden': isCollapsed }">
      <recursive-menu-item
        v-for="child in props.menuItem.children"
        :key="child.path"
        :menu-item="child"
        :is-active="isActive"
        :is-collapsed="isCollapsed"
        @select="handleSelect"
      />
    </ul>
  </li>
</template>

<style scoped>
.menu-item {
  @apply flex items-center h-[36px] hover:bg-base-300 transition-all duration-300;
}

.menu-item.active {
  @apply bg-base-300;
}

.menu-item.active:before {
  @apply content-[''] absolute left-0 h-full w-1 bg-primary;
}

.menu-item.active.justify-center:before {
  @apply w-0;
}
</style>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@/utils/fontawesome'
import type { MenuItem } from '@/types/menu'

const props = defineProps<{
  menuItem: MenuItem
  isActive: boolean
  isCollapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'select', path: string): void
}>()

const handleClick = () => {
  if (props.menuItem.path) {
    emit('select', props.menuItem.path)
  }
}

const handleSelect = (path: string) => {
  emit('select', path)
}
</script>
