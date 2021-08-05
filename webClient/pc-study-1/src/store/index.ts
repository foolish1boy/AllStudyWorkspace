import RootStateTypes from '@/InterfaceTypes'
import { createStore } from 'vuex'
import StateUseInfo from './modules/user'
import StateAppInfo from './modules/app'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user:StateUseInfo,
    app:StateAppInfo
  }
})
