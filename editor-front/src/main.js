import { createApp } from 'vue'
import './style.css'
import Router from './router/index.js'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(Router).use(ElementPlus).use(pinia).mount('#app')
