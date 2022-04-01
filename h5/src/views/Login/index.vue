<template>
  <div class="container">
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
import {
  apiUserLogin
} from '@/api/user'
export default {
  data() {
    return {
      form: {
        username: '123',
        password: '123'
      }
    }
  },
  methods: {
    async userLogin() {
      const mToken = await apiUserLogin({ ...this.form })
      if (mToken) {
        setToken(mToken)
        window.location.href = '/'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container {
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
