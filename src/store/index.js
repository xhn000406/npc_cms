import Vue from 'vue'
import Vuex from 'vuex'
import navBar from './module/navBar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navBar
  }
})
