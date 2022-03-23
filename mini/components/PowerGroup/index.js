Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    power: {
      type: Array,
      value: []
    }
  },
  data: {},
  lifetimes: {
    attached() {}
  },
  methods: {
    goPower({ currentTarget }) {
      const { url } = currentTarget.dataset
      wx.navigateTo({ url })
    }
  }
})