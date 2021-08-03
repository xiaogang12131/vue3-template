import { createStore } from 'vuex'
import test from './modules/test/index'
import getters from './getters'

export default createStore({
  modules: { test },
  getters
})
