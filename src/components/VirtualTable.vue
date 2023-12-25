<template>
  <div
    :class="[
      'virtual-table',
      scrollPosition ? 'virtual-table-scroll-' + scrollPosition : ''
    ]"
  >
    <div ref="headerWrapper" class="virtual-table-header">
      <table>
        <colgroup>
          <col
            v-for="(item, index) in cols"
            :key="index"
            :style="{ width: `${item}px` }"
          />
        </colgroup>
        <thead>
          <tr>
            <th
              v-for="(item, index) in columns"
              :key="index"
              :class="colStyle[index]?.class"
              :style="setFixed(colStyle[index])"
            >
              {{ item.title }}
            </th>
            <th
              v-if="hasGutter"
              :class="[
                'gutter',
                { 'gutter-sticky': columns.findIndex(i => i.fixed === 'right') }
              ]"
              :style="{ width: `${gutterWidth}px` }"
            ></th>
          </tr>
        </thead>
      </table>
    </div>
    <div ref="bodyWrapper" class="virtual-table-body">
      <div :style="divStyle">
        <table ref="bodyTableWrapper">
          <colgroup>
            <col
              v-for="(item, index) in cols"
              :key="index"
              :style="{ width: `${item}px` }"
            />
          </colgroup>
          <tbody>
            <tr
              v-for="(row, rIndex) in displayList"
              :key="rIndex"
              :style="liStyle"
              :class="{ first: rIndex === 0 }"
            >
              <td
                v-for="(column, cIndex) in row"
                :key="cIndex"
                :class="colStyle[cIndex]?.class"
                :style="colStyle[cIndex]?.style"
              >
                <slot :index="cIndex" :column-data="column" :row-data="row">
                  <div class="cell">{{ column }}</div>
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="loading-text"
        :style="{
          transform: `translateX(${state.scrollLeft}px)`
        }"
      >
        {{ loading ? '加载中' : noMore ? '没有更多了' : '' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineEmits,
  defineProps,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref,
  watch
} from 'vue'
import { debounce, throttle } from 'lodash'

import scrollbarWidth from '@/utils/scrollbarWidth'

const props = defineProps({
  columns: {
    type: Array as PropType<
      Array<{
        key: number
        title: string
        fixed: string | boolean
        dataIndex: number
      }>
    >,
    default: () => []
  },
  dataSource: {
    type: Array,
    default: () => []
  },
  // 每行高度
  itemHeight: {
    type: Number,
    default: () => 37
  },
  // 上下各缓冲多少屏
  cacheScreenNum: {
    type: Number,
    default: () => 2
  },
  loading: {
    type: Boolean,
    default: false
  },
  noMore: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['load'])

const headerWrapper = ref()
const bodyWrapper = ref()
const bodyTableWrapper = ref()
const state = reactive({
  scrollTop: 0,
  scrollLeft: 0,
  oldScrollLeft: 0,
  oldScrollTop: 0,
  // 一屏高度
  wrapperHeight: 900,
  iStart: -Infinity
})
const displayList = ref<Array<unknown>>([])

// 显示区域总行数
const offsetIndex = computed(() => {
  const { wrapperHeight } = state
  const { itemHeight, cacheScreenNum } = props
  return Math.floor((1 + 2 * cacheScreenNum) * (wrapperHeight / itemHeight))
})

const listLength = computed(() => props.dataSource.length)

const liStyle = computed(() => ({ height: props.itemHeight + 'px' }))

const divStyle = computed(() => ({
  height: listLength.value * props.itemHeight + 'px'
}))

// 更新数据
const update = () => {
  const { itemHeight, cacheScreenNum } = props
  const height = state.scrollTop - state.wrapperHeight * cacheScreenNum
  let start = Math.floor(height / itemHeight)
  start = start >= 0 ? start : 0
  if (start === state.iStart) {
    return
  }
  const offset = Math.abs(start - state.iStart)
  const screenOffset = state.wrapperHeight / itemHeight
  let end = start + offsetIndex.value
  end = end >= listLength.value ? listLength.value - 1 : end

  if (offset > screenOffset || start === 0 || end === listLength.value - 1) {
    displayList.value = props.dataSource.slice(start, end + 1)
    state.iStart = start
    if (offset > 2 * screenOffset) {
      bodyTableWrapper.value.style.transform = `translate(0, ${
        start * itemHeight
      }px)`
    } else {
      nextTick(() => {
        bodyTableWrapper.value.style.transform = `translate(0, ${
          start * itemHeight
        }px)`
      })
    }
  }
}

// 修改列宽
const ths = ref<number[]>([])
const trs = ref<number[]>([])
const cols = ref<number[]>([])
const gutterWidth = scrollbarWidth()
const scrollPosition = ref('')

const hasGutter = computed(() => {
  if (bodyWrapper.value) {
    const { offsetHeight, scrollHeight } = bodyWrapper.value
    return offsetHeight < scrollHeight && gutterWidth
  }
  return false
})

const colStyle = computed(() => {
  const leftFixedColumns = props.columns.filter(item => item.fixed === 'left')
  const rightFixedColumns = props.columns.filter(item => item.fixed === 'right')
  return props.columns.reduce((obj, column) => {
    const currentIndex =
      column.dataIndex ||
      props.columns.findIndex(item => item.dataIndex === column.dataIndex)
    if (column.fixed === 'left') {
      const lastFixedIndex =
        leftFixedColumns[leftFixedColumns.length - 1]?.dataIndex ?? 0
      obj[currentIndex] = {
        class: `left-fixed ${
          currentIndex === lastFixedIndex ? 'left-fixed-last' : ''
        }`,
        fixed: column.fixed,
        offset: cols.value.slice(0, currentIndex).reduce((t, v) => t + v, 0),
        style: {
          position: 'sticky',
          left: `${cols.value
            .slice(0, currentIndex)
            .reduce((t, v) => t + v, 0)}px`
        }
      }
    }
    if (column.fixed === 'right') {
      const firstFixedIndex = rightFixedColumns[0]?.dataIndex ?? 0
      obj[currentIndex] = {
        class: `right-fixed ${
          currentIndex === firstFixedIndex ? 'right-fixed-first' : ''
        }`,
        fixed: column.fixed,
        offset: cols.value.slice(currentIndex + 1).reduce((t, v) => t + v, 0),
        style: {
          position: 'sticky',
          right: `${cols.value
            .slice(currentIndex + 1)
            .reduce((t, v) => t + v, 0)}px`
        }
      }
    }
    return obj
  }, {} as Record<string, { class: string; fixed: string; offset: number; style: unknown }>)
})

const setFixed = (data: any, isHeader = true) => {
  if (data) {
    const obj = { ...data.style }
    if (isHeader && data.fixed === 'right') {
      obj[data.fixed] = `${data.offset + gutterWidth}px`
    }
    return obj
  }
  return {}
}

const setDiffWidth = () => {
  nextTick(() => {
    if (headerWrapper.value) {
      const headTable = headerWrapper.value.querySelector('table')
      const diffWidth = headerWrapper.value.offsetWidth - headTable.offsetWidth
      if (diffWidth > 0) {
        cols.value = cols.value.map(
          (item, index, arr) => item + diffWidth / arr.length
        )
      }
    }
  })
}

const setColWidth = () => {
  nextTick(() => {
    if (!ths.value.length) {
      const thList =
        headerWrapper.value?.querySelectorAll('th:not(.gutter)') ?? []
      ths.value = Object.values<HTMLElement>(thList).map(
        item => item.offsetWidth + 10
      )
    }
    trs.value = Object.values<HTMLElement>(
      bodyTableWrapper.value?.querySelectorAll('.first td') ?? []
    ).map(item => {
      return item.offsetWidth
    })
    cols.value = ths.value.map((item, index) => {
      return Math.max(item, trs.value[index])
    })
    setDiffWidth()
  })
}

const setColPosition = throttle(function () {
  if (bodyWrapper.value) {
    const { offsetWidth, scrollLeft, scrollWidth } = bodyWrapper.value
    const maxScrollLeftPosition = scrollWidth - offsetWidth
    if (scrollLeft === 0) {
      scrollPosition.value = 'left'
    } else if (scrollLeft >= maxScrollLeftPosition) {
      scrollPosition.value = 'right'
    } else {
      scrollPosition.value = 'middle'
    }
    if (offsetWidth >= scrollWidth) {
      scrollPosition.value = ''
    }
  }
}, 16)

// 加载更多
const distance = ref(100)

const loadData = () => {
  if (props.loading) {
    return
  }
  if (props.noMore) {
    return
  }
  const element = bodyWrapper.value
  if (element) {
    const { offsetHeight, scrollTop, scrollHeight } = element
    if (scrollHeight - scrollTop - offsetHeight <= distance.value) {
      emit('load')
    }
  }
}

// 滚动事件
const scroll = (e: Event) => {
  const target = e.target as HTMLElement
  state.scrollLeft = target.scrollLeft
  state.scrollTop = target.scrollTop
  if (state.oldScrollLeft !== target.scrollLeft) {
    headerWrapper.value.scrollLeft = target.scrollLeft
    setColPosition()
  }
  if (state.oldScrollTop !== target.scrollTop) {
    loadData()
    update()
  }
  state.oldScrollLeft = target.scrollLeft
  state.oldScrollTop = target.scrollTop
}

const resize = debounce(function () {
  cols.value = []
  setColWidth()
  setColPosition()
}, 16)

watch(
  () => props.dataSource,
  () => {
    state.iStart = -1
    setColWidth()
    update()
  },
  { deep: true, immediate: true }
)

onMounted(() => {
  bodyWrapper.value?.addEventListener('scroll', scroll, { passive: true })
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  bodyWrapper.value?.removeEventListener('scroll', scroll, { passive: true })
  window.removeEventListener('resize', resize)
})
</script>

<style lang="less">
.virtual-table {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;

  table {
    table-layout: auto;
    width: max-content;
    border-collapse: separate;
    border-spacing: 0;

    th,
    td {
      font-size: 14px;
      color: #000;
      background: #fff;
      text-align: left;
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      padding: 0 15px;

      &:last-child {
        border-right: 0;
      }
    }

    th {
      height: 37px;
      background: #f7f8fa;
      font-weight: bolder;
    }

    .cell {
      width: max-content;
    }

    .gutter {
      padding: 0;
      &-sticky {
        position: sticky;
        right: 0;
      }
    }
  }

  &-header {
    overflow: hidden;
  }

  &-body {
    max-height: 400px;
    overflow: auto scroll;
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;

    .scrollbar__wrap {
      max-height: 400px;
    }
  }

  .left-fixed,
  .right-fixed {
    z-index: 2;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: -1px;
      width: 30px;
      transform: translateX(100%);
      transition: box-shadow 0.3s;
      content: '';
      pointer-events: none;
    }
  }

  .left-fixed::after {
    right: 0;
    transform: translateX(100%);
  }

  .right-fixed::after {
    left: 0;
    transform: translateX(-100%);
  }

  &-scroll-middle,
  &-scroll-right {
    .left-fixed-last::after {
      box-shadow: inset 10px 0 8px -8px rgba(5, 5, 5, 0.06);
    }
  }

  &-scroll-left,
  &-scroll-middle {
    .right-fixed-first::after {
      box-shadow: inset -10px 0 8px -8px rgba(5, 5, 5, 0.06);
    }
  }

  .loading-text {
    color: #999;
    text-align: center;
    font-size: 12px;
    min-width: 100%;

    .icon-loading {
      height: 14px;
      width: 14px;
      display: inline-block;
      margin-right: 5px;
      position: relative;
      top: 2px;
      -webkit-animation: loadingCircle 1s infinite linear;
      animation: loadingCircle 1s infinite linear;

      path {
        fill: #999;
      }
    }
  }
}
</style>
