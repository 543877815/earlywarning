<template>
  <div class="scrollToY-wrapper" @click="scrollTo" :style="{bottom: bottom+'px', right: right+'px'}">
    <img src="./up.png" width="34" height="30" class="showControl">
  </div>
</template>

<script type="text/ecmascript-6">
  import {scrollToY} from "../../common/js/scrollToY";

  export default {
    props: {
      scrollTargetY: {
        default: 0,
        type: Number
      },
      speed: {
        default: 2000,
        type: Number
      },
      easing: {
        default: "easeInOutQuint",
        type: String
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
      scrollTo() {
        scrollToY(this.scrollTargetY, this.speed, this.easing);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .scrollToY-wrapper {
    border-radius: 50%;
    position: fixed;
    right: 50px;
    bottom: 70px;
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
