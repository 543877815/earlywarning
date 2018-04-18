<template>
  <div class="container">
    <Header :title="'修改密码'"></Header>
    <div class="content">
      <div class="left-wrapper">
        <div class="oldPassword-wrapper">
          <div class="item">旧的密码：</div>
          <div class="input">
            <input type="text" class="oldPassword">
          </div>
        </div>
        <div class="newPassword-wrapper">
          <div class="item">新的密码：</div>
          <div class="input">
            <input type="text" class="newPassword" readonly>
          </div>
        </div>
        <div class="newPassword-wrapper">
          <div class="item">确认新密码：</div>
          <div class="input">
            <input type="text" class="newPassword">
          </div>
        </div>
        <div class="change">更改密码</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../header/header'
  import {heightSetting} from "../../common/js/heightSetting";

  export default {
    data() {
      return {}
    },
    components: {
      Header
    },
    mounted() {
      document.getElementsByTagName('body')[0].className = document.getElementsByTagName('html')[0].className = 'shortPage';
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
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
