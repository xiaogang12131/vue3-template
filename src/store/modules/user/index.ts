import { MutationTree, ActionTree } from 'vuex'

import { State } from './state-types'
import { Mutation } from './mutation-types'
import { RootState } from '../../types'

export const state: State = {
  token: '',
  userInfo: {}
}

const mutations: MutationTree<State> = {
  [Mutation.SET_TOKEN](state, token) {
    state.token = token
  },
  [Mutation.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions: ActionTree<State, RootState> = {
  getUserInfo({ commit }) {
    return new Promise<void>(resolve => {
      commit(Mutation.SET_USER_INFO)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
