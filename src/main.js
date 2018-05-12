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

Vue.filter('timeParse', function (date) {
  let newDate = new Date(date),
    year = newDate.getFullYear(),
    month = newDate.getMonth().toString().length == 1 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1,
    day = newDate.getDate().toString().length == 1 ? `0${newDate.getDate()}` : newDate.getDate(),
    hour = newDate.getHours().toString().length == 1 ? `0${newDate.getHours()}` : newDate.getHours(),
    minute = newDate.getMinutes().toString().length == 1 ? `0${newDate.getMinutes()}` : newDate.getMinutes(),
    second = newDate.getSeconds().toString().length == 1 ? `0${newDate.getSeconds()}` : newDate.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
})

Vue.filter('emailStatus', function (value) {
  let status;
  value === 0 ? status = '未激活' : status = '已激活';
  return status;
})

Vue.filter('userStatus', function (value) {
  let status;
  value === 0 ? status = '未激活' : status = '已激活';
  return status;
})

Vue.filter('maintainStatus', function (value) {
  switch (value) {
    case 0:
      return '等待确认';
    case 1:
      return '等待维修';
    case 2:
      return '正在维修';
    case 3:
      return '维修完成';
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store, particlesJS,
  components: {App},
  template: '<App/>'
})

