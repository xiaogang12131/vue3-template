import request from 'utils/request'

export type ListData = {
  id: string
  month: string
  date: string
  name: string
  province: string
  area: string
  address: string
  postcode: string | number
}
export type ColumnData = {
  label: string
  prop: string
  showOverflowTooltip?: boolean
}
export interface TableRequest {
  currentPage?: number
  pageSize?: number
}
export interface TableResponse {
  list: ListData[]
  column: ColumnData[]
  total: number
}

export function getTableData(params?: TableRequest) {
  return request<TableResponse>({
    url: '/table/list',
    method: 'get',
    params
  })
}
