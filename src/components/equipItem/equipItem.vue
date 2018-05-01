<template>
  <div class="equipItem"  @click="showDetail(equipItem.id)">
    <img v-lazy="equipItem.picUrl" width="500" height="500" class="brief-img">
    <div class="equipIntro">
      <h3 class="name">{{equipItem.name}}<span class="id">ID：{{equipItem.id}}</span></h3>
      <p>种类：{{equipItem.category.name}}</p>
      <p>型号：{{equipItem.insType}}</p>
      <p>参数：{{equipItem.param}}</p>
      <p>告警阈值：{{equipItem.thresholdValue}}</p>
      <p>仪器简介：</p>
      <p class="intro">{{equipItem.description}}</p>
    </div>
    <transition name="modal">
        <modal v-show="equipItem.id === $store.state.equipment.equipDetailOnShow" :equipItem="equipItem" :wrapperClass="'equipDetail'" @hideDetail="hideDetail">
          <div class="title" slot="header">仪器详情</div>
          <div class="intro" slot="body">
            <div class="img-wrapper">
              <img v-lazy="equipItem.picUrl" width="300" height="300">
            </div>
            <div class="intro-wrapper">
              <div class="name">
                {{equipItem.name}}
                <span class="id">ID：{{equipItem.id}}</span>
              </div>
              <div class="insType">型号：{{equipItem.insType}}</div>
              <div class="param">参数：{{equipItem.param}}</div>
              <div class="detail-intro">仪器简介：{{equipItem.description}}</div>
              <div class="thresholdValue">告警阈值：{{equipItem.thresholdValue}}</div>
              <div class="present-thresholdValue">当前阈值：</div>
            </div>
          </div>
          <div class="history" slot="body">
            <div class="title">历史阈值</div>
          </div>
          <div class="others" slot="body"></div>
        </modal>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import modal from '../modal/modal'
  export default {
    props: {
      equipItem: {
        default: {},
        type: Object
      }
    },
    components:{
      modal
    },
    methods:{
      showDetail(id){
        this.$emit('hideMenu');
        this.$store.state.equipment.equipDetailOnShow = id;
        document.getElementsByTagName('body')[0].style.overflow = "hidden";
      },
      hideDetail() {
        this.$store.state.equipment.equipDetailOnShow = null;
        document.getElementsByTagName('body')[0].style.overflow = "auto";
      }
    },
    mounted(){

    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .equipItem {
    width: 500px;
    height: 500px;
    cursor: pointer;
    margin-bottom: 50px;
    position: relative;
    box-shadow: 10px 10px 50px #888888;
    overflow: hidden;
    &:hover {
      img.brief-img {
        transform: scale3d(1.05, 1.05, 1);
      }
      .equipIntro {
        transform: scale3d(1, 1, 1);
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
      }
    }
    img.brief-img {
      transform: scale3d(1, 1, 1);
      transition: all 0.3s;
    }
    .equipIntro {
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box;
      padding-top: 90px;
      color: white;
      background-color: rgba(0, 0, 0, 0);
      opacity: 0;
      transform: scale3d(1.4, 1.4, 1.1);
      transition: all 0.3s;
      .name {
        font-size: 24px;
        padding-bottom: 20px;
        border-bottom: 1px solid white;
        width: 375px;
        margin: 0 auto;
        position: relative;
        .id {
          font-size: 16px;
          position: absolute;
          right: 0;
          bottom: 5px;
        }
      }
      p {
        font-size: 20px;
        margin: 20px 0;
        &.intro {
          width: 70%;
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-height: 1.2em;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
    .modal-enter, .modal-leave-to{
      opacity: 0;
    }
    .modal-enter-to, .modal-leave{
      opacity: 1;
    }
    .modal-leave-active{
      transition: all 0.3s;
    }
    .equipDetail {
      cursor: default;
      .title {
        font-size: 18px;
        width: 100%;
      }
      .icon-wrapper {
        cursor: pointer;
      }
      .intro {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        .intro-wrapper {
          width: 568px;
          margin-left: 30px;
          .name {
            font-size: 32px;
            position: relative;
            padding-bottom: 5px;
            border-bottom: 1px solid #ccc;
            .id {
              position: absolute;
              right: 0;
              bottom: 0;
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
      .history {
        margin-top: 20px;
        margin-left: 20px;
        .title {
          font-size: 24px;
        }
      }
    }
  }
</style>
