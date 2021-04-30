import { Permission } from '@/store/modules/permission'
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {// Declare your own store states.
  interface State {
    permission:Permission
  }
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}