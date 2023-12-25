<template>
  <div class="mobile-table">
    <virtual-table
      :columns="columns"
      :data-source="tableData.data"
      :loading="loading"
      :no-more="noMore"
      @load="getTableData"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import VirtualTable from 'components/VirtualTable.vue'

// 模拟数据
const tableData = ref({
  fixedCols: [0, 7],
  header: [
    '营业收入(人民币,元)',
    '毛利(人民币,元)',
    '营业收入(人民币,元)',
    '毛利(人民币,元)',
    '营业收入(人民币,元)',
    '毛利(人民币,元)',
    '营业收入(人民币,元)',
    '毛利(人民币,元)'
  ],
  data: [...Array(100)].map((_, i) => {
    return [
      `第1页, 第${i}行`,
      '3,849,295,000',
      '3,849,295,000',
      '3,849,295,000',
      '3,849,295,000',
      '3,849,295,000',
      '3,849,295,000',
      '3,849,295,000'
    ]
  })
})

let time = 0
const loading = ref(false)
const noMore = ref(false)
const getTableData = () => {
  loading.value = true
  setTimeout(() => {
    time++
    tableData.value.data.push(
      ...[...Array(100)].map((_, i) => {
        return [
          `第${time + 1}页, 第${i}行`,
          '3,849,295,00021,899,167,00021,899,167,000!',
          '3,849,295,000',
          '3,849,295,000',
          '3,849,295,000',
          '3,849,295,000',
          '3,849,295,000',
          '3,849,295,000'
        ]
      })
    )
    loading.value = false
    if (time > 5) {
      noMore.value = true
    }
  }, 1000)
}

const fixedSide = computed(() => {
  if (!tableData.value.fixedCols || !tableData.value.header.length) {
    return [-1, -1]
  }
  const middleIndex = (tableData.value.header.length - 1) / 2
  const leftSide = tableData.value.fixedCols
    .filter(item => item < middleIndex)
    .reduce((a, b) => Math.max(a, b), -1)
  const rightSide = tableData.value.fixedCols
    .filter(item => item >= middleIndex)
    .reduce((a, b) => Math.min(a, b), -1)
  return [leftSide, rightSide]
})

const columns = computed(() => {
  return tableData.value.header.map((item, index, arr) => {
    const fixed =
      fixedSide.value[0] >= 0 && fixedSide.value[0] >= index
        ? 'left'
        : fixedSide.value[1] >= 0 && fixedSide.value[1] <= index
        ? 'right'
        : false
    return {
      key: index,
      title: item,
      fixed: index === arr.length - 1 ? 'right' : fixed,
      dataIndex: index
    }
  })
})
</script>
