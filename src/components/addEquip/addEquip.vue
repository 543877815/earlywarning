<template>
  <div class="addEquip-wrapper" :style="{bottom: bottom+'px', right: right+'px'}" @click.prevent.stop="showTypes">
    <img src="./plus.png" width="34" height="30">
    <transition name="modal">
      <Modal :wrapperClass="'EquipmentType'" v-if="messageBox" @hideDetail="hideAll">
        <div class="title" slot="header">仪器类型</div>
        <div slot="body" class="radio">
          <el-radio v-model="radio" :label="item.id" v-for="(item, index) in $store.state.equipment.equipTypes" border
                    size="medium" :key="item.name">{{item.name}}
          </el-radio>
        </div>
        <button class="btn btn-primary" slot="footer" @click.prevent.stop="showTemplateList">确定</button>
      </Modal>
    </transition>
    <transition name="modal">
      <Modal :wrapperClass="'EquiptemplateList'" v-if="templateList" @hideDetail="hideAll">
        <div class="title" slot="header">模板列表</div>
        <el-table
          highlight-current-row
          @current-change="handleCurrentChange"
          :data="$store.state.equipment.equipModelList"
          style="width: 100%"
          slot="body">
          <el-table-column
            prop="id"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="仪器名称"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small">
                选中
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination slot="body"
                       background
                       layout="total, prev, pager, next, jumper"
                       @current-change="CurrentChange"
                       :total="total">
        </el-pagination>
        <button class="btn btn-primary" slot="footer" @click="showTemplate">确定</button>
        <button class="btn btn-default" slot="footer" @click="showTypes">返回</button>
      </Modal>
    </transition>
    <transition name="modal">
      <Modal :wrapperClass="'Equiptemplate'" v-if="template" @hideDetail="hideAll">
        <div class="title" slot="header">仪器详情</div>
        <div class="intro" slot="body">
          <div class="img-wrapper">
            <img :src="form.picUrl" width="300" height="300">
            <input type="file" accept="*image/*" @click.stop="addImg($event)">
          </div>
          <div class="intro-wrapper">
            <div class="name">
              <input type="text" :placeholder="currentRow.name" v-model="form.name">
              <span class="id">ID：{{currentRow.thresholdValue}}</span>
            </div>
            <div class="insType">型号：
              <input type="text" :placeholder="currentRow.insType" v-model="form.insType">
            </div>
            <div class="param">参数：
              <input type="text" :placeholder="currentRow.param" v-model="form.param">
            </div>
            <div class="maturity">使用年限：
              <input type="text" :placeholder="currentRow.durableYears" v-model="form.durableYears">
            </div>
            <div class="detail-intro">仪器简介：
              <textarea cols="60" rows="10" :placeholder="currentRow.description" v-model="form.description"></textarea>
            </div>
            <div class="thresholdValue">告警阈值：
              <input type="number" :placeholder="currentRow.thresholdValue" v-model.number="form.thresholdValue">
            </div>
          </div>
        </div>
        <button class="btn btn-primary" slot="footer" @click="createEquip">创建</button>
        <button class="btn btn-default" slot="footer" @click="showTemplateList">返回</button>
      </Modal>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import Modal from '../../components/modal/modal'
  import {createObjectURL} from "../../common/js/createObjectURL";

  export default {
    data() {
      return {
        messageBox: false,
        template: false,
        templateList: false,
        radio: 1,
        currentRow: null,
        tableData: [],
        form: {
          name: '',
          insType: '',
          param: '',
          durableYears: '',
          description: '',
          picUrl: '',
          thresholdValue: ''
        }
      }
    },
    components: {
      Modal
    },
    props: {
      right: {
        type: Number,
        default: 0
      },
      bottom: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 20
      }
    },
    methods: {
      addImg($event) {
        $event.target.removeEventListener('change', this.loadImg)
        $event.target.addEventListener('change', this.loadImg)
      },
      loadImg(event) {
        console.log(event.target.files);
        let files = event.target.files,
          reader = new FileReader(),
          url = createObjectURL(files[0]);
        if (url) {
          if (/image/.test(files[0].type)) {
            this.form.picUrl = url;
            reader.readAsDataURL(files[0]);
          } else {
            this.$message.error('不是图片')
          }
        }
        reader.onerror = () => {
          this.$message.error('读取文件出错!')
        }
        reader.onprogress = (event) => {
          console.log('读取中...')
        }
        reader.onload = () => {
          this.$message.success('读取文件成功!')
        }
      },
      hideAll() {
        this.messageBox =
          this.template =
            this.templateList = false;
        document.getElementsByTagName('body')[0].style.overflow = "auto";
      },
      showTypes() {
        this.messageBox = true;
        this.template =
          this.templateList = false;
        document.getElementsByTagName('body')[0].style.overflow = "hidden";
      },
      showTemplate() {
        if (this.currentRow) {
          this.template = true;
          this.messageBox =
            this.templateList = false;
          this.form.picUrl = this.currentRow.picUrl;
        } else {
          this.$message.warning(`请选择一种类型！`)
        }
      },
      showTemplateList() {
        this.template =
          this.messageBox = false;
        this.templateList = true;
        this.$emit('getModel', this.radio);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      CurrentChange(val) {
        this.$emit('modelCurrentChange', val);
      },
      createEquip() {
        this.$emit('createEquip', this.currentRow, this.form)
      }
    },
    computed: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/sass/components/equipmentModal';
  @import '../../common/sass/components/modal-transition';
  @include modal-transition;
  .addEquip-wrapper {
    border-radius: 50%;
    position: fixed;
    right: 50px;
    bottom: 70px;
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
    .EquipmentType /deep/ .modal {
      .modal-dialog {
        top: 50% !important;
        transform: translateY(-50%);
        margin: 0 auto;
        width: 550px;
        .radio {
          display: flex;
          flex-flow: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          .el-radio {
            margin: 5px;
          }
        }
      }
    }
    .EquiptemplateList /deep/ .modal {
      .modal-dialog {
        top: 50%;
        transform: translateY(-50%);
        margin: 0 auto;
        width: 550px;
        text-align: left;
        cursor: default;
        .el-pagination {
          margin-top: 20px;
        }
      }
    }
    .Equiptemplate {
      @include equipmentModal();
    }
  }
</style>
