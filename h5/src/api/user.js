import request from '@/utils/request'

// 用户登陆
export const apiUserLogin = (data) => request.post('/core/login', data)

// 获取用户信息
export const apiGetUserInfo = () => request.get(`/core/userInfo`)

// 更新用户信息
export const apiUpdateUserInfo = () => request.get(`/core/userInfoUpdate`)
