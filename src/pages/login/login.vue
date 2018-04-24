<template>
  <div id="particles-js" class="main" ref="particlesJs">
    <navigation></navigation>
    <panel></panel>
    <showControl :right="50" :bottom="60"></showControl>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navigation from '../../components/nav_login/nav_login';
  import showControl from '../../components/showControl/showControl';
  import panel from '../../components/panel/panel';
  import Footer from '../../components/footer/footer'

  export default {
    components: {
      navigation,
      panel,
      showControl,
      Footer
    },
    mounted() {
      document.getElementsByTagName('body')[0].className = document.getElementsByTagName('html')[0].className = 'shortPage'
    },
    methods: {

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  body, html {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    max-width: 1856px;
    min-width: 1280px;
    min-height: 800px;
    padding: 0;
    margin: 0;
    position: relative;
  }
  .main {
    position: relative;
    width: 100%;
    height: 100%;

    .particles-js-canvas-el {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 1;
    }
  }
</style>


<style lang="scss" rel="stylesheet/scss" scoped>
  .main {
    /*background: url("../../assets/bg-login.jpg") no-repeat center center;*/
    background-size: cover;
    background-size: 100% 100%;
  }
  .main /deep/ #footer{
    background-color: #4a96c5;
  }
</style>
