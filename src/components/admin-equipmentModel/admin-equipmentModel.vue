<template>
  <div class="equipment-type">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="item.name" :name="item.id.toString()" v-for="item in equipmentTypes"
                   :key="item.name"></el-tab-pane>
    </el-tabs>
    <template>
      <el-table
        max-height="550"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="编号"
          width="50">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="模板名称"
          width="120">
        </el-table-column>1
        <el-table-column
          label="创建时间"
          width="160">
          <template slot-scope="scope">{{ scope.row.time | timeParse}}</template>
        </el-table-column>
        <el-table-column
          prop="insType"
          label="型号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="param"
          label="参数"
          width="80">
        </el-table-column>
        <el-table-column
          prop="durableYears"
          label="使用年限"
          width="80">
        </el-table-column>
        <el-table-column
          prop="thresholdValue"
          label="告警阈值"
          width="80">
        </el-table-column>
        <el-table-column
          prop="description"
          width="200"
          label="描述">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="addEquip-wrapper" @click.prevent.stop="showModal">
      <img src="../../assets/plus.png" width="34" height="30">
    </div>
    <transition name="modal">
      <Modal :wrapperClass="'EquipmentModal'" v-if="ModifyEquipmentModal" @hideDetail="hideAll">
        <div class="title" slot="header">修改模板仪器</div>
        <el-form ref="form" :model="newEquipmentForm" label-width="80px" slot="body">
          <el-form-item label="仪器图片">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="oldEquipmentForm.picUrl" class="image" height="400px"
                   width="400px" ref="img">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text" class="button">更改模板图片
                    <input type="file" accept="*image/*" @click.stop="addImg($event)" ref="file" class="fileReader">
                  </el-button>
                  <el-button type="text" class="button" @click.stop="imgUpdate">上传图片</el-button>
                </div>
              </div>
            </el-card>
          </el-form-item>
          <el-form-item label="仪器名称">
            <el-input v-model="newEquipmentForm.name" :placeholder="oldEquipmentForm.name"></el-input>
          </el-form-item>
          <el-form-item label="仪器型号">
            <el-input v-model="newEquipmentForm.insType" :placeholder="oldEquipmentForm.insType"></el-input>
          </el-form-item>
          <el-form-item label="仪器参数">
            <el-input v-model="newEquipmentForm.param" :placeholder="oldEquipmentForm.param"></el-input>
          </el-form-item>
          <el-form-item label="使用年限">
            <el-input v-model="newEquipmentForm.durableYears" :placeholder="oldEquipmentForm.durableYears"></el-input>
          </el-form-item>
          <el-form-item label="告警阈值">
            <el-input v-model.number="newEquipmentForm.thresholdValue" type="number"
                      :placeholder="oldEquipmentForm.thresholdValue"></el-input>
          </el-form-item>
          <el-form-item label="仪器描述">
            <el-input type="textarea" v-model="newEquipmentForm.description"
                      :placeholder="oldEquipmentForm.description"></el-input>
          </el-form-item>
        </el-form>
        <button class="btn btn-primary" slot="footer" @click.prevent.stop="modifyEquipment">修改</button>
      </Modal>
    </transition>
    <transition name="modal">
      <Modal :wrapperClass="'EquipmentModal'" v-if="CreateEquipmentModal" @hideDetail="hideAll">
        <div class="title" slot="header">创建模板仪器</div>
        <el-form ref="form" :model="newEquipmentForm" label-width="80px" slot="body">
          <el-form-item label="仪器类型">
            <div class="radio">
              <el-radio v-model="newEquipmentForm.radio" :label="item.id" v-for="(item, index) in equipmentTypes" border
                        size="medium" :key="item.name">{{item.name}}
              </el-radio>
            </div>
          </el-form-item>
          <el-form-item label="仪器图片">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../../assets/equipment_default.png" class="image" height="400px" width="400px" ref="img">
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button type="text" class="button">本地读取图片
                    <input type="file" accept="*image/*" @click.stop="addImg($event)" ref="file" class="fileReader">
                  </el-button>
                  <el-button type="text" class="button" @click.stop="imgUpdate">上传图片</el-button>
                </div>
              </div>
            </el-card>
          </el-form-item>
          <el-form-item label="仪器名称">
            <el-input v-model="newEquipmentForm.name"></el-input>
          </el-form-item>
          <el-form-item label="仪器型号">
            <el-input v-model="newEquipmentForm.insType"></el-input>
          </el-form-item>
          <el-form-item label="仪器参数">
            <el-input v-model="newEquipmentForm.param"></el-input>
          </el-form-item>
          <el-form-item label="使用年限">
            <el-input v-model="newEquipmentForm.durableYears"></el-input>
          </el-form-item>
          <el-form-item label="告警阈值">
            <el-input v-model.number="newEquipmentForm.thresholdValue" type="number"></el-input>
          </el-form-item>
          <el-form-item label="仪器描述">
            <el-input type="textarea" v-model="newEquipmentForm.description"></el-input>
          </el-form-item>
        </el-form>
        <button class="btn btn-primary" slot="footer" @click.prevent.stop="createEquipment">创建</button>
      </Modal>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from '../modal/modal'
  import Equipment from '../../apis/Equipment'
  import {createObjectURL} from '../../common/js/createObjectURL'
  import Url from '../../apis/Url'
  import equipmentDefault from '../../assets/equipment_default.png'

  const equipment = new Equipment()
  export default {
    data () {
      return {
        CreateEquipmentModal: false,
        ModifyEquipmentModal: false,
        newEquipmentForm: {
          radio: 1,
          name: '',
          insType: '',
          param: '',
          durableYears: '',
          thresholdValue: '',
          description: '',
          picUrl: ''
        },
        oldEquipmentForm: {
          name: '',
          insType: '',
          param: '',
          durableYears: '',
          thresholdValue: '',
          description: '',
          picUrl: ''
        },
        activeName: '1',
        equipmentTypes: [],
        tableData: [],
        page: 0,
        size: 65535,
        cid: 0,
        sort: 'id'
      }
    },
    components: {
      Modal
    },
    methods: {
      imgUpdate () {
        /* global FileReader FormData */
        let file = this.$refs.file.files[0]
        let data = new FormData()
        data.append('avatar', file)
        if (!file) {
          this.$message.error('图片为空！')
          return
        }
        if (!this.isPic) {
          this.$message.error(`不是图片！`)
          return
        }
        equipment
          .uploadInstPic({
            file: file
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`图片上传成功！`)
              this.newEquipmentForm.picUrl = res.data
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      },
      addImg ($event) {
        $event.target.removeEventListener('change', this.loadImg)
        $event.target.addEventListener('change', this.loadImg)
      },
      loadImg (event) {
        let files = event.target.files
        let reader = new FileReader()
        let url = createObjectURL(files[0])
        if (url) {
          if (/image/.test(files[0].type)) {
            this.$refs.img.src = url
            reader.readAsDataURL(files[0])
          } else {
            this.$message.error('不是图片')
            this.isPic = false
            return
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
          this.isPic = true
        }
      },
      handleEdit (index, scopeRow) {
        this.newEquipmentForm.radio = scopeRow.id
        this.oldEquipmentForm.name = scopeRow.name
        this.oldEquipmentForm.insType = scopeRow.insType
        this.oldEquipmentForm.param = scopeRow.param
        this.oldEquipmentForm.durableYears = scopeRow.durableYears
        this.oldEquipmentForm.thresholdValue = scopeRow.thresholdValue
        this.oldEquipmentForm.description = scopeRow.description
        this.oldEquipmentForm.picUrl = scopeRow.picUrl ? `${Url.request}${scopeRow.picUrl}` : equipmentDefault

        this.ModifyEquipmentModal = true
      },
      handleDelete (index, scopeRow) {
        this.$confirm('此操作将永久删除该仪器模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          equipment
            .deleteInstrument({
              id: scopeRow.id
            })
            .then((res) => {
              if (res.ret === 200 && res.msg === 'success') {
                this.$message({
                  type: 'success',
                  message: `仪器 ${scopeRow.name} 删除成功!`
                })
                this.getCategories()
              }
            })
            .catch((err) => {
              this.$message.error(`[系统提醒: ${err.msg}]`)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      modifyEquipment () {
        equipment
          .modifyInstrument({
            id: this.newEquipmentForm.radio,
            name: this.newEquipmentForm.name || this.oldEquipmentForm.name,
            insType: this.newEquipmentForm.insType || this.oldEquipmentForm.insType,
            param: this.newEquipmentForm.param || this.oldEquipmentForm.param,
            durableYears: this.newEquipmentForm.durableYears || this.oldEquipmentForm.durableYears,
            thresholdValue: this.newEquipmentForm.thresholdValue || this.oldEquipmentForm.thresholdValue,
            description: this.newEquipmentForm.description || this.oldEquipmentForm.description,
            picUrl: this.newEquipmentForm.picUrl || this.oldEquipmentForm.picUrl
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`模板仪器 ${this.newEquipmentForm.name || this.oldEquipmentForm.name} 修改成功！`)
              this.hideAll()
              this.getCategories()
              for (let key in this.newEquipmentForm) {
                key === 'radio' ? this.newEquipmentForm[key] = 1 : this.newEquipmentForm[key] = ''
              }
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      },
      createEquipment () {
        if (!this.newEquipmentForm.name || !this.newEquipmentForm.insType ||
            !this.newEquipmentForm.param || !this.newEquipmentForm.durableYears ||
            !this.newEquipmentForm.thresholdValue || !this.newEquipmentForm.description) {
          this.$message.error(`输入不能为空！`)
          return
        }
        equipment
          .createInstrumentModal({
            cid: this.newEquipmentForm.radio,
            name: this.newEquipmentForm.name,
            insType: this.newEquipmentForm.insType,
            param: this.newEquipmentForm.param,
            durableYears: this.newEquipmentForm.durableYears,
            thresholdValue: this.newEquipmentForm.thresholdValue,
            description: this.newEquipmentForm.description,
            picUrl: this.newEquipmentForm.picUrl
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`仪器模板 ${this.newEquipmentForm.name} 创建成功！`)
              this.hideAll()
              this.getCategories()
              for (let key in this.newEquipmentForm) {
                key === 'radio' ? this.newEquipmentForm[key] = 1 : this.newEquipmentForm[key] = ''
              }
              this.activeName = '1'
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      },
      showModal () {
        this.CreateEquipmentModal = true
      },
      hideAll () {
        this.CreateEquipmentModal = this.ModifyEquipmentModal = false
      },
      handleClick (tab, event) {
        this.page = 0
        this.getModelInstrumentByCid(this.page, this.size, tab.name)
      },
      getCategories () {
        equipment
          .getCategories()
          .then((res) => {
            this.equipmentTypes = res.data
            this.newEquipmentForm.radio = res.data[0].id
            if (res.data.length !== 0) {
              this.getModelInstrumentByCid(this.page, this.size, this.equipmentTypes[0].id)
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      },
      getModelInstrumentByCid (page, size = this.size, cid, sort = this.sort) {
        equipment
          .getModelInstrumentByCid({
            page,
            size,
            cid,
            sort
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.tableData = res.data.content
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      }
    },
    mounted () {
      this.getCategories()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/sass/components/modal-transition';

  @include modal-transition;
  .el-table{
    height: 650px;
    overflow-y: scroll;
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

  .EquipmentModal /deep/ .modal {
    .modal-dialog {
      margin: 5% auto;
      width: 700px !important;
      .el-form {
        margin: 0 12px 0;
        .radio {
          display: flex;
          flex-flow: row;
          flex-wrap: wrap;
          .el-radio {
            margin: 5px;
          }
        }
      }
      .el-button {
        position: relative;
        .fileReader {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          cursor: pointer;
          opacity: 0;
          z-index: 2;
        }
      }
    }
  }
</style>
