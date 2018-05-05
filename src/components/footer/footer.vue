<template>
  <div id="footer" :style="{position: position}">
    Copyright © 2018 abc.com All Rights Reserved
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      position:{
        type: String,
        default: "absolute"
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/sass/variables';

  #footer {
    z-index: 2;
    text-align: center;
    color: #fff;
    background-color: $nav_index-color;
    height: 50px;
    line-height: 50px;
    width: 100%;
    left: 0;
    bottom: 0;
  }
</style>
