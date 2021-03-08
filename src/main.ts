import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue'
import VueStorage from 'vue-ls'

import 'ant-design-vue/dist/antd.css'
import '@/style/index.scss'

import './mockdata'

import './peimission'

Vue.config.productionTip = false;

Vue.use(Antd)
Vue.use(VueStorage)

console.log('当前环境：', process.env.VUE_APP_MODE)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
