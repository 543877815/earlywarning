<template>
  <div class="addEquip-wrapper" :style="{bottom: bottom+'px', right: right+'px'}" @click="showTypes">
    <img src="./plus.png" width="34" height="30">
    <transition name="modal">
      <Modal :wrapperClass="'messagebox'" v-if="messageBox" @hideDetail="hideTypes">
        <div class="title" slot="header">创建仪器类型</div>
        <div slot="body" class="radio">
          <el-radio v-model="radio" label="1" border>备选项1</el-radio>
          <el-radio v-model="radio" label="2" border>备选项2</el-radio>
          <el-radio v-model="radio" label="3" border>备选项2</el-radio>
          <el-radio v-model="radio" label="4" border>备选项2</el-radio>
          <el-radio v-model="radio" label="5" border>备选项2</el-radio>
          <el-radio v-model="radio" label="6" border>备选项2</el-radio>
          <el-radio v-model="radio" label="7" border>备选项2</el-radio>
          <el-radio v-model="radio" label="8" border>备选项2</el-radio>
        </div>
        <button class="btn btn-primary" slot="footer" @click.prevent.stop="showTemplate">confirm</button>
      </Modal>
    </transition>
    <transition name="modal">
      <Modal :wrapperClass="'Equiptemplate'" v-if="template" @hideDetail="hideTemplate">
        <div class="title" slot="header">仪器详情</div>
        <div class="intro" slot="body">
          <div class="img-wrapper">
            <img src="/src/assets/logo.png" width="300" height="300">
          </div>
          <div class="intro-wrapper">
            <div class="name">
              仪器名称
              <span class="id">ID：</span>
            </div>
            <div class="insType">型号：</div>
            <div class="param">参数：</div>
            <div class="detail-intro">仪器简介：</div>
            <div class="thresholdValue">告警阈值：</div>
            <div class="present-thresholdValue">当前阈值：</div>
          </div>
        </div>
        <button class="btn btn-primary" slot="footer" @click="hideTemplate">submit</button>
      </Modal>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import Modal from '../../components/modal/modal'

  export default {
    data() {
      return {
        messageBox: false,
        template: false,
        radio: '1',
      }
    },
    components: {
      Modal
    },
    props: {
      right: {
        type: Number,
        default: 0
      },
      bottom: {
        type: Number,
        default: 0
      }
    },
    methods: {
      showTypes() {
        this.messageBox = true;
        document.getElementsByTagName('body')[0].style.overflow = "hidden";

      },
      hideTypes() {
        this.messageBox = false;
        document.getElementsByTagName('body')[0].style.overflow = "auto";

      },
      showTemplate(){
        this.messageBox = false;
        this.template = true;
        document.getElementsByTagName('body')[0].style.overflow = "hidden";

      },
      hideTemplate(){
        this.template = false;
        document.getElementsByTagName('body')[0].style.overflow = "auto";

      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .addEquip-wrapper {
    border-radius: 50%;
    position: fixed;
    right: 50px;
    bottom: 70px;
    background-color: #2d8cf0;
    z-index: 9999;
    height: 42px;
    width: 42px;
    text-align: center;
    cursor: pointer;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .messagebox {
      .modal {
        .modal-dialog {
          top: 50%;
          transform: translateY(-50%);
          margin: 0 auto;
          width: 550px;
          .radio {
            display: flex;
            flex-flow: row;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            .el-radio {
              margin: 5px;
            }
          }
        }
      }
    }
    .Equiptemplate {
      text-align: left;
      cursor: default;
      .modal{
        .modal-dialog{
          margin: 0 auto;
          top: 30%;
          transform: translateY(-50%);
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

    }
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  .addEquip-wrapper {
    border-radius: 50%;
    position: fixed;
    right: 50px;
    bottom: 70px;
    background-color: #2d8cf0;
    z-index: 9999;
    height: 42px;
    width: 42px;
    text-align: center;
    cursor: pointer;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
</style>
