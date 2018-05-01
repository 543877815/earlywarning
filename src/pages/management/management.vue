<template>
  <div class="window">
    <navIndex></navIndex>
    <el_NavMenu></el_NavMenu>
    <el_Table></el_Table>
    <addEquip ref="addEquip"
              :right="50"
              :bottom="170"
              @getModelInstrumentByCid="getModelInstrumentByCid"
              @createEquip="createEquip"></addEquip>
    <scrollToY :right="50" :bottom="115"></scrollToY>
    <showControl :right="50" :bottom="60"></showControl>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navIndex from '../../components/nav_index/nav_index'
  import showControl from '../../components/showControl/showControl'
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
      return {}
    },
    components: {
      navIndex,
      showControl,
      Footer,
      el_NavMenu,
      addEquip,
      el_Table,
      equipDetail,
      scrollToY
    },
    methods: {
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
      getModelInstrumentByCid(cid, page, size) {
        equipment
          .getModelInstrumentByCid({
            cid: cid,
            page: page - 1,
            size: size
          })
          .then((res) => {
            this.$store.state.equipment.equipModelList = res.data.content;
            this.$refs.addEquip.setPage(res.data.pageable.page + 1, res.data.pageable.size, Math.ceil(res.data.total / res.data.pageable.size) * 10)
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
          .then((res)=>{
            if (res.ret === 200 && res.msg === 'success'){
              this.$message.success(`仪器 ${form.name||currentRow.name} 创建成功!`);
              this.$refs.addEquip.hideAll();
            } else{
              this.$message.error(`创建失败！`)
            }
            console.log(res)
          })
          .catch((err)=>{
            this.$message.error(`[系统提醒: ${err.msg}]`);
          })
      }
    },
    mounted() {
      document.getElementsByTagName('body')[0].className =
        document.getElementsByTagName('html')[0].className = 'longPage';
      if (this.$store.state.equipment.equipTypes.length === 0) {
        this.getCategories();
      }
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

    .modal-enter, .modal-leave-to {
      opacity: 0;
    }
    .modal-enter-to, .modal-leave {
      opacity: 1;
    }
    .modal-leave-active {
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
    left: 17.3%;
  }

  @media screen and (max-width: 1280px) {
    .window /deep/ .el_NavMenu {
      left: 210px;
    }
  }

  .window /deep/ .el_table {
    position: relative !important;
    left: 28%;
    top: 10% !important;
    width: 960px !important;
  }

  .window /deep/ #footer {
    position: absolute;
    z-index: 9999;
  }
</style>
