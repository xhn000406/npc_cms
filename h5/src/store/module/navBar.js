import router from '@/router'
export default {
  state: {
    navBarItem: [
      { name: 'Home', title: '首页' }
    ]
  },
  getters: {
    getNavBarItem(state) {
      return state.navBarItem
    }
  },
  mutations: {
    setNavBarItem({ navBarItem }, route) {
      (!navBarItem.find(item => item.name === route.name)) && navBarItem.push(route)
    },

    removeNavBarItem({ navBarItem }, name) {
      navBarItem.forEach((item, i) => {
        if (item.name === name) {
          // 返回到上一个路由，然后把当前要删掉的路由给他删掉
          router.push({ name: navBarItem[i-1].name })
          navBarItem.splice(i, 1)
        }
      })
    }
  },
  actions: {
  }
}
