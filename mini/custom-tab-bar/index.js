// custom-tab-bar/index.js
Component({
  data: {
    tabIndex: 'power',
    tabItme: [
      { title: '功能', name: 'power', icon: 'tab_power', path: '../power/index' },
      { title: '我的', name: 'me', icon: 'tab_me', path: '../me/index' }
    ]
  },

  lifetimes: {
    attached() {
      console.log(this.getTabBar())
    }
  },

  methods: {
    tabSwitch({ currentTarget }) {
      const { url } = currentTarget.dataset
      // console.log(url)
      wx.switchTab({ url })
      // this.setData({
      //   tabIndex: index
      // })
    }
  }
})
