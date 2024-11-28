<template>
  <div class="about">
    <h1>{{ message }}</h1>
    <p>Current count from store: {{ counter.count }}</p>
    <el-button type="primary" @click="$router.push('/')"> Back to Home </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCounterStore } from '../stores'

export default defineComponent({
  name: 'About',
  setup() {
    const message = ref('About Page')
    const counter = useCounterStore()

    return {
      message,
      counter
    }
  }
})
</script>

<style scoped>
.about {
  padding: 20px;
  text-align: center;
}
</style>
