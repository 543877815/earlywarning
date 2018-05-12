<template>
  <div class="user-equipment-lists">
    <div class="input-wrapper">
      <el-input placeholder="请输入用户ID" v-model.number="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import Equipment from '../../apis/Equipment'

  const equipment = new Equipment();

  export default {
    data() {
      return {
        tableData: [],
        page: 0,
        size: 10,
        sort: 'id',
        keyword: null
      }
    },
    methods: {
      getUserInstruments(page, size, sort, uid = null, keyWord = null) {
        equipment
          .adminGetUserInstrument({
            page,
            size,
            sort,
            uid,
            keyWord
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {

            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
    },
    mounted() {
        this.getUserInstruments(this.page, this.size, this.sort, this.uid, this.keyWord);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .input-wrapper {
    width: 500px;
    margin-bottom: 30px;
  }

  .user-equipment-lists {

  }

  .el-pagination {
    margin-top: 20px;
  }
</style>
