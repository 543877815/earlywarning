<template>
  <div class="panel" :class="{register:!loginIsActive}" v-if="!forgetPassword">
    <div class="header">
      <div class="title">
        <div class="login" ref="login" :class="{ 'active': loginIsActive }" @click="loginActive">普通登录</div>
        <div class="register" ref="register" :class="{ 'active': !loginIsActive }" @click="registerActive">用户注册</div>
      </div>
      <div class="line" ref="line" :style="{transform:`translate3d(${lineLeft}px, 0, 0)`}"></div>
    </div>
    <div class="content">
      <div class="username-wrapper">
        <div class="icon-wrapper">
          <img src="./icon_username.jpg" width="40px" height="40px">
        </div>
        <div class="input-wrapper">
          <input type="text" placeholder="用户名" ref="usernameInput">
        </div>
      </div>
      <div class="password-wrapper">
        <div class="icon-wrapper">
          <img src="./icon_password.jpg" width="40px" height="40px">
        </div>
        <div class="input-wrapper">
          <input type="text" placeholder="用户密码" ref="passwordInput">
          <div class="forgetPassword" v-show="loginIsActive" @click="forgetPasswordActive">忘记密码？</div>
        </div>
      </div>
      <transition name="vercode">
        <div class="vercode-wrapper">
          <div class="icon-wrapper">
            <img src="./icon_vercode.jpg" width="40px" height="40px">
          </div>
          <div class="input-wrapper">
            <input type="text" :placeholder="loginIsActive ? '验证码' : '邮箱'" ref="verCodeInput">
            <img src="./vercode.jpg" alt="" width="112" height="50" class="vercode" v-show="loginIsActive">
          </div>
        </div>
      </transition>
    </div>
    <div class="footer">
      <div class="loginOrRegister" @click="LoginOrRegister">{{loginIsActive ? '登录' : '注册'}}</div>
    </div>
  </div>
  <div class="panel forgetPassword" v-else>
    <div class="header">
      <div class="title">
        <div class="resetPassword active" ref="resetPassword">重置密码</div>
      </div>
      <div class="line" ref="line" :style="{transform:`translate3d(${lineLeft}px, 0, 0)`}"></div>
      <div class="desc">
        Enter your email and we will send you a link to reset your password.
      </div>
    </div>
    <div class="content">
      <div class="input-wrapper">
        <input type="text" placeholder="Enter your email address">
      </div>
    </div>
    <div class="footer">
      <div class="button-wrapper">
        <div class="return" @click="returnLogin">返回</div>
        <div class="submit">发送</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const offset = 15;
  const delay = 600;
  export default {
    data() {
      return {
        lineLeft: 240,
        loginIsActive: true,
        forgetPassword: false
      }
    },
    methods: {
      /**
       * returnLogin and forgetPasswordActive use to switch between page login and page forgetPassword
       */
      returnLogin() {
        this.forgetPassword = false;
        this.$nextTick(() => {
          this.lineControl();
        })
      },
      forgetPasswordActive() {
        this.forgetPassword = true;
        this.$nextTick(() => {
          this.lineControl();
        })
      },
      /**
       *  loginActive and registerActive use to switch between page login and page register
       */
      loginActive() {
        this.loginIsActive = true;
        this.lineLeft = this.$refs.login.offsetLeft - (this.$refs.line.offsetWidth - this.$refs.login.offsetWidth) / 2 - offset;
        this.inputEmpty();
        let timer = setTimeout(() => {
          this.lineControl();
          clearTimeout(timer);
        }, delay);
      },
      registerActive() {
        this.loginIsActive = false;
        this.lineLeft = this.$refs.register.offsetLeft - (this.$refs.line.offsetWidth - this.$refs.register.offsetWidth) / 2 + offset;
        this.inputEmpty();
        let timer = setTimeout(() => {
          this.lineControl();
          clearTimeout(timer);
        }, delay);
      },
      inputEmpty() {
        this.$refs.usernameInput.value = this.$refs.passwordInput.value = this.$refs.verCodeInput.value = '';
      },
      /**
       *  use to control line position
       */
      lineControl() {
        if (!this.forgetPassword) {
          if (this.loginIsActive) {
            this.lineLeft = this.$refs.login.offsetLeft - (this.$refs.line.offsetWidth - this.$refs.login.offsetWidth) / 2;
          } else {
            this.lineLeft = this.$refs.register.offsetLeft - (this.$refs.line.offsetWidth - this.$refs.register.offsetWidth) / 2;
          }
        } else {
          this.lineLeft = this.$refs.resetPassword.offsetLeft - (this.$refs.line.offsetWidth - this.$refs.resetPassword.offsetWidth) / 2;
        }
      },

      LoginOrRegister() {
        if (this.loginIsActive) {
          this.$router.push('/index');
        } else {

        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.lineControl();
      })
    },
    computed: {},
    mounted() {
      window.onresize = () => {
        this.lineControl();
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/variables";

  .panel {
    z-index: 9999;
    height: 65%;
    width: 37.5%;
    min-height: 550px;
    min-width: 480px;
    margin: 8% auto 0;
    /*background: #fff;*/
    /*background-color: rgba(255, 255, 255, 0);*/
    box-shadow: darkgrey 10px 10px 30px 5px;
    position: relative;
    display: flex;
    flex-flow: column;
    &.register, &.forgetPassword {
      /*height: 50%;*/
    }
    .header {
      margin-top: 10%;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      .title {
        display: flex;
        flex-flow: row;
        justify-content: center;
        font-size: 26px;
        .login, .register {
          cursor: pointer;
          margin: 0 60px;
        }
        .active {
          color: $nav_login-color;
        }

      }
      .line {
        width: 150px;
        height: 3px;
        background-color: $nav_login-color;
        margin-top: 26px;
        transition: all 0.5s ease-out;
      }
      .desc {
        width: 60%;
        line-height: 1.5em;
        font-size: 20px;
        margin: 20px auto 0;
      }
    }
    .content {
      margin-top: 7.3%;
      display: flex;
      flex-flow: column;
      .username-wrapper, .password-wrapper, .vercode-wrapper {
        width: 100%;
        position: relative;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        .input-wrapper {
          position: relative;
          width: 68%;
          margin: 16px 0 16px 20px;
        }
        input {
          font-size: 20px;
          border: 2px solid darkgray;
          height: 58px;
          padding-left: 25px;
          border-radius: 50px;
          width: calc(100% - 25px);
          outline: 0;
        }
      }
      .password-wrapper {
        .forgetPassword {
          z-index: 9999;
          cursor: pointer;
          position: absolute;
          right: 0;
          top: 120%;
        }
      }
      .vercode-wrapper {
        .vercode {
          cursor: pointer;
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translate3d(0, -50%, 0);
        }
      }

      & > .input-wrapper {
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        input {
          font-size: 20px;
          height: 58px;
          width: 60%;
          border: 2px solid darkgray;
          padding-left: 20px;
          border-radius: 50px;
          margin: 0 auto;
          outline: 0;
        }
      }
    }
    .footer {
      text-align: center;
      margin-top: 26px;
      .loginOrRegister {
        border: 2px solid $nav_login-color;
        height: 51px;
        line-height: 51px;
        width: 39%;
        margin: 0 auto;
        background-color: $nav_login-color;
        border-radius: 10px;
        font-size: 28px;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
      }
      .button-wrapper {
        display: flex;
        flex-flow: row;
        width: 60%;
        margin: 65px auto 0;
        justify-content: space-around;
        align-items: center;
        .submit, .return {
          font-size: 24px;
          text-align: center;
          height: 50px;
          line-height: 50px;
          padding: 0 40px;
          border-radius: 10px;
          color: #fff;
          background-color: $nav_login-color;
          cursor: pointer;
          border: 2px solid $nav_login-color;
        }
      }
      .loginOrRegister, .submit, .return {
        transition: all 0.3s;
        &:hover {
          color: $nav_login-color;
          background-color: #fff;
        }
      }
    }

  }
</style>
