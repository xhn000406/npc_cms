import Vue from "vue";
import Vuex from "vuex";
import navBar from "./module/navBar";
import menuBar from "./module/menuBar";
import userRule from "./module/userRule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    navBar, // 跟随路由变化的导航
    menuBar, // 左侧菜单栏
    userRule, // 用户权限
  },
});
