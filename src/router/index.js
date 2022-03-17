import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
        meta: {
          title: '首页'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// hook这个router的push函数
const mRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = (location) => {
  return mRouterPush.call(this, location).catch(err => err)
}

export default router
