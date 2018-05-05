<template>
  <div class="header">
    <div class="title" :class="icon">{{title}}</div>
    <div class="split"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String
      },
      icon:{
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/variables";

  .header {
    .title {
      font-size: 32px;
      color: $nav_index-color;
      padding-left: 10px;
    }
    .split {
      width: 100%;
      height: 4px;
      background: linear-gradient(left, $nav_index-color, #fff);
      margin-top: 30px;
    }
  }
</style>

