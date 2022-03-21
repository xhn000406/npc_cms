export default {
  state: {
    activeRouterPath: '/',
    menuBarItem: []
  },
  getters: {
    getMenuBarItem(state) {
      return state.menuBarItem
    }
  },
  mutations: {
    setMenuBarItem(state, menu) {
      state.menuBarItem = menu
    },
    // 设置当前的动态路由的点击位置
    setActiveRouterPath(state, path) {
      state.activeRouterPath = path
    }
  },
  actions: {
  }
}
