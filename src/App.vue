<template>
  <div id="app">
    <div id="particles-js" class="particles-js"></div>
    <router-view/>
  </div>
</template>

<script>
  import '../static/css/reset.css';
  export default {
    name: 'App',
    mounted() {
      particlesJS("particles-js", this.$store.state.common.particlesConfig);
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
    .particles-js {
      position: fixed;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  html {
    &.shortPage {
      height: 100%;
      width: 100%;
    }
    &.scrollPage {
      height: 100%;
      width: 100%;
    }
    &.longPage {
      height: auto;
      width: 100%;
    }
  }

  body {
    &.shortPage {
      width: 100%;
      height: 100% !important;
      min-width: 1280px;
      min-height: 800px;
      max-width: 1920px;
      padding: 0;
      margin: 0;
      position: relative;
      overflow: hidden;
    }
    &.scrollPage {
      width: 100%;
      height: 100%;
      min-width: 1280px;
      min-height: 800px;
      padding: 0;
      margin: 0;
      position: relative;
      overflow: visible;
    }
    &.longPage {
      width: 100%;
      height: auto !important;
      min-width: 1280px;
      min-height: 800px;
      padding: 0;
      margin: 0;
      position: relative;
      overflow: visible;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      max-width: 1920px;
      min-width: 1280px;
      min-height: 800px;
      padding: 0;
      margin: 0;
      position: relative;
    }
  }
  .v-modal{
    z-index: 99998!important;
  }
  .el-message-box__wrapper, .el-message {
    z-index: 99999!important;
  }
</style>
