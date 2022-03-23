// 通过这种方式加载动态路由的组件
const _import = require('./_import_' + process.env.NODE_ENV)
// 递归去处理动态路由
export const disposeRemoteRouters = (routers) => {
  let mRouters = []
  routers.forEach(router => {
    if (router.children) router.children = disposeRemoteRouters(router.children)
    mRouters.push({
      path: router.path,
      name: router.url,
      component: _import(router.component),
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
