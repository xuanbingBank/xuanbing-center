<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <nav>
          <el-menu mode="horizontal" router>
            <el-menu-item index="/">Home</el-menu-item>
            <el-menu-item index="/about">About</el-menu-item>
          </el-menu>
        </nav>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
.app-container {
  height: 100vh;
}
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
}
.el-main {
  padding: 20px;
}
</style> 