<template>
  <div class="equipment-type">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="item.name" :name="item.id.toString()" v-for="item in equipmentTypes"
                   :key="item.name"></el-tab-pane>
    </el-tabs>
    <template>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="160">
          <template slot-scope="scope">{{ scope.row.time | timeParse}}</template>
        </el-table-column>
        <el-table-column
          prop="insType"
          label="型号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="param"
          label="参数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="durableYears"
          label="使用年限"
          width="100">
        </el-table-column>
        <el-table-column
          prop="thresholdValue"
          label="告警阈值"
          width="100">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
      </el-table>
    </template>
    <div class="addEquip-wrapper" @click.prevent.stop="showModal">
      <img src="../../assets/plus.png" width="34" height="30">
    </div>
    <transition name="modal">
      <Modal :wrapperClass="'EquipmentModal'" v-if="CreateEquipmentModal" @hideDetail="hideAll">
        <div class="title" slot="header">创建模板仪器</div>
        <el-form ref="form" :model="newEquipmentForm" label-width="80px" slot="body">
          <el-form-item label="仪器类型">
            <div class="radio">
              <el-radio v-model="newEquipmentForm.radio" :label="item.id" v-for="(item, index) in equipmentTypes" border
                        size="medium" :key="item.name">{{item.name}}
              </el-radio>
            </div>
          </el-form-item>
          <el-form-item label="仪器名称">
            <el-input v-model="newEquipmentForm.name"></el-input>
          </el-form-item>
          <el-form-item label="仪器型号">
            <el-input v-model="newEquipmentForm.insType"></el-input>
          </el-form-item>
          <el-form-item label="仪器参数">
            <el-input v-model="newEquipmentForm.param"></el-input>
          </el-form-item>
          <el-form-item label="使用年限">
            <el-input v-model="newEquipmentForm.durableYears"></el-input>
          </el-form-item>
          <el-form-item label="告警阈值">
            <el-input v-model.number="newEquipmentForm.thresholdValue" type="number"></el-input>
          </el-form-item>
          <el-form-item label="仪器描述">
            <el-input type="textarea" v-model="newEquipmentForm.description"></el-input>
          </el-form-item>
        </el-form>
        <button class="btn btn-primary" slot="footer" @click.prevent.stop="createEquipment">创建</button>
      </Modal>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from '../modal/modal'
  import Equipment from '../../apis/Equipment'

  const equipment = new Equipment();
  export default {
    data() {
      return {
        CreateEquipmentModal: false,
        newEquipmentForm: {
          radio: 1,
          name: '',
          insType: '',
          param: '',
          durableYears: '',
          thresholdValue: '',
          description: ''
        },
        activeName: '1',
        equipmentTypes: [],
        tableData: [],
        page: 0,
        size: 0,
        cid: 0,
        sort: 'id'
      };
    },
    components: {
      Modal
    },
    methods: {
      createEquipment() {
        for (let key in this.newEquipmentForm) {
          if (!this.newEquipmentForm[key]) {
            this.$message.error(`输入不能为空！`)
            return;
          }
        }
        equipment
          .createInstrument({
            cid: this.newEquipmentForm.radio,
            name: this.newEquipmentForm.name,
            insType: this.newEquipmentForm.insType,
            param: this.newEquipmentForm.param,
            durableYears: this.newEquipmentForm.durableYears,
            thresholdValue: this.newEquipmentForm.thresholdValue,
            description: this.newEquipmentForm.description
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`仪器模板 ${this.newEquipmentForm.name} 创建成功！`)
              this.hideAll();
              this.getCategories()
              for (let key in this.newEquipmentForm) {
                key === 'radio' ? this.newEquipmentForm[key] = 1 : this.newEquipmentForm[key] = ''
              }
              this.activeName = '1';
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      showModal() {
        this.CreateEquipmentModal = true
      },
      hideAll() {
        this.CreateEquipmentModal = false
      },
      handleClick(tab, event) {
        this.page = 0
        this.getModelInstrumentByCid(this.page, this.size, tab.name);
      },
      getCategories() {
        equipment
          .getCategories()
          .then((res) => {
            this.equipmentTypes = res.data;
            this.getModelInstrumentByCid(this.page, this.size, this.equipmentTypes[0].id)
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      getModelInstrumentByCid(page, size = this.size, cid, sort = this.sort) {
        equipment
          .getModelInstrumentByCid({
            page,
            size,
            cid,
            sort
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.tableData = res.data.content;
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
    },
    filters: {
      timeParse: function (date) {
        let newDate = new Date(date),
          year = newDate.getFullYear(),
          month = newDate.getMonth().toString().length == 1 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1,
          day = newDate.getDate().toString().length == 1 ? `0${newDate.getDate()}` : newDate.getDate(),
          hour = newDate.getHours().toString().length == 1 ? `0${newDate.getHours()}` : newDate.getHours(),
          minute = newDate.getMinutes().toString().length == 1 ? `0${newDate.getMinutes()}` : newDate.getMinutes(),
          second = newDate.getSeconds().toString().length == 1 ? `0${newDate.getSeconds()}` : newDate.getSeconds();
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      },
    },
    mounted() {
      this.getCategories()
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/sass/components/modal-transition';

  @include modal-transition;
  .addEquip-wrapper {
    border-radius: 50%;
    position: fixed;
    right: 50px;
    bottom: 85px;
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

  .equipment-model {

  }

  .EquipmentModal /deep/ .modal {
    .modal-dialog {
      top: 50% !important;
      transform: translateY(-50%);
      margin: 0 auto;
      width: 700px !important;
      .el-form {
        margin: 0 12px 0;
        .radio {
          display: flex;
          flex-flow: row;
          flex-wrap: wrap;
          .el-radio {
            margin: 5px;
          }
        }
      }
    }
  }
</style>
