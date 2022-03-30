<template>
  <nav>
    <div class="nav">
      <div
        v-for="(item, i) in navItem"
        :key="i"
        class="nav_item"
        :title="item.title"
        @click="item.callback(item.name)"
      >
        <blue-icon :svg-name="item.icon" size="1.3em"/>
      </div>
    </div>
    <div class="control">
      <div class="control_body">
        <nav-bar />
      </div>
    </div>
  </nav>
</template>
<script>
import NavBar from './components/NavBar'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      navItem: [
        { name: 'menu', title: '菜单', icon: 'menu', callback: this.menuCallback },
        { name: 'home', title: '首页', icon: 'home', callback: this.menuCallback },
        { name: 'refresh', title: '刷新', icon: 'refresh', callback: this.menuCallback },
      ]
    }
  },

  methods: {
    menuCallback(type) {
      if (type === 'refresh') window.history.go()
      if (type === 'home') this.$router.push({ name: 'Home' })
    }
  }
}
</script>
<style lang="less" scoped>
nav {
  background-color: #fff;
  display: flex;
  overflow: hidden;
  .nav {
    padding: 0 10px;
    display: flex;
    align-items: center;
    .nav_item {
      padding: 15px 10px;
      cursor: pointer;
      transition: background .2s;
      &:hover{
        background-color: rgba(#ccc, .5);
      }
    }
  }
  .control {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    .control_body{
      background-color: #f4f4f4;
      width: 100%;
      padding: 5px;
      border-radius: 10px;
    }
  }
}
</style>
