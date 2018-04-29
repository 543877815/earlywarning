<template>
  <div id="particles-js" class="windows" ref="particlesJs">
    <navigation></navigation>
    <panel ref="Panel"
           @login="login"
           @register="register"
           :verCodeUrl="verCodeUrl"
           :BaseUrl="BaseUrl"
           :loginIsActive="loginIsActive"
           @changeToLogin="changeToLogin"></panel>
    <showControl :right="50" :bottom="60"></showControl>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navigation from '../../components/nav_login/nav_login';
  import showControl from '../../components/showControl/showControl';
  import panel from '../../components/panel/panel';
  import Footer from '../../components/footer/footer'
  import User from '../../apis/User';
  import BaseUrl from '../../apis/BaseUrl';

  const user = new User();

  export default {
    data() {
      return {
        BaseUrl: BaseUrl,
        verCodeUrl: '/api/getVerCode',
        username: null,
        password: null,
        email: null,
        verCode: null,
        loginIsActive: true,

      }
    },
    components: {
      navigation,
      panel,
      showControl,
      Footer
    },
    mounted() {
      document.getElementsByTagName('body')[0].className = document.getElementsByTagName('html')[0].className = 'shortPage';
    },
    methods: {
      changeToLogin(msg) {
        this.loginIsActive = msg;
      },
      login() {
        console.log('login')
      },
      register(username, password, verCodeOrPassword) {
        console.log(username === '');
        if (username === '') {
          this.$message.error('用户名为空');
          return;
        }
        if (password === '' || verCodeOrPassword === '') {
          this.$message.error('密码为空');
          return;
        }
        if (password !== verCodeOrPassword) {
          this.$message.error('两次密码输入不一致');
          return;
        }
        if (!/^.*[a-zA-Z]+.*$/.test(password) ||
          !/^.*[0-9]+.*$/.test(password) ||
          !/^.*[/^/$/.//,;:'!@#%&/*/|/?/+/(/)/[/\]/{/}]+.*$/.test(password) ||
          password.length <= 5 ||
          password.length >= 17) {
          this.$message.error('密码必须包含数字、字母、特殊字符三种,长度属于6-16位之间');
          return;
        }
        user
          .userRegister({
            username: username,
            password: password
          })
          .then((res) => {
            if (res.ret === 200) {
              this.$message.success('注册成功！');
              this.changeToLogin(true);
              this.$refs.Panel.activeChange('login');
            } else {
              this.$message.error(res.msg);
            }
          })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  body, html {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    max-width: 1856px;
    min-width: 1280px;
    min-height: 800px;
    padding: 0;
    margin: 0;
    position: relative;
  }

  .windows {
    position: relative;
    width: 100%;
    height: 100%;

    .particles-js-canvas-el {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 1;
    }
  }
</style>


<style lang="scss" rel="stylesheet/scss" scoped>
  .windows {
    /*background: url("../../assets/bg-login.jpg") no-repeat center center;*/
    background-size: cover;
    background-size: 100% 100%;
  }

  .windows /deep/ #footer {
    background-color: #4a96c5;
  }
</style>
