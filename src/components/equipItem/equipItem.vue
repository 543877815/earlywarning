<template>
  <div class="equipItem"  @click="showDetail(equipItem)">
    <img v-lazy="equipItem.picUrl" width="500" height="500" class="brief-img">
    <div class="equipIntro">
      <h3 class="name">{{equipItem.name}}<span class="id">ID：{{equipItem.id}}</span></h3>
      <p>种类：{{equipItem.category.name}}</p>
      <p>型号：{{equipItem.insType}}</p>
      <p>参数：{{equipItem.param}}</p>
      <p>使用年限：{{equipItem.durableYears}}</p>
      <p>告警阈值：{{equipItem.thresholdValue}}</p>
      <p>仪器简介：</p>
      <p class="intro">{{equipItem.description}}</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import modal from '../modal/modal'
  export default {
    props: {
      equipItem: {
        default: {},
        type: Object
      }
    },
    components:{
      modal
    },
    methods:{
      showDetail(item){
        this.$store.state.equipment.equipOnShow = true;
        this.$store.state.equipment.equipOnShowItem = item;
        document.getElementsByTagName('body')[0].style.overflow = "hidden";
      },
    },
    mounted(){

    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .equipItem {
    width: 500px;
    height: 500px;
    cursor: pointer;
    margin-bottom: 50px;
    position: relative;
    box-shadow: 10px 10px 50px #888888;
    overflow: hidden;
    &:hover {
      img.brief-img {
        transform: scale3d(1.05, 1.05, 1);
      }
      .equipIntro {
        transform: scale3d(1, 1, 1);
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
      }
    }
    img.brief-img {
      transform: scale3d(1, 1, 1);
      transition: all 0.3s;
    }
    .equipIntro {
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box;
      padding-top: 90px;
      color: white;
      background-color: rgba(0, 0, 0, 0);
      opacity: 0;
      transform: scale3d(1.4, 1.4, 1.1);
      transition: all 0.3s;
      .name {
        font-size: 24px;
        padding-bottom: 20px;
        border-bottom: 1px solid white;
        width: 375px;
        margin: 0 auto;
        position: relative;
        .id {
          font-size: 16px;
          position: absolute;
          right: 0;
          bottom: 5px;
        }
      }
      p {
        font-size: 20px;
        margin: 20px 0;
        &.intro {
          width: 70%;
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-height: 1.2em;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }

  }
</style>
