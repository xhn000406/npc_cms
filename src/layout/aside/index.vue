<template>
  <aside>
    <h1 class="logo" @click="$router.push({ name: 'Home' })">
      <img :src="Logo" alt="logo">
    </h1>
    <el-menu
      class="menu"
      :default-active="$route.name"
    >
      <nav-item :routers="routers" />
    </el-menu>
  </aside>
</template>
<script>
import Logo from '@/assets/logo.png'
import NavItem from './components/RouterItem'
import { asyncRoute } from '@/router'
export default {
  components: {
    NavItem
  },
  data () {
    return {
      Logo,
      routers: asyncRoute[0].children
    }
  },

  mounted() {
    console.log(asyncRoute[0])
  }
}
</script>
<style lang="less" scoped>
.menuItemActive(@border: none) {
  box-sizing: border-box;
  border-left: @border;
  background: linear-gradient(
    to right,
    var(--globalColor),
    #e0e0e0
  ) !important;
}
aside{
  overflow: hidden;
  .logo{
    cursor: pointer;
    background-color: var(--logoBackground);
    height: 70px;
    img{
      position: relative;
      width: 250px;
      left: -5px;
    }
  }
  .menu{
    user-select: none;
    ::v-deep.el-menu{
      background-color: transparent;
    }
    background-color: var(--globalAsideBackground);
    border-right: none;
    ::v-deep.el-menu-item,::v-deep.el-submenu__title{
      color: #fff;
    }
    ::v-deep.el-menu-item, ::v-deep.el-submenu__title{
      transition: none !important;
      &.is-active{
        .menuItemActive(5px solid #fff);
      }
      &:hover{
        .menuItemActive();
      }
    }
  }
}
</style>
