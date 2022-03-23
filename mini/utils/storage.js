export const STORAGE_TOKEN = 'token'

// 获取token
export const getToken = () => wx.getStorageSync(STORAGE_TOKEN)

// 设置token
export const setToken = (token) => wx.setStorageSync(STORAGE_TOKEN, token)
