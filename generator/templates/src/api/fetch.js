import axios from 'axios'
import {
  Message
} from 'element-ui'
import msgInfo from './errorMessage'
import axiosConfig from './config'

axios.defaults.baseURL = axiosConfig.baseURL
axios.defaults.timeout = axiosConfig.timeout

const pending = []
const cancelToken = axios.CancelToken
// 移除请求
const removePending = (config) => {
  for (const p in pending) {
    if (pending[p].u === `${config.url}&${config.method}`) { // 当当前请求在数组中存在时执行函数体
      pending[p].f() // 执行取消操作
      pending.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}

// 请求拦截器
axios.interceptors.request.use(config => {
  // 添加 headers 头
  const headers = axiosConfig.headers
  if (headers) {
    for (let header in headers) {
      if (headers[header]) {
        config.headers[header] = headers[header]
      }
    }
  }

  removePending(config) // 在一个ajax发送前执行一下取消操作
  // eslint-disable-next-line new-cap
  config.cancelToken = new cancelToken((c) => {
    // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
    pending.push({ u: `${config.url}&${config.method}`, f: c })
  })
  return config
}, error => Promise.reject(error.message))

// 响应拦截器
axios.interceptors.response.use(response => {
  removePending(response.config)
  return response
}, error => {
  if (error && error.response) {
    error.message = msgInfo.apiErrorMessage[error.response.status]
  } else {
    error.message = '连接到服务器失败'
  }
  Message.error({
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error.message)
})

export default axios
