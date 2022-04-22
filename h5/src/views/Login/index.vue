<template>
  <div class="container">
    <h1>大学生体质健康状况检测系统 v1.0</h1>
    <div class="login_body">
      <el-form>
        <el-form-item label="账号：">
          <el-input clearable placeholder="请输入账号" v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input clearable placeholder="请输入密码" type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item style="text-align: right;">
          <router-link to="#">注册</router-link>
        </el-form-item>
        <el-form-item>
          <el-button @click="userLogin">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  setToken
} from '@/utils/session'
import md5 from 'md5'
import {
  apiUserLogin
} from '@/api/user'
export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: 'admin'
      }
    }
  },

  methods: {
    async userLogin() {
      if (this.form) {
        const mForm = this.form
        const mPass = this.encodePassword(mForm.password)
        const mToken = await apiUserLogin({ ...this.form, password: mPass })
        if (mToken) {
        setToken(mToken)
        window.location.href = '/'
      }
      }
    },

    encodePassword(pass) {
      const mPassword = md5(pass)
      const mRes = md5(mPassword + mPassword.slice(mPassword.length - 5))
      return mRes
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  h1{
    margin: 20px 0;
    color: #fff;
  }
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: var(--globalColor);
  .login_body {
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 0 4px 1px #ccc;
    width: 400px;
    background-color: #fff;
  }
}
</style>
