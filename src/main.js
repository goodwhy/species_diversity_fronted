
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css' // 必须引入的核心样式
import '@arcgis/core/assets/esri/themes/light/main.css'
import '@arcgis/core/assets/esri/themes/dark/main.css';
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
