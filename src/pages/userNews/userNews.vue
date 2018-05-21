<template>
  <div class="window">
    <navIndex></navIndex>
    <div class="jumbotron">
      <div class="info">
        <div class="avatar">
          <img :src="$store.state.user.avatar" width="150" height="150" class="avatar-circle">
        </div>
        <div class="username">
          <div class="name">{{$store.state.user.name}}</div>
          <div class="id">No:{{$store.state.user.id}}</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div style="margin-bottom: 20px">
        <el-button @click="toggleSelection(tableData)">全部选择</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button v-if="!disable" @click="setMessageRead">标记已读</el-button>
        <el-button disabled v-if="disable">标记已读</el-button>
        <el-button @click="setAllMessageRead">全部标记为已读</el-button>
      </div>
      <el-table
        class="newsList"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="消息内容"
          width="500">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column
          label="发生时间"
          width="210">
          <template slot-scope="scope">{{ scope.row.createTime | timeParse}}</template>
        </el-table-column>
        <el-table-column
          label="消息状态"
          width="120">
          <template slot-scope="scope">{{ scope.row.read | readStatus}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="viewDetail(scope.$index, scope.row)">查看详情
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="currentChange"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <transition name="modal">
      <modal :wrapperClass="'recordDetail'" v-if="modelShow" @hideDetail="hideDetail">
        <div class="title" slot="header">详情</div>
        <el-steps :space="200" :active="orderData.maintainStatus" finish-status="success" slot="body" align-center>
          <el-step title="等待确认"></el-step>
          <el-step title="维修人员接单"></el-step>
          <el-step title="正在维修"></el-step>
          <el-step title="维修完成"></el-step>
        </el-steps>
        <div class="info" slot="body">
          <div class="title el-icon-setting"> 单号详情</div>
          <div class="detail">
            <div class="number">工单号：{{orderData.id}}</div>
            <div class="crew" v-if="orderData.maintainer">维修人员：{{orderData.maintainer.name ||
              orderData.maintainer.username}}
            </div>
            <div class="contact" v-if="orderData.maintainer">维修人员联系方式：{{orderData.maintainer.email}}</div>
            <div class="track">
              <div class="left">单号跟踪：</div>
              <div class="right">
                <div class="item">
                  <div class="time" v-if="orderData.createTime">{{orderData.createTime | timeParse}}</div>
                  <div class="event"> 仪器告警</div>
                </div>
                <div class="item" v-if="orderData.confirmTime">
                  <div class="time">{{orderData.confirmTime | timeParse}}</div>
                  <div class="event"> 维修人员接单</div>
                </div>
                <div class="item" v-if="orderData.fixTime">
                  <div class="time">{{orderData.fixTime | timeParse}}</div>
                  <div class="event"> 维修人员开始维修</div>
                </div>
                <div class="item" v-if="orderData.finishTime">
                  <div class="time">{{orderData.finishTime | timeParse}}</div>
                  <div class="event"> 维修完成</div>
                </div>
              </div>
            </div>
            <div class="status">当前状态：{{orderData.maintainStatus | equipStatus}}</div>
          </div>
        </div>
        <div class="intro" slot="body">
          <div class="title el-icon-setting">仪器详情</div>
          <div class="wrapper">
            <div class="img-wrapper">
              <img src="/static/loading-svg" width="300" height="300">
            </div>
            <div class="intro-wrapper">
              <div class="name">
                {{orderData.instrument.name}}
                <span class="id">{{orderData.instrument.id}}</span>
              </div>
              <div class="type">仪器类型：{{orderData.instrument.category.name}}</div>
              <div class="insType">型号：{{orderData.instrument.insType}}</div>
              <div class="param">参数：{{orderData.instrument.param}}</div>
              <div class="createTime">创建时间：{{orderData.instrument.time | timeParse}}</div>
              <div class="durableYears">使用年限：{{orderData.instrument.durableYears}}</div>
              <div class="detail-intro">仪器简介：{{orderData.instrument.description}}</div>
              <div class="thresholdValue">告警阈值：告警阈值</div>
              <div class="present-thresholdValue">当前阈值：当前阈值</div>
            </div>
          </div>
        </div>
      </modal>
    </transition>
    <Footer></Footer>
    <showControl :right="50" :bottom="60"></showControl>
  </div>
</template>

<script type="text/ecmascript-6">
  import navIndex from '../../components/navigator/navigator'
  import showControl from '../../components/showControl/showControl'
  import modal from '../../components/modal/modal'
  import Footer from '../../components/footer/footer'
  import News from '../../apis/News'
  import Order from '../../apis/Order'

  const news = new News();
  const order = new Order();
  export default {
    data() {
      return {
        modelShow: false,
        page: 0,
        size: 0,
        sort: 'id',
        total: 100,
        tableData: [],
        multipleSelection: [],
        orderData: {
          id: 0,
          maintainStatus: 0,
          createTime: 0,
          confirmTime: 0,
          fixTime: 0,
          finishTime: 0,
          instrument: {
            description: "",
            durableYears: "",
            id: 1,
            insType: "",
            name: "",
            param: "",
            time: 0,
            maintainer: {
              username: "",
              id: "",
              email: "",
              isEmailLocked: 0,
              description: "",
              name: "",
              avatar: "",
            },
            category: {
              description: "",
              id: 1,
              name: ""
            }
          }
        },
      }
    },
    components: {
      navIndex,
      showControl,
      Footer,
      modal
    },
    methods: {
      handleDelete(index, scopeRow) {
        var intIds = [scopeRow.id];
        this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          news
            .deleteMessage({
              intIds
            })
            .then((res) => {
              if (res.ret === 200 && res.msg === 'success') {
                this.$message.success(`删除成功！`);
                this.getMessages(this.page, this.size)
              }
            })
            .catch((err) => {
              this.$message.error(`[系统提醒: ${err.msg}]`);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      currentChange(val) {
        this.page = val - 1;
        this.getMessages(this.page, this.size)
      },
      getOrderDetail(id) {
        order
          .getOrderDetail({
            id
          })
          .then((res) => {
            this.orderData = res.data;
            this.modelShow = true
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      viewDetail(index, scopeRow) {
        this.$confirm(scopeRow.content, '消息详情', {
          confirmButtonText: '查看订单详情',
          cancelButtonText: '取消',
        }).then(() => {
          this.getOrderDetail(scopeRow.orderId)
        }).catch(() => {

        });
      },
      setAllMessageRead() {
        news
          .setAllMessageRead()
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success('标记成功！')
              this.getMessages(this.page, this.size)
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      setMessageRead() {
        var intIds = []
        this.multipleSelection.forEach((item) => {
          intIds.push(item.id);
        })
        news
          .setMessageRead({
            intIds
          })
          .then((res) => {
            console.log(res);
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success('标记成功！')
              this.getMessages(this.page, this.size)
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      showDetail() {
        this.modelShow = true;
      },
      hideDetail() {
        this.modelShow = false;
      },
      getMessages(page, size) {
        news
          .getMessages({
            page,
            size
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
      document.getElementsByTagName('body')[0].className = document.getElementsByTagName('html')[0].className = 'longPage'
      this.getMessages(this.page, this.size)
    },
    computed: {
      disable: function () {
        let disable;
        this.multipleSelection.length === 0 ? disable = true : disable = false;
        return disable
      }
    },
    filters: {
      equipStatus: function (val) {
        switch (val) {
          case 0:
            return '等待确认';
          case 1:
            return '维修人员接单';
          case 2:
            return '正在维修';
          case 3:
            return '维修完成'
        }
      },
      timeParse: function (date) {
        let newDate = new Date(date),
          year = newDate.getFullYear(),
          month = newDate.getMonth().toString().length === 1 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1,
          day = newDate.getDate().toString().length === 1 ? `0${newDate.getDate()}` : newDate.getDate(),
          hour = newDate.getHours().toString().length === 1 ? `0${newDate.getHours()}` : newDate.getHours(),
          minute = newDate.getMinutes().toString().length === 1 ? `0${newDate.getMinutes()}` : newDate.getMinutes(),
          second = newDate.getSeconds().toString().length === 1 ? `0${newDate.getSeconds()}` : newDate.getSeconds();
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      },
      readStatus: function (read) {
        let stauts;
        read ? stauts = '已读' : stauts = '未读';
        return stauts
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/components/equipmentOrder";
  @import '../../common/sass/components/modal-transition';

  $circle-diameter: 40px;
  $border-left-width: 8px;
  .window {
    .jumbotron {
      height: 250px;
      z-index: 3;
      display: flex;
      flex-flow: column;
      justify-content: flex-end;
      position: relative;
      background: url("background.jpg") center bottom no-repeat;
      .info {
        width: 60%;
        margin: 20px auto 0;
        display: flex;
        flex-flow: row;
        align-items: flex-end;
        .avatar {
          position: relative;
          z-index: 2;
          top: 30px;
          .avatar-circle {
            z-index: 2;
            border-radius: 50%;
          }
        }
        .username {
          color: #fff;
          margin: 0 0 10px 20px;
          .name {
            font-size: 24px;
            margin-bottom: 8px;
          }
          .id {
          }
        }
      }
    }
    .container {
      width: 60% !important;
      margin: 100px auto 180px;
      position: relative;
      z-index: 3;
    }
    .el-table /deep/ .cell {
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
      overflow: hidden !important;
    }
    .el-table {
      min-height: 260px;
      z-index: 10;
      display: flex;
      flex-flow: column;
      border-left: $border-left-width solid #d7d7d7;
    }
    .el-pagination {
      margin-top: 30px;
      display: flex;
      flex-flow: row;
      justify-content: center;
    }

    @include modal-transition;
    .recordDetail {
      @include equipmentOrder
    }
  }
</style>

<style>
  .el-message-box__message p {
    text-indent: 2em !important;
  }
</style>
