<template>
  <div class="menubar">
    <div class="left">
      <div class="dropdownMenu-wrapper">
        <div class="icon-wrapper" @click="menuControl">
          <img src="./icon-menubar.png" width="40px" height="30px">
        </div>
      </div>
      <div class="search-wrapper">
        <div class="input-wrapper">
          <input type="text" placeholder="关键词搜索">
        </div>
        <div class="icon-wrapper">
          <img src="./icon-search.png" width="30px" height="30px">
        </div>
        <div class="class">
          {{$store.state.equipment.equipTypeActive.name}}:
        </div>
      </div>
    </div>
    <div class="right">
      <div class="form">方式：默认排序</div>
      <div class="sort" @click="switchSort">ID排序</div>
      <div class="triangle" :class="{down:triangleDown,up:!triangleDown}"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        triangleDown: false
      }
    },
    components: {},
    methods: {
      switchSort() {
        this.triangleDown = !this.triangleDown;
        this.$emit('switchSort', this.triangleDown);
      },
      menuControl() {
        this.$emit("menuControl");
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/variables";

  .menubar {
    font-size: 20px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    height: $index-menubar-height;
    background-color: rgba(222, 222, 222, 0.5);
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    position: relative;
    overflow: visible;
    &:hover {
      background-color: rgba(222, 222, 222, 0.78);
    }
    .left {
      .icon-wrapper {
        cursor: pointer;
      }
      display: flex;
      flex-flow: row;
      .dropdownMenu-wrapper {
        display: flex;
        flex-flow: column;
        justify-content: center;
        margin: 0 18px 0 16px;
      }
      .search-wrapper {
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        .input-wrapper {
          height: 100%;
          display: flex;
          flex-flow: column;
          justify-content: center;
          input {
            height: 60%;
            width: 276px;
            border: 2px solid black;
            box-sizing: border-box;
            border-radius: 50px;
            padding-left: 20px;
            outline: none;
          }
        }
        .icon-wrapper {
          margin: 0 40px 0 10px;
        }
      }
    }
    .right {
      min-width: 520px;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      .sort {
        margin: 0 10px 0 90px;
        cursor: pointer;
      }
      .triangle {
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        &.down {
          border-bottom: 12px solid black;
        }
        &.up {
          border-top: 12px solid black;
        }
      }
    }

  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
