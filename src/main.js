// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import particlesJS from 'particles.js'
import store from './store'
import $axios from 'axios'

Vue.config.productionTip = false
Vue.use(particlesJS)
Vue.prototype.$axios = $axios

$axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5ad368e0939d5749ebcc7e05/earlywarning';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store, particlesJS,
  components: {App},
  template: '<App/>'
})
