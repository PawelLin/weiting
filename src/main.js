import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueWebsocket from "vue-websocket";
import util from './util/util.js'
import message from './util/message.js'
import './assets/css/common.css'
import './assets/logo.png'
import './util/extend.js'

/* eslint-disable no-new */

Vue.config.errorHandler = function (err, vm) {
  // handle error
  console.log(err);
}

Vue.use(VueWebsocket, "ws://localhost:3000", {
    reconnection: false
})
Vue.use(util);
Vue.use(message);

new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  // components: { App },
  render: h => h(App)
})
