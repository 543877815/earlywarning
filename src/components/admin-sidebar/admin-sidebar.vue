<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>管理员设置</span>
      </template>
      <router-link to="/admin/modifyPassword">
        <el-menu-item index="1-1">
          <i class="el-icon-location-outline"></i>
          <span>修改密码</span>
        </el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-phone-outline"></i>
        <span>用户管理</span>
      </template>
      <router-link to="/admin/userInfoLists">
        <el-menu-item index="2-1">
          <i class="el-icon-location-outline"></i>
          <span>用户列表</span>
        </el-menu-item>
      </router-link>
      <router-link to="/admin/userEquipmentLists">
        <el-menu-item index="2-2">
          <i class="el-icon-location-outline"></i>
          <span>用户仪器列表</span>
        </el-menu-item>
      </router-link>
      <router-link to="/admin/userOrderLists">
        <el-menu-item index="2-3">
          <i class="el-icon-location-outline"></i>
          <span>用户订单列表</span>
        </el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-service"></i>
        <span>维修人员管理</span>
      </template>
      <router-link to="/admin/serverInfoLists">
        <el-menu-item index="3-1">
          <i class="el-icon-location-outline"></i>
          <span>维修人员列表</span>
        </el-menu-item>
      </router-link>
      <router-link to="/admin/serverOrderLists">
        <el-menu-item index="3-2">
          <i class="el-icon-location-outline"></i>
          <span>维修人员订单列表</span>
        </el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>仪器管理</span>
      </template>
      <router-link to="/admin/equipmentType">
        <el-menu-item index="4-1">
          <i class="el-icon-location-outline"></i>
          <span>仪器分类管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/admin/equipmentModel">
        <el-menu-item index="4-2">
          <i class="el-icon-location-outline"></i>
          <span>仪器模板管理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/admin/equipmentDetail">
        <el-menu-item index="4-3">
          <i class="el-icon-search"></i>
          <span>仪器详情查询</span>
        </el-menu-item>
      </router-link>
    </el-submenu>
    <router-link to="/admin/orderDetail">
      <el-menu-item index="5">
        <i class="el-icon-search"></i>
        <span slot="title">订单查询</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleOpen () {

      },
      handleClose () {

      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-menu-vertical-demo {
    .el-menu {
      overflow: hidden;
      .el-menu-item {
        color: rgb(255, 255, 255) !important;
        i {
          color: #909399;
        }
      }

      .router-link-active {
        .el-menu-item {
          color: rgb(255, 208, 75) !important;
          i {
            color: rgb(255, 208, 75) !important;
          }
        }
      }
    }
  }

  .el-menu-vertical-demo /deep/ .el-submenu {
    overflow: hidden !important;
  }
</style>
