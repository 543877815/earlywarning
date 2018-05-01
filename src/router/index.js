import Vue from 'vue'
import Router from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import login from '@/pages/login/login'

import index from '@/pages/index/index'

import setting from '@/pages/settings/settings'
import baseInfo from '@/components/baseInfo/baseInfo'
import changePassword from '@/components/changePassword/changePassword'
import emailSetting from '@/components/emailSetting/emailSetting'

import management from '@/pages/management/management'
import history from '@/pages/history/history'
import userNews from '@/pages/userNews/userNews'

//管理员
import AdminLogin from '@/pages/AdminLogin/AdminLogin'
import AdminBaseLayout from '@/components/AdminBaseLayout/AdminBaseLayout'
Vue.use(Element)
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
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/management',
      name: 'management',
      component: management,
      linkActiveClass: 'active'
    },
    {
      path: '/history',
      name: 'history',
      component: history,
      linkActiveClass: 'active'
    },
    {
      path: '/userNews',
      name: 'userNews',
      component: userNews
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: AdminLogin,
    },
    {
      path: '/admin',
      name: 'layout',
      component: AdminBaseLayout,
    },
    {
      path: '/settings',
      name: 'settings',
      component: setting,
      children: [
        {
          path: 'baseInfo',
          name: 'baseInfo',
          component: baseInfo
        },
        {
          path: 'changePassword',
          name: 'changePassword',
          component: changePassword
        },
        {
          path: 'emailSetting',
          name: 'emailSetting',
          component: emailSetting
        }
      ]
    },

  ]
})
