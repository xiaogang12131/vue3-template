import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { RootState } from './types'
import getters from './getters'
import user from './modules/user'

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  modules: { user },
  getters
})

// 定义useStore组合式函数
export function useStore() {
  return baseUseStore(key)
}
