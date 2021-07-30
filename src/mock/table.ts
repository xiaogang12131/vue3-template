import Mock from 'mockjs'
import { ObjectArray, RequestConfig } from './index'

const tableData: ObjectArray = []
const tableColumn = [
  { label: '日期', prop: 'date' },
  { label: '姓名', prop: 'name' },
  { label: '省份', prop: 'province' },
  { label: '市区', prop: 'area' },
  { label: '地址', prop: 'address', showOverflowTooltip: true },
  { label: '邮编', prop: 'postcode' }
]

const pageTotal = 100
for (let i = 0; i < pageTotal; i++) {
  tableData.push(
    Mock.mock({
      id: '@increment',
      month: Mock.Random.date('M'),
      date: '@datetime',
      name: '@cname',
      province: '@province',
      area: '@city',
      address: '@cparagraph',
      postcode: '@increment'
    })
  )
}

export default [
  {
    url: '/table/list',
    type: 'get',
    response: (config: RequestConfig) => {
      const { currentPage = 1, pageSize = 20 } = config.query
      const pageList = tableData.filter(
        (item, index) =>
          index < pageSize * currentPage &&
          index >= pageSize * (currentPage - 1)
      )
      return {
        code: 1,
        data: {
          list: pageList,
          column: tableColumn,
          total: pageList.length
        },
        message: 'success'
      }
    }
  }
]
