<template>
  <div class="admin-login">
    <el-container class="container">
      <el-header>管理员登录</el-header>
      <el-main>
        <el-form ref="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input
              placeholder="请输入用户名"
              v-model="username"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="password"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input
              placeholder="请输入验证码"
              v-model="verCode"
              clearable>
            </el-input>
            <img :src="verCodeSrc" width="112" height="40" class="vercode" @click="getVerCode">
          </el-form-item>
          <div class="login">
            <el-button
              type="primary"
              @click="login">登录
            </el-button>
          </div>
        </el-form>
      </el-main>
    </el-container>
    <showControl :right="50" :bottom="30"></showControl>
  </div>
</template>

<script type="text/ecmascript-6">
  import showControl from '../../components/showControl/showControl'
  import User from '../../apis/User'

  const user = new User()
export default {
    data () {
      return {
        verCodeSrc: '/api/getVerCode',
        username: 'admin',
        password: '123aaa.',
        verCode: 'd'
      }
    },
    components: {
      showControl
    },
    methods: {
      login () {
        if (!this.username) {
          this.$message.error('用户名为空')
          return
        }
        if (!this.password) {
          this.$message.error('密码为空')
          return
        }
        if (!this.verCode) {
          this.$message.error('验证码为空')
          return
        }
        user
          .userLogin({
            username: this.username,
            password: this.password,
            verCode: this.verCode
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`登陆成功！`)
              this.$router.push('/admin/index')
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      },
      getVerCode () {
        let temp = this.verCodeSrc
        this.verCodeSrc = `${temp}?time=${Math.random()}`
      }
    }
  }
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
      top: 25%;
      z-index: 999;
      border-radius: 10px;
      box-shadow: darkgrey 10px 10px 30px 5px;
      overflow: hidden;
      transform: translate(-50%);
      .el-header {
        background-color: #0090f7;
        text-align: center;
        color: #ffffff;
        font-size: 24px;
        height: 50px !important;
        line-height: 50px;
      }
      .el-main {
        .el-form-item {
          &:last-child {
            margin-bottom: 0;
          }
          &:first-child {
            margin-top: 30px;
          }
          .vercode {
            cursor: pointer;
            position: absolute;
            right: 0px;
            top: 50%;
            transform: translate3d(0, -50%, 0);
          }
        }
        .login {
          display: flex;
          flex-flow: row;
          justify-content: center;
        }
      }
    }
  }

</style>
