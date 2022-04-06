import request from '@/utils/request'
import config from '@/config'

// 导入接口
export const apiUpload = config.SYSTEM_INFO.baseUrl + '/business/year/import'

// 获取年度管理列表
export const apiGetYearAdminList = (params) => request.get('/business/year/list', { params })

// 修改年度管理列表
export const apiEditYearAdminList = (data) => request.put('/business/year', data)

// 增加年度管理列表
export const apiAddYearAdminList = (data) => request.post('/business/year', data)

// 删除年度管理项
export const apiDelYearAdminList = (yearId) => request.delete(`/business/year/${yearId}`)

// 导出年度管理项
export const apiExportYearAdminList = () => request.get('/business/year/export', { responseType: 'blob' })

// 导出下载年度管理导入模板
export const apiYearAdminTemplate = () => request.get('/business/year/exportTemplate', { responseType: 'blob' })
