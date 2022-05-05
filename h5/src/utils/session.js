export const TEXT_TOKEN = "token";
// 获取token
export const getToken = () => {
  return localStorage.getItem(TEXT_TOKEN);
};

// 设置token
export const setToken = (token) => {
  return localStorage.setItem(TEXT_TOKEN, token);
};

// 删除token
export const delToken = () => {
  return localStorage.removeItem(TEXT_TOKEN);
};
