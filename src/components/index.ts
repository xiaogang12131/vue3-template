// 全局组件注册
import { App } from 'vue'

import SvgIcon from './SvgIcon'

const components = [SvgIcon]

const install = function (app: App) {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install
}
