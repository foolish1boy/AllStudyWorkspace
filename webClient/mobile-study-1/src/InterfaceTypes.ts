import { Permission } from '@/store/modules/permission'
import { ComponentCustomProperties } from 'vue'
import { Module, Store } from 'vuex'
import { StateUserInfoData } from './store/modules/user'

export default interface RootStateTypes
{
  
}

declare module '@vue/runtime-core' {// Declare your own store states.
  interface State {
    permission:Permission;
    user:StateUserInfoData
  }
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}