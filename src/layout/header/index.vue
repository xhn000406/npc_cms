<template>
  <header>
    <router-link to="#">登陆</router-link>
    <router-link to="#">注册</router-link>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <span>欢迎您：13025223354</span>
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>
<script>
import Logo from '@/assets/logo.png'
export default {
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
  ::v-deep.el-dropdown-link{
    cursor: pointer;
    color: #fff;
    margin: 0 10px;
    outline: none;
  }
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a{
    color: #fff;
    display: inline-block;
    margin: 0 10px;
    text-decoration: none;
    font-size: 14px;
  }
}
</style>
