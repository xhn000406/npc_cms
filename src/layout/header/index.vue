<template>
  <header>
    <div class="header_left">体质健康监测系统v1.0-Beta</div>
    <div class="header_right">
      <!-- <router-link :to="{ name: 'Login' }">登陆</router-link>
      <router-link :to="{ name: 'Login' }">注册</router-link> -->
      <el-dropdown
        v-if="getToken"
        trigger="click"
      >
        <span class="el-dropdown-link">
          <span>欢迎您：13025223354</span>
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { getToken } from '@/utils/session'
import Logo from '@/assets/logo.png'
export default {
  computed: {
    getToken() {
      return getToken()
    }
  },
  data () {
    return {
      Logo
    }
  }
}
</script>
<style lang="less" scoped>
header{
  user-select: none;
  display: flex;
  justify-content: space-between;
  ::v-deep.el-dropdown-link{
    cursor: pointer;
    color: #fff;
    margin: 0 10px;
    outline: none;
  }
  .header_left, .header_right{
    color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
  }
  .header_left{
    padding-left: 5px;
  }
  a{
    color: #fff;
    display: inline-block;
    margin: 0 10px;
    text-decoration: none;
  }
}
</style>
