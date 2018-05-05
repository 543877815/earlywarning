<template>
  <div class="menu">
    <ul class="lists">
      <li class="item" data-id="0" @click="switchEquip(all)">所有</li>
      <li class="item" v-for="equipListItem in $store.state.equipment.equipTypes" :data-id="equipListItem.id"
          @click="switchEquip(equipListItem)">{{equipListItem.name}}
      </li>
    </ul>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        all: {
          name: '所有',
          id: 0,
        }
      }
    },
    props: {
      menuShow: {
        default: false,
        type: Boolean
      }
    },
    methods: {
      switchEquip(item) {
        this.$store.commit("changeEquipActive", item);
        this.$emit('changeEquipActive');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/variables";

  .menu {
    text-align: center;
    box-sizing: border-box;
    width: 15%;
    height: calc(100% - #{$index-menubar-height});
    max-height: calc(100% - #{$index-menubar-height});
    background-color: rgba(58, 59, 72, 0.7);
    overflow: auto;
    z-index: 999;
    color: #fff;
    font-size: 20px;
    position: absolute;
    left: 0;
    top: $index-menubar-height;
    border: 2px solid #fff;
    .lists {
      height: 100%;
      width: 100%;
      .item {
        padding: 25px 0;
        border-bottom: 2px solid #fff;
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          background-color: rgba(58, 59, 72, 0.8);
        }
      }
    }
  }
</style>
