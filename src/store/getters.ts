import { GetterTree } from 'vuex'
import { State as TestState } from './modules/test/types/state-types'

export interface State {
  test: TestState
  // ...
}

const getters: GetterTree<State, State> = {
  getToken: state => state.test.token
  // ...
}

export default getters
