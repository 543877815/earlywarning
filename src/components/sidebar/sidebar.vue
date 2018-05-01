<template>
  <div class="sidebar">
    <ul class="lists">
      <li class="title"><span>设置</span></li>
      <router-link to="baseInfo">
        <li class="item" :class="{'active':this.$route.path.indexOf('baseInfo')!==-1}"><span>基本信息</span></li>
      </router-link>
      <li class="item" :class="{'active':this.$route.path.indexOf('changePassword')!==-1}" @click="changePassword">
        <span>修改密码</span>
      </li>
      <li class="item" :class="{'active':this.$route.path.indexOf('emailSetting')!==-1}" @click="emailSetting">
        <span>邮箱设置</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      changePassword() {
        window.scrollTo(0, 0);
        this.$router.push('changePassword')
      },
      emailSetting() {
        window.scrollTo(0, 0);
        this.$router.push('emailSetting');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/variables";
  @import "../../common/sass/mixin.scss";

  .sidebar {
    float: left;
    box-sizing: border-box;
    height: 100%;
    width: 20%;
    left: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    font-size: 24px;
    &::after {
      position: absolute;
      z-index: -999;
      left: 0;
      top: 0;
      width: 20%;
      height: 100%;
      content: '';
      border-right: 2px solid $sidebar-color;
    }
    .lists {
      .item, .title {
        border-bottom: 2px solid $sidebar-color;
        padding: 0 40px;
        line-height: 136px;
        height: 136px;
        box-sizing: border-box;
        color: $sidebar-color;
      }
      .title {
        @include word-not-select();
      }
      .item {
        /*transition: all 0.3s;*/
        cursor: pointer;
        color: $sidebar-color;
        &.active {
          background: $sidebar-color;
          color: #fff;
        }
        span {
          border-bottom: 3px solid rgba(0, 0, 0, 0);
          padding: 10px 0;
          transition: all 0.3s;
        }
        &:hover {
          span {
            border-bottom: 3px solid $sidebar-color;
            padding: 10px 20px;
          }
        }
      }
    }
  }
</style>
