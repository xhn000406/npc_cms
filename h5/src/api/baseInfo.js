import request from '@/utils/request'

// 获取年度管理列表
export const apiGetYearAdminList = (params) => request.get('/business/year/list', { params })

// 修改年度管理列表
export const apiEditYearAdminList = (data) => request.put('/business/year', data)

// 增加年度管理列表
export const apiAddYearAdminList = (data) => request.post('/business/year', data)

// 删除年度管理项
export const apiDelYearAdminList = (yearId) => request.delete(`/business/year/${yearId}`)
