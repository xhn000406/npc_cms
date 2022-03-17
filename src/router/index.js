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
    meta: { hidden: true },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: { title: '首页', icon: 'menu_home', keepAlive: true }
      },
      {
        path: 'user',
        name: 'User',
        redirect: { name: 'UserAdmin' },
        component: () => import('@/views/user'),
        children: [
          {
            path: 'admin',
            name: 'UserAdmin',
            component: () => import('@/views/user/components/userAdmin'),
            meta: { title: '用户管理', icon: 'menu_user', keepAlive: true }
          }
        ],
        meta: { title: '用户管理', icon: 'menu_user' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  }
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
