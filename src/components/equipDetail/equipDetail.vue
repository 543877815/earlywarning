<template>
  <div class="equipDetail">
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="title">仪器详情</div>
            <div class="icon-wrapper" @click.stop.prevent="hideDetail">
              <img src="./close.png" width="15" height="15">
            </div>
          </div>
          <div class="modal-body">
            <div class="intro">
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
            <div class="history">
              <div class="title">历史阈值</div>
            </div>
            <div class="others"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      equipItem: {
        default: {},
        type: Object
      }
    },
    methods: {
      hideDetail() {
        this.$store.state.equipment.equipDetailOnShow = null;
        document.getElementsByTagName('body')[0].style.overflow = "auto";
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .equipDetail {
    cursor: default;
    .modal {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 99999;
      background-color: rgba(0, 0, 0, 0.5);
      overflow-y: auto;
      overflow-x: hidden;
      .modal-dialog {
        position: relative;
        margin: 30px auto;
        width: 900px;
        height: 1200px;
        border-radius: 6px;
        .modal-content {
          height: 1200px;
          border: 1px solid rgba(0, 0, 0, .2);
          background-color: #fff;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
          border-radius: 6px;
          outline: 0;
          .modal-header {
            padding: 15px;
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            border-bottom: 1px solid #e5e5e5;
            .title {
              font-size: 18px;
              width: 100%;
            }
            .icon-wrapper {
              cursor: pointer;
            }
          }
          .modal-body {
            padding: 15px;
            .intro {
              display: flex;
              flex-flow: row;
              justify-content: space-between;
              border-bottom: 1px solid #ccc;
              .intro-wrapper {
                width: 568px;
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
            .history{
              margin-top: 20px;
              margin-left: 20px;
              .title{
                font-size: 24px;
              }
            }
          }
        }
      }
    }
  }
</style>
