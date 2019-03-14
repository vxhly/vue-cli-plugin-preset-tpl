import axios from 'axios'
import { Message } from 'element-ui'
import msgInfo from './errorMessage'

axios.defaults.timeout = 100000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(config => config, error => Promise.reject(error.message))

// 响应拦截器
axios.interceptors.response.use(config => config, error => {
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
