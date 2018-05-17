import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import equipment from './modules/equipment'
import particles from './modules/particles'
import user from './modules/user'
import sockJs from './modules/sockJs'
import VueLazyLoad from 'vue-lazyload'

Vue.use(Vuex)
Vue.use(VueLazyLoad,{
  loading: "/static/loading-svg/loading-bars.svg"
})

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    common,
    equipment,
    particles,
    user,
    sockJs
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
