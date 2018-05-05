<template>
  <div id="particles-js" class="windows" ref="particlesJs">
    <navigation></navigation>
    <panel ref="Panel"
           @login="login"
           @register="register"
           :verCodeUrl="verCodeUrl"
           :loginIsActive="loginIsActive"
           :BaseUrl="BaseUrl"
           @changeToLogin="changeToLogin"></panel>
    <showControl :right="50" :bottom="60"></showControl>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navigation from '../../components/login-nav/login-nav';
  import showControl from '../../components/showControl/showControl';
  import panel from '../../components/login-panel/login-panel';
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
      login(username, password, verCodeOrPassword) {
        if (username === '') {
          this.$message.error('用户名为空');
          return;
        }
        if (password === '') {
          this.$message.error('密码为空');
          return;
        }
        if (verCodeOrPassword === '') {
          this.$message.error('验证码为空');
          return;
        }
        user
          .userLogin({
            username: username,
            password: password,
            verCode: verCodeOrPassword
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success('登录成功！');
              if (res.data.roles[0].name === 'user') {
                this.$router.push('/index');
              }else if(res.data.roles[0].name === 'admin'){
                this.$router.push('/')
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      register(username, password, verCodeOrPassword) {
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
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success('注册成功！');
              this.changeToLogin(true);
              this.$refs.Panel.activeChange('login');
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
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

  .windows {
    /*background: url("../../assets/bg-login.jpg") no-repeat center center;*/
    background-size: cover;
    background-size: 100% 100%;

    #footer {
      background-color: #4a96c5;
    }
  }

</style>

