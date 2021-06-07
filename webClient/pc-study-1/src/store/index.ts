import RootStateTypes from '@/InterfaceTypes'
import { createStore } from 'vuex'
import StateUseInfo from './modules/user'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user:StateUseInfo
  }
})
