import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: { name: 'Home' },
    component: () => import('@/layout'),
    children: [
      {
        path: 'me',
        name: 'Me',
        component: () => import('@/views/me')
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home')
      }
    ]
  },
  {
    path: '/power',
    name: 'Power',
    component: () => import('@/views/power'),
    redirect: { name: 'AddScoreApply' },
    children: [
      {
        path: 'addScoreApply',
        name: 'AddScoreApply',
        component: () => import('@/views/power/components/addScoreApply'),
        meta: {
          title: '加分申请',
          icon: 'power_addScore'
        }
      },
      {
        path: 'dataAnalyze',
        name: 'DataAnalyze',
        component: () => import('@/views/power/components/dataAnalyze'),
        meta: {
          title: '数据分析',
          icon: 'power_data'
        }
      },
      {
        path: 'groupAdmin',
        name: 'GroupAdmin',
        component: () => import('@/views/power/components/groupAdmin'),
        meta: {
          title: '协会管理',
          icon: 'power_group'
        }
      },
      {
        path: 'scoreAdmin',
        name: 'ScoreAdmin',
        component: () => import('@/views/power/components/scoreAdmin'),
        meta: {
          title: '成绩查询',
          icon: 'power_score'
        }
      },
      {
        path: 'sportScoreAdmin',
        name: 'SportScoreAdmin',
        component: () => import('@/views/power/components/sportScoreAdmin'),
        meta: {
          title: '体测查询',
          icon: 'power_sport'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// const
// VueRouter.prototype.push = 
export default router
