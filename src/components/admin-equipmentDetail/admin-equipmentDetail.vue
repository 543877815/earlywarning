<template>
  <div class="equipment-detail">
    <el-input placeholder="请输入仪器ID" v-model.number="input">
      <el-button slot="append" icon="el-icon-search" @click="getEquipmentDetail"></el-button>
    </el-input>
    <el-form ref="form" :model="equipment" label-width="80px" slot="body">
      <el-form-item label="仪器名称">
        <el-input v-model="equipment.name"></el-input>
      </el-form-item>
      <el-form-item label="仪器类型">
        <el-input v-model="equipment.category.name"></el-input>
      </el-form-item>
      <el-form-item label="仪器型号">
        <el-input v-model="equipment.insType"></el-input>
      </el-form-item>
      <el-form-item label="仪器参数">
        <el-input v-model="equipment.param"></el-input>
      </el-form-item>
      <el-form-item label="使用年限">
        <el-input v-model="equipment.durableYears"></el-input>
      </el-form-item>
      <el-form-item label="告警阈值">
        <el-input v-model="equipment.thresholdValue"></el-input>
      </el-form-item>
      <el-form-item label="仪器描述">
        <el-input type="textarea" v-model="equipment.description"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import Equipment from '../../apis/Equipment'

  const equipment = new Equipment();
  export default {
    data() {
      return {
        input: 0,
        equipment: {
          name: '',
          category: {
            name: ''
          },
          insType: '',
          param: '',
          durableYears: '',
          thresholdValue: '',
          description: ''
        }
      }
    },
    methods: {
      getEquipmentDetail() {
        this.getInstrumentById(this.input);
      },
      getInstrumentById(id) {
        equipment
          .getInstrumentById({
            id
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.equipment = res.data;
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-input {
    width: 500px !important;
  }

  .el-form {
    width: 600px !important;
    margin-top: 100px;
  }
</style>
