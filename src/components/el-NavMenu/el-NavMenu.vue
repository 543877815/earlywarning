<template>
  <div class="el_NavMenu">
    <el-row class="tac">
      <el-col :span="24">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse">
          <el-menu-item v-for="(item, index) in $store.state.equipment.equipTypes" v-if="item.id!==0"
                        :index="index.toString()" :key="index">
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
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 400px;
  }

  .el-menu-vertical-demo.el-menu {
    transform: translateZ(0);
  }

  .el-menu-vertical-demo.el-menu{
    border-right: 0;
    border-left: solid 1px #e6e6e6;
  }
</style>
