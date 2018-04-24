<template>
  <div :class="wrapperClass" @click="stopPropagation">
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
            <div class="icon-wrapper" @click.stop.prevent="hideDetail">
              <img src="./close.png" width="15" height="15">
            </div>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
            <button type="button" class="btn btn-default" @click.stop.prevent="hideDetail">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      equipItem: {
        default: () => {
          return {};
        },
        type: Object
      },
      wrapperClass: {
        default: null,
        type: String
      }
    },
    methods: {
      hideDetail() {
        this.$emit("hideDetail")
      },
      stopPropagation(event){
        event.stopPropagation();
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-y: auto;
    overflow-x: hidden;
    .modal-dialog {
      position: relative;
      margin: 30px auto;
      width: 900px;
      /*height: 1200px;*/
      border-radius: 6px;
      .modal-content {
        border: 1px solid rgba(0, 0, 0, .2);
        background-color: #fff;
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
        border-radius: 6px;
        outline: 0;
        .modal-header {
          padding: 15px;
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          border-bottom: 1px solid #e5e5e5;
          .icon-wrapper {
            cursor: pointer;
          }
        }
        .modal-body {
          padding: 15px;

        }
        .modal-footer {
          padding: 15px 0;
          margin: 0 15px;
          text-align: right;
          border-top: 1px solid #e5e5e5;
          .btn-default {
            text-shadow: 0 1px 0 #fff;
            background-image: linear-gradient(top, #fff 0, #e0e0e0 100%);
            background-repeat: repeat-x;
            border-color: #dbdbdb;
            border-color: #ccc;
          }
          .btn-primary {
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
          }
          .btn {
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgba(0, 0, 0, .075);
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            touch-action: manipulation;
            cursor: pointer;
            user-select: none;
            border: 1px solid rgb(204, 204, 204);
            border-radius: 4px;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, .2);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgba(0, 0, 0, .075);
          }
        }
      }
    }
  }
</style>
