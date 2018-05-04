<template>
  <div class="el_table">
    <div class="table">
      <h2>流体仪表</h2>
      <div class="split"></div>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="700">
        <el-table-column
          fixed
          prop="id"
          label="ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="仪器名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="insType"
          label="型号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="thresholdValue"
          label="告警阈值"
          width="120">
        </el-table-column>
        <el-table-column
          prop="description"
          label="简介"
          width="260">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <transition name="modal">
      <Modal :wrapperClass="'EquipEdit'" v-if="$store.state.equipment.equipOnShow" @hideDetail="hideEdit">
        <div class="title" slot="header">仪器详情</div>
        <div class="intro" slot="body">
          <div class="img-wrapper">
            <img :src="form.picUrl" width="300" height="300">
            <input type="file" accept="*image/*" @click.stop="addImg($event)">
          </div>
          <div class="intro-wrapper">
            <div class="name">
              <input type="text" :placeholder="$store.state.equipment.equipOnShowItem.name" v-model="form.name">
              <span class="id">ID：{{$store.state.equipment.equipOnShowItem.id}}</span>
            </div>
            <div class="insType">型号：
              <input type="text" :placeholder="$store.state.equipment.equipOnShowItem.insType" v-model="form.insType">
            </div>
            <div class="param">参数：
              <input type="text" :placeholder="$store.state.equipment.equipOnShowItem.param" v-model="form.param">
            </div>
            <div class="maturity">使用年限：
              <input type="text" :placeholder="$store.state.equipment.equipOnShowItem.durableYears"
                     v-model="form.durableYears">
            </div>
            <div class="detail-intro">仪器简介：
              <textarea cols="60" rows="10" :placeholder="$store.state.equipment.equipOnShowItem.description"
                        v-model="form.description"></textarea>
            </div>
            <div class="thresholdValue">告警阈值：
              <input type="number" :placeholder="$store.state.equipment.equipOnShowItem.thresholdValue"
                     v-model.number="form.thresholdValue">
            </div>
          </div>
        </div>
        <button class="btn btn-primary" slot="footer" @click="hideEdit">修改</button>
      </Modal>
    </transition>
  </div>
</template>

<script>
  import Modal from '../../components/modal/modal'

  export default {
    data() {
      return {
        EquipEdit: false,
        currentPage: 1,
        currentRow: null,
        form: {
          name: '',
          insType: '',
          param: '',
          durableYears: '',
          description: '',
          picUrl: '',
          thresholdValue: ''
        }
      }
    },
    props: {
      tableData: {
        default: [],
        type: Array
      },
      total:{
        default: 100,
        type: Number
      }
    },
    components: {
      Modal
    },
    methods: {
      handleCurrentChange(val) {
        this.$emit('CurrentChange', val)
      },
      hideEdit() {
        this.$emit('modifyInstrument',this.$store.state.equipment.equipOnShowItem.id, this.form);
        this.$store.state.equipment.equipOnShow = false;
      },
      handleEdit(index, scpoeRow) {
        this.$store.state.equipment.equipOnShow = true;
        this.$store.state.equipment.equipOnShowItem = scpoeRow;
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/components/equipmentModal';

  .el_table {
    margin-bottom: 100px;
    .table {
      min-height: 620px;
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
      .cell {
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .block {
      margin-top: 30px;
      .el-pagination {
        display: flex;
        flex-flow: row;
        justify-content: center;
      }
    }
    .EquipEdit {
      @include equipmentModal();
    }
  }
</style>
