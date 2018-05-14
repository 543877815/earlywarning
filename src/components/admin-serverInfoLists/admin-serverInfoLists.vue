<template>
  <div class="server-info-lists">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="ID"
        width="180">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
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
    <div class="addEquip-wrapper" @click.prevent.stop="showModal">
      <img src="../../assets/plus.png" width="34" height="30">
    </div>
    <transition name="modal">
      <Modal :wrapperClass="'addMaintainer'" v-if="addMaintainerModal" @hideDetail="hideAll">
        <div class="title" slot="header">添加维修人员</div>
        <div slot="body" class="radio">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="重复密码">
              <el-input v-model="form.repeatPassword" type=""></el-input>
            </el-form-item>
          </el-form>
        </div>
        <button class="btn btn-primary" slot="footer" @click.prevent.stop="addMaintainer">添加</button>
      </Modal>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import User from '../../apis/User'
  import Modal from '../modal/modal'

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
        total: 10,
        addMaintainerModal: false,
        form: {
          username: '',
          password: '',
          repeatPassword: ''
        }
      }
    },
    components: {
      Modal
    },
    methods: {
      addMaintainer() {
        if (!this.form.username) {
          this.$message.error('用户名为空');
          return;
        }
        if (!this.form.password || !this.form.repeatPassword) {
          this.$message.error('密码为空');
          return;
        }
        if (this.form.password !== this.form.repeatPassword) {
          this.$message.error('两次密码输入不一致');
          return;
        }
        if (!/^.*[a-zA-Z]+.*$/.test(this.form.password) ||
          !/^.*[0-9]+.*$/.test(this.form.password) ||
          !/^.*[/^/$/.//,;:'!@#%&/*/|/?/+/(/)/[/\]/{/}]+.*$/.test(this.form.password) ||
          this.form.password.length <= 5 ||
          this.form.password.length >= 17) {
          this.$message.error('密码必须包含数字、字母、特殊字符三种,长度属于6-16位之间');
          return;
        }
        user
          .createMaintainer({
            username: this.form.username,
            password: this.form.password
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`维修人员 ${this.form.username} 创建成功！`)
              this.form.username = this.form.password = this.form.repeatPassword = '';
              this.hideAll();
              this.getUsersInfo(this.page, this.size)
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      hideAll() {
        this.addMaintainerModal = false;
      },
      showModal() {
        this.addMaintainerModal = true
      },
      handleCurrentChange(val) {
        this.page = val - 1
        this.getUsersInfo(this.page, this.size)
      },
      viewOrderList(index, scopeRow) {
        console.log(scopeRow.id);
        this.$router.push({path: '/admin/serverOrderLists', query: {uid: scopeRow.id}});
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
    mounted() {
      this.getUsersInfo(this.page, this.size)
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .addMaintainer /deep/ .modal {
    .modal-dialog {
      top: 50% !important;
      transform: translateY(-50%);
      margin: 0 auto;
      width: 550px;
      .radio {
        margin: 20px 10px 0;
        display: flex;
        flex-flow: column;
        .el-radio {
          margin: 5px;
        }
      }
    }
  }

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

  .server-info-lists {

  }

  .el-pagination {
    margin-top: 20px;
  }
</style>
