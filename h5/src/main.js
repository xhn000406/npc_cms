import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueGlobalComponent from '@/module/vueGlobalComponent'
import vueDirective from '@/module/vueDirective'

// 引入全局组件的函数
vueGlobalComponent(Vue)
// 这个是用于引入自定义全局v-什么什么的地方
vueDirective(Vue)

// 引入全局样式表
import '@/style/index.less'

// 引入elementUI并且暴露出一个全局的消息框函数
import ElementUI from 'element-ui'
import '@/style/elementUI.css'
Vue.prototype.$msgBox = ElementUI.MessageBox
Vue.prototype.$msg = ElementUI.Message

// console.log(Vue.$msgBox)
Vue.use(ElementUI)

// 这儿的导航守卫只对应权限操作
// router.beforeEach((to, from, next) => power(to, from, next))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
