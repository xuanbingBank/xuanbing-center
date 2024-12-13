import './styles/variables.css'
import './styles/global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/modules/theme'
import { Icon } from './utils/icons'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.component('icon', Icon)
// 初始化主题
const themeStore = useThemeStore()
themeStore.initSystemThemeListener()

app.mount('#app')
