import RootStateTypes from '@/InterfaceTypes'
import { InjectionKey } from '@vue/runtime-core'
import { createStore, Store } from 'vuex'
import getters from './getters'
import permission from './modules/permission'
import StateUserInfo from './modules/user'

//debugger

export default createStore<RootStateTypes>({
  modules: {
    permission:permission,
    user:StateUserInfo
  },
  getters:getters
})


export const key:InjectionKey<Store<RootStateTypes>> = Symbol('vue-store');