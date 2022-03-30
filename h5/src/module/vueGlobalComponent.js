import '@/icons'
import BlueIcon from '@/components/BlueIcon'
import BlueButton from '@/components/BlueButton'
import BluePopup from '@/components/BluePopup'
import BlueTable from '@/components/BlueTable'
// 这个是用于引入自定义全局组件的地方
export default (Vue) => {
  Vue.component('BlueIcon', BlueIcon)
  Vue.component('BlueButton', BlueButton)
  Vue.component('BluePopup', BluePopup)
  Vue.component('BlueTable', BlueTable)
}
