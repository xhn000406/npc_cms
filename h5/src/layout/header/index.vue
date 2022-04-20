<template>
  <header>
    <div class="header_left">{{ systemInfo.title }}</div>
    <div class="header_right">
      <el-dropdown
        v-if="getToken"
        trigger="click"
      >
        <span class="el-dropdown-link">
          <span>欢迎您：{{ getUserInfo.nickName }}</span>
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="editInfo">个人信息</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="exitLogin">退出登陆</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <blue-popup
      formName="编辑用户信息"
      position="center"
      :useButton="false"
      :show="popup"
      @hide="popup = false"
    >
      <el-form>
        <el-form-item label="用户名">
          <el-input
            size="mini"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="账号">
          <el-input size="mini" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            size="mini"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
      </el-form>
    </blue-popup>
  </header>
</template>
<script>
import config from '@/config'
import { getToken, delToken } from '@/utils/session'
import Logo from '@/assets/logo.png'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getUserInfo']),
    getToken() {
      return getToken()
    }
  },
  data () {
    return {
      Logo,
      systemInfo: config.SYSTEM_INFO,
      popup: false,
      infoForm: {
        params: {

        },
        rules: [

        ]
      }
    }
  },

  methods: {
    exitLogin() {
      delToken()
      this.$router.push({ name: 'Login' })
    },

    editInfo() {
      this.$router.push({ name: 'Info' })
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
