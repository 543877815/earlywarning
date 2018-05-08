<template>
  <div class="order-detail">
    <el-input placeholder="请输入仪器ID" v-model.number="input">
      <el-button slot="append" icon="el-icon-search" @click="getOrder"></el-button>
    </el-input>
    <el-form ref="form" :model="order" label-width="80px" slot="body">

    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import Order from '../../apis/Order'

  const order = new Order();

  export default {
    data() {
      return {
        input: 0,
        order: {}
      }
    },
    methods: {
      getOrder() {
        this.getOrderDetail(this.input)
      },
      getOrderDetail(id) {
        order
          .getOrderDetail({
            id
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {

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
