import '@/icons'
import SvgIcon from '@/components/SvgIcon'
// 这个是用于引入自定义全局组件的地方
export default (Vue) => {
  Vue.component('SvgIcon', SvgIcon)
}
