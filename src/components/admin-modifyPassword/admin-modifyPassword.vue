<template>
  <div class="modify-password">
    <el-form ref="form" label-width="100px">
      <el-form-item label="旧密码">
        <el-input
          type="password"
          v-model="oldPassword"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          type="password"
          v-model="newPassword"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="重复新密码">
        <el-input
          type="password"
          v-model="newPasswordRepeat"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="modifyPassword">
          修改密码
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import User from '../../apis/User'
const user = new User()
export default {
    data () {
      return {
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: ''
      }
    },
    methods: {
      modifyPassword () {
        if (!this.oldPassword || !this.newPassword || !this.newPasswordRepeat) {
          this.$message.error(`输入不能为空！`)
          return
        }
        if (this.newPassword !== this.newPasswordRepeat) {
          this.$message.error('两次输入密码不一致！')
          return
        }
        if (!/^.*[a-zA-Z]+.*$/.test(this.newPassword) ||
          !/^.*[0-9]+.*$/.test(this.newPassword) ||
          !/^.*[/^/$/.//,;:'!@#%&/*/|/?/+/(/)/[/\]/{/}]+.*$/.test(this.newPassword) ||
          this.newPassword.length <= 5 ||
          this.newPassword.length >= 17) {
          this.$message.error('密码必须包含数字、字母、特殊字符三种,长度属于6-16位之间')
          return
        }
        user
          .updatePassword({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          })
          .then((res) => {
            if (res.ret === 200 && res.msg === 'success') {
              this.$message.success(`修改密码成功！`)
            } else {
              this.$message.error(`提示：${res.msg}`)
            }
            console.log(res)
          })
          .catch((err) => {
            this.$message.error(`[系统提醒: ${err.msg}]`)
          })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .modify-password{
    width: 500px;
  }
</style>
