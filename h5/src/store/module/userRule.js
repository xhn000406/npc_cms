export default {
  state: {
    userRule: [],
    userInfo: {}
  },
  getters: {
    getUserRule(state) {
      return state.userRule
    },
    getUserInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    setUserRule(state, menu) {
      state.userRule = menu
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
  }
}
