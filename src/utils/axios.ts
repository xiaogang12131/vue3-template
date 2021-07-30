import axios, { AxiosInstance } from 'axios'
import { ElNotification } from 'element-plus'

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 300 * 1000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      return Promise.reject(res)
    }
    return response
  },
  error => {
    if (error.response) {
      ElNotification({
        type: 'error',
        message: errorMessage(error.response.status)
      })
    }
    return Promise.reject(error)
  }
)

const errorMessage = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    default:
      message = `请求出错(${status})!`
  }
  return message
}

export default service
