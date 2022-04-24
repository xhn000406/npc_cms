import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.less'
import '@/icons'

import BlueGroup from '@/components/BlueGroup'
import BlueIcon from '@/components/BlueIcon'
Vue.component('BlueIcon', BlueIcon)
Vue.component('BlueGroup', BlueGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
