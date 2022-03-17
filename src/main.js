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
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$msgBox = ElementUI.MessageBox
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
