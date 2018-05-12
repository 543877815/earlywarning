<template>
  <div class="server-info-lists">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.isLocked | Status }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        label="邮箱状态"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.isEmailLocked | Status }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="viewOrderList(scope.$index, scope.row)">查看订单列表
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import User from '../../apis/User'
  const user = new User();
  export default {
    data() {
      return {
        tableData: [],
        page: 0,
        size: 10,
        roleName: 'maintainer',
        sort: 'id',
        keyword: null,
        total:10
      }
    },
    methods:{
      handleCurrentChange(val){
        this.page = val
        this.getUsersInfo(this.page, this.size)
      },
      viewOrderList(index, scopeRow) {
        console.log(scopeRow.id);
        this.$router.push({path: '/admin/serverOrderLists', query:{uid:scopeRow.id}});
      },
      getUsersInfo(page, size, roleName = this.roleName, sort = this.sort, keyword = this.keyword) {
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
              this.total = res.data.totalElements
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
    },
    filters: {
      Status: function (value) {
        let status;
        value === 0 ? status = '未激活' : status = '已激活';
        return status
      }
    },
    mounted(){
      this.getUsersInfo(this.page, this.size)
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .server-info-lists {

  }

  .el-pagination {
    margin-top: 20px;
  }
</style>
