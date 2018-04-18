import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import index from '@/components/index/index'
import setting from '@/components/settings/settings'
import baseInfo from '@/components/baseInfo/baseInfo'
import changePassword from '@/components/changePassword/changePassword'
import emailSetting from '@/components/emailSetting/emailSetting'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {keepAlive: false}
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/settings',
      name: 'settings',
      component: setting,
      children: [
        {
          path: 'baseInfo',
          component: baseInfo
        },
        {
          path: 'changePassword',
          component: changePassword
        },
        {
          path: 'emailSetting',
          component: emailSetting
        }
      ]
    }
  ]
})
