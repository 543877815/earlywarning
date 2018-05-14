<template>
  <div class="user-equipment-lists">
    <div class="input-wrapper">
      <el-input :placeholder="!uid?'请输入用户ID':uid" v-model.number="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="仪器名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="category.name"
        label="仪器类型"
        width="180">
      </el-table-column>
      <el-table-column
        width="180"
        label="创建日期">
        <template slot-scope="scope">
          {{ scope.row.time | timeParse }}
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
      @current-change="currentChange"
      :total="total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import Equipment from '../../apis/Equipment'

  const equipment = new Equipment();
  export default {
    data() {
      return {
        input: '',
        tableData: [],
        total: 10,
        page: 0,
        size: 10,
        sort: 'id',
        keyword: null
      }
    },
    methods: {
      currentChange(val) {
        this.page = val - 1;
        this.getUserInstruments(this.page, this.size, this.sort, this.uid, this.keyWord);
      },
      search() {

      },
      viewDetail(index, scopeRow){
        this.$router.push(`/admin/equipmentDetail?id=${scopeRow.id}`)
      },
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
              this.tableData = res.data.content;
              this.total = res.data.totalElements;
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
    },
    mounted() {
      this.uid = this.$route.query.uid;
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
