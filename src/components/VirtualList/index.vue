<template>
  <div ref="listRef" class="virtual-list" @scroll="scrollEvent">
    <div class="virtual-list-body" :style="{ height: listHeight + 'px' }">
      <div class="virtual-list-content" :style="{ transform: getTransform }">
        <div
          ref="items"
          class="virtual-list-item"
          v-for="item in visibleData"
          :key="item.id"
          :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  computed
} from 'vue'

export default defineComponent({
  name: 'VirtualList',
  props: {
    //所有列表数据
    listData: {
      type: Array,
      default: () => []
    },
    //每项高度
    itemSize: {
      type: Number,
      default: 200
    },
    //缓冲区比例
    bufferScale: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    console.log(props)
    // 组件状态
    const listRef = ref()
    const state = reactive({
      screenHeight: 0, // 可视区域高度
      startOffset: 0, // 偏移量
      start: 0, // 起始索引
      end: 0 // 结束索引
    })

    // 列表总高度
    const listHeight = computed(() => {
      return props.listData.length * props.itemSize
    })
    // 可显示的列表项数
    const visibleCount = computed(() => {
      return Math.ceil(state.screenHeight / props.itemSize)
    })
    // 可视区域以上的条数
    const aboveCount = computed(() => {
      return Math.min(state.start, props.bufferScale * visibleCount.value)
    })
    // 可视区域以下的条数
    const belowCount = computed(() => {
      return Math.min(
        props.listData.length - state.end,
        props.bufferScale * visibleCount.value
      )
    })
    // 获取真实显示列表数据
    const visibleData = computed(() => {
      let start = state.start - aboveCount.value
      let end = state.end + belowCount.value
      return props.listData.slice(start, end)
    })
    // 偏移量对应的style
    const getTransform = computed(() => {
      return `translate3d(0,${state.startOffset}px,0)`
    })

    // 列表滚动
    const scrollEvent = () => {
      // 当前滚动位置
      let scrollTop = listRef.value.scrollTop
      // 此时的开始索引
      state.start = Math.floor(scrollTop / props.itemSize)
      // 此时的结束索引
      state.end = state.start + visibleCount.value
      // 此时的偏移量
      state.startOffset = scrollTop - (scrollTop % props.itemSize)
    }

    onMounted(() => {
      state.screenHeight = listRef.value.clientHeight
      state.start = 0
      state.end = state.start + visibleCount.value
    })

    return {
      listRef,
      ...toRefs(state),
      listHeight,
      getTransform,
      visibleData,
      scrollEvent
    }
  }
})
</script>

<style lang="scss" scoped>
.virtual-list {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #e6e6e6;
  &-content {
    text-align: center;
  }
}
</style>
