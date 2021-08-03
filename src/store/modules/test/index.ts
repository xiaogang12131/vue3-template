import { MutationTree, ActionTree } from 'vuex'

import { State } from './types/state-types'
import { Mutations, Mutation } from './types/mutation-types'
import { Actions } from './types/action-types'

export const state: State = {
  token: '',
  userInfo: {}
}

const mutations: MutationTree<State> & Mutations = {
  [Mutation.SET_TOKEN](state, token) {
    state.token = token
  },
  [Mutation.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions: ActionTree<State, State> & Actions = {
  getUserInfo({ commit }) {
    return new Promise(resolve => {
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
