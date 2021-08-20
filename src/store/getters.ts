import { GetterTree } from 'vuex'
import { RootState } from './types'

const getters: GetterTree<RootState, RootState> = {
  getToken: state => state.user.token
}

export default getters
