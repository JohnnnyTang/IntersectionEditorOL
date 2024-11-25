import { createApp } from 'vue'
import './style.css'
import Router from './router/index.js'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(Router).use(pinia).mount('#app')
