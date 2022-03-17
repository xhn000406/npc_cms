<template>
  <aside>
    <h1 class="logo">
      <img :src="Logo" alt="logo">
    </h1>
  </aside>
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
aside{
  overflow: hidden;
  .logo{
    background-color: #fff;
    height: 70px;
    img{
      position: relative;
      width: 250px;
      left: -5px;
    }
  }
}
</style>
