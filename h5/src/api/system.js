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

// 获取用户列表
export const apiGetUserList = (params) => request.get('/system/user/list', { params })

// 增加用户
export const apiAddUser = (data) => request.post('/system/user', data)

// 删除用户
export const apiDeleteUser = (userId) => request.delete(`/system/user/${userId}`)

// 修改用户
export const apiEditUserInfo = (data) => request.put(`/system/user`, data)

// 获取菜单列表
export const apiGetMenuList = () => request.get('/system/menu/list')

// 关联角色与菜单
export const apiAssociationRoleMenu = (data) => request.post('/core/associationRoleMenu', data)

// 关联角色与用户
export const apiAssociationUserRole = (data) => request.post('/core/associationUserRole', data)
