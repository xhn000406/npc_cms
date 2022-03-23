export default {
  state: {
    userRule: []
  },
  getters: {
    getUserRule(state) {
      return state.userRule
    }
  },
  mutations: {
    setUserRule(state, menu) {
      state.userRule = menu
    }
  },
  actions: {
  }
}
