import { Commit } from 'vuex'
import { State } from './state-types'

export interface Actions {
  getUserInfo({ commit }: { commit: Commit; state: State }): Promise<void>
}
