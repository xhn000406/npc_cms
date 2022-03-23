Page({
  data: {
    cellItem: [
      {
        title: '个人信息',
        icon: '/icons/svg/me_info.svg',
        path: '/views/me/myInfo/index'
      },
      {
        title: '个人信息',
        icon: '',
        path: ''
      }
    ]
  },

  onLoad() {
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        'tabIndex': 'me'
      })
    }
  }
})