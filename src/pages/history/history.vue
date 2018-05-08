<template>
  <div class="window">
    <navIndex></navIndex>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所有工单" name="-1"></el-tab-pane>
        <el-tab-pane label="等待处理" name="0"></el-tab-pane>
        <el-tab-pane label="已处理" name="1"></el-tab-pane>
        <el-tab-pane label="正在维修" name="2"></el-tab-pane>
        <el-tab-pane label="维修完成" name="3"></el-tab-pane>
      </el-tabs>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="工单"
          width="180">
        </el-table-column>
        <el-table-column
          prop="instrument.name"
          label="仪器名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="instrument.id"
          label="仪器编号"
          width="240">
        </el-table-column>
        <el-table-column
          label="维修人员"
          width="100">
          <template slot-scope="scope">{{ scope.row.maintainer.name || scope.row.maintainer.username}}</template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">{{ scope.row.maintainStatus | equipStatus}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看
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
            <div class="crew" v-if="orderData.maintainer">维修人员：{{orderData.maintainer.name || orderData.maintainer.username}}</div>
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
    <scrollToY :right="50" :bottom="115"></scrollToY>
    <showControl :right="50" :bottom="60"></showControl>
    <Footer :position="'relative'"></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navIndex from '../../components/navigator/navigator'
  import showControl from '../../components/showControl/showControl'
  import Footer from '../../components/footer/footer'
  import scrollToY from '../../components/scrollToY/scrollToY'
  import Header from '../../components/header/header'
  import Order from '../../apis/Order'
  import modal from '../../components/modal/modal'

  const order = new Order();

  export default {
    data() {
      return {
        activeName: '-1',
        tableData: [],
        total: 10,
        page: 0,
        size: 10,
        sort: 'id',
        modelShow: false,
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
      };
    },
    components: {
      navIndex,
      showControl,
      Footer,
      scrollToY,
      Header,
      modal
    },
    methods: {
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
      currentChange(val) {
        this.page = val;
        this.activeName === '-1' ?
          this.getOrderList(this.page, this.size) :
          this.getOrderByStatus(this.page, this.size, this.activeName)
      },
      handleClick() {
        this.page = 0;
        this.activeName === '-1' ?
          this.getOrderList(this.page, this.size) :
          this.getOrderByStatus(this.page, this.size, this.activeName)
      },
      handleEdit(index, scopeRow) {
        this.getOrderDetail(scopeRow.id)
        console.log(index, scopeRow.id);
      },
      handleDelete(index, row) {
        // console.log(index, row);
      },
      hideDetail() {
        this.modelShow = false;
      },
      getOrderByStatus(page, size, status, sort = this.sort) {
        order
          .getOrderByStatus({
            page,
            size,
            status,
            sort
          })
          .then((res) => {
            this.tableData = res.data.content;
            this.total = res.data.totalElements;
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      getOrderList(page, size, sort = this.sort) {
        order
          .getOrderList({
            page,
            size,
            sort,
          })
          .then((res) => {
            this.tableData = res.data.content;
            this.total = res.data.totalElements;
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
    },
    filters: {
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
    },
    mounted() {
      this.getOrderList(this.page, this.size);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/components/equipmentOrder";
  @import "../../common/sass/components/modal-transition";

  .window {
    position: relative;
    z-index: 9999;
    .container {
      width: 60%;
      margin: 100px auto 150px;
      min-height: 610px;
      display: flex;
      flex-flow: column;
      .el-pagination {
        align-self: center;
      }
    }

    .el-pagination {
      margin-top: 30px;
    }

    @include modal-transition;

    .recordDetail {
      @include equipmentOrder;
    }
  }
</style>
