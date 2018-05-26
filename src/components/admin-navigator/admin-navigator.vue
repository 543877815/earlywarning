<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">
      <router-link to="/admin/index">
        工业预警管理系统
      </router-link>
    </el-menu-item>
    <el-menu-item index="3" @click="logout" style="float: right;">退出</el-menu-item>
    <el-menu-item index="2" style="float: right">admin</el-menu-item>
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
      handleSelect (key, keyPath) {
      },
      logout () {
        this.$router.push('/admin/login')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
