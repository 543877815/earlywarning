<template>
  <div class="equipment-type">
    <el-table
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="类名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="addEquip-wrapper" @click.prevent.stop="showModal">
      <img src="../../assets/plus.png" width="34" height="30">
    </div>
    <transition name="modal">
      <Modal :wrapperClass="'EquipmentType'" v-if="addEquipmentModal" @hideDetail="hideAll">
        <div class="title" slot="header">创建分类</div>
        <div slot="body" class="radio">
          <el-form ref="form" :model="addEquipment" label-width="100px" :label-position="'right'">
            <el-form-item label="分类名称：">
              <el-input v-model="addEquipment.name"></el-input>
            </el-form-item>
            <el-form-item label="描述：">
              <el-input type="textarea" v-model="addEquipment.description"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <button class="btn btn-primary" slot="footer" @click.prevent.stop="addEquipmentType">确定</button>
      </Modal>
    </transition>
    <transition name="modal">
      <Modal :wrapperClass="'EquipmentType'" v-if="modifyEquipmentModal" @hideDetail="hideAll">
        <div class="title" slot="header">修改分类</div>
        <div slot="body" class="radio">
          <el-form ref="form" :model="modifyEquipment.old" label-width="100px" :label-position="'right'">
            <el-form-item label="分类名称：">
              <el-input v-model="modifyEquipment.new.name" :placeholder="modifyEquipment.old.name"></el-input>
            </el-form-item>
            <el-form-item label="描述：">
              <el-input type="textarea" v-model="modifyEquipment.new.description"
                        :placeholder="modifyEquipment.old.description"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <button class="btn btn-primary" slot="footer" @click.prevent.stop="modifyEquipmentType">修改</button>
      </Modal>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Modal from '../modal/modal'
  import Equipment from '../../apis/Equipment'

  const equipment = new Equipment()
  export default {
    data () {
      return {
        tableData: [],
        addEquipmentModal: false,
        addEquipment: {
          name: '',
          description: ''
        },
        modifyEquipmentModal: false,
        modifyEquipment: {
          id: 0,
          old: {
            name: '',
            description: ''
          },
          new: {
            name: '',
            description: ''
          }
        }
      }
    },
    components: {
      Modal
    },
    methods: {
      hideAll () {
        this.addEquipmentModal = this.modifyEquipmentModal = false
      },
      handleEdit (index, scopeRow) {
        this.modifyEquipmentModal = true
        this.modifyEquipment.id = scopeRow.id
        this.modifyEquipment.old.name = scopeRow.name
        this.modifyEquipment.old.description = scopeRow.description
        this.modifyEquipment.new.name =
          this.modifyEquipment.new.description = ''
      },
      modifyEquipmentType () {
        if (!this.modifyEquipment.new.name && !this.modifyEquipment.new.description) {
          this.$message.error(`输入不能全为空！`)
          return
        }
        equipment
          .modifyCategory({
            id: this.modifyEquipment.id,
            name: this.modifyEquipment.new.name || this.modifyEquipment.old.name,
            description: this.modifyEquipment.new.description || this.modifyEquipment.old.description
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`分类 ${this.modifyEquipment.new.name} 修改成功！`)
              this.modifyEquipment.new.name =
                this.modifyEquipment.old.name =
                  this.modifyEquipment.new.description =
                    this.modifyEquipment.old.description = ''
              this.hideAll()
              this.getCategories()
            }
          })
          .catch((err) => {
            console.log(err)
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      },
      handleDelete (index, scopeRow) {
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          equipment
            .deleteCategory({
              id: scopeRow.id
            })
            .then((res) => {
              if (res.ret === 200 && res.msg === 'success') {
                this.$message.success(`分类 ${scopeRow.name} 删除成功！`)
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
      showModal () {
        this.addEquipmentModal = true
      },
      addEquipmentType () {
        equipment
          .createCategory({
            name: this.addEquipment.name,
            description: this.addEquipment.description
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.hideAll()
              this.addEquipment.name = this.addEquipment.description = ''
              this.$message.success(`分类 ${this.addEquipment.name} 创建成功！`)
              this.getCategories()
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      },
      getCategories () {
        equipment
          .getCategories()
          .then((res) => {
            this.tableData = res.data
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

  .EquipmentType /deep/ .modal {
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
</style>
