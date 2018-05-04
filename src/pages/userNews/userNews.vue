<template>
  <div class="window">
    <navIndex></navIndex>
    <div class="jumbotron">
      <div class="info">
        <div class="avatar">
          <img src="./avatar.png" width="150" height="150">
        </div>
        <div class="username">
          <div class="name">{{$store.state.user.name}}</div>
          <div class="id">No:{{$store.state.user.id}}</div>
        </div>
      </div>
    </div>
    <div class="newsList">
      <div class="newsItem" v-for="item in news">
        <div class="row">
          <div class="img-wrapper">
            <img src="./1.png" width="120" height="120">
          </div>
          <div class="info-wrapper">
            <div class="name">{{news.name}}</div>
            <div class="status">状态：维修完毕</div>
            <div class="time">时间：2018-04-01 19:00:00</div>
          </div>
        </div>
        <div class="operate">
          <div class="button" @click="showDetail">查看</div>
        </div>
      </div>
    </div>
    <transition name="modal">
      <modal :wrapperClass="'recordDetail'" v-if="modalShow" @hideDetail="hideDetail">
        <div class="title" slot="header">详情</div>
        <el-steps :space="200" :active="2" finish-status="success" slot="body" align-center>
          <el-step title="等待确认" description="2018-04-05 15:22:19"></el-step>
          <el-step title="维修人员接单" description="2018-04-05 15:22:19"></el-step>
          <el-step title="正在维修" description="2018-04-05 15:22:19"></el-step>
          <el-step title="维修完成" description="2018-04-05 15:22:19"></el-step>
        </el-steps>
        <div class="info" slot="body">
          <div class="title el-icon-setting"> 单号详情</div>
          <div class="detail">
            <div class="number">工单号：23232626262626</div>
            <div class="crew">维修人员：张风啸</div>
            <div class="contact">维修人员联系方式：543877815@qq.com</div>
            <div class="track">
              <div class="left">单号跟踪：</div>
              <div class="right">
                <div class="item">
                  <div class="time">2018-03-08 14:00:00</div>
                  <div class="event">仪器告警</div>
                </div>
                <div class="item">
                  <div class="time">2018-03-08 14:00:00</div>
                  <div class="event">仪器告警</div>
                </div>
                <div class="item">
                  <div class="time">2018-03-08 14:00:00</div>
                  <div class="event">仪器告警</div>
                </div>
              </div>
            </div>
            <div class="status">当前状态：正在维修</div>
          </div>
        </div>
        <div class="intro" slot="body">
          <div class="title el-icon-setting"> 仪器详情</div>
          <div class="wrapper">
            <div class="img-wrapper">
              <img src="/static/loading-svg" width="300" height="300">
            </div>
            <div class="intro-wrapper">
              <div class="name">
                仪器名字
                <span class="id">仪器id</span>
              </div>
              <div class="insType">型号：型号</div>
              <div class="param">参数：参数</div>
              <div class="detail-intro">仪器简介：仪器简介</div>
              <div class="thresholdValue">告警阈值：告警阈值</div>
              <div class="present-thresholdValue">当前阈值：</div>
            </div>
          </div>
        </div>
      </modal>
    </transition>
    <Footer></Footer>
    <showControl :right="50" :bottom="60"></showControl>
  </div>
</template>

<script type="text/ecmascript-6">
  import navIndex from '../../components/nav_index/nav_index'
  import showControl from '../../components/showControl/showControl'
  import modal from '../../components/modal/modal'
  import Footer from '../../components/footer/footer'
  import News from '../../apis/News'

  const news = new News();
  export default {
    data() {
      return {
        modalShow: false,
        news: {
          content: '',
          createTime: 0,
          data: 0,
          id: 0,
          mechineId: 19,
          orderId: 0,
          read: false,
          thresholdValue: 10,
          uid: 5
        },

        page: 0,
        size: 0,
        sort: ''
      }
    },
    components: {
      navIndex,
      showControl,
      Footer,
      modal
    },
    methods: {
      showDetail() {
        this.modalShow = true;
      },
      hideDetail() {
        this.modalShow = false;
      },
      getMessages(page, size) {
        news
          .getMessages({
            page,
            size
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success'){
              this.news = res.data.content;
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
    },

    mounted() {
      document.getElementsByTagName('body')[0].className = document.getElementsByTagName('html')[0].className = 'longPage'
      this.getMessages(this.page, this.size)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  $circle-diameter: 40px;
  $border-left-width: 8px;
  .window {
    .jumbotron {
      height: 250px;
      z-index: 10;
      display: flex;
      flex-flow: column;
      justify-content: flex-end;
      position: relative;
      background: url("background.jpg") center bottom no-repeat;
      .info {
        width: 60%;
        margin: 20px auto 0;
        display: flex;
        flex-flow: row;
        align-items: flex-end;
        .avatar {
          position: relative;
          top: 30px;
        }
        .username {
          color: #fff;
          margin: 0 0 10px 20px;
          .name {
            font-size: 24px;
            margin-bottom: 8px;
          }
          .id {
          }
        }
      }
    }
    .newsList {
      z-index: 10;
      width: 60%;
      margin: 100px auto 150px;
      position: relative;
      left: 7%;
      display: flex;
      flex-flow: column;
      border-left: $border-left-width solid #d7d7d7;
      &::after {
        content: '';
        position: absolute;
        width: $circle-diameter;
        height: $circle-diameter;
        border-radius: 50%;
        background-color: #4f8cd2;
        left: -($circle-diameter/2) - ($border-left-width/2);
        top: -($circle-diameter/2);
        z-index: 9999;
      }
      &::before {
        content: '';
        position: absolute;
        width: $circle-diameter;
        height: $circle-diameter;
        border-radius: 50%;
        background-color: #dcdedf;
        left: -($circle-diameter/2) - 4px;
        bottom: -($circle-diameter/2);
        z-index: 9999;
      }
      .newsItem {
        z-index: 10;
        display: flex;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
        margin-left: 40px;
        padding: 20px 0;
        border-bottom: 3px solid #dcdedf;
        background-color: hsla(0, 0%, 100%, .75);
        transition: all 0.3s;
        position: relative;
        border-radius: 10px;
        &::after {
          content: '';
          position: absolute;
          width: $circle-diameter;
          height: $circle-diameter;
          border-radius: 50%;
          background-color: #dcdedf;
          left: -($circle-diameter/2) - 4px - 40px;
          top: -($circle-diameter/2);
          z-index: 9999;
          transition: all 0.3s;
        }
        &:hover {
          transform: translate3d(-40px, 0, 0);
          background-color: hsla(0, 0%, 100%, 1);
          &::after {
            transform: translate3d(40px, 0, 0)
          }
        }
        > div {
          display: flex;
          flex-flow: row;
          align-items: flex-end;
          .img-wrapper {
            background-color: #fff;
            margin-left: 50px;
            border-radius: 50%;
            border: 2px solid black;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .info-wrapper {
            margin-left: 40px;
            .name {
              color: #4f8cd2;
              font-size: 24px;
              margin-bottom: 20px;
            }
            .status {
              margin-bottom: 10px;
            }
            .time {
              margin-bottom: 10px;
            }
          }
        }
        .operate {
          background-color: #dcdedf;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 10px;
          color: #4f8cd2;
          margin-right: 30px;
        }
      }
    }
    .modal-enter, .modal-leave-to {
      opacity: 0;
    }
    .modal-enter-to, .modal-leave {
      opacity: 1;
    }
    .modal-leave-active {
      transition: all 0.3s;
    }
    .recordDetail {
      .el-steps {
        box-sizing: border-box;
      }
      .info {
        margin-top: 20px;
        margin-left: 20px;
        display: flex;
        flex-flow: column;
        padding-bottom: 30px;
        border-bottom: 1px solid #e5e5e5;
        .title {
          font-size: 24px;
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #e5e5e5;
        }
        .detail {
          display: flex;
          flex-flow: column;
          .number, .crew, .contact, .track {
            margin-bottom: 10px;
          }
          .track {
            display: flex;
            flex-flow: row;
            .right {
              .item {
                margin-bottom: 5px;
                display: flex;
                flex-flow: row;
              }
            }
          }
        }
      }
      .intro {
        margin-top: 30px;
        margin-left: 20px;
        display: flex;
        flex-flow: column;
        .title {
          font-size: 24px;
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid #e5e5e5;
        }
        .wrapper {
          margin-top: 10px;
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          .intro-wrapper {
            margin-left: 20px;
            width: 568px;
            .name {
              font-size: 32px;
              position: relative;
              padding-bottom: 2px;
              .id {
                position: absolute;
                left: 130px;
                bottom: 0px !important;
                font-size: 16px;
                padding-right: 10px;
                bottom: 5px;
              }
            }
            .insType, .param, .detail-intro, .thresholdValue, .present-thresholdValue {
              margin: 8px 0;
            }
            .detail-intro {
              line-height: 1.2em;
            }
          }
        }
      }
    }
  }
</style>
