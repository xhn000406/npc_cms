const mConfig = {
  // 全局信息
  SYSTEM_INFO: {
    title: '大学生体质健康监测系统v1.0',
    baseUrl: '/api',
    uploadApi: '/file/upload'
  },
  // 请求状态码
  STATUS_CODE: {
    success: 200,
    error: 500
  },
  // 权限标识符
  POWER_LIST: {
    insert: 'system:rule:insert',
    delete: 'system:rule:delete',
    update: 'system:rule:update',
    query: 'system:rule:query'
  }
}
export default mConfig