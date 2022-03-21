import router from '@/router'
import {
  apiGetUserInfo
} from '@/api/user'
import {
  disposeRemoteRouters
} from '@/utils/routerDispose'
import store from '@/store'
// 导航守卫
let mRouters

export default (async (to, from, next) => {
  if (to.name === 'Login') {
    next()
  } else {
    // 在动态路由上加了固定的路由
    if (!mRouters) { // 如果不加这个判断，你将会进入死循环
      try {
        const {
          sysMenu,
          permissions
        } = (await apiGetUserInfo())
        mRouters = [{
            path: 'home',
            name: 'Home',
            component: () => import('@/views/home'),
            meta: {
              title: '首页',
              icon: 'menu_home',
              keepAlive: true
            }
          },
          ...disposeRemoteRouters(sysMenu)
        ]
        const mSyncRoutes = [{
          path: '/',
          name: 'Layout',
          redirect: {
            name: 'Home'
          },
          component: () => import('@/layout'),
          children: mRouters
        }]
        store.commit('setMenuBarItem', mRouters)
        store.commit('setUserRule', permissions)
        mSyncRoutes.forEach(item => router.addRoute(item))
        next({
          path: '/'
        })
      } catch(e) {
        console.log(e)
        next({ name: 'Login' })
      }
    } else {
      next()
    }
  }
})