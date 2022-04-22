<template>
  <div class="layout">
    <layout-header />
    <main>
      <layout-aside />
      <section>
        <layout-nav />
        <article>
          <router-view />
          <!-- 路由缓存机制 -->
          <!-- <keep-alive v-if="$route.meta.keepAlive">
            <router-view />
          </keep-alive>
          <router-view v-else /> -->
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
@keyframes showMain{
  form {
    opacity: 0;
  } to {
    opacity: 1;
  }
}
.layout{
  min-height: 100vh;
  min-width: 1000px;
  display: flex;
  flex-flow: column;
  background-color: #f4f4f4;
  header{
    height: 30px;
    background-color: var(--globalColor);
    z-index: 1;
  }
  main{
    // z-index: 1;
    flex: 1;
    display: flex;
    flex-shrink: 0;
    transition: background .5s;
    aside{
      // z-index: 1;
      // width: 250px;
      background-color: var(--globalColor);
      box-shadow: 0 2px 4px 1px #e0e0e0;
      transition: background .2s;
    }
    section{
      flex: 1;
      display: flex;
      flex-flow: column;
      nav{
        margin: 10px;
        margin-bottom: 0;
        border-radius: 10px;
        transition: background .2s;
        // padding: 10px;
      }
      article{
        transition: background .2s;
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
