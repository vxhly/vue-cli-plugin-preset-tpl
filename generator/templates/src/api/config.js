/**
 * axios 的基本配置
 */
export default {
  // 基础 RESTful URL
  baseURL: 'https://api.github.com',
  // 超时配置
  timeout: 100000,
  // 请求头
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    Authorization: 'test' // `${store.state.auth.authToken}` 可将验证的 token 放置 vuex 中
  }
}
