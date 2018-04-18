<script src="../../main.js"></script>
<template>
  <div class="window">
    <navigator ref="nav" :class="{'scrollDown':navChange}" :navChange="navChange"></navigator>
    <Parallax :sectionHeight="100" style="position: relative" :speedFactor="0.1" ref="Masthead">
      <img src="../../assets/Jumbotron.jpg" width="100%" height="100%">
    </Parallax>
    <div class="content">
      <menubar @menuControl="menuControl" ref="Menubar"></menubar>
      <transition name="menuFade">
        <Menu v-show="menuShow"></Menu>
      </transition>
      <div class="equip-content" :class="{'menuShow':menuShow}">
        <p class="equipEmpty" v-if="$store.state.equipment.equipOnShow.length === 0">尚未添加仪器？先去<a>仪器管理</a>添加仪器吧！</p>
        <equipItem v-for="item in $store.state.equipment.equipOnShow" :equipItem="item"></equipItem>
      </div>
      <showControl v-show="iconShow"></showControl>
      <ScrollToY :scrollTargetY="iconShowHeight-navChangeHeight" :speed="4000" v-show="iconShow"></ScrollToY>
    </div>
    <Footer></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navigator from '../nav_index/nav_index'
  import Footer from '../footer/footer'
  import Parallax from '../Parallax/Parallax'
  import menubar from '../menubar/menubar'
  import Menu from '../menu/menu'
  import equipItem from '../equipItem/equipItem'
  import showControl from '../showControl/showControl'
  import ScrollToY from '../scrollToY/scrollToY'
  import _ from 'underscore'


  export default {
    data() {
      return {
        particlesShow: true,
        navHeight: 78,
        navChange: false,
        navChangeHeight: 108,
        iconShowHeight: 0,
        iconShow: false,
        menuShow: false,

        requestSize: 10,
        requestPage: 1,
        requestSort: "firstname"
      }
    },
    components: {
      navigator,
      Footer,
      Parallax,
      menubar,
      Menu,
      equipItem,
      showControl,
      ScrollToY
    },
    mounted() {
      document.getElementsByTagName('body')[0].className =
        document.getElementsByTagName('html')[0].className = 'scrollPage';

      particlesJS("particles-js", this.$store.state.common.particlesConfig);

      this.navHeight = this.$refs.nav.$el.offsetHeight;
      this.iconShowHeight = this.$refs.Masthead.$el.offsetHeight;

    },
    created() {

      this.throttleload = _.throttle(this.scrollControl, 100)
      window.addEventListener("scroll", this.throttleload, false);

      this.$axios.get(this.$store.state.common.baseUrl + "/getCategories").then((response) => {
        if (response.data.ret === 200) {
          this.$store.state.equipment.equipTypes = this.$store.state.equipment.equipTypes.concat(response.data.data);
        }
      })


      this.$axios.get(this.$store.state.common.baseUrl + `/getUserInstrument?sort=${this.requestSort}&size=${this.requestSize}&page=${this.requestPage}`).then((response) => {
        if (response.data.ret === 200) {
          this.requestPage++;
          this.$store.state.equipment.equipOnShow =
            this.$store.state.equipment.equipItems =
              this.$store.state.equipment.equipItems.concat(response.data.data.content);
        }
      })
    },
    methods: {
      /**
       * minitor the icon show/hidden
       * monitor thr nav color black/Transparent
       */
      scrollControl() {
        this.navHeight > window.pageYOffset
          ? this.navChange = false
          : this.navChange = true
        this.iconShowHeight > window.pageYOffset
          ? this.iconShow = false
          : this.iconShow = true
      },
      /**
       * turn on/off the particles
       */
      switchShowAndHide() {
        let particlesCanvas = this.$refs.particlesJs.getElementsByClassName('particles-js-canvas-el')[0];
        !this.$store.state.particles.show ? particlesCanvas.style.display = 'none' : particlesCanvas.style.display = 'block';
      },
      /**
       * toggle the menu
       */
      menuControl() {
        this.menuShow = !this.menuShow;
      },
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.throttleload, false);
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .window {
    width: 100%;
    height: 100%;
    overflow: visible;
    position: relative;
    z-index: 2;
    .content {
      width: 100%;
      position: relative;
      .menuFade-enter-active, .menuFade-leave-active {
        transition: all 0.3s;
      }
      .menuFade-enter, .menuFade-leave-to {
        opacity: 0;
        transform: translate3d(-100px, 0, 0);
      }
      .menuFade-enter-to, .menuFade-leave {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .equip-content {
        min-height: 768px;
        width: 1100px;
        margin: 100px auto 0;
        display: flex;
        justify-content: space-between;
        flex-flow: row wrap;
        transition: all 0.3s;
        .equipEmpty {
          font-size: 16px;
          a {
            color: #2d8cf0;
            border-bottom: 1px solid #2d8cf0;
            cursor: pointer;
          }
        }
        &.menuShow {
          transform: translate3d(100px, 0, 0);
        }
      }
    }

  }


</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  .nav {
    background: rgba(255, 255, 255, 0);
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    transition: all 0.3s;
    padding: 0;
    &.scrollDown {
      background-color: rgba(0, 0, 0, 0.9);
      padding: 15px 0;
      &:hover {
        background-color: rgba(0, 0, 0, 1);
      }
    }
  }

  .nav /deep/ .right {
    .role, .homePage, .management, .record, .personal-info {
      .info-panel {
        border: 2px solid rgba(0, 0, 0, 0);
        background: rgba(255, 255, 255, 0.7);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.7);
        .info-panel {
          opacity: 1;
          z-index: 99999;
        }
      }
    }
  }

  .Masthead {
    z-index: 1;
  }

  #footer {
    position: static;
  }

</style>
