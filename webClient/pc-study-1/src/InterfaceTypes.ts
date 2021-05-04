import { ComponentCustomProperties } from 'vue'
import { I18n } from 'vue-i18n'
import { Module, Store } from 'vuex'
import i18n from './lang/';

export default interface RootStateTypes
{
  
}

declare module '@vue/runtime-core' {// Declare your own store states.
  interface State {
    
  }
  interface ComponentCustomProperties {
    $store: Store<State>;
    $gobalI18n:I18n;
  }
}