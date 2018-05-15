<template>
  <div class="window">
    <navIndex></navIndex>
    <Menu @switchType="switchType"></Menu>
    <Table :tableData="tableData"
           :total="total"
           @CurrentChange="CurrentChange"
           @modifyInstrument="modifyInstrument"
           @deleteEquipment="deleteEquipment"
           @addImg="addImg"
    ></Table>
    <search :right="50"
            :bottom="225"
            @searchEquipment="searchEquipment">
    </search>
    <addEquip ref="addEquip"
              :right="50"
              :bottom="170"
              :total="modelTotal"
              @addImg="addImg"
              @modelCurrentChange="modelCurrentChange"
              @getModel="getModel"
              @createEquip="createEquip"></addEquip>
    <scrollToY :right="50" :bottom="115"></scrollToY>
    <showControl :right="50" :bottom="60"></showControl>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navIndex from '../../components/navigator/navigator'
  import showControl from '../../components/showControl/showControl'
  import search from '../../components/search/search'
  import Footer from '../../components/footer/footer'
  import Menu from '../../components/management-menu/management-menu'
  import Table from '../../components/management-table/management-table'
  import addEquip from '../../components/addEquip/addEquip'
  import scrollToY from '../../components/scrollToY/scrollToY'
  import Equipment from '../../apis/Equipment'
  import {createObjectURL} from "../../common/js/createObjectURL";

  const equipment = new Equipment();

  export default {
    data() {
      return {
        isPic: false,
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
      Menu,
      addEquip,
      Table,
      scrollToY,
      search
    },
    methods: {
      deleteEquipment(id){
        console.log(id);
        equipment
          .deleteInstrument({
            id
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`删除成功!`);
              this.$store.state.equipment.equipTypeActive.id === 0 ?
                this.getUserInstrument(this.page, this.size, this.sort, this.keyword) :
                this.getInstrumentByCid(this.page, this.size, this.$store.state.equipment.equipTypeActive.id, this.sort);
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      addImg($event) {
        $event.target.removeEventListener('change', this.loadImg)
        $event.target.addEventListener('change', this.loadImg)
      },
      loadImg(event) {
        let files = event.target.files,
          reader = new FileReader(),
          url = createObjectURL(files[0]);
        if (url) {
          if (/image/.test(files[0].type)) {
            event.target.previousElementSibling.setAttribute('src', url);
            reader.readAsDataURL(files[0]);
          } else {
            this.$message.error('不是图片');
            this.isPic = false
            return;
          }
        }
        reader.onerror = () => {
          this.$message.error('读取文件出错!')
        }
        reader.onprogress = (event) => {
          console.log('读取中...')
        }
        reader.onload = () => {
          this.$message.success('读取文件成功!');
          this.isPic = true;
        }
      },
      searchEquipment(val) {
        this.keyword = val
        this.size = 0;
        this.$store.state.equipment.equipTypeActive.name = val;
        this.getUserInstrument(this.page, this.size, this.sort, this.keyword)
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
        this.$store.state.equipment.equipTypeActive.id === 0 ?
          this.getUserInstrument(this.page, this.size, this.sort, this.keyword) :
          this.getInstrumentByCid(this.page, this.size, this.$store.state.equipment.equipTypeActive.id, this.sort);
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
        this.keyword = null;
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
            page,
            size,
            sort,
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
      this.$store.state.equipment.equipTypeActive.id === 0 ?
        this.getUserInstrument(this.page, this.size, this.sort, this.keyword) :
        this.getInstrumentByCid(this.page, this.size, this.$store.state.equipment.equipTypeActive.id, this.sort);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/components/modal-transition";

  .window {
    position: relative;
    z-index: 2;
    min-width: 1280px;
    height: 100%;
    overflow: visible;
    .nav {
      width: 100%;
    }
    .el_NavMenu {
      position: fixed;
      top: 18%;
      left: 17%;
    }
    .el_table {
      position: relative !important;
      left: 28%;
      width: 960px !important;
    }
    #footer {
      position: absolute;
      z-index: 9999;
    }
  }
  @include modal-transition;

  @media screen and (max-width: 1280px) {
    .window .el_NavMenu {
      left: 210px;
    }
  }


</style>
