import axios from 'axios'
import ElementUI from 'element-ui'
import config from '@/config'
import {
  TEXT_TOKEN,
  getToken
} from './session'
const msgBox = ElementUI.Message
const request = axios.create({
  baseURL: config.SYSTEM_INFO.baseUrl,
  timeout: 1000 * 10
})
// 请求拦截器
request.interceptors.request.use(config => {
  const mToken = getToken()
  if (mToken) config.headers[TEXT_TOKEN] = mToken
  return config
})

// 响应拦截器
request.interceptors.response.use(res => {
  if (res.config.responseType === 'blob') {
    return res.data
  }
  const mData = res.data
  const mStatus = res.status
  if (
    mData.status === config.STATUS_CODE.error ||
    mData.status !== config.STATUS_CODE.success ||
    mStatus === config.STATUS_CODE.error
  ) {
    msgBox({
      message: mData.msg,
      type: 'error'
    })
    return Promise.reject(mData)
  }
  return mData.data
}, err => {
  msgBox({
    message: err,
    type: 'error'
  })
  return Promise.reject(err)
})

export default request
