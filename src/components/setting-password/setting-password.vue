<template>
  <div class="container">
    <Header :title="'修改密码'"></Header>
    <div class="content">
      <div class="left-wrapper">
        <div class="oldPassword-wrapper">
          <div class="item">旧的密码：</div>
          <div class="input">
            <input type="password" class="oldPassword" v-model="oldPassword">
          </div>
        </div>
        <div class="newPassword-wrapper">
          <div class="item">新的密码：</div>
          <div class="input">
            <input type="password" class="newPassword" v-model="newPassword">
          </div>
        </div>
        <div class="newPassword-wrapper">
          <div class="item">确认新密码：</div>
          <div class="input">
            <input type="password" class="newPassword" v-model="newPasswordRepeat">
          </div>
        </div>
        <div class="change" @click="changePassword">更改密码</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../header/header'
  import {heightSetting} from "../../common/js/heightSetting";
  import User from '../../apis/User';

  const user = new User();

  export default {
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: ''
      }
    },
    components: {
      Header
    },
    methods: {
      changePassword() {
        if (!this.oldPassword || !this.newPassword || !this.newPasswordRepeat) {
          this.$message.error(`输入不能为空！`);
          return;
        }
        if (this.newPassword !== this.newPasswordRepeat) {
          this.$message.error('两次输入密码不一致！')
          return;
        }
        if (!/^.*[a-zA-Z]+.*$/.test(this.newPassword) ||
          !/^.*[0-9]+.*$/.test(this.newPassword) ||
          !/^.*[/^/$/.//,;:'!@#%&/*/|/?/+/(/)/[/\]/{/}]+.*$/.test(this.newPassword) ||
          this.newPassword.length <= 5 ||
          this.newPassword.length >= 17) {
          this.$message.error('密码必须包含数字、字母、特殊字符三种,长度属于6-16位之间');
          return;
        }
        console.log('222')
        user
          .updatePassword({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`修改密码成功！`)
            } else {
              this.$message.error(`提示：${res.msg}`);
            }
            console.log(res);
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
    },
    mounted() {
      document.getElementsByTagName('body')[0].className = document.getElementsByTagName('html')[0].className = 'shortPage';
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/variables";

  .container {
    .content {
      margin-top: 50px;
      display: flex;
      flex-flow: column;
      .left-wrapper {
        width: $setting-container-left-wrapper-width;
        .oldPassword-wrapper, .newPassword-wrapper {
          display: flex;
          flex-flow: column;
          justify-content: flex-start;
          .item {
            font-size: 22px;
            margin-bottom: 15px;
            color: $nav_index-color;
          }
          .input {
            height: 50px;
            width: 100%;
            margin-bottom: 30px;
            input {
              height: 100%;
              width: 100%;
              box-sizing: border-box;
              background-color: #e2e5e4;
              border-radius: 20px;
              padding-left: 20px;
              outline: 0;
            }
          }
        }
        .change {
          margin-top: 50px;
          font-size: 22px;
          color: #fff;
          background-color: $nav_index-color;
          width: 100px;
          border-radius: 10px;
          padding: 10px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
</style>
