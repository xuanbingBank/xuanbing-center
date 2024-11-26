<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <el-button type="primary" @click="handleClick">
      Element Plus Button
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const message = ref('Electron + Vue 3 + TypeScript + Element Plus')

    const handleClick = () => {
      console.log('Button clicked!')
    }

    return {
      message,
      handleClick
    }
  }
})
</script>

<style>
.container {
  padding: 20px;
  text-align: center;
}
</style> 