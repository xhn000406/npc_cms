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

export default (async(to, from, next) => {
  if (!mRouters) {
    mRouters = [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: {
          title: '首页',
          icon: 'menu_home',
          keepAlive: true
        }
      },
      ...disposeRemoteRouters((await apiGetUserInfo()).sysMenu)
    ]
    const mSyncRoutes = [
      {
        path: '/',
        name: 'Layout',
        redirect: { name: 'Home' },
        component: () => import('@/layout'),
        children: mRouters
      }
    ]
    store.commit('setMenuBarItem', mRouters)
    mSyncRoutes.forEach(item => router.addRoute(item))
    next({ path: '/' })
  } else {
    next()
  }
})
