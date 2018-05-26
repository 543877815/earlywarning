<template>
  <div class="order-detail">
    <el-input :placeholder="!order.id?'请输入维修单号':order.id" v-model.number="input">
      <el-button slot="append" icon="el-icon-search" @click="getOrder"></el-button>
    </el-input>
    <el-form ref="form" :model="order" label-width="100px" slot="body">
      <el-form-item label="工单创建时间">
        <el-input v-model="createTime"></el-input>
      </el-form-item>
      <el-form-item label="仪器ID">
        <el-input v-model="order.instrument.id"></el-input>
      </el-form-item>
      <el-form-item label="仪器名称">
        <el-input v-model="order.instrument.name"></el-input>
      </el-form-item>
      <el-form-item label="仪器类型">
        <el-input v-model="order.instrument.category.name"></el-input>
      </el-form-item>
      <el-form-item label="仪器所有者">
        <el-input v-model="order.owner.username"></el-input>
      </el-form-item>
      <el-form-item label="维修人员">
        <el-input v-model="order.maintainer.username"></el-input>
      </el-form-item>
      <el-form-item label="仪器状态">
        <el-input v-model="maintainStatus"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import Order from '../../apis/Order'

  const order = new Order()

  export default {
    data () {
      return {
        input: 0,
        order: {
          createTime: null,
          id: 0,
          instrument: {
            category: {
              description: '',
              id: 0,
              name: ''
            },
            description: '',
            durableYears: '',
            id: 0,
            insType: '',
            name: '',
            param: '',
            time: 0
          },
          maintainStatus: -1,
          maintainer: {
            email: '',
            id: 0,
            isEmailLocked: 1,
            isLocked: 1,
            roles: [],
            username: ''
          },
          owner: {
            email: '',
            id: 0,
            isEmailLocked: 1,
            isLocked: 1,
            roles: [],
            username: ''
          }
        }
      }
    },
    methods: {
      timeParse (date) {
        let newDate = new Date(date)
        let year = newDate.getFullYear()
        let month = newDate.getMonth().toString().length === 1 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1
        let day = newDate.getDate().toString().length === 1 ? `0${newDate.getDate()}` : newDate.getDate()
        let hour = newDate.getHours().toString().length === 1 ? `0${newDate.getHours()}` : newDate.getHours()
        let minute = newDate.getMinutes().toString().length === 1 ? `0${newDate.getMinutes()}` : newDate.getMinutes()
        let second = newDate.getSeconds().toString().length === 1 ? `0${newDate.getSeconds()}` : newDate.getSeconds()
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
      },
      getOrder () {
        this.getOrderDetail(this.input)
      },
      getOrderDetail (id) {
        order
          .getOrderDetail({
            id
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`查找成功!`)
              console.log(this.order.maintainStatus)
              this.order = res.data
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      }
    },
    computed: {
      createTime: {
        get: function () {
          return this.timeParse(this.order.createTime)
        }
      },
      maintainStatus: {
        get: function () {
          switch (this.order.maintainStatus) {
            case 0:
              return '等待确认'
            case 1:
              return '等待维修'
            case 2:
              return '正在维修'
            case 3:
              return '维修完成'
          }
        }
      }
    },
    mounted () {
      if (this.$route.query.id) {
        this.order.id = this.$route.query.id
        this.getOrderDetail(this.order.id)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-input {
    width: 500px !important;
  }

  .el-form {
    width: 600px !important;
    margin-top: 100px;
  }
</style>
