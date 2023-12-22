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

import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'

import '@/styles/index.scss'

const a = createApp(App)
  .use(store, key)
  .use(router)
  .use(ElementPlus, { size: 'small' })
  .use(components)
  .use(ViewUIPlus)
  .mount('#app')

console.log(a)
