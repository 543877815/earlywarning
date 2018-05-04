<template>
  <div class="window">
    <navIndex></navIndex>
    <el_NavMenu @switchType="switchType"></el_NavMenu>
    <el_Table :tableData="tableData"
              :total="total"
              @CurrentChange="CurrentChange"
              @modifyInstrument="modifyInstrument"
    ></el_Table>
    <search :right="50"
            :bottom="225"
            @searchEquipment="searchEquipment">
    </search>
    <addEquip ref="addEquip"
              :right="50"
              :bottom="170"
              :total="modelTotal"
              @modelCurrentChange="modelCurrentChange"
              @getModel="getModel"
              @createEquip="createEquip"></addEquip>
    <scrollToY :right="50" :bottom="115"></scrollToY>
    <showControl :right="50" :bottom="60"></showControl>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navIndex from '../../components/nav_index/nav_index'
  import showControl from '../../components/showControl/showControl'
  import search from '../../components/search/search'
  import Footer from '../../components/footer/footer'
  import el_NavMenu from '../../components/el-NavMenu/el-NavMenu'
  import el_Table from '../../components/el-Table/el-Table'
  import addEquip from '../../components/addEquip/addEquip'
  import equipDetail from '../../components/equipDetail/equipDetail'
  import scrollToY from '../../components/scrollToY/scrollToY'
  import Equipment from '../../apis/Equipment'

  const equipment = new Equipment();

  export default {
    data() {
      return {
        getByCid: false,
        tableData: [],
        page: 0,
        size: 10,
        sort: 'id',
        keyword: null,
        cid: 1,
        total: 10,

        modelPage: 0,
        modelSize: 10,
        modelCid: 1,
        modelTotal: 10
      }
    },
    components: {
      navIndex,
      showControl,
      Footer,
      el_NavMenu,
      addEquip,
      el_Table,
      equipDetail,
      scrollToY,
      search
    },
    methods: {
      searchEquipment(val) {
        this.keyword = val
        this.getUserInstrument(this.page, this.pageSize, this.sort, this.keyword)
      },
      modifyInstrument(id, form) {
        equipment
          .modifyInstrument({
            id,
            name: form.name,
            insType: form.insType,
            durableYears: form.durableYears,
            param: form.param,
            description: form.param,
            thresholdValue: form.thresholdValue
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`修改成功！`);
              this.getInstrumentByCid(this.page, this.size, this.cid, this.sort);
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      modelCurrentChange(val) {
        this.modelPage = val;
        this.getModelInstrumentByCid(this.modelCid, this.modelPage, this.modelSize);
      },
      CurrentChange(val) {
        this.page = val - 1;
        this.getInstrumentByCid(this.page, this.size, this.cid, this.sort);
      },
      getCategories() {
        equipment
          .getCategories()
          .then((res) => {
            this.$store.state.equipment.equipTypes = res.data;
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      getModel(cid) {
        this.modelCid = cid
        this.getModelInstrumentByCid(this.modelCid, this.modelPage, this.modelSize);
      },
      getModelInstrumentByCid(cid, page, size) {
        equipment
          .getModelInstrumentByCid({
            cid: cid,
            page: page - 1,
            size: size
          })
          .then((res) => {
            this.$store.state.equipment.equipModelList = res.data.content;
            this.modelTotal = res.data.totalElements;
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      createEquip(currentRow, form) {
        equipment
          .createInstrument({
            cid: currentRow.category.id,
            name: form.name || currentRow.name,
            insType: form.insType || currentRow.insType,
            durableYears: form.durableYears || currentRow.durableYears,
            param: form.param || currentRow.param,
            description: form.description || currentRow.description,
            thresholdValue: form.thresholdValue || currentRow.thresholdValue
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`仪器 ${form.name || currentRow.name} 创建成功!`);
              this.$refs.addEquip.hideAll();
            } else {
              this.$message.error(`创建失败！`)
            }
          })
          .catch((err) => {
            console.log(err)
            this.$message.error(`[系统提醒: ${err.msg}]`);
          })
      },
      getInstrumentByCid(page, size, cid, sort = 'id') {
        this.cid = cid;
        equipment
          .getInstrumentByCid({
            page: page,
            size: size,
            cid: cid,
            sort: sort,
          })
          .then((res) => {
            this.tableData = res.data.content;
            this.total = res.data.totalElements;
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      getUserInstrument(page, size, sort = 'id', keyWord = null) {
        equipment
          .getUserInstrument({
            size,
            sort,
            page,
            keyWord
          })
          .then((res) => {
            this.tableData = res.data.content;
            this.total = res.data.totalElements;
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      switchType(cid) {
        this.page = 0;
        this.getInstrumentByCid(this.page, this.size, cid, this.sort)
      }
    },
    mounted() {
      document.getElementsByTagName('body')[0].className =
        document.getElementsByTagName('html')[0].className = 'shortPage';
      if (this.$store.state.equipment.equipTypes.length === 0) {
        this.getCategories();
      }
      this.getInstrumentByCid(this.page, this.size, 1, this.sort);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .window {
    position: relative;
    z-index: 9999;
    min-width: 1280px;
    height: 100%;
    overflow: visible;

    .model-enter, .model-leave-to {
      opacity: 0;
    }
    .model-enter-to, .model-leave {
      opacity: 1;
    }
    .model-leave-active {
      transition: all 0.3s;
    }
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  .window /deep/ .nav {
    width: 100%;
    z-index: 9999;
  }

  .window /deep/ .el_NavMenu {
    position: fixed;
    top: 18%;
    left: 17%;
  }

  @media screen and (max-width: 1280px) {
    .window /deep/ .el_NavMenu {
      left: 210px;
    }
  }

  .window /deep/ .el_table {
    position: relative !important;
    left: 28%;
    width: 960px !important;
  }

  .window /deep/ #footer {
    position: absolute;
    z-index: 9999;
  }
</style>
