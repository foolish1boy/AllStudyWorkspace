import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './icons' // icon

import 'vant/lib/index.css';
import vant from 'vant'
import './InterfaceTypes'

import SvgIcon from '@/components/SvgIcon.vue'// svg组件

const app = createApp(App);
app.component('svg-icon', SvgIcon);
app.use(store);
app.use(router);
app.use(vant);
app.mount('#app');


