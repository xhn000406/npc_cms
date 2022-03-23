import {
  setTabBar
} from '../../utils/util.js'
Page({
  data: {
    scoreItem: [
      {
        title: '成绩查询',
        icon: '/icons/svg/power_score.svg',
        path: '/views/power/scoreAdmin/index'
      },
      {
        title: '体测查询',
        icon: '/icons/svg/power_sport.svg',
        path: '/views/power/sportScoreAdmin/index'
      },
      {
        title: '数据分析',
        icon: '/icons/svg/power_data.svg',
        path: '/views/power/dataAnalyze/index'
      }
    ],
    groupItem: [
      {
        title: '协会管理',
        icon: '/icons/svg/power_group.svg',
        path: '/views/power/groupAdmin/index'
      },
      {
        title: '加分申请',
        icon: '/icons/svg/power_addScore.svg',
        path: '/views/power/addScoreApply/index'
      },
    ]
  },

  onLoad() {},

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        'tabIndex': 'power'
      })
    }
  }
})