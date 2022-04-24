<template>
  <div class="container">
    <blue-group :power="power" />
  </div>
</template>
<script>
import { routes } from '@/router'
const mRoutes = routes.find(item => item.name === 'Power')
export default {
  data() {
    return {
      power: mRoutes.children || []
    }
  }
}
</script>
<style lang="less" scoped>
</style>
