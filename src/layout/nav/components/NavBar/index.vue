<template>
  <div class="nav_bar">
    <div
      v-for="(item, i) in navBarItem"
      :key="i"
      :class="{
        nav_bar_item: true,
        active: $route.name === item.name
      }"
      @click="$router.push({ name: item.name })"
    >
      <span>{{ item.title }}</span>
      <i
        v-if="item.name !== 'Home'"
        class="el-icon-close"
        @click.stop="removeNavBarItem(item.name)"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
const SESSION_KEY = 'NavBarItem'
export default {
  computed: {
    ...mapGetters({
      'navBarItem': 'getNavBarItem'
    })
  },

  methods: {
    ...mapMutations(['setNavBarItem', 'removeNavBarItem'])
  },

  data() {
    return {
      navbarItem: []
    }
  },

  mounted() {
    const mNavBarItem = sessionStorage.getItem(SESSION_KEY)
    mNavBarItem && JSON.parse(mNavBarItem).forEach(item => this.setNavBarItem(item))
  },

  watch: {
    // 当路由发生变化，把路由放到vuex里面，顺便放在session里面，用于刷新后重现
    $route: function(route) {
      this.setNavBarItem({ name: route.name, title: route.meta.title })
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(this.navBarItem))
    },
    $navBarItem: function() {
      this.navbarItem = this.$navBarItem
    }
  }
}
</script>
<style lang="less" scoped>
.nav_bar{
  user-select: none;
  .nav_bar_item{
    text-align: center;
    font-size: 12px;
    margin: 2px 5px;
    display: inline-block;
    padding: 2px 5px;
    border-radius: 5px;
    background-color: #ccc;
    color: #fff;
    transition: background .2s;
    &.active{
      color: #fff;
      background-color: var(--globalColor);
    }
    cursor: pointer;
    i{
      margin-left: 10px;
      cursor: pointer;
      display: inline-block;
      font-weight: bold;
      border-radius: 50%;
      padding: 2px;
      transition: background .2s;
      &:hover{
        background-color: #fff;
        color: var(--globalColor);
      }
    }
  }
}
</style>
