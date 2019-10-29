<template>
  <div class="window">
    <v-header></v-header>
    <div class="wrapper">
      <v-sidebar class="sidebar"></v-sidebar>
      <transition name="fade">
        <div class="container">
          <router-view></router-view>
        </div>
      </transition>
    </div>
    <showControl :right="50" :bottom="30"></showControl>
  </div>
</template>

<script type="text/ecmascript-6">
  import vSidebar from '../../components/admin-sidebar/admin-sidebar'
  import vHeader from '../../components/admin-navigator/admin-navigator'

  export default {
    data () {
      return {}
    },
    methods: {},
    components: {
      vHeader,
      vSidebar,
      showControl: resolve => require(['../../components/showControl/showControl'], resolve)
    },
    mounted () {
      document.getElementsByTagName('body')[0].className =
        document.getElementsByTagName('html')[0].className = 'scrollPage'
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .window {
    position: relative;
    height: 100%;
    z-index: 3;
    .wrapper {
      display: flex;
      flex-flow: row;
      height: 100%;
      .sidebar {
        /*flex: 1;*/
        width: 15%;
        height: 100%;
      }
      .container {
        margin: 100px 75px 0;
        width: 84%;
        /*flex: 5.5;*/
      }
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
