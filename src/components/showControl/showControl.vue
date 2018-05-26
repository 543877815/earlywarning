<template>
  <div class="showControl-wrapper" @click="switchShowAndHide" :style="{bottom: bottom+'px', right: right+'px'}">
    <img :src="$store.state.particles.show?showImg:hideImg" width="34" height="20" class="showControl">
  </div>
</template>

<script type="text/ecmascript-6">
  import showImg from './visible.png'
import hideImg from './invisible.png'

export default {
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
    data () {
      return {
        hideImg: hideImg,
        showImg: showImg
      }
    },
    methods: {
      switchShowAndHide () {
        var particlesCanvas = document.getElementsByClassName('particles-js-canvas-el')[0]
        this.$store.commit('particlesControl', particlesCanvas)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .showControl-wrapper {
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
