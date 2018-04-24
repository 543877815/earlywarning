<template>
  <div class="el_table">
    <div class="table">
      <h2>流体仪表</h2>
      <div class="split"></div>
      <el-table
        :data="tableData4"
        style="width: 100%"
        max-height="700">
        <el-table-column
          fixed
          prop="date"
          label="仪器名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="id"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="型号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="告警阈值"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="简介"
          width="300">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table">
      <h2>流体仪表</h2>
      <div class="split"></div>
      <el-table
        :data="tableData4"
        style="width: 100%"
        max-height="700">
        <el-table-column
          fixed
          prop="date"
          label="仪器名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="id"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="型号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="告警阈值"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="简介"
          width="300">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <transition name="modal">
      <Modal :wrapperClass="'EquipEdit'" v-if="EquipEdit" @hideDetail="hideEdit">
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
        <button class="btn btn-primary" slot="footer" @click="hideEdit">submit</button>
      </Modal>
    </transition>

  </div>
</template>

<script>
  import Modal from '../../components/modal/modal'
  export default {
    components:{
      Modal
    },
    methods: {
      hideEdit(){
        this.EquipEdit = false;
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.EquipEdit = true;
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    data() {
      return {
        EquipEdit: false,
        tableData4: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .el_table {
    margin-bottom: 100px;
    .table {
      margin-top: 50px;
      .split {
        width: 100%;
        height: 4px;
        background: linear-gradient(left, #000, #fff);
      }
      h2 {
        padding-left: 10px;
        box-sizing: border-box;
        font-size: 28px;
        margin-bottom: 10px;
      }
    }
    .EquipEdit {
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
