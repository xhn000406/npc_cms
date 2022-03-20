// 这个是用于引入自定义指令的地方
const POWER_TEXT = 'power'
export default (Vue) => {
  // 节流函数，防止重复点击
  Vue.directive('throttle', dom => {
    console.log(dom)
    dom.addEventListener('click', () => {
      dom.style.pointerEvents = 'none'
      setTimeout(() => {
        dom.style.pointerEvents = ''
      }, 1000)
    })
  })

  // 使用自定义指令为按钮分配权限
  Vue.directive('power', {
    inserted: (dom, params) => {
      const mPowerGroup = JSON.parse(localStorage.getItem(POWER_TEXT))
      const mValue = params.value
      mPowerGroup.indexOf(mValue) === -1 && dom.remove()
    }
  })
}
