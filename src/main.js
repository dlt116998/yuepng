import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

import '@/assets/css/base.css'
import '@/assets/css/font-awesome.min.css'

import * as request from '@/api/goods.js';
Vue.prototype.$goods = request;

//Vue.use(VueSocketio, socketio('http://localhost:8080')); 
const options = {path:""}

Vue.use(new VueSocketio({
  debug:true,
  connection: 'http://localhost:5050',
  vuex:{
    store,
    actionPrefix:"SOCKET_",
    mutationPrefix:"SOCKET_"
  }
}))
  



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
