import request from '@/utils/request'

// 获取角色列表
export const apiGetRoleList = (params) => request.get('/system/role/list', { params })

// 获取角色
export const apiGetRoleInfo = (roleId) => request.get(`/system/role/${roleId}`)

// 修改角色
export const apiEditRoleInfo = (data) => request.put(`/system/role`, data)

// 增加角色
export const apiAddRole = (data) => request.post(`/system/role`, data)

// 删除角色
export const apiDeleteRole = (roleId) => request.delete(`/system/role/${roleId}`)

// 获取角色路由
export const apiGetRoleMenu = (roleId) => request.get(`/system/role/getMenuByRole/${roleId}`)

// 增加角色路由
export const apiAddRoleMenu = (data) => request.post('/system/menu', data)
