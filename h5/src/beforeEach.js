import router from '@/router'
import ElementUI from 'element-ui'
import {
  apiGetUserInfo
} from '@/api/user'
import {
  disposeRemoteRouters
} from '@/utils/routerDispose'
import store from '@/store'
// 导航守卫
let mRouters

const beforeEach = (async (to, from, next) => {
  if (to.name === 'Login') {
    next()
  } else {
    if (!mRouters) { // 如果不加这个判断，你将会进入死循环
      try {
        const {
          sysMenu,
          permissions,
          user
        } = (await apiGetUserInfo())
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
          ...disposeRemoteRouters(sysMenu)
        ]
        // 在动态路由上加了固定的路由
        const mSyncRoutes = [
          {
            path: '/',
            name: 'Layout',
            redirect: {
              name: 'Home'
            },
            component: () => import('@/layout'),
            children: mRouters
          }
        ]
        store.commit('setMenuBarItem', mRouters)
        store.commit('setUserRule', permissions)
        store.commit('setUserInfo', user)
        mSyncRoutes.forEach(item => router.addRoute(item))
        next({ path: to.path })
      } catch {
        ElementUI.Message({
          message: '获取路由异常',
          type: 'error'
        })
        next({ name: 'Login' })
      }
    } else {
      next()
    }
  }
})

export default beforeEach