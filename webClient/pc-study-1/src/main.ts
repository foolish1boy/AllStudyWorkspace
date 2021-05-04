import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import '@/styles/index.scss' // global css


import * as directives from '@/directives'
import _global from '@/Infos/Global'

import i18n from './lang/';
import './InterfaceTypes';


const app = createApp(App);
app.use(store);
app.use(router);
app.use(i18n);
app.use(ElementPlus,{i18n:(key:string,value:string='zh')=>i18n.global.t(key,value)});
app.mount('#app');
app.config.globalProperties.GLOBAL = _global;
app.config.globalProperties.$gobalI18n = i18n;


Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string ]: Directive })[key])
  })