<template>
  <li class="my-1">
    <a 
      class="menu-item"
      :class="[
        { 'active': isActive },
        { 'justify-center': isCollapsed }
      ]"
      @click="handleClick"
    >
      <font-awesome-icon
        v-if="menuItem.meta?.icon"
        :icon="['fas', menuItem.meta.icon as string]"
        class="text-sm"
      />
      <span 
        v-if="!isCollapsed"
        class="ml-2"
      >
        {{ menuItem.meta?.title }}
      </span>
    </a>

    <template v-if="menuItem.children && !isCollapsed">
      <recursive-menu-item
        v-for="child in menuItem.children"
        :key="child.path"
        :menu-item="child"
        :is-active="isActive"
        :is-collapsed="isCollapsed"
        @select="handleSelect"
      />
    </template>
  </li>
</template>

<style scoped lang="postcss">
.menu-item {
  @apply flex items-center h-[36px] px-3
         hover:bg-base-200/50
         text-base-content/70 hover:text-base-content
         relative
         transition-[background-color] duration-200;
}

.menu-item * {
  @apply transition-none;
}

.menu-item.active {
  @apply !bg-primary !text-primary-content;
}

.menu-item.active,
.menu-item.active * {
  @apply !text-primary-content;
}

.menu-item.active:hover {
  @apply !bg-primary/90;
}

.menu-item.active:before {
  @apply hidden;
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
