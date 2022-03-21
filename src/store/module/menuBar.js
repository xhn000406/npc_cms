export default {
  state: {
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
    }
  },
  actions: {
  }
}
