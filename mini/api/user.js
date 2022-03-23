import request from '../utils/request'

export const apiGetUserInfo = () => request({ url: '/userInfo' })
