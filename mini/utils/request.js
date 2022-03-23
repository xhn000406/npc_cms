import config from '../config'
import { STORAGE_TOKEN, getToken } from '../utils/storage'
import { showToast } from '../utils/util'
const TIME_OUT = 1000 * 10
// 二次封装request，以promise形式
export default (options) => {
  showToast('请求中...')
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.BASEURL + options.url,
      method: options.method || 'get',
      timeout: TIME_OUT,
      header: {
        'content-type': 'application/json',
        [STORAGE_TOKEN]: getToken(),
        ...options.header
      },
      data: options.data,
      success: ({ data }) => {
        if (data.status === config.HTTP_STATUS.success) {
          showToast('请求成功', 'success')
          resolve(data)
        } else {
          showToast(data.msg, 'error')
          reject(data)
        }
      },
      fail: err => {
        showToast('请求异常', 'error')
        reject(err)
      }
    })
  })
}
