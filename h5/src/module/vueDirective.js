import store from '@/store'
// 这个是用于引入自定义指令的地方
export default (Vue) => {
  // 节流函数，防止重复点击
  Vue.directive('throttle', dom => {
    dom.addEventListener('click', () => {
      dom.classList.add('button_throttle')
      setTimeout(() => {
        dom.classList.remove('button_throttle')
      }, 1000)
    })
  })

  // 使用自定义指令为按钮分配权限
  Vue.directive('power', {
    inserted: (dom, params) => {
      const mPowerGroup = store.getters.getUserRule
      const mValue = params.value
      mPowerGroup.indexOf(mValue) === -1 && dom.remove()
    }
  })
}
