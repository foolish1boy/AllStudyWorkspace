import RootStateTypes from '@/InterfaceTypes'
import { createStore } from 'vuex'
import StateUseInfo, { StateUserInfoData } from './modules/user'
import StateAppInfo, { StateAppInfoData } from './modules/app'
import StatePermissionInfo from './modules/permission'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user:StateUseInfo,
    app:StateAppInfo,
    permission:StatePermissionInfo,
  },
  getters:
  {
    roles:(state:any) => state.user.roles,
    token:(state:any) => state.user.token,
    pageSize:(state:any) => (<StateAppInfoData>state.app).pageSize,
  }
})
