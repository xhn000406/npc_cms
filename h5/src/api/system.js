import request from '@/utils/request'

// 获取角色列表
export const apiGetRoleList = () => request.get('/system/role/list')

// 获取角色信息
export const apiGetRoleInfo = (roleId) => request.get(`/system/role/${roleId}`)

// 获取菜单列表
export const apiGetMenuList = () => request.get('/system/menu/list')


