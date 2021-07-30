import Mock from 'mockjs'
import table from './table'

export type ObjectType = Record<string, any>
export type ObjectArray = Record<string, any>[]
export interface RequestConfig {
  method: string
  query: ObjectType
  body: ObjectType
}

const mocks = [...table]

// 获取url参数
function param2Obj(url: string): ObjectType {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj: Record<string, any> = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
// 封装请求
function responseWrap(respond: (config: RequestConfig) => void) {
  return function (options: any) {
    let result = null
    if (respond instanceof Function) {
      const { body, type, url } = options
      result = respond({
        method: type,
        query: param2Obj(url),
        body: JSON.parse(body)
      })
    } else {
      result = respond
    }
    return result
  }
}

mocks.forEach(item => {
  Mock.mock(
    new RegExp(item.url),
    item.type || 'get',
    responseWrap(item.response)
  )
})
