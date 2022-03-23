import request from '@/utils/request'

// 用户登陆
export const apiUserLogin = (data) => request.post('/login', data)

// 获取用户信息
export const apiGetUserInfo = () => request.get('/userInfo')
