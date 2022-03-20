import router from '@/router'
import {
  disposeRemoteRouters
} from '@/utils/routerDispose'
// // 导航守卫
// let mRouters = disposeRemoteRouters(JSON.parse(localStorage.getItem('routers')))
// export default (to, from, next) => {
//   router.addRoutes(mRouters)
//   if (mRouters)
//   next()
// }

let getRouter //用来获取后台拿到的路由

export default ((to, from, next) => {
  if (!getRouter) {
    if (!getObjArr('routers')) {
      getRouter = disposeRemoteRouters(JSON.parse(localStorage.getItem('routers')))
      saveObjArr('routers', getRouter)

      routerGo(to, next)
    } else {
      getRouter = getObjArr('routers')
      routerGo(to, next)
    }
  } else {
    next()
  }
})


function routerGo(to, next) {
  getRouter = disposeRemoteRouters(getRouter) //过滤路由
  router.addRoutes(getRouter) //动态添加路由
  global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to })
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(localStorage.getItem(name));

}

