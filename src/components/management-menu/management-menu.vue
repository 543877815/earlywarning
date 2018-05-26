<template>
  <div class="el_NavMenu">
    <el-row class="tac">
      <el-col :span="24">
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          :default-active="$store.state.equipment.equipTypeActive.id.toString()"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse">
          <el-menu-item v-for="(item, index) in $store.state.equipment.equipTypes"
                        :index="item.id.toString()"
                        :key="item.id"
                        @click="switchType(item)">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        isCollapse: false,
        page: 0,
        size: 10,
        sort: 'id',
        cid: '1'
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      switchType (item) {
        this.$store.commit('changeEquipActive', item)
        this.$emit('switchType', item.id)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el_NavMenu {
    box-shadow: 10px 10px 50px #888888;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 138px;
    min-height: 400px;
  }

  .el-menu-vertical-demo.el-menu {
    transform: translateZ(0);
  }

  .el-menu-vertical-demo.el-menu {
    border-right: 0;
    border-left: solid 1px #e6e6e6;
  }
</style>
