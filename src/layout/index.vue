<template>
  <div class="layout">
    <layout-header />
    <main>
      <layout-aside />
      <section>
        <layout-nav />
        <article>
          <router-view />
        </article>
      </section>
    </main>
  </div>
</template>
<script>
import LayoutHeader from './header'
import LayoutAside from './aside'
import LayoutNav from './nav'
export default {
  components: {
    LayoutHeader,
    LayoutNav,
    LayoutAside
  },

  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.layout{
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  background-color: #f4f4f4;
  header{
    height: 30px;
    background-color: var(--globalColor);
    z-index: 1;
  }
  main{
    z-index: 0;
    flex: 1;
    display: flex;
    aside{
      z-index: 1;
      width: 250px;
      background-color: #004477;
      box-shadow: 0 0 4px 1px #e0e0e0;
    }
    section{
      flex: 1;
      display: flex;
      flex-flow: column;
      nav{
        margin: 10px;
        margin-bottom: 0;
        border-radius: 10px;
        // padding: 10px;
      }
      article{
        padding: 10px;
        background-color: #fff;
        flex: 1;
        margin: 10px;
        border-radius: 10px;
      }
    }
  }
}
</style>
