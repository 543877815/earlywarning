<template>
  <div class="user-info-lists">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="uid"
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
          {{ scope.row.isLocked | userStatus }}
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
          {{ scope.row.isEmailLocked | emailStatus }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">查看仪器列表
          </el-button>
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
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import User from '../../apis/User';

  const user = new User();
  export default {
    data() {
      return {
        tableData: [],
        page: 0,
        size: 10,
        roleName: 'user',
        sort: 'id',
        keyWord: null,
        total: 10
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val
        this.getUsersInfo(this.page, this.size)
      },
      viewOrderList(index, scopeRow) {
        this.$router.push({path: '/admin/userOrderLists', query:{uid:scopeRow.id}});
      },
      handleEdit() {

      },
      handleDelete() {

      },
      getUsersInfo(page, size, roleName = this.roleName, sort = this.sort, keyWord = this.keyWord) {
        user
          .getUsersInfo({
            page,
            size,
            sort,
            roleName,
            keyWord
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.tableData = res.data.content;
              this.tableData.numberOfElements = res.data.numberOfElements;
              this.total = res.data.totalElements;
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
    },
    mounted() {
      this.getUsersInfo(this.page, this.size)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .user-info-lists {

  }

  .el-pagination {
    margin-top: 20px;
  }
</style>
