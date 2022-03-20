// 通过这种方式加载动态路由的组件
const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from '@/layout'
export const disposeRemoteRouters = (routers) => {
  let mRouters = []
  routers.forEach(router => {
    if (router.children) {
      router.children = disposeRemoteRouters(router.children)
    }
    if (router.name === 'Layout') {
      router.component = Layout
    } else if (router.component) {
      router.component = _import(router.component)
    }
    mRouters.push(router)
  })
  return mRouters
}
