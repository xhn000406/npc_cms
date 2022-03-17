// 这个是用于引入自定义指令的地方
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
}
