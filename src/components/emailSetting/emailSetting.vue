<template>
  <div class="container">
    <Header :title="'邮箱设置'"></Header>
    <div class="content">
      <div class="left-wrapper">
        <div class="presentEmail-wrapper">
          <div class="item">当前邮箱：</div>
          <div class="input">
            <input type="text" class="presentEmail" readonly placeholder="543877815@qq.com">
          </div>
        </div>
        <div class="newEmail-wrapper">
          <div class="item">新的邮箱：</div>
          <div class="input">
            <input type="text" class="newEmail">
            <div class="change">更改邮箱</div>
          </div>
        </div>
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
      this.$nextTick(() => {
        document.getElementsByTagName('body')[0].className = document.getElementsByTagName('html')[0].className = 'shortPage';
      })
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
        .presentEmail-wrapper, .newEmail-wrapper {
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
            position: relative;
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
