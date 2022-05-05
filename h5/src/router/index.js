import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import power from "@/beforeEach";
Vue.use(VueRouter);

// 动态路由
export const asyncRoutes = [
  {
    path: "/",
    name: "Layout",
    redirect: { name: "Home" },
    component: () => import("@/layout"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home"),
        meta: {
          title: "首页",
          icon: "menu_home",
          keepAlive: true,
        },
      },
      {
        path: "info",
        name: "Info",
        component: () => import("@/views/info"),
        meta: {
          title: "个人信息",
          icon: "menu_info",
          keepAlive: true,
          hidden: false,
        },
      },
      {
        path: "theneighborhood",
        name: "theNeighborhood",
        component: () => import("@/views/theneighborhood"),
        meta: {
          title: "群众街坊",
          icon: "menu_info",
          keepAlive: true,
          hidden: false,
        },
        children: [
          {
            path: "mylisttodo",
            name: "MyListToDo",
            component: () => import("@/views/theneighborhood/myListToDo"),
            meta: {
              title: "我的待办",
              icon: "menu_info",
              keepAlive: true,
              hidden: false,
            },
          },
          {
            path: "haveFinished",
            name: "HaveFinished",
            component: () => import("@/views/theneighborhood/haveFinished"),
            meta: {
              title: "我的已办",
              icon: "menu_info",
              keepAlive: true,
              hidden: false,
            },
          },
          {
            path: "record",
            name: "Record",
            component: () => import("@/views/theneighborhood/record"),
            meta: {
              title: "接访记录",
              icon: "menu_info",
              keepAlive: true,
              hidden: false,
            },
          },
          {
            path: "pushRecord",
            name: "PushRecord",
            component: () => import("@/views/theneighborhood/pushRecord"),
            meta: {
              title: "发布接访计划",
              icon: "menu_info",
              keepAlive: true,
              hidden: false,
            },
          },
        ],
      },
    ],
  },
];

// 固定路由
export const generalRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
  },
  { path: "*", name: "404", component: () => import("@/views/404") },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: generalRoutes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  power(to, from, next);
});
router.afterEach(() => {
  NProgress.done();
});

// hook这个router的push函数
const mRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return mRouterPush.call(this, location).catch((err) => err);
};

export default router;
