<template>
  <div class="window">
    <navigator></navigator>
    <sidebar></sidebar>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div style="clear: both"></div>
    <showControl :bottom="60" :right="50"></showControl>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navigator from '../../components/navigator/navigator'
import sidebar from '../../components/setting-sidebar/setting-sidebar'
  import Footer from '../../components/footer/footer'
  import showControl from '../../components/showControl/showControl'

  export default {
    components: {
      navigator,
      sidebar,
      Footer,
      showControl
    },
    methods: {

    },
    mounted () {
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .window {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    .sidebar {
      width: 20%;
    }
    .container {
      width: 80%;
      height: 100%;
      padding: 100px 10.11% 0 10%;
      float: right;
      box-sizing: border-box;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    .fade-enter {
    }
    .fade-leave-to {
    }
    .fade-enter-to, .fade-leave {
      opacity: 1;
    }
    .fade-enter-active{
      transition: all 0.3s;
    }
  }
</style>

