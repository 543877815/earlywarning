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
  import navigator from '../../components/nav_index/nav_index';
  import sidebar from '../../components/sidebar/sidebar'
  import Footer from '../../components/footer/footer'
  import showControl from '../../components/showControl/showControl'
  import User from '../../apis/User';
  const user = new User();

  export default {
    components: {
      navigator,
      sidebar,
      Footer,
      showControl
    },
    methods:{
      getUserInfo() {
        user.getUserInfo()
          .then((res) => {
            if (res.data.isEmailLocked === 0 || res.data.email === ''){
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
            this.$store.state.user.email = res.data.email || '';
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
    mounted(){
      if (!this.$store.state.user.id){
        this.getUserInfo();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
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


<style lang="scss" rel="stylesheet/scss" scoped>

</style>
