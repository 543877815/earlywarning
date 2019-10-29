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
  import sidebar from '../../components/setting-sidebar/setting-sidebar'
  export default {
    components: {
      navigator: resolve => require(['../../components/navigator/navigator'], resolve),
      Footer: resolve => require(['../../components/footer/footer'], resolve),
      showControl: resolve => require(['../../components/showControl/showControl'], resolve),
      sidebar
    },
    methods: {},
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
    overflow: hidden;
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
    .fade-enter-active {
      transition: all 0.3s;
    }
  }
</style>

