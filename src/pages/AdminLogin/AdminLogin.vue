<template>
  <div class="admin-login">
    <div>sdflsdjfla</div>
    <showControl v-show="iconShow" :right="50" :bottom="115"></showControl>
  </div>
</template>

<script type="text/ecmascript-6">
  import showControl from '../../components/showControl/showControl'
  export default {
    data() {
      return {
        iconShowHeight: 0,
        iconShow: false,
      }
    },
    components: {
      showControl
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
