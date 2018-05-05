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
           v-if="$store.state.equipment.equipItems.length === 0">尚未添加仪器？先去
          <router-link to="/management">仪器管理</router-link>
          添加仪器吧！
        </p>
        <equipItem v-for="(item,index) in $store.state.equipment.equipItems"
                   :equipItem="item"
                   :key="index">
        </equipItem>
      </div>
      <div class="learnMore"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="busy"
           infinite-scroll-distance="20">
        <img src="/static/loading-svg/loading-spinning-bubbles.svg" v-if="loading">
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
      <transition name="modal">
        <modal v-if="$store.state.equipment.equipOnShow" :wrapperClass="'equipDetail'" @hideDetail="hideDetail">
          <div class="title" slot="header">仪器详情</div>
          <div class="intro" slot="body">
            <div class="img-wrapper">
              <img v-lazy="$store.state.equipment.equipOnShowItem.picUrl" width="300" height="300">
            </div>
            <div class="intro-wrapper">
              <div class="name">
                {{$store.state.equipment.equipOnShowItem.name}}
                <span class="id">ID：{{$store.state.equipment.equipOnShowItem.id}}</span>
              </div>
              <div class="insType">型号：{{$store.state.equipment.equipOnShowItem.insType}}</div>
              <div class="param">参数：{{$store.state.equipment.equipOnShowItem.param}}</div>
              <div class="param">使用年限：{{$store.state.equipment.equipOnShowItem.durableYears}}</div>
              <div class="detail-intro">仪器简介：{{$store.state.equipment.equipOnShowItem.description}}</div>
              <div class="thresholdValue">告警阈值：{{$store.state.equipment.equipOnShowItem.thresholdValue}}</div>
              <div class="present-thresholdValue">当前阈值：</div>
            </div>
          </div>
          <div class="history" slot="body">
            <div class="title">历史阈值</div>
          </div>
          <div class="others" slot="body"></div>
        </modal>
      </transition>
    </div>
    <Footer :position="'relative'"></Footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import navigator from '../../components/navigator/navigator'
  import Footer from '../../components/footer/footer'
  import Parallax from '../../components/Parallax/Parallax'
  import menubar from '../../components/index-menubar/index-menubar'
  import Menu from '../../components/index-menu/index-menu'
  import equipItem from '../../components/equipItem/equipItem'
  import showControl from '../../components/showControl/showControl'
  import ScrollToY from '../../components/scrollToY/scrollToY'
  import modal from '../../components/modal/modal'

  import _ from 'underscore'

  import Equipment from '../../apis/Equipment'

  const equipment = new Equipment();

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
        loading: false,
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
      ScrollToY,
      modal
    },
    mounted() {
      document.getElementsByTagName('body')[0].className =
        document.getElementsByTagName('html')[0].className = 'scrollPage';

      particlesJS("particles-js", this.$store.state.common.particlesConfig);

      this.navHeight = this.$refs.nav.$el.offsetHeight;
      this.iconShowHeight = this.$refs.Masthead.$el.offsetHeight;

      this.throttleload = _.throttle(this.scrollControl, 100)
      window.addEventListener("scroll", this.throttleload, false);

      if (this.$store.state.equipment.equipTypes.length === 0) {
        this.getCategories();
      }

      this.getByCid ?
        this.getInstrumentByCid(this.page, this.size, this.$store.state.equipment.equipTypeActive.id, this.sort, false) :
        this.getUserInstrument(this.page, this.size, this.sort, false);
    },
    created() {

    },
    methods: {
      hideDetail() {
        this.$store.state.equipment.equipOnShow = false;
        document.getElementsByTagName('body')[0].style.overflow = "auto";
      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.busy = false;
          this.page++;
          this.getByCid ?
            this.getInstrumentByCid(this.page, this.size, this.$store.state.equipment.equipTypeActive.id, this.sort, true) :
            this.getUserInstrument(this.page, this.size, this.sort, true);
        }, 500);
      },
      changeEquipActive() {
        this.page = 0;
        this.size = 10;
        this.$store.state.equipment.equipTypeActive.id === 0 ? this.getByCid = false : this.getByCid = true;
        this.getByCid ?
          this.getInstrumentByCid(this.page, this.size, this.$store.state.equipment.equipTypeActive.id, this.sort, false) :
          this.getUserInstrument(this.page, this.size, this.sort, false);
      },
      getInstrumentByCid(page, size, cid, sort = 'id', flag = false) {
        this.loading = true;
        equipment
          .getInstrumentByCid({
            page: page,
            size: size,
            cid: cid,
            sort: sort,
          })
          .then((res) => {
            this.loading = false;
            if (flag) {
              this.$store.state.equipment.equipItems =
                this.$store.state.equipment.equipItems.concat(res.data.content)
              if (res.data.content.length === 0) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
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
          this.getInstrumentByCid(this.page, this.size, this.$store.state.equipment.equipTypeActive.id, this.sort, false) :
          this.getUserInstrument(this.page, this.size, this.sort, false);
      },
      getUserInstrument(page, size, sort = 'id', flag = false) {
        this.loading = true
        equipment
          .getUserInstrument({
            size: size,
            sort: sort,
            page: page
          })
          .then((res) => {
            this.loading = false;
            if (flag) {
              this.$store.state.equipment.equipItems =
                this.$store.state.equipment.equipItems.concat(res.data.content)
              if (res.data.content.length === 0) {
                this.busy = true
              } else {
                this.busy = false;
              }
            } else {
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
       * toggle the index-menu
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

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/sass/components/equipmentModal';
  @import '../../common/sass/components/modal-transition';

  .window {
    width: 100%;
    height: 100%;
    overflow: visible;
    position: relative;
    z-index: 2;
    .nav {
      background: rgba(255, 255, 255, 0) !important;
      position: fixed !important;
      z-index: 9999;
      top: 0;
      left: 0;
      width: 100%;
      transition: all 0.3s;
      padding: 0;
      .right {
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
      &.scrollDown {
        background-color: rgba(0, 0, 0, 0.9) !important;
        padding: 15px 0;
        box-shadow: 5px 5px 50px #888888;
        &:hover {
          background-color: rgba(0, 0, 0, 1);
        }
      }
    }

    .Masthead {
      z-index: 1;
    }
    .content {
      width: 100%;
      position: relative;
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
      .equipDetail {
        @include equipmentModal
      }
      .learnMore {
        display: flex;
        flex-flow: row;
        justify-content: center;
      }
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

      @include modal-transition;

    }
  }


</style>

