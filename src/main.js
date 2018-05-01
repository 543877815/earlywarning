// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import particlesJS from 'particles.js'
import store from './store'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false
Vue.use(particlesJS)
Vue.use(infiniteScroll)

// Vue.prototype.$axios = $axios
// $axios.defaults.baseURL = 'http://192.168.100.152:8080';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store, particlesJS,
  components: {App},
  template: '<App/>'
})
