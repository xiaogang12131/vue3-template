import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import components from './components'
import './components/CustomElement'
import './assets/icons'
import './mock'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/styles/index.scss'

createApp(App)
  .use(store, key)
  .use(router)
  .use(ElementPlus, { size: 'small' })
  .use(components)
  .mount('#app')
