<template>
  <div class="window">
    <navIndex></navIndex>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有工单" name="first">
        <el-table
          :data="tableData3"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="工单"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="仪器名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="仪器编号"
            width="240">
          </el-table-column>
          <el-table-column
            prop="address"
            label="维修人员"
            width="100">
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态"
            width="100">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="等待处理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="正在维修" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="维修完成" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <scrollToY :right="50" :bottom="115"></scrollToY>
    <showControl :right="50" :bottom="60"></showControl>
    <Footer :position="'relative'"></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navIndex from '../../components/nav_index/nav_index'
  import showControl from '../../components/showControl/showControl'
  import Footer from '../../components/footer/footer'
  import scrollToY from '../../components/scrollToY/scrollToY'
  import Header from '../../components/header/header'

  export default {
    data() {
      return {
        activeName: 'first',
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      };
    },
    components: {
      navIndex,
      showControl,
      Footer,
      scrollToY,
      Header
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .window {
    position: relative;
    z-index: 9999;
    .el-tabs {
      width: 60%;
      margin: 100px auto 150px;
      min-height: 550px;
    }
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
