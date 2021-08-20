import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import components from './components'
import './assets/icons'
import './mock'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import '@/styles/index.scss'

createApp(App)
  .use(store, key)
  .use(router)
  .use(ElementPlus)
  .use(components)
  .mount('#app')
