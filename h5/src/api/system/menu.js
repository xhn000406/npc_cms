import request from '@/utils/request'

// 获取菜单列表
export const apiGetMenuList = () => request.get('/system/menu/list')

// 获取删除菜单
export const apiDelMenuItem = (menuId) => request.delete(`/system/menu/${menuId}`)

// 修改菜单
export const apiEditMenuItem = (data) => request.put('/system/menu', data)

// 关联角色与菜单
export const apiAssociationRoleMenu = (data) => request.post('/core/associationRoleMenu', data)

// 关联角色与用户
export const apiAssociationUserRole = (data) => request.post('/core/associationUserRole', data)

// 移除关联角色与菜单
export const apiRemoveRoleMenu = (data) => request.post('/core/removeRoleMenu', data)

// 移除关联角色与用户
export const apiRemoveUserRole = (data) => request.post('/core/removeRoleUserRole', data)
