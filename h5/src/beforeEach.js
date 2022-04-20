import router, { asyncRoutes } from '@/router'
import ElementUI from 'element-ui'
import { apiGetUserInfo } from '@/api/user'
import store from '@/store'
/**
 * 导航守卫
 * 这个地方用来登陆判断
 * 而且是整个路由菜单的核心
 * 一般情况下不要轻易动这里的代码
 */
let mRouters
const beforeEach = (async (to, from, next) => {
  const mSyncRoutes = asyncRoutes.find(item => item.path === '/')
  if (to.name === 'Login') {
    next()
  } else {
     // 如果不加这个判断，你将会进入死循环
    if (!mRouters) {
      try {
        const {
          sysMenu,
          permissions,
          user
        } = (await apiGetUserInfo())
        mSyncRoutes.children = [
          ...mSyncRoutes.children,
          ...disposeRemoteRouters(sysMenu)
        ]
        mRouters = mSyncRoutes.children
        store.commit('setMenuBarItem', mRouters)
        store.commit('setUserRule', permissions)
        store.commit('setUserInfo', user)
        // 用for循环，以防异步
        for (const item of asyncRoutes) {
          router.addRoute(item)
        }
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


/**
 * 把文本的路由转换为组件的路由
 * @param {Array} routers 
 * @returns 
 */
const disposeRemoteRouters = (routers) => {
  let mRouters = []
  routers.forEach(router => {
    if (router.children) router.children = disposeRemoteRouters(router.children)
    mRouters.push({
      path: router.path,
      name: router.url,
      component: () => import(`@/views/${router.component}`),
      children: router.children,
      meta: {
        title: router.menuName,
        icon: router.icon,
        keepAlive: true
      }
    })
  })
  return mRouters
}

export default beforeEach