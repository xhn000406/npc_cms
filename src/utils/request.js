import axios from 'axios'
import {
  TEXT_TOKEN,
  getToken
} from './session'

const request = axios.create({
  baseURL: '',
  timeout: 1000 * 10
})

// 请求拦截器
request.interceptors.request(config => {
  const mToken = getToken()
  if (mToken) config.headers[TEXT_TOKEN] = mToken
  return config
})

// 响应拦截器
request.interceptors.response(config => {
  console.log(config)
  return config.data
})

export default request
