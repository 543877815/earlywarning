<template>
  <div class="search-wrapper" @click="searchInput" :style="{bottom: bottom+'px', right: right+'px'}">
    <img src="./search.png" width="25" height="25" class="search">
  </div>
</template>

<script>
  export default {
    name: 'search',
    props: {
      show: {
        type: Boolean,
        default: true
      },
      right: {
        type: Number,
        default: 0
      },
      bottom: {
        type: Number,
        default: 0
      }
    },
    methods: {
      searchInput () {
        this.$prompt('请输入仪器名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          this.$emit('searchEquipment', value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      }
    }
  }
</script>

<style scoped>
  .search-wrapper {
    border-radius: 50%;
    position: fixed;
    right: 50px;
    bottom: 130px;
    background-color: #2d8cf0;
    /*box-shadow: darkgrey 10px 10px 30px 5px;*/
    z-index: 999;
    height: 42px;
    width: 42px;
    text-align: center;
    cursor: pointer;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
</style>
