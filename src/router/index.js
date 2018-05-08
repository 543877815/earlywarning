import Vue from 'vue'
import Router from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import login from '@/pages/login/login'

import index from '@/pages/index/index'

import setting from '@/pages/settings/settings'
import baseInfo from '@/components/setting-info/setting-info'
import changePassword from '@/components/setting-password/setting-password'
import emailSetting from '@/components/setting-email/setting-email'

import management from '@/pages/management/management'
import history from '@/pages/history/history'
import userNews from '@/pages/userNews/userNews'

//管理员
import AdminLogin from '@/pages/AdminLogin/AdminLogin'
import AdminBaseLayout from '@/pages/AdminBaseLayout/AdminBaseLayout'
import AdminModifyPassword from '@/components/admin-modifyPassword/admin-modifyPassword'
import AdminIndex from '@/components/admin-index/admin-index'
import AdminEquipmentType from '@/components/admin-equipmentType/admin-equipmentType'
import AdminEquipmentModel from '@/components/admin-equipmentModel/admin-equipmentModel'
import AdminEquipmentDetail from '@/components/admin-equipmentDetail/admin-equipmentDetail'
import AdminOrderDetail from '@/components/admin-orderDetail/admin-orderDetail'
import AdminUserInfoLists from '@/components/admin-userInfoLists/admin-userInfoLists'
import AdminUserEquipmentLists from '@/components/admin-userEquipmentLists/admin-userEquipmentLists'
import AdminUserOrderLists from '@/components/admin-userOrderLists/admin-userOrderLists'
import AdminServerInfoLists from '@/components/admin-serverInfoLists/admin-serverInfoLists'
import AdminServerOrderLists from '@/components/admin-serverOrderLists/admin-serverOrderLists'


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
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin,
    },
    {
      path: '/admin',
      name: 'layout',
      component: AdminBaseLayout,
      children: [
        {
          path: 'index',
          name: 'admin-index',
          component: AdminIndex
        },
        {
          path: 'modifyPassword',
          name: 'modifyPassword',
          component: AdminModifyPassword
        },
        {
          path: 'equipmentType',
          name: 'equipmentType',
          component: AdminEquipmentType
        },
        {
          path: 'equipmentDetail',
          name: 'equipmentDetail',
          component:AdminEquipmentDetail
        },
        {
          path: 'equipmentModel',
          name: 'equipmentModel',
          component: AdminEquipmentModel
        },
        {
          path: 'orderDetail',
          name: 'orderDetail',
          component: AdminOrderDetail
        },
        {
          path: 'userInfoLists',
          name: 'userInfoLists',
          component: AdminUserInfoLists
        },
        {
          path: 'userEquipmentLists',
          name: 'userEquipmentLists',
          component: AdminUserEquipmentLists
        },
        {
          path: 'userOrderLists',
          name: 'userOrderLists',
          component: AdminUserOrderLists
        },
        {
          path: 'serverInfoLists',
          name: 'serverInfoLists',
          component: AdminServerInfoLists
        },
        {
          path: 'serverOrderLists',
          name: 'serverOrderLists',
          component: AdminServerOrderLists
        },
      ]
    },
  ]
})
