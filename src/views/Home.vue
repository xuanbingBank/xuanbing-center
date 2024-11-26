<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div class="counter">
      <p>Count: {{ counter.count }}</p>
      <p>Double Count: {{ counter.doubleCount }}</p>
      <el-button type="primary" @click="counter.increment">+</el-button>
      <el-button type="primary" @click="counter.decrement">-</el-button>
    </div>
    <el-button type="success" @click="$router.push('/about')">
      Go to About
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCounterStore } from '../stores/counter'

export default defineComponent({
  name: 'Home',
  setup() {
    const message = ref('Welcome to Home Page')
    const counter = useCounterStore()

    return {
      message,
      counter
    }
  }
})
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}
.counter {
  margin: 20px 0;
}
</style> 