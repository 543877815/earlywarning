import Vue from 'vue'
import Router from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import login from '@/pages/login/login'

// import index from '@/pages/index/index'

// import setting from '@/pages/settings/settings'
// import baseInfo from '@/components/setting-info/setting-info'
// import changePassword from '@/components/setting-password/setting-password'
// import emailSetting from '@/components/setting-email/setting-email'

// import management from '@/pages/management/management'
// import history from '@/pages/history/history'
// import userNews from '@/pages/userNews/userNews'

// 管理员
// import AdminLogin from '@/pages/AdminLogin/AdminLogin'
// import AdminBaseLayout from '@/pages/AdminBaseLayout/AdminBaseLayout'
// import AdminModifyPassword from '@/components/admin-modifyPassword/admin-modifyPassword'
// import AdminIndex from '@/components/admin-index/admin-index'
// import AdminEquipmentType from '@/components/admin-equipmentType/admin-equipmentType'
// import AdminEquipmentDetail from '@/components/admin-equipmentDetail/admin-equipmentDetail'
// import AdminEquipmentModel from '@/components/admin-equipmentModel/admin-equipmentModel'
// import AdminOrderDetail from '@/components/admin-orderDetail/admin-orderDetail'
// import AdminUserInfoLists from '@/components/admin-userInfoLists/admin-userInfoLists'
// import AdminUserEquipmentLists from '@/components/admin-userEquipmentLists/admin-userEquipmentLists'
// import AdminUserOrderLists from '@/components/admin-userOrderLists/admin-userOrderLists'
// import AdminServerInfoLists from '@/components/admin-serverInfoLists/admin-serverInfoLists'
// import AdminServerOrderLists from '@/components/admin-serverOrderLists/admin-serverOrderLists'

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
      component: resolve => require(['@/pages/login/login'], resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/pages/index/index'], resolve)
    },
    {
      path: '/management',
      name: 'management',
      component: resolve => require(['@/pages/management/management'], resolve),
      linkActiveClass: 'active'
    },
    {
      path: '/history',
      name: 'history',
      component: resolve => require(['@/pages/history/history'], resolve),
      linkActiveClass: 'active'
    },
    {
      path: '/userNews',
      name: 'userNews',
      component: resolve => require(['@/pages/userNews/userNews'], resolve)
    },
    {
      path: '/settings',
      name: 'settings',
      component: resolve => require(['@/pages/settings/settings'], resolve),
      children: [
        {
          path: 'baseInfo',
          name: 'baseInfo',
          component: resolve => require(['@/components/setting-info/setting-info'], resolve)
        },
        {
          path: 'changePassword',
          name: 'changePassword',
          component: resolve => require(['@/components/setting-password/setting-password'], resolve)
        },
        {
          path: 'emailSetting',
          name: 'emailSetting',
          component: resolve => require(['@/components/setting-email/setting-email'], resolve)
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: resolve => require(['@/pages/AdminLogin/AdminLogin'], resolve)
    },
    {
      path: '/admin',
      name: 'layout',
      component: resolve => require(['@/pages/AdminBaseLayout/AdminBaseLayout'], resolve),
      children: [
        {
          path: 'index',
          name: 'admin-index',
          component: resolve => require(['@/components/admin-index/admin-index'], resolve)
        },
        {
          path: 'modifyPassword',
          name: 'modifyPassword',
          component: resolve => require(['@/components/admin-modifyPassword/admin-modifyPassword'], resolve)
        },
        {
          path: 'equipmentType',
          name: 'equipmentType',
          component: resolve => require(['@/components/admin-equipmentType/admin-equipmentType'], resolve)
        },
        {
          path: 'equipmentDetail',
          name: 'equipmentDetail',
          component: resolve => require(['@/components/admin-equipmentDetail/admin-equipmentDetail'], resolve)
        },
        {
          path: 'equipmentModel',
          name: 'equipmentModel',
          component: resolve => require(['@/components/admin-equipmentModel/admin-equipmentModel'], resolve)
        },
        {
          path: 'orderDetail',
          name: 'orderDetail',
          component: resolve => require(['@/components/admin-orderDetail/admin-orderDetail'], resolve)
        },
        {
          path: 'userInfoLists',
          name: 'userInfoLists',
          component: resolve => require(['@/components/admin-userInfoLists/admin-userInfoLists'], resolve)
        },
        {
          path: 'userEquipmentLists',
          name: 'userEquipmentLists',
          component: resolve => require(['@/components/admin-userEquipmentLists/admin-userEquipmentLists'], resolve)
        },
        {
          path: 'userOrderLists',
          name: 'userOrderLists',
          component: resolve => require(['@/components/admin-userOrderLists/admin-userOrderLists'], resolve)
        },
        {
          path: 'serverInfoLists',
          name: 'serverInfoLists',
          component: resolve => require(['@/components/admin-serverInfoLists/admin-serverInfoLists'], resolve)
        },
        {
          path: 'serverOrderLists',
          name: 'serverOrderLists',
          component: resolve => require(['@/components/admin-serverOrderLists/admin-serverOrderLists'], resolve)
        }
      ]
    }
  ]
})
