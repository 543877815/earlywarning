<template>
  <div class="container">
    <Header :title="'邮箱设置'"></Header>
    <div class="content">
      <div class="left-wrapper">
        <div class="presentEmail-wrapper">
          <div class="item">当前邮箱：</div>
          <div class="input">
            <input type="text" class="presentEmail" readonly
                   :placeholder="`${$store.state.user.email||''} ${$store.getters.isEmailLocked}`">
            <div class="unlock" @click="unlockEmail" v-if="$store.state.user.isEmailLocked === 'LOCKED'">去激活</div>
          </div>
        </div>
        <div class="newEmail-wrapper">
          <div class="item">新的邮箱：</div>
          <div class="input">
            <input type="text" class="newEmail" v-model="email">
            <div class="change" @click.stop.prevent="updateEmail">
              更改邮箱
              <span class="tips el-icon-back" v-show="activeTips">点击此处以激活</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from '../header/header'
import User from '../../apis/User'

const user = new User()

export default {
    data () {
      return {
        email: '',
        activeTips: false
      }
    },
    components: {
      Header
    },
    methods: {
      unlockEmail () {
        this.email = this.$store.state.user.email
        this.activeTips = true
      },
      updateEmail () {
        if (!this.email || !/^[0-9A-Za-z\-_.]+@[0-9A-Za-z\-_]+(\.[0-9A-Za-z\-_]+)+$/.test(this.email)) {
          this.$message.error('邮箱有误')
          return
        }
        user
          .updateEmail({
            email: this.email
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`邮箱发送成功！`)
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      }
    },
    mounted () {
      this.$nextTick(() => {
        document.getElementsByTagName('body')[0].className = document.getElementsByTagName('html')[0].className = 'shortPage'
      })
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
            .unlock {
              position: absolute;
              right: 30px;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
            }
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
          position: relative;
          .tips {
            position: absolute;
            cursor: text;
            font-size: 14px;
            color: black;
            width: 100%;
            line-height: 64px;
            height: 100%;
            left: 100%;
            top: 0;
          }
        }
      }
    }
  }

</style>
