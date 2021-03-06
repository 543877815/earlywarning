<template>
  <div class="container">
    <Header :title="'基本信息'"></Header>
    <div class="content">
      <div class="top-wrapper">
        <div class="left-wrapper">
          <div class="name-wrapper">
            <div class="item">昵称：</div>
            <div class="input">
              <input type="text" class="name" :placeholder="$store.state.user.name" v-model="name">
            </div>
          </div>
          <div class="email-wrapper">
            <div class="item">邮箱：</div>
            <div class="input">
              <input type="text" class="email" readonly :placeholder="$store.state.user.email">
            </div>
          </div>
          <div class="phone-wrapper">
            <div class="item">手机：</div>
            <div class="input">
              <input type="text" class="phone" readonly placeholder="暂不可用">
            </div>
          </div>
        </div>
        <div class="right-wrapper">
          <div class="avatar-wrapper">
            <img :src="$store.state.user.avatar" height="250" width="250" ref="avatar">
            <input type="file" accept="*image/*" @click.stop="addImg($event)" ref="file">
          </div>
          <div class="update-wrapper">
            <div class="update" @click="imgUpdate">图片上传</div>
          </div>
        </div>
      </div>
      <div class="bottom-wrapper">
        <div class="briefInfo-wrapper">
          <div class="item">个人简介：</div>
          <textarea class="briefInfo" cols="30" rows="10" :placeholder="$store.state.user.description"
                    v-model="description"></textarea>
        </div>
        <div class="change" @click="modifyUserInfo">更改信息</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../header/header'
  import {createObjectURL} from '../../common/js/createObjectURL'
  import Url from '../../apis/Url'
  import User from '../../apis/User'
  import avatarDefault from '../../assets/avatar_default.png'

  const user = new User()

  export default {
    name: 'setting-info',
    data () {
      return {
        name: '',
        description: '',
        isPic: false
      }
    },
    components: {
      Header
    },
    methods: {
      getUserInfo () {
        user.getUserInfo()
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$store.state.user = res.data
              this.$store.state.user.avatar = res.data.avatar ? `${Url.request}${res.data.avatar}?_=${new Date().getTime()}` : avatarDefault
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      },
      modifyUserInfo () {
        if ((!this.name && !this.$store.state.user.name) || (!this.description && !this.$store.state.user.description)) {
          this.$message.error(`输入为空！`)
          return
        }
        user
          .modifyUserInfo({
            name: this.name || this.$store.state.user.name,
            description: this.description || this.$store.state.user.description
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`更改信息成功！`)
              this.getUserInfo()
            } else {
              this.$message.error(`提示：${res.msg}`)
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      },
      imgUpdate () {
        /* global FileReader FormData */
        let file = this.$refs.file.files[0]
        let data = new FormData()
        data.append('avatar', file)
        if (!file) {
          this.$message.error('图片为空！')
          return
        }
        if (!this.isPic) {
          this.$message.error(`不是图片！`)
          return
        }
        user
          .uploadAvatar({
            avatar: file
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`图片上传成功！`)
              this.getUserInfo()
            }
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      },
      addImg ($event) {
        $event.target.removeEventListener('change', this.loadImg)
        $event.target.addEventListener('change', this.loadImg)
      },
      loadImg (event) {
        let files = event.target.files
        let reader = new FileReader()
        let url = createObjectURL(files[0])
        if (url) {
          if (/image/.test(files[0].type)) {
            this.$refs.avatar.src = url
            reader.readAsDataURL(files[0])
          } else {
            this.$message.error('不是图片')
            this.isPic = false
            return
          }
        }
        reader.onerror = () => {
          this.$message.error('读取文件出错!')
        }
        reader.onprogress = (event) => {
          console.log('读取中...')
        }
        reader.onload = () => {
          this.$message.success('读取文件成功!')
          this.isPic = true
        }
      }
    },
    created () {
      // this.$refs.fileReader
    },
    mounted () {
      document.getElementsByTagName('body')[0].className = document.getElementsByTagName('html')[0].className = 'longPage'
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/sass/variables";

  $left-wrapper-width: $setting-container-left-wrapper-width;
  .container {
    .content {
      margin-top: 50px;
      padding-bottom: 50px;
      .top-wrapper {
        display: flex;
        flex-flow: row;
        width: 100%;
        position: relative;
        .left-wrapper {
          display: flex;
          flex-flow: column;
          width: $left-wrapper-width;
          .name-wrapper, .email-wrapper, .phone-wrapper {
            display: flex;
            flex-flow: column;
            justify-content: flex-start;
            .item {
              font-size: 22px;
              margin-bottom: 15px;
              color: $nav_index-color;
            }
            .input {
              height: 50px;
              width: 100%;
              margin-bottom: 30px;
              input {
                height: 100%;
                width: 100%;
                box-sizing: border-box;
                background-color: #e2e5e4;
                border-radius: 20px;
                padding-left: 20px;
                outline: 0;
              }
            }
          }
        }
        .right-wrapper {
          display: flex;
          flex-direction: column;
          width: 100% - $left-wrapper-width;
          position: relative;
          text-align: center;
          .avatar-wrapper {
            position: relative;
            width: 250px;
            margin: 30px auto 0;
            img {
              border-radius: 50%;
            }
            input {
              cursor: pointer;
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              outline: 0;
              opacity: 0;
            }
          }
          .update-wrapper {
            margin-top: 40px;
            .update {
              font-size: 24px;
              padding: 15px 10px;
              color: #fff;
              background-color: #326e9d;
              width: 38%;
              box-sizing: border-box;
              margin: 0 auto;
              border-radius: 10px;
              cursor: pointer;
            }
          }
        }
      }
      .bottom-wrapper {
        display: flex;
        flex-flow: column;
        width: 90%;
        margin-bottom: 100px;
        .briefInfo-wrapper {
          .item {
            font-size: 22px;
            color: $nav_index-color;
          }
          .briefInfo {
            margin-top: 20px;
            border-radius: 10px;
            background-color: #e2e5e4;
            width: 100%;
            height: 100%;
            min-height: 584px;
            font-size: 16px;
            padding: 10px 20px;
            outline: 0;
          }
        }
        .change {
          margin-top: 50px;
          font-size: 22px;
          color: #fff;
          background-color: $nav_index-color;
          width: 100px;
          border-radius: 10px;
          padding: 10px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
</style>

