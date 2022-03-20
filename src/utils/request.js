import axios from 'axios'
import Vue from 'vue'
import config from '@/config'
import {
  TEXT_TOKEN,
  getToken
} from './session'
// 拿到全局的消息框函数对象
const msgBox = Vue.prototype.$msgBox
const request = axios.create({
  baseURL: '/api',
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
})

export default request
