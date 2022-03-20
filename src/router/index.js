import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import power from '@/beforeEach'
Vue.use(VueRouter)

export const generalRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  { path: '*', name: '404', component: () => import('@/views/404') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: generalRoutes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  power(to, from, next)
})
router.afterEach(() => {
  NProgress.done()
})

// hook这个router的push函数
const mRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location) {
  return mRouterPush
  .call(this, location)
  .catch(err => err)
}

export default router
