<template>
  <nav>
    <div
      v-for="(item, i) in nav"
      :key="i"
      :class="{
        nav_item: true,
        active: $route.name === item.name
      }"
      @click="$router.push({ name: item.name })"
    >
      <blue-icon
        size="1.5em"
        :svg-name="$route.name === item.name ? item.icon_hover : item.icon"
      />
      <div>{{ item.title }}</div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      nav: [
        { title: '功能', name: 'Home', icon: 'tab_power', icon_hover: 'tab_power_active' },
        { title: '我的', name: 'Me', icon: 'tab_me', icon_hover: 'tab_me_active' }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
nav{
  display: flex;
  align-items: center;
  box-shadow: 0 0 4px 1px #ccc;
  .nav_item{
    padding: 10px;
    flex: 1;
    text-align: center;
    font-size: 14px;
    &.active{
      color: #005CA1;
    }
  }
}
</style>
