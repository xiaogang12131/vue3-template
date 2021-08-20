import { AxiosRequestConfig } from 'axios'
import service from 'utils/axios'

interface BaseResponse<T> {
  code: number
  data: T
  message?: string
}

const get = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
  return request({ ...config, method: 'GET' })
}

const post = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
  return request({ ...config, method: 'POST' })
}

const request = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    service.request<BaseResponse<T>>(config).then(
      res => {
        resolve(res.data)
      },
      (err: Error) => {
        reject(err)
      }
    )
  })
}

export { get, post }
export default request
