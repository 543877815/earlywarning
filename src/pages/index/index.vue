<template>
  <div class="window">
    <navigator ref="nav"
               :class="{'scrollDown':navChange}"
               :navChange="navChange"></navigator>
    <Parallax :sectionHeight="100"
              style="position: relative"
              :speedFactor="0.1"
              ref="Masthead">
      <img src="../../assets/Jumbotron.jpg" width="100%" height="100%">
    </Parallax>
    <div class="content">
      <menubar @menuControl="menuControl"
               @switchSort="switchSort"
               ref="Menubar">
      </menubar>
      <transition name="menuFade">
        <Menu v-show="menuShow"
              @changeEquipActive="changeEquipActive">
        </Menu>
      </transition>
      <div class="equip-content"
           :class="{'menuShow':menuShow}">
        <p class="equipEmpty"
           v-if="$store.state.equipment.equipOnShow.length === 0">尚未添加仪器？先去
          <router-link to="/management">仪器管理</router-link>
          添加仪器吧！
        </p>
        <equipItem v-for="(item,index) in $store.state.equipment.equipOnShow"
                   :equipItem="item"
                   :key="index"
                   @hideMenu="hideMenu">
        </equipItem>
      </div>
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="busy"
           infinite-scroll-distance="20">
        加载中...
      </div>
      <showControl v-show="iconShow"
                   :right="50"
                   :bottom="115">
      </showControl>
      <ScrollToY
        :scrollTargetY="iconShowHeight-navChangeHeight"
        :speed="4000"
        v-show="iconShow"
        :bottom="60"
        :right="50">
      </ScrollToY>
    </div>
    <Footer :position="'relative'"></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navigator from '../../components/nav_index/nav_index'
  import Footer from '../../components/footer/footer'
  import Parallax from '../../components/Parallax/Parallax'
  import menubar from '../../components/menubar/menubar'
  import Menu from '../../components/menu/menu'
  import equipItem from '../../components/equipItem/equipItem'
  import showControl from '../../components/showControl/showControl'
  import ScrollToY from '../../components/scrollToY/scrollToY'
  import _ from 'underscore'

  import Equipment from '../../apis/Equipment'
  import User from '../../apis/User';

  const equipment = new Equipment();
  const user = new User();

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
        size: 10,
        page: 0,
        sort: "id",
        desc: false,
        busy: true,
        getByCid: false
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

      this.throttleload = _.throttle(this.scrollControl, 100)
      window.addEventListener("scroll", this.throttleload, false);

      if (!this.$store.state.user.id) {
        this.getUserInfo();
      }

      if (this.$store.state.equipment.equipTypes.length === 0) {
        this.getCategories();
      }

      this.getByCid ?
        this.getInstrumentByCid(this.page, this.size, this.$store.state.equipment.equipActive.id, this.sort, false) :
        this.getUserInstrument(this.page, this.size, this.sort, false);
    },
    created() {

    },
    methods: {
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.busy = false;
          this.page++;
          this.getByCid ?
            this.getInstrumentByCid(this.page, this.size, this.$store.state.equipment.equipActive.id, this.sort, true) :
            this.getUserInstrument(this.page, this.size, this.sort, true);
        }, 500);
      },
      changeEquipActive() {
        this.page = 0;
        this.size = 10;
        this.$store.state.equipment.equipActive.id === 0 ? this.getByCid = false : this.getByCid = true;
        this.getByCid ?
          this.getInstrumentByCid(this.page, this.size, this.$store.state.equipment.equipActive.id, this.sort, false) :
          this.getUserInstrument(this.page, this.size, this.sort, false);
      },
      getInstrumentByCid(page, size, cid, sort = 'id', flag = false) {
        equipment
          .getInstrumentByCid({
            page: page,
            size: size,
            cid: cid,
            sort: sort,
          })
          .then((res) => {
            if (flag) {
              this.$store.state.equipment.equipOnShow =
                this.$store.state.equipment.equipItems =
                  this.$store.state.equipment.equipOnShow.concat(res.data.content)
              if (res.data.content.length === 0) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.$store.state.equipment.equipOnShow =
                this.$store.state.equipment.equipItems =
                  res.data.content;
              this.busy = false;
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      switchSort(desc) {
        this.page = 0;
        this.size = 10;
        desc === true ? this.sort = this.sort.replace(/,desc/, '') : this.sort = `${this.sort},desc`;
        this.getByCid ?
          this.getInstrumentByCid(this.page, this.size, this.$store.state.equipment.equipActive.id, this.sort, false) :
          this.getUserInstrument(this.page, this.size, this.sort, false);
      },
      getUserInstrument(page, size, sort = 'id', flag = false) {
        equipment
          .getUserInstrument({
            size: size,
            sort: sort,
            page: page
          })
          .then((res) => {
            if (flag) {
              this.$store.state.equipment.equipOnShow =
                this.$store.state.equipment.equipItems =
                  this.$store.state.equipment.equipOnShow.concat(res.data.content)
              if (res.data.content.length === 0) {
                this.busy = true
              } else {
                this.busy = false;
              }
            } else {
              this.$store.state.equipment.equipOnShow =
                this.$store.state.equipment.equipItems =
                  res.data.content;
              this.busy = false;
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
      getCategories() {
        equipment
          .getCategories()
          .then((res) => {
            this.$store.state.equipment.equipTypes = res.data;
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      },
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
      hideMenu(){
        this.menuShow = false;
      },
      getUserInfo() {
        user.getUserInfo()
          .then((res) => {
            // 如果邮箱为空或者未激活则提醒用户
            if (res.data.isEmailLocked === 0 || res.data.email === '') {
              this.$notify({
                title: '警告',
                message: '您尚未绑定邮箱或邮箱未激活，你将无法及时收到消息推送，为了提供更好的服务，请及时绑定您的邮箱',
                type: 'warning',
                offset: 100
              });
            }
            this.$store.state.user.username = res.data.username;
            this.$store.state.user.name = res.data.name;
            this.$store.state.user.id = res.data.id;
            this.$store.state.user.email = res.data.email;
            this.$store.state.user.isEmailLocked = res.data.isEmailLocked;
            this.$store.state.user.description = res.data.description;
            this.$store.state.user.avatar = res.data.avatar;
            this.$store.state.user.roles = res.data.roles;

          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`);
          });
      }
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
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    transition: all 0.3s;
    padding: 0;
    &.scrollDown {
      background-color: rgba(0, 0, 0, 0.9);
      padding: 15px 0;
      box-shadow: 5px 5px 50px #888888;
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

</style>
