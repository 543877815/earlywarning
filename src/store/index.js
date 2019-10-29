import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import equipment from './modules/equipment'
import particles from './modules/particles'
import user from './modules/user'
import sockJs from './modules/sockJs'
import news from './modules/news'
import VueLazyLoad from 'vue-lazyload'

const isDev = process.env.NODE_ENV === 'development'

Vue.use(Vuex)
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading-bars.svg'
})
// const debug = process.env.NODE_ENV !== 'production'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    modules: {
      common,
      equipment,
      particles,
      user,
      sockJs,
      news
    }
  })
  if (module.hot){
    module.hot.accept([
    './modules/common',
    './modules/equipment',
    './modules/particles',
    './modules/user',
    './modules/sockJs',
    './modules/news',
    ],()=>{
      const common = require('./modules/common').default
      const equipment = require('./modules/equipment').default
      const particles = require('./modules/particles').default
      const user = require('./modules/user').default
    const sockJs = require('./modules/sockJs').default
    const news = require('./modules/news').default

    store.hotUpdate({
      modules:{
        common,
        equipment,
        particles,
        user,
        sockJs,
        news
      }
    })
  })
  }

  return store
}
