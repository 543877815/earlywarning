<template>
  <div class="addEquip-wrapper" :style="{bottom: bottom+'px', right: right+'px'}" @click.prevent.stop="showTypes">
    <img src="./plus.png" width="34" height="30">
    <transition name="modal">
      <Modal :wrapperClass="'EquipmentType'" v-if="messageBox" @hideDetail="hideAll">
        <div class="title" slot="header">仪器类型</div>
        <div slot="body" class="radio">
          <el-radio v-model="radio" :label="item.id" v-for="(item, index) in $store.state.equipment.equipTypes" border
                    size="medium" :key="item.name">{{item.name}}
          </el-radio>
        </div>
        <button class="btn btn-primary" slot="footer" @click.prevent.stop="showTemplateList">确定</button>
      </Modal>
    </transition>
    <transition name="modal">
      <Modal :wrapperClass="'EquiptemplateList'" v-if="templateList" @hideDetail="hideAll">
        <div class="title" slot="header">模板列表</div>
        <el-table
          highlight-current-row
          @current-change="handleCurrentChange"
          :data="tableData"
          style="width: 100%"
          slot="body">
          <el-table-column
            prop="id"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="仪器名称"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, scope.row)"
                type="text"
                size="small">
                选中
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination slot="body"
          background
          layout="prev, pager, next"
          :total="100">
        </el-pagination>
        <button class="btn btn-primary" slot="footer" @click="showTemplate">确定</button>
      </Modal>
    </transition>
    <transition name="modal">
      <Modal :wrapperClass="'Equiptemplate'" v-if="template" @hideDetail="hideAll">
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
        <button class="btn btn-primary" slot="footer" @click="hideTemplate">创建</button>
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
        templateList: false,
        radio: 1,
        tableData: [{
          id: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentRow: null
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
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      showTypes() {
        this.messageBox = true;
        document.getElementsByTagName('body')[0].style.overflow = "hidden";

      },
      hideAll() {
        this.messageBox =
          this.template =
            this.templateList = false;
        document.getElementsByTagName('body')[0].style.overflow = "auto";
      },
      hideTypes() {
        this.messageBox = false;
        document.getElementsByTagName('body')[0].style.overflow = "auto";
      },
      showTemplate() {
        this.template = true;
        this.templateList = false;
        this.$emit('getModelInstrumentByCid', this.radio);
      },
      hideTemplate() {
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
    .EquipmentType {
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
    .EquiptemplateList{
      .modal-dialog {
        top: 50%;
        transform: translateY(-50%);
        margin: 0 auto;
        width: 550px;
        text-align: left;
        cursor: default;
        .el-pagination{
          margin-top: 20px;
        }
      }
    }
    .Equiptemplate {
      text-align: left;
      cursor: default;
      .modal {
        .modal-dialog {
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
