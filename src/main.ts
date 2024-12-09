import './styles/variables.css'
import './styles/global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from './utils/fontawesome' // 修改路径,移除@别名
import { useThemeStore } from './stores/modules/theme'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)

// 初始化主题
const themeStore = useThemeStore()
themeStore.initSystemThemeListener()

app.mount('#app')
