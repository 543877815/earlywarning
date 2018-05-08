<template>
  <div class="user-info-lists">
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

<script>
  import User from '../../apis/User';

  const user = new User();
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        page: 0,
        size: 0,
        sort: 'id',
        keyword: null
      }
    },
    methods: {
      getUsersInfo(page, size, roleName, sort = this.sort, keyword = this.keyword) {
        user
          .getUsersInfo({
            page,
            size,
            sort,
            roleName,
            keyword
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.tableData = res.data.content
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
    },
    mounted() {
      this.getUsersInfo(this.page, this.size)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .user-info-lists {

  }

  .el-pagination{
    margin-top: 20px;
  }
</style>
