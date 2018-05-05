<template>
  <div class="admin-login">
    <el-container class="container">
      <el-header>管理员登录</el-header>
      <el-main>
        <el-form-item label="活动名称">
        <el-input
          placeholder="请输入用户名"
          v-model="username"
          clearable>
        </el-input>
        </el-form-item>
        <el-input
          placeholder="请输入密码"
          v-model="password"
          clearable>
        </el-input>
      </el-main>
    </el-container>
    <showControl :right="50" :bottom="115"></showControl>
  </div>
</template>

<script type="text/ecmascript-6">
  import showControl from '../../components/showControl/showControl'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    components: {
      showControl
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .admin-login {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .el-container {
      width: 500px;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      top: 35%;
      z-index: 999;
      border-radius: 10px;
      box-shadow: darkgrey 10px 10px 30px 5px;
      overflow: hidden;
      transform: translate(-50%);
      .el-header {
        background-color: #0090f7;
        text-align: center;
        color: #ffffff;
        font-size: 28px;
        height: 50px !important;
        line-height: 50px;
      }
    }
  }

</style>
