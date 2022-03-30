<template>
  <div class="nav">
    <template v-for="(item, i) in routers">
      <el-submenu
        v-if="item.children"
        :key="i"
        :index="item.name"
      >
        <template slot="title">
          <blue-icon :svg-name="item.meta.icon" size="1.3em"></blue-icon>
          <span style="margin-left: 10px">{{ item.meta.title }}</span>
        </template>
        <router-item
          v-if="item.children"
          :routers="item.children"
        />
      </el-submenu>
      <el-menu-item
        v-if="!item.children"
        :key="i"
        :index="item.name"
        @click="routerGo(item.name)"
      >
        <blue-icon :svg-name="item.meta.icon" size="1.3em"></blue-icon>
        <span style="margin-left: 10px">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'RouterItem',
  props: ['routers'],
  data() {
    return {}
  },
  methods: {
    routerGo(name) {
      this.$router.push({ name })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
