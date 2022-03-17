// 这个是用于引入自定义全局v-什么什么的地方
export default (Vue) => {
  // 节流函数，防止重复点击
  Vue.directive('throttle', dom => {
    console.log(dom)
    dom.style.pointerEvents = 'none'
    dom.addEventListener('click', () => {
      setTimeout(() => {
        dom.style.pointerEvents = ''
      }, 1000)
    })
  })
}
