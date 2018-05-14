<template>
  <div class="server-order-lists">
    <div class="input-wrapper">
      <el-input :placeholder="!uid?'请输入维修人员ID':uid" v-model.number="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="工单号"
        width="180">
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.createTime | timeParse }}
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        label="订单状态">
        <template slot-scope="scope">
          {{ scope.row.maintainStatus | maintainStatus }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="viewDetail(scope.$index, scope.row)">查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import Order from '../../apis/Order'

  const order = new Order();

  export default {
    data() {
      return {
        uid: 0,
        input: '',
        tableData: [],
        page: 0,
        size: 10,
        sort: 'id',
        keyword: null,
        total: 0
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val - 1;
        this.getOrderList(this.page, this.size, this.sort, this.uid, this.status);
      },
      viewDetail(index, scopeRow) {
        this.$router.push(`/admin/orderDetail?id=${scopeRow.id}`)
      },
      search() {
        this.page = 0;
        this.uid = this.input;
        this.getOrderList(this.page, this.size, this.sort, this.uid)
      },
      getOrderList(page, size, sort, uid = null, status = null) {
        if (!uid) {
          order
            .getOrderList({
              page,
              size,
              sort
            })
            .then((res) => {
              if (res.ret === 200 && res.msg === 'success') {
                this.tableData = res.data.content;
                this.total = res.data.totalElements;
              }
            })
            .catch((err) => {
              this.$message.error(`[系统提醒: ${err.msg}]`);
            });
        } else {
          order
            .adminGetOrderList({
              page,
              size,
              sort,
              uid,
              status
            })
            .then((res) => {
              if (res.ret === 200 && res.msg === 'success') {
                if (res.data) {
                  this.tableData = res.data.content;
                  this.total = res.data.totalElements;
                } else {
                  this.tableData = [];
                  this.total = 0;
                }
              }
            })
            .catch((err) => {
              this.$message.error(`[系统提醒: ${err.msg}]`);
            });
        }
      }
    },
    mounted() {
      this.uid = this.$route.query.uid;
      this.getOrderList(this.page, this.size, this.sort, this.uid, this.status);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .back {
    margin-bottom: 30px !important;
  }

  .input-wrapper {
    width: 500px;
    margin-bottom: 30px;
  }

  .server-order-lists {

  }

  .el-pagination {
    margin-top: 20px;
  }
</style>
