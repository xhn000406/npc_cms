import request from '@/utils/request'

// 获取用户列表
export const apiGetUserList = (params) => request.get('/system/user/list', { params })

// 增加用户
export const apiAddUser = (data) => request.post('/system/user', data)

// 删除用户
export const apiDeleteUser = (userId) => request.delete(`/system/user/${userId}`)

// 修改用户
export const apiEditUserInfo = (data) => request.put(`/system/user`, data)