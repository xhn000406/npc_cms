<template>
  <div>
    <div>
      <div>这里测试按钮权限</div>
      <blue-button v-power="'system:rule:insert'">增加</blue-button>
      <blue-button v-power="'system:rule:delete'">删除</blue-button>
      <blue-button v-throttle v-power="'system:rule:update'">更新(顺便测试节流)</blue-button>
      <blue-button v-power="'system:rule:query'">查找</blue-button>
    </div>
    <div>
      <div>测试封装的图标组件</div>
      <blue-icon svg-name="home"></blue-icon>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
</style>
