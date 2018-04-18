<template>
  <div id="footer">
    Copyright © 2018 abc.com All Rights Reserved
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/variables';

  #footer {
    text-align: center;
    color: #fff;
    background-color: $nav_index-color;
    //background: linear-gradient(bottom, $nav_index-color, #fff);
    height: 50px;
    line-height: 50px;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
</style>
