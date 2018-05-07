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
        <i class="el-icon-setting"></i>
        <span>管理员设置</span>
      </template>
      <router-link to="/admin/modifyPassword"><el-menu-item index="1-1">修改密码</el-menu-item></router-link>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>仪器管理</span>
      </template>
      <router-link to="/admin/equipmentType"><el-menu-item index="1-2">仪器分类</el-menu-item></router-link>
    </el-submenu>
  </el-menu>
</template>

<script type="text/ecmascript-6">
    export default {
      data(){
        return {
          activeIndex: '1',
        };
      },
      methods:{
        handleOpen(){

        },
        handleClose(){

        }
      }
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-menu-vertical-demo{
    width: 15%;
    height: 100%;
  }
</style>
