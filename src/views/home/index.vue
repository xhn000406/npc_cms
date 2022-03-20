<template>
  <div>
    <button v-power="'system:role:insert'">增</button>
    <button v-power="'system:role:delete'">删</button>
    <button v-power="'system:user:update'">改</button>
    <button v-power="'system:role:query'">查</button>
    <svg-icon svg-name="home"></svg-icon>
  </div>
</template>
<script>
import {
  apiGetUserInfo
} from '@/api/user'
export default {
  data () {
    return {}
  },

  async mounted() {
    console.log(await apiGetUserInfo())
  }
}
</script>
<style lang="less" scoped>
</style>
