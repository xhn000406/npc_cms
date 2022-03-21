import Vue from 'vue'
import Vuex from 'vuex'
import navBar from './module/navBar'
import menuBar from './module/menuBar'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navBar,
    menuBar
  }
})
