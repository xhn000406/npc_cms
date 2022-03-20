import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: { name: 'Home' },
    component: () => import('@/layout'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: { title: '首页', icon: 'menu_home', keepAlive: true }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/Setting'),
        children: [

        ],
        meta: { title: '系统设置', icon: 'menu_set', keepAlive: true }
      }
    ]
  },
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
  routes
})

// router.addRoutes()

// 导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

// hook这个router的push函数
const mRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location) {
  return mRouterPush.call(this, location).catch(err => err)
}

export default router
