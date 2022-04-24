<template>
  <div class="app-container">
    <layout-header />
    <main>
      <router-view />
    </main>
    <layout-nav />
  </div>
</template>
<script>
import LayoutNav from './nav'
import LayoutHeader from './header'
export default {
  components: {
    LayoutNav,
    LayoutHeader
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.app-container{
  height: 100vh;
  display: flex;
  flex-flow: column;
  main{
    flex: 1;
    overflow: auto;
    background-color: #f4f4f4;
  }
}
</style>
