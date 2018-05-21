<template>
  <div class="nav">
    <div class="left" v-if="$store.state.user.roles[0].id === 1" style="cursor: pointer">
      <div class="icon-wrapper">
        <router-link to="/index">
          <img src="./icon-home.png" width="50" height="50">
        </router-link>
      </div>
      <div class="project-name">
        <router-link to="/index">
          工业监控预警系统
        </router-link>
      </div>
    </div>
    <div class="left" v-if="$store.state.user.roles[0].id === 2">
      <div class="icon-wrapper">
        <img src="./icon-home.png" width="50" height="50">
      </div>
      <div class="project-name">
        工业监控预警系统
      </div>
    </div>
    <div class="right">
      <div class="role">当前角色：{{$store.state.user.roles[0].description}}</div>
      <router-link to="/management" v-if="$store.state.user.roles[0].id === 1">
        <div class="management">仪器管理</div>
      </router-link>
      <router-link to="/history">
        <div class="record">检修记录</div>
      </router-link>
      <div class="personal-info">
        <span class="greeting">你好，<span class="name">{{$store.state.user.name}}</span></span>
        <img :src="$store.state.user.avatar" width="45" height="45" class="avatar-circle">
        <div class="info-panel" :class="{'navChange':navChange}">
          <div class="exit" @click="exit">
            <div class="icon-wrapper">
              <img src="./icon-exit.png" width="25" height="25">
            </div>
            <!--<div class="exit-bottom">退出</div>-->
          </div>
          <div class="up">
            <div class="avatar-wrapper">
              <img :src="$store.state.user.avatar" width="110" height="110">
            </div>
            <div class="user-info">
              <div class="name">{{$store.state.user.name}}</div>
              <div class="id">No:<span>{{$store.state.user.id}}</span></div>
            </div>
          </div>
          <div class="down">
            <div class="left">
              <div class="icon-wrapper">
                <img src="./icon-avatar.png">
              </div>
              <router-link to="/settings/baseInfo">
                <el-button size="middle">
                  个人设置
                </el-button>
              </router-link>
            </div>
            <div class="right">
              <div class="icon-wrapper">
                <img src="./icon-trends.png" alt="">
              </div>
              <router-link to="/userNews">
                <el-badge :value="unReadMsgNum" class="item">
                  <el-button size="middle">
                    用户动态
                  </el-button>
                </el-badge>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import User from '../../apis/User'
  import News from '../../apis/News'
  import '../../common/js/lib/sockjs.min'
  import '../../common/js/lib/stomp.min'
  import avatar_default from '../../assets/avatar_default.png'
  import Url from '../../apis/Url'
  const news = new News();
  const user = new User();
  var stompClient;
  export default {
    data() {
      return {
        unReadMsgNum:0
      }
    },
    methods: {
      exit() {
        user
          .logout()
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$router.push('/login');
              stompClient.disconnect(() => {
                console.log('stompClient disconnect');
              })
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      getUserInfo() {
        user.getUserInfo()
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              // 如果邮箱为空或者未激活则提醒用户
              if (res.data.isEmailLocked === 0 || res.data.email === '') {
                this.$notify({
                  title: '警告',
                  message: '您尚未绑定邮箱或邮箱未激活，你将无法及时收到消息推送，为了提供更好的服务，请及时绑定您的邮箱',
                  type: 'warning',
                  offset: 100
                });
              }
              this.$store.state.user = res.data;
              this.$store.state.user.avatar = res.data.avatar ? `${Url.request}${res.data.avatar}` : avatar_default;

              let subscribeAddress;
              res.data.roles[0].name === 'user' ? subscribeAddress = '/user/msg/user' : subscribeAddress = '/user/msg/maintainer';
              let socket = new SockJS('/api/webSocket');
              stompClient = Stomp.over(socket);
              stompClient.connect({username: res.data.username},
                (frame) => {
                  stompClient.subscribe(subscribeAddress, (message) => {
                    console.log('111')
                    this.$notify.info({
                      title: '消息',
                      message: JSON.parse(message.body).content,
                      offset: 100
                    });
                  });
                },
                (error) => {
                  console.log(error);
                });
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      getUnReadNum(){
        news
          .getUnReadNum()
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.unReadMsgNum = res.data;
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
    },
    props: {
      navChange: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.getUserInfo();
      this.getUnReadNum();
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/sass/mixin';
  @import '../../common/sass/variables';

  .nav {
    min-width: 1280px;
    box-sizing: border-box;
    background: $nav-index-color;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    position: relative;
    z-index: 999;
    .left, .right {
      padding: 5px 0;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
    }
    .left {
      margin-left: 44px;
      .project-name {
        color: #fff;
        font-size: 32px;
        margin-left: 35px;
        @include word-not-select();
        a {
          color: #fff;
        }
      }
    }
    .right {
      position: relative;
      .avatar-circle {
        border-radius: 50%;
      }
      .router-link-active {
        div {
          color: $nav_index-color;
          background: #fff !important;
        }
      }
      .role, .homePage, .management, .record, .personal-info {
        color: #fff;
        box-sizing: border-box;
        font-size: 18px;
        border-right: 2px solid #fff;
        padding: 25px 30px;
        cursor: pointer;
        transition: all 0.3s;
        a {
          color: #fff;
          transition: all 0.3s;
          &:hover {
            color: $nav_index-color;
          }
        }
        &:hover {
          color: $nav_index-color;
          background: rgba(255, 255, 255, 0.5);
          .info-panel {
            opacity: 1;
            pointer-events: auto !important;
          }
        }
      }
      .personal-info {
        padding: 12px 30px 11px;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        border: 0;
        transition: all 0.5s;
        z-index: 9999;
        .greeting {
          margin-right: 20px;
        }
        .info-panel {
          cursor: default;
          position: absolute;
          z-index: 9999;
          margin-top: 1px;
          width: 433px;
          height: 245px;
          top: 100%;
          right: 2px;
          border-radius: 10px;
          background-color: #fff;
          opacity: 0;
          display: flex;
          flex-flow: column;
          justify-content: center;
          transition: all 0.3s;
          pointer-events: none;
          box-shadow: 0 8px 16px 0 rgba(7, 17, 27, .2);
          &:hover {
            opacity: 1;
            pointer-events: auto !important;
          }
          &.navChange {
            top: 125%;
          }
          .exit {
            z-index: 9999;
            position: absolute;
            right: 20px;
            top: 20px;
            display: flex;
            flex-flow: column;
            justify-content: center;
            cursor: pointer;
          }
          .up, .down {
            display: flex;
            flex-flow: row;
          }
          .up {
            align-items: flex-end;
            margin-left: 30px;
            .user-info {
              margin: 0 0 30px 38px;
              color: #000;
              .name {
                font-size: 26px;
                margin-bottom: 10px;
              }
              .id {
                font-size: 16px;
              }
            }
          }
          .down {
            align-items: center;
            justify-content: center;
            position: relative;
            top: 20px;
            .left, .right {
              margin: 0 20px;
              .icon-wrapper {
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
  }
</style>
